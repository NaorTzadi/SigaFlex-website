import { useLocation } from "react-router-dom";

import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { ROUTES } from "../../Routing";
import "../page.css";
import "../account.css";

export default function AuthenticationPage() {
  const registering = useLocation().pathname === ROUTES.REGISTER;

  return (
    <article className="page account_page">
      <p className="account_eyebrow fa_eyebrow">Account</p>

      {registering ? <RegistrationForm /> : <LoginForm />}
    </article>
  );
}
