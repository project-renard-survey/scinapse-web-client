import * as React from "react";
import axios from "axios";
import { connect, Dispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import * as parse from "date-fns/parse";
import { denormalize } from "normalizr";
import { Helmet } from "react-helmet";
import { AppState } from "../../reducers";
import CollectionPaperItem from "./collectionPaperItem";
import ArticleSpinner from "../common/spinner/articleSpinner";
import { withStyles } from "../../helpers/withStylesHelper";
import { CurrentUser } from "../../model/currentUser";
import { CollectionShowState } from "./reducer";
import { collectionSchema, Collection } from "../../model/collection";
import { fetchCollectionShowData } from "./sideEffect";
import { Configuration } from "../../reducers/configuration";
import { PaperInCollection, paperInCollectionSchema } from "../../model/paperInCollection";
import Footer from "../layouts/footer";
import Icon from "../../icons";
import GlobalDialogManager from "../../helpers/globalDialogManager";
const styles = require("./collectionShow.scss");

function mapStateToProps(state: AppState) {
  return {
    currentUser: state.currentUser,
    collectionShow: state.collectionShow,
    configuration: state.configuration,
    collection: denormalize(state.collectionShow.mainCollectionId, collectionSchema, state.entities),
    papersInCollection: denormalize(state.collectionShow.paperIds, [paperInCollectionSchema], state.entities),
  };
}

export interface CollectionShowMatchParams {
  collectionId: string;
}

export interface CollectionShowProps
  extends RouteComponentProps<CollectionShowMatchParams>,
    Readonly<{
      currentUser: CurrentUser;
      configuration: Configuration;
      collectionShow: CollectionShowState;
      collection: Collection | undefined;
      papersInCollection: PaperInCollection[] | undefined;
      dispatch: Dispatch<any>;
    }> {}

@withStyles<typeof CollectionShow>(styles)
class CollectionShow extends React.PureComponent<CollectionShowProps> {
  private cancelToken = axios.CancelToken.source();

  public componentDidMount() {
    const { dispatch, match, location, configuration } = this.props;

    const notRenderedAtServerOrJSAlreadyInitialized =
      !configuration.succeedAPIFetchAtServer || configuration.renderedAtClient;

    if (notRenderedAtServerOrJSAlreadyInitialized) {
      fetchCollectionShowData({
        dispatch,
        match,
        pathname: location.pathname,
        cancelToken: this.cancelToken.token,
      });
    }
  }

  public componentWillReceiveProps(nextProps: CollectionShowProps) {
    const { dispatch, match, location } = nextProps;

    const currentCollectionId = this.props.match.params.collectionId;
    const nextCollectionId = match.params.collectionId;

    if (currentCollectionId !== nextCollectionId) {
      fetchCollectionShowData({
        dispatch,
        match,
        pathname: location.pathname,
        cancelToken: this.cancelToken.token,
      });
    }
  }

  public componentWillUnmount() {
    this.cancelToken.cancel();
  }

  public render() {
    const { collectionShow, collection } = this.props;

    if (collectionShow.isLoadingCollection) {
      return (
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <ArticleSpinner className={styles.loadingSpinner} />
          </div>
        </div>
      );
    } else if (collection) {
      const parsedUpdatedAt = parse(collection.updated_at);

      return (
        <div>
          <div className={styles.collectionShowWrapper}>
            {this.getPageHelmet()}
            <div className={styles.headSection}>
              <div className={styles.container}>
                <div className={styles.leftBox}>
                  <div className={styles.title}>
                    <span>{collection.title}</span>
                  </div>
                  <div className={styles.description}>{collection.description}</div>
                  <div className={styles.infoWrapper}>
                    <span>Created by</span>
                    <strong>{` ${collection.created_by.firstName} ${collection.created_by.lastName || ""} · `}</strong>
                    <span>{`Last updated `}</span>
                    <strong>{`${distanceInWordsToNow(parsedUpdatedAt)} `}</strong>
                    <span>ago</span>
                  </div>
                </div>
                <div className={styles.rightBox}>{this.getCollectionControlBtns()}</div>
              </div>
            </div>

            <div className={styles.paperListContainer}>
              <div className={styles.leftBox}>
                <div className={styles.paperListBox}>
                  <div className={styles.header}>
                    <div className={styles.listTitle}>
                      <span>{`Papers `}</span>
                      <span className={styles.paperCount}>{collection.paper_count}</span>
                    </div>
                  </div>
                  <div>{this.getPaperList()}</div>
                </div>
              </div>
              <div className={styles.rightBox} />
            </div>
          </div>
          <Footer containerStyle={{ backgroundColor: "white" }} />
        </div>
      );
    } else {
      return null;
    }
  }

  private getCollectionControlBtns = () => {
    const { currentUser, collection } = this.props;

    if (collection && currentUser.isLoggedIn && collection.created_by.id === currentUser.id && !collection.is_default) {
      return (
        <div>
          <button
            className={styles.collectionControlBtn}
            onClick={() => {
              GlobalDialogManager.openEditCollectionDialog(collection);
            }}
          >
            <Icon icon="PEN" />
            <span>Edit</span>
          </button>
          {/* <button
            onClick={() => {
              GlobalDialogManager.openCollectionEditDialog(collection);
            }}
            className={styles.collectionControlBtn}
          >
            <Icon icon="TRASH_CAN" />
            <span>Delete</span>
          </button> */}
        </div>
      );
    }

    return null;
  };

  private getPageHelmet = () => {
    const { collection } = this.props;

    if (collection) {
      return (
        <Helmet>
          <title>{collection.title} | Sci-napse</title>
          <meta itemProp="name" content={`${collection.title} | Sci-napse`} />
          <meta
            name="description"
            content={`${collection.created_by.firstName} ${collection.created_by.lastName || ""}'s ${
              collection.title
            } collection`}
          />
          <meta
            name="twitter:description"
            content={`${collection.created_by.firstName} ${collection.created_by.lastName || ""}'s ${
              collection.title
            } collection`}
          />
          <meta name="twitter:card" content={`${collection.title} | Sci-napse`} />
          <meta name="twitter:title" content={`${collection.title} | Sci-napse`} />
          <meta property="og:title" content={`${collection.title} | Sci-napse`} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://scinapse.io/collections/${collection.id}`} />
          <meta
            property="og:description"
            content={`${collection.created_by.firstName} ${collection.created_by.lastName || ""}'s ${
              collection.title
            } collection`}
          />
        </Helmet>
      );
    }
  };

  private getPaperList = () => {
    const { papersInCollection, currentUser } = this.props;
    if (papersInCollection && papersInCollection.length > 0) {
      return papersInCollection.map(paper => {
        if (paper) {
          return (
            <CollectionPaperItem
              currentUser={currentUser}
              refererSection="collection_show"
              paperNote={paper.note ? paper.note : ""}
              paper={paper.paper}
              key={paper.paper_id}
            />
          );
        }
        return null;
      });
    } else {
      return (
        <div className={styles.noPaperWrapper}>
          <Icon icon="UFO" className={styles.ufoIcon} />
          <div className={styles.noPaperDescription}>No paper in this collection.</div>
        </div>
      );
    }
  };
}

export default connect(mapStateToProps)(withRouter(CollectionShow));
