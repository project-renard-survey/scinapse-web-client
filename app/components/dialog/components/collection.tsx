import * as React from "react";
import Popover from "@material-ui/core/Popover/Popover";
import * as classNames from "classnames";
import MemberAPI from "../../../api/member";
import CollectionAPI from "../../../api/collection";
import Icon from "../../../icons";
import { withStyles } from "../../../helpers/withStylesHelper";
import alertToast from "../../../helpers/makePlutoToastAction";
import { CurrentUser } from "../../../model/currentUser";
import { Collection } from "../../../model/collection";
const styles = require("./collection.scss");

interface CollectionModalProps {
  currentUser: CurrentUser;
  handleCloseDialogRequest: () => void;
}

interface SelectableCollection extends Collection {
  selected?: boolean;
}

interface CollectionModalStates {
  collections: SelectableCollection[];
  isNewCollectionMenuOpen: boolean;
  collectionName: string;
  description: string;
}

@withStyles<typeof CollectionModal>(styles)
class CollectionModal extends React.PureComponent<
  CollectionModalProps,
  CollectionModalStates
> {
  private newCollectionAnchor: HTMLDivElement | null;

  public constructor(props: CollectionModalProps) {
    super(props);

    this.state = {
      collections: [],
      isNewCollectionMenuOpen: false,
      collectionName: "",
      description: ""
    };
  }

  public async componentDidMount() {
    const { currentUser } = this.props;

    const collectionsWithPaginationInformation = await MemberAPI.getCollections(
      currentUser.id
    );

    this.setState({
      collections: collectionsWithPaginationInformation.content
    });
  }

  public render() {
    const { handleCloseDialogRequest } = this.props;
    const { isNewCollectionMenuOpen, collectionName, description } = this.state;

    return (
      <div className={styles.modalWrapper}>
        <div onClick={handleCloseDialogRequest} className={styles.closeButton}>
          <Icon className={styles.closeIcon} icon="X_BUTTON" />
        </div>
        <div className={styles.modalHeader}>
          Add this paper to the collections
        </div>
        <div className={styles.contentBox}>
          <ul className={styles.collectionListWrapper}>
            {this.getCollectionItems()}
          </ul>
        </div>

        <div className={styles.modalFooter}>
          <div
            ref={el => (this.newCollectionAnchor = el)}
            className={styles.newCollectionButtonWrapper}
            onClick={this.handleRequestOpenNewCollectionMenu}
          >
            <Icon className={styles.plusIcon} icon="SMALL_PLUS" />
            <button>Create new collection</button>
          </div>
          <Popover
            open={isNewCollectionMenuOpen}
            anchorEl={this.newCollectionAnchor!}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            onClose={this.handleRequestCloseNewCollectionMenu}
          >
            <form
              onSubmit={this.submitNewCollection}
              className={styles.newCollectionForm}
            >
              <div className={styles.formControl}>
                <label>Name</label>
                <input
                  onChange={this.handleChangeCollectionName}
                  type="text"
                  value={collectionName}
                />
              </div>

              <div className={styles.formControl}>
                <label>Description (optional)</label>
                <textarea
                  onChange={this.handleChangeCollectionDescription}
                  value={description}
                />
              </div>

              <div className={styles.submitBtnWrapper}>
                <button type="submit">Create</button>
              </div>
            </form>
          </Popover>

          <div className={styles.rightBox}>
            <button className={styles.cancelButton}>Cancel</button>
            <button className={styles.nextButton}>Next</button>
          </div>
        </div>
      </div>
    );
  }

  private getCollectionItems = () => {
    const { collections } = this.state;

    return collections.map(collection => (
      <li
        className={classNames({
          [`${styles.collectionItem}`]: true,
          [`${styles.selected}`]: collection.selected
        })}
        key={`collection_modal_${collection.id}`}
        onClick={() => {
          this.handleSelectCollectionItem(collection);
        }}
      >
        <div className={styles.collectionTitle}>{collection.title}</div>
        <div className={styles.paperCount}># papers</div>
      </li>
    ));
  };

  private handleSelectCollectionItem = (collection: SelectableCollection) => {
    const { collections } = this.state;
    const i = collections.indexOf(collection);
    if (i > -1) {
      const newCollection: SelectableCollection = {
        ...collection,
        selected: !collection.selected
      };

      this.setState({
        collections: [
          ...collections.slice(0, i),
          newCollection,
          ...collections.slice(i + 1)
        ]
      });
    }
  };

  private handleChangeCollectionName = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    this.setState({
      collectionName: e.currentTarget.value
    });
  };

  private handleChangeCollectionDescription = (
    e: React.FormEvent<HTMLTextAreaElement>
  ) => {
    this.setState({
      description: e.currentTarget.value
    });
  };

  private submitNewCollection = async (e: React.FormEvent<HTMLFormElement>) => {
    const { collectionName, description } = this.state;
    e.preventDefault();

    try {
      await CollectionAPI.postCollection({
        title: collectionName,
        description
      });

      this.setState({
        collectionName: "",
        description: ""
      });
      this.handleRequestCloseNewCollectionMenu();
    } catch (err) {
      alertToast(err);
    }
  };

  private handleRequestOpenNewCollectionMenu = () => {
    this.setState({
      isNewCollectionMenuOpen: true
    });
  };

  private handleRequestCloseNewCollectionMenu = () => {
    this.setState({
      isNewCollectionMenuOpen: false
    });
  };
}
export default CollectionModal;