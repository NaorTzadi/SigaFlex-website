/// <reference types="vite/client" />

/* SAFEGUARD LIC-002 — see SAFEGUARDS.md */
declare module "*?url&no-inline" {
  const url: string;
  export default url;
}
