import { useLocation } from "react-router-dom";

import Login from "../Login/Login";
import Register from "../Register/Register";
import { ROUTES } from "../../Routing";
import "../page.css";
import "../account.css";

const className = "account";

export default function Account() {
  const registering = useLocation().pathname === ROUTES.REGISTER;

  return (
    <article className={`page ${className}_page`}>
      <p className={`${className}_eyebrow fa_eyebrow`}>Account</p>

      {registering ? <Register /> : <Login />}
    </article>
  );
}
