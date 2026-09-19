/**
 * Mutable state that more than one class needs, outside React's tree.
 * Components read it with useGlobal so a write here re-renders them.
 */

import { useSyncExternalStore } from "react";

export type Globals = {
  /** Set once consent has been answered, so the banner does not reappear. */
  cookieConsentAnswered: boolean;
  /** True while a ServerBridge call is outstanding. */
  serverBusy: boolean;
  /** Whether a session is currently held. ServerBridge owns this. */
  signedIn: boolean;
  /** The signed-in address, for the header. Empty when signed out. */
  accountEmail: string;
  sessionChecked: boolean;
};

const globals: Globals = {
  cookieConsentAnswered: false,
  serverBusy: false,
  signedIn: false,
  accountEmail: "",
  sessionChecked: false
};

const listeners = new Set<() => void>();

export function getGlobals(): Readonly<Globals> {
  return globals;
}

export function setGlobal<K extends keyof Globals>(key: K, value: Globals[K]): void {
  if (globals[key] === value) return;
  globals[key] = value;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Read one global inside a component and re-render when it changes. */
export function useGlobal<K extends keyof Globals>(key: K): Globals[K] {
  return useSyncExternalStore(
    subscribe,
    () => globals[key],
    () => globals[key]
  );
}
