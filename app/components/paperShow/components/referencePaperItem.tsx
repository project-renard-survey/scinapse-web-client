import * as React from "react";
import { Link } from "react-router-dom";
import { stringify } from "qs";
import Icon from "../../../icons";
import { PaperRecord } from "../../../model/paper";
import { withStyles } from "../../../helpers/withStylesHelper";
import papersQueryFormatter from "../../../helpers/papersQueryFormatter";
import copySelectedTextToClipboard from "../../../helpers/copySelectedTextToClipboard";
import { trackEvent } from "../../../helpers/handleGA";
import { PaperShowPageQueryParams } from "..";

const styles = require("./referencePaperItem.scss");

const MAX_LENGTH_OF_ABSTRACT = 500;

export interface ReferenceItemProps {
  paper: PaperRecord;
}

class ReferenceItem extends React.PureComponent<ReferenceItemProps, {}> {
  public render() {
    const { paper } = this.props;
    const queryParams: PaperShowPageQueryParams = { "ref-page": 1, "cited-page": 1 };
    const stringifiedQueryParams = stringify(queryParams, { addQueryPrefix: true });
    return (
      <div className={styles.itemWrapper}>
        <Link
          to={{
            pathname: `/papers/${paper.id}`,
            search: stringifiedQueryParams,
          }}
          className={styles.title}
        >
          {paper.title}
        </Link>
        <div className={styles.journalAndDOISection}>
          {this.getJournalInformationNode()}
          {this.getDOIButton()}
        </div>
        <div className={styles.abstract}>{this.getAbstractText()}</div>
        <div className={styles.actionButtonWrapper}>
          {this.getRefButton()}
          {this.getCitedButton()}
          {this.getPDFDownloadButton()}
          {this.getViewInSourceButton()}
        </div>
      </div>
    );
  }

  private getRefButton = () => {
    const { paper } = this.props;

    if (paper.referenceCount > 0) {
      return (
        <Link
          to={{
            pathname: `/papers/${paper.id}`,
            hash: "references",
          }}
          className={styles.firstButton}
        >
          <Icon className={styles.referenceIconWrapper} icon="REFERENCE" />
          {`Ref ${paper.referenceCount}`}
        </Link>
      );
    } else {
      return null;
    }
  };

  private getCitedButton = () => {
    const { paper } = this.props;

    if (paper.citedCount > 0) {
      return (
        <Link
          to={{
            pathname: `/papers/${paper.id}`,
            hash: "cited",
          }}
          className={styles.actionButton}
        >
          <Icon className={styles.citedIconWrapper} icon="CITED" />
          {`Cited ${paper.citedCount}`}
        </Link>
      );
    } else {
      return null;
    }
  };

  private getViewInSourceButton = () => {
    const { paper } = this.props;

    const source = paper.doi ? `https://dx.doi.org/${paper.doi}` : paper.urls.getIn([0, "url"]);

    if (paper) {
      return (
        <a target="_blank" href={source} className={styles.actionButton}>
          <Icon className={styles.sourceIcon} icon="EXTERNAL_SOURCE" />
          View in source
        </a>
      );
    } else {
      return null;
    }
  };

  private getPDFDownloadButton = () => {
    const { paper } = this.props;

    const pdfSourceRecord = paper.urls.find(paperSource => {
      return paperSource.url.includes(".pdf");
    });

    if (pdfSourceRecord) {
      return (
        <a href={pdfSourceRecord.url} className={`${styles.pdfButtonWrapper} ${styles.actionButton}`} target="_blank">
          <Icon className={styles.pdfIconWrapper} icon="DOWNLOAD" />
          <span>PDF</span>
        </a>
      );
    } else {
      return null;
    }
  };

  private getAbstractText = () => {
    const { paper } = this.props;

    if (!paper.abstract) {
      return null;
    }

    const cleanAbstract = paper.abstract
      .replace(/^ /gi, "")
      .replace(/\s{2,}/g, " ")
      .replace(/#[A-Z0-9]+#/g, "");

    let finalAbstract = cleanAbstract;
    if (cleanAbstract.length > MAX_LENGTH_OF_ABSTRACT) {
      finalAbstract = cleanAbstract.slice(0, MAX_LENGTH_OF_ABSTRACT) + "...";
    }

    return finalAbstract;
  };

  private clickDOIButton = () => {
    const { paper } = this.props;

    copySelectedTextToClipboard(`https://dx.doi.org/${paper.doi}`);
    trackEvent({ category: "paper-show", action: "copy-DOI", label: paper.id.toString() });
  };

  private getDOIButton = () => {
    const { paper } = this.props;

    if (paper.doi) {
      return (
        <button onClick={this.clickDOIButton} className={styles.DOIButton}>
          <span className={styles.informationSubtitle}>DOI</span>
          <span>{` | ${paper.doi}`}</span>
        </button>
      );
    } else {
      return null;
    }
  };

  private getJournalInformationNode = () => {
    const { paper } = this.props;

    if (!paper.journal) {
      return null;
    } else {
      return (
        <div className={styles.journalInformation}>
          <span className={styles.informationSubtitle}>PUBLISHED</span>
          <span>{` | ${paper.year} in `}</span>
          <a
            className={styles.journalLink}
            href={`/search?${papersQueryFormatter.stringifyPapersQuery({
              query: paper.journal.fullTitle || paper.venue,
              page: 1,
              filter: {},
              sort: "RELEVANCE",
            })}`}
            target="_blank"
          >
            {`${paper.journal.fullTitle || paper.venue}`}
          </a>
          <span>{paper.journal.impactFactor ? ` [IF: ${paper.journal.impactFactor}]` : ""}</span>
        </div>
      );
    }
  };
}

export default withStyles<typeof ReferenceItem>(styles)(ReferenceItem);