import * as React from "react";
import { trackAndOpenLink } from "../../helpers/handleGA";
import { withStyles } from "../../helpers/withStylesHelper";
const styles = require("./footer.scss");

interface FooterProps {
  containerStyle?: React.CSSProperties;
}

@withStyles<typeof Footer>(styles)
export default class Footer extends React.PureComponent<FooterProps, {}> {
  public render() {
    const { containerStyle } = this.props;

    const currentYear = new Date().getFullYear();

    return (
      <footer style={containerStyle} className={styles.footerContainer}>
        <div className={styles.title}>
          <div>{`© ${currentYear} Pluto Network. All rights reserved`}</div>
        </div>
        <div className={styles.rightBox}>
          <a
            href="https://www.facebook.com/PlutoNetwork/"
            target="_blank"
            onClick={() => {
              trackAndOpenLink("footerAboutUs");
            }}
            className={styles.link}
          >
            Facebook
          </a>
          <a
            href="https://twitter.com/pluto_network"
            target="_blank"
            onClick={() => {
              trackAndOpenLink("footerAboutUs");
            }}
            className={styles.link}
          >
            Twitter
          </a>
          <a
            href="https://medium.com/pluto-network"
            target="_blank"
            onClick={() => {
              trackAndOpenLink("footerAboutUs");
            }}
            className={styles.link}
          >
            Blog
          </a>
          <a
            href="https://pluto.network"
            target="_blank"
            onClick={() => {
              trackAndOpenLink("footerAboutUs");
            }}
            className={styles.link}
          >
            About us
          </a>
          <a
            href="mailto:team@pluto.network"
            target="_blank"
            onClick={() => {
              trackAndOpenLink("footerContactUs");
            }}
            className={styles.link}
          >
            Contact us
          </a>
          <a
            href="https://www.notion.so/pluto/Frequently-Asked-Questions-4b4af58220aa4e00a4dabd998206325c"
            target="_blank"
            onClick={() => {
              trackAndOpenLink("footerFAQ");
            }}
            className={styles.link}
          >
            FAQ
          </a>
          <a href="https://scinapse.io/terms-of-service" className={styles.termsOfServiceLink}>
            Terms of service
          </a>
        </div>
      </footer>
    );
  }
}
