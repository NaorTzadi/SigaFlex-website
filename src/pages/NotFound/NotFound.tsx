/**
 * Anything that does not match a route in Routing.tsx lands here.
 */

import { Link, useLocation } from "react-router-dom";

import Icon from "../../components/Icon/Icon";
import { ROUTES } from "../../Routing";
import "../page.css";
import "./notfound.css";

const className = "notfound";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <article className={`page ${className}`}>
      <Icon className={`${className}_mark`} name="inspect" size="3.5em" />

      <p className="page_eyebrow fa_eyebrow">Error 404</p>
      <h1 className="page_title">Page not found</h1>
      <p className="page_lead">
        That page does not exist on this site. The link may be wrong, or it may have moved.
      </p>

      {/* The address is echoed back: a mistyped path is usually visible the
          moment the reader sees what actually arrived. */}
      <p className={`${className}_path`}>
        <span className={`${className}_path_label`}>Asked for</span>
        <code className={`${className}_path_value`}>{pathname}</code>
      </p>

      <div className="page_actions">
        <Link className="fa_button fa_button-primary" to={ROUTES.HOME}>
          Back to the home page
        </Link>
        <Link className="fa_button" to={ROUTES.DOWNLOAD}>
          Download
        </Link>
        <Link className="fa_button" to={ROUTES.CONTACT}>
          Contact
        </Link>
      </div>
    </article>
  );
}
