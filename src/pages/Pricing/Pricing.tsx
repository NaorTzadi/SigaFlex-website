import { useState } from "react";
import { Link } from "react-router-dom";

import Icon from "../../components/Icon/Icon";
import { PRODUCT_NAME } from "../../core/Constants";
import { ROUTES } from "../../Routing";
import { cx } from "../../core/Utility";
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
  /** Present when the plan has somewhere real to send the reader today. */
  to?: string;
};

export default function Pricing() {
  const [asked, setAsked] = useState("");

  const plans: Plan[] = [
    {
      id: "trial",
      name: "Free Trial",
      amount: "Free",
      period: "for a limited period",
      purpose: "Try it on your own files before paying anything.",
      points: [
        "The application in full, not a cut-down build",
        "Nothing to cancel when the period ends",
        "Meant for evaluation rather than ongoing work"
      ],
      action: "Start free trial",
      to: ROUTES.DOWNLOAD
    },
    {
      id: "personal",
      name: "Personal",
      amount: "$X",
      period: "per month",
      purpose: "For your own files and your own projects.",
      points: [
        "Everything the application does today",
        "Personal, non-commercial use",
        "Billed monthly"
      ],
      action: "Choose Personal"
    },
    {
      id: "professional",
      name: "Professional",
      amount: "$XX",
      period: "per month",
      purpose: "For the files you are paid to look at.",
      points: [
        "Everything in Personal",
        "Commercial and professional use",
        "Billed monthly",
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
        {PRODUCT_NAME} is free while it is in development. This is the shape of what comes after it.
      </p>

      <p className="page_note">
        <Icon name="info" size="1em" />
        Plans and pricing are still being finalized. The figures below are placeholders, and nothing
        on this page can be bought yet.
      </p>

      <ul className={`${className}_plans`}>
        {plans.map((plan) => (
          <li className={cx(`${className}_plan`, plan.to && `${className}_plan-open`)} key={plan.id}>
            <h2 className={`${className}_name`}>
              {plan.name}
              <span className={plan.to ? "fa_tag fa_tag-accent" : "fa_tag"}>
                {plan.to ? "Open now" : "Not open yet"}
              </span>
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
                  <span>Not open yet. Nothing is charged while the plans are being settled.</span>
                </>
              )}
            </p>

            {plan.to ? (
              <Link className={`fa_button fa_button-primary ${className}_action`} to={plan.to}>
                {plan.action}
              </Link>
            ) : (
              <button
                className={`fa_button ${className}_action`}
                type="button"
                onClick={() => setAsked(plan.id)}
              >
                {plan.action}
              </button>
            )}
          </li>
        ))}
      </ul>

      <section className="page_block" aria-labelledby="pricing-today">
        <h2 className="page_block_title" id="pricing-today">
          What applies today
        </h2>
        <p>
          The Windows build is free to download and use while {PRODUCT_NAME} is in development, and
          the application never asks you to sign in. An account is for this site — reviews, and the
          plan you are on once there is one to be on.
        </p>
        <p className={`${className}_ask`}>
          Questions about a plan before they are settled? <Link to={ROUTES.CONTACT}>Write to us</Link>.
        </p>
      </section>
    </article>
  );
}
