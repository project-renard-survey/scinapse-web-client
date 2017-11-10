import * as React from "react";
import { IAuthorRecord } from "../../../model/author";
import { List } from "immutable";
const styles = require("./authorList.scss");

export interface IAuthorListProps {
  authors: List<IAuthorRecord>;
  isAuthorListOpen: boolean;
  openAuthorList: () => void;
  closeAuthorList: () => void;
}

function mapAuthItem(author: IAuthorRecord) {
  return (
    <span key={`authItem_${author.id}`} className={styles.authorItem}>
      <div className={styles.contentWrapper}>
        <div>
          <div className={styles.authorName}>{author.name}</div>
          <div className={styles.authorOrganization}>{author.institution}</div>
        </div>
      </div>
    </span>
  );
}

function getAuthItems(props: IAuthorListProps) {
  if (props.isAuthorListOpen) {
    return props.authors.map(mapAuthItem);
  } else {
    return props.authors.slice(0, 3).map(mapAuthItem);
  }
}

function getAuthorListButton(props: IAuthorListProps) {
  if (props.authors.size < 3) {
    return null;
  } else if (!props.isAuthorListOpen) {
    return (
      <div className={styles.authorListButtonWrapper}>
        <div onClick={props.openAuthorList} className={styles.authorListButton}>
          + More
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.authorListButtonWrapper}>
        <div onClick={props.closeAuthorList} className={styles.authorListButton}>
          Close
        </div>
      </div>
    );
  }
}

const AuthorList = (props: IAuthorListProps) => {
  return (
    <div className={styles.authorListWrapper}>
      {getAuthItems(props)}
      {getAuthorListButton(props)}
    </div>
  );
};

export default AuthorList;
