/**
 * Anything that does not match a route in Routing.tsx lands here.
 */

import { Link } from "react-router-dom";

import { ROUTES } from "../../Routing";
import "../page.css";

export default function NotFound() {
  return (
    <article className="page">
      <h1 className="page_title">Page not found</h1>
      <p className="page_lead">That address does not exist on this site.</p>
      <p>
        <Link className="fa_button" to={ROUTES.HOME}>
          Back to the home page
        </Link>
      </p>
    </article>
  );
}
