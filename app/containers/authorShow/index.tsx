import * as React from "react";
import axios from "axios";
import { denormalize } from "normalizr";
import { connect, Dispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { AppState } from "../../reducers";
import AuthorShow from "../unconnectedAuthorShow";
import ConnectedAuthorShow from "../connectedAuthorShow";
import { Configuration } from "../../reducers/configuration";
import { fetchAuthorShowPageData } from "./sideEffect";
import { CurrentUser } from "../../model/currentUser";
import { authorSchema, Author } from "../../model/author/author";
import getQueryParamsObject from "../../helpers/getQueryParamsObject";

export interface AuthorShowMatchParams {
  authorId: string;
}

export interface HandleAuthorClaim {
  authorId: number;
}

export interface AuthorShowPageProps extends RouteComponentProps<AuthorShowMatchParams> {
  author: Author | undefined;
  configuration: Configuration;
  currentUser: CurrentUser;
  dispatch: Dispatch<any>;
}

function mapStateToProps(state: AppState) {
  return {
    author: denormalize(state.authorShow.authorId, authorSchema, state.entities),
    configuration: state.configuration,
    currentUser: state.currentUser,
  };
}

class AuthorShowContainer extends React.PureComponent<AuthorShowPageProps> {
  private cancelToken = axios.CancelToken.source();

  public componentDidMount() {
    const { dispatch, location, match, configuration, currentUser } = this.props;
    const notRenderedAtServerOrJSAlreadyInitialized =
      !configuration.succeedAPIFetchAtServer || configuration.renderedAtClient;

    if (notRenderedAtServerOrJSAlreadyInitialized) {
      fetchAuthorShowPageData(
        {
          dispatch,
          match,
          pathname: location.pathname,
          cancelToken: this.cancelToken.token,
        },
        currentUser
      );
    }
  }

  public componentWillUnmount() {
    this.cancelToken.cancel();
  }

  public componentWillReceiveProps(nextProps: AuthorShowPageProps) {
    const { match, dispatch, location, currentUser } = nextProps;

    if (this.props.match.params.authorId !== nextProps.match.params.authorId) {
      fetchAuthorShowPageData(
        {
          dispatch,
          match,
          pathname: location.pathname,
          cancelToken: this.cancelToken.token,
        },
        currentUser
      );
    }
  }

  public render() {
    const { author, location } = this.props;

    if (!author) {
      // TODO: Add 404 page
      return null;
    }

    const queryParams = getQueryParamsObject(location.search);
    const isTestMode = queryParams.beta === "true";

    if (this.props.author && !author.isLayered) {
      return <AuthorShow isTestMode={isTestMode} />;
    } else if (this.props.author && author.isLayered) {
      return <ConnectedAuthorShow />;
    }

    return null;
  }
}

export default connect(mapStateToProps)(AuthorShowContainer);
