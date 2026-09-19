import { Link, useLocation } from "react-router-dom";

import Login from "../Login/Login";
import Register from "../Register/Register";
import { ROUTES } from "../../Routing";
import { cx } from "../../core/Utility";
import "../page.css";
import "../account.css";

const className = "account";

export default function Account() {
  const registering = useLocation().pathname === ROUTES.REGISTER;

  return (
    <article className={`page ${className}_page`}>
      <p className={`${className}_eyebrow fa_eyebrow`}>Account</p>

      <nav className={`${className}_tabs`} aria-label="Account">
        <Link
          className={cx(`${className}_tab`, !registering && `${className}_tab-current`)}
          to={ROUTES.LOGIN}
          replace
          aria-current={registering ? undefined : "page"}
        >
          Sign in
        </Link>
        <Link
          className={cx(`${className}_tab`, registering && `${className}_tab-current`)}
          to={ROUTES.REGISTER}
          replace
          aria-current={registering ? "page" : undefined}
        >
          Register
        </Link>
      </nav>

      {registering ? <Register /> : <Login />}
    </article>
  );
}
