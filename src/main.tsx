import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ASSETS } from "./core/Constants";
import "./theme.css";

document.querySelector<HTMLLinkElement>("#site-favicon")!.href = ASSETS.favicon;

/**
 * BrowserRouter is here only to put the router above the shell.
 * The routes themselves live in Routing.tsx.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
