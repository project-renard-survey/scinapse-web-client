import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { denormalize } from "normalizr";
import { withStyles } from "../../../helpers/withStylesHelper";
import { AppState } from "../../../reducers";
import { collectionSchema, Collection } from "../../../model/collection";
import { CurrentUser } from "../../../model/currentUser";
import ButtonSpinner from "../../common/spinner/buttonSpinner";
import { MyCollectionsState } from "../../../containers/paperShowCollectionControlButton/reducer";
import CollectionNoteItem from "./collectionNoteItem";
import { staleUpdatedCollectionNote } from "../../../actions/collection";
const styles = require("./collectionNoteList.scss");

export interface CollectionNoteListProps
  extends Readonly<{
      currentUser: CurrentUser;
      myCollections: MyCollectionsState;
      collections: Collection[] | null;
      dispatch: Dispatch<any>;
    }> {}

const CollectionNoteList: React.SFC<CollectionNoteListProps> = props => {
  const { dispatch } = props;
  if (props.currentUser.isLoggingIn || props.myCollections.isLoadingCollections) {
    return <ButtonSpinner className={styles.spinner} color="#6096ff" thickness={4} />;
  }

  const staleUpdatedStatus = (collection: Collection) => {
    dispatch(staleUpdatedCollectionNote(collection.id));
  };

  const memoList =
    props.collections &&
    props.collections.length > 0 &&
    props.collections.filter(collection => !!collection.note).map(collection => {
      return <CollectionNoteItem handleAnimationEnd={staleUpdatedStatus} collection={collection} key={collection.id} />;
    });

  if (!memoList || memoList.length === 0) {
    return null;
  }

  return (
    <div className={styles.collectionMemoBox}>
      <div className={styles.sideNavigationBlockHeader}>Your Notes in Collection</div>
      <ul className={styles.memoList}>{memoList}</ul>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    currentUser: state.currentUser,
    myCollections: state.myCollections,
    collections: denormalize(state.myCollections.collectionIds, [collectionSchema], state.entities),
  };
};

export default connect(mapStateToProps)(withStyles<typeof CollectionNoteList>(styles)(CollectionNoteList));
