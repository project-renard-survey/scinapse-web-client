import * as React from "react";
import { withStyles } from "../../../helpers/withStylesHelper";
import { Fos } from "../../../model/fos";
import papersQueryFormatter from "../../../helpers/papersQueryFormatter";
import { trackEvent } from "../../../helpers/handleGA";
const styles = require("./keyword.scss");

interface PaperShowKeywordProps {
  fos: Fos;
}

const PaperShowKeyword = (props: PaperShowKeywordProps) => {
  return (
    <a
      href={`/search?${papersQueryFormatter.stringifyPapersQuery({
        query: props.fos.fos || "",
        sort: "RELEVANCE",
        page: 1,
        filter: {},
      })}`}
      onClick={() => {
        trackEvent({ category: "paper-show", action: "click-keyword", label: props.fos.fos || "" });
      }}
      className={styles.buttonWrapper}
    >
      {props.fos.fos}
    </a>
  );
};

export default withStyles<typeof PaperShowKeyword>(styles)(PaperShowKeyword);
