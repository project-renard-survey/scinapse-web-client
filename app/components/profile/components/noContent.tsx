import * as React from "react";
import Icon from "../../../icons";
import { Link } from "react-router-dom";
const styles = require("./noContent.scss");

interface IProfileEmptyContentProps {
  type: "article" | "review";
}

function getEmptyContentTitle(props: IProfileEmptyContentProps) {
  switch (props.type) {
    case "article":
      return "You have not registered any article yet.";
    case "review":
      return "You have not reviewed yet.";
    default:
      return null;
  }
}

function getEmptyContentSubTitle(props: IProfileEmptyContentProps) {
  switch (props.type) {
    case "article":
      return "Share interesting articles for crypto-currency now.";
    case "review":
      return "Try reviewing the article you're interested in.";
    default:
      return null;
  }
}

function getSubmitArticleButton(props: IProfileEmptyContentProps) {
  switch (props.type) {
    case "article":
      return (
        <Link className={styles.submitArticleButton} to="/articles/new">
          Submit Article
        </Link>
      );
    case "review":
      return (
        <Link className={styles.submitArticleButton} to="/">
          Article Feed
        </Link>
      );
    default:
      return null;
  }
}

const ProfileEmptyContent = (props: IProfileEmptyContentProps) => {
  return (
    <div className={styles.profileEmptyContentWrapper}>
      <div className={styles.logoWrapper}>
        <Icon className={styles.headerLogo} icon="FOOTER_LOGO" />
      </div>
      <div className={styles.title}>{getEmptyContentTitle(props)}</div>
      <div className={styles.subtitle}>{getEmptyContentSubTitle(props)}</div>
      {getSubmitArticleButton(props)}
    </div>
  );
};

export default ProfileEmptyContent;