import { useState } from "react";
import { Link } from "react-router-dom";

import Icon from "../../components/Icon/Icon";
import { PRODUCT_NAME } from "../../core/Constants";
import { ROUTES } from "../../Routing";
import "../page.css";
import "./pricing.css";

const className = "pricing";

type Plan = {
  id: string;
  name: string;
  amount: string;
  period: string;
  purpose: string;
  points: string[];
  action: string;
};

export default function Pricing() {
  const [asked, setAsked] = useState("");

  const plans: Plan[] = [
    {
      id: "free",
      name: "Free",
      amount: "Free",
      period: "no account needed",
      purpose: "A limited version, planned for anyone who installs it.",
      points: [
        "Limited functionality",
        "No account and no payment",
        "The same installer as every other plan"
      ],
      action: "Get Free"
    },
    {
      id: "trial",
      name: "Free Trial",
      amount: "Free",
      period: "for a limited period",
      purpose: "Planned for trying more of the application on your own files before paying.",
      points: [
        "Expanded access for a limited period",
        "Requires a free account to activate",
        "Length and terms still to be settled"
      ],
      action: "Start free trial"
    },
    {
      id: "personal",
      name: "Personal",
      amount: "$X",
      period: "per year",
      purpose: "For your own files and your own projects.",
      points: [
        "Full functionality",
        "Personal, non-commercial use",
        "Requires an account"
      ],
      action: "Choose Personal"
    },
    {
      id: "professional",
      name: "Professional",
      amount: "$XX",
      period: "per year",
      purpose: "For the files you are paid to look at.",
      points: [
        "Everything in Personal",
        "Commercial and professional use",
        "Requires an account",
        "Support and licensing terms still to be settled"
      ],
      action: "Choose Professional"
    }
  ];

  return (
    <article className={`page ${className}`}>
      <p className="page_eyebrow fa_eyebrow">Plans</p>
      <h1 className="page_title">Pricing</h1>
      <p className="page_lead">
        {PRODUCT_NAME} is an upcoming Windows desktop application. This is the shape of the plans
        planned for its release.
      </p>

      <p className="page_note">
        <Icon name="info" size="1em" />
        Downloads, trials and paid plans are not available yet. Plans and pricing are still being
        finalized, the figures below are placeholders, and nothing on this page can be obtained or
        bought yet.
      </p>

      <ul className={`${className}_plans`}>
        {plans.map((plan) => (
          <li className={`${className}_plan`} key={plan.id}>
            <h2 className={`${className}_name`}>
              {plan.name}
              <span className="fa_tag">Not available yet</span>
            </h2>

            <p className={`${className}_price`}>
              <span className={`${className}_amount`}>{plan.amount}</span>
              <span className={`${className}_period`}>{plan.period}</span>
            </p>

            <p className={`${className}_purpose`}>{plan.purpose}</p>

            <ul className={`${className}_points`}>
              {plan.points.map((point) => (
                <li className={`${className}_point`} key={point}>
                  <Icon name="success" size="0.875em" />
                  {point}
                </li>
              ))}
            </ul>

            <p className={`${className}_answer`} role="status">
              {asked === plan.id && (
                <>
                  <Icon name="info" size="0.875em" />
                  <span>Not available yet. {PRODUCT_NAME} has not been released.</span>
                </>
              )}
            </p>

            <button
              className={`fa_button ${className}_action`}
              type="button"
              onClick={() => setAsked(plan.id)}
            >
              {plan.action}
            </button>
          </li>
        ))}
      </ul>

      <section className="page_block" aria-labelledby="pricing-today">
        <h2 className="page_block_title" id="pricing-today">
          What applies today
        </h2>
        <p>
          Nothing can be downloaded, tried or bought yet. A free account on this site can be used
          for reviews; creating one is not a purchase or a subscription.
        </p>
        <p className={`${className}_ask`}>
          Questions about a plan before they are settled? <Link to={ROUTES.CONTACT}>Write to us</Link>.
        </p>
      </section>
    </article>
  );
}
