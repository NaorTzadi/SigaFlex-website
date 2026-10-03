import { useEffect, useRef } from "react";
import Icon from "../Icon/Icon";
import Terms from "../../pages/Policies/Terms";
import Privacy from "../../pages/Policies/Privacy";
import "./policydialog.css";

export type PolicyKind = "terms" | "privacy";

export default function PolicyDialog({ policy, onClose }: {
  policy: PolicyKind;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const pointerStartedOutside = useRef(false);

  function isOutside(clientX: number, clientY: number) {
    const bounds = ref.current!.getBoundingClientRect();
    return clientX < bounds.left || clientX > bounds.right ||
      clientY < bounds.top || clientY > bounds.bottom;
  }

  useEffect(() => {
    const dialog = ref.current!;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="policydialog"
      aria-label={policy === "terms" ? "Terms" : "Privacy policy"}
      onClose={() => { if (!ref.current?.open) onClose(); }}
      onPointerDown={(event) => {
        pointerStartedOutside.current = event.button === 0 && isOutside(event.clientX, event.clientY);
      }}
      onPointerCancel={() => { pointerStartedOutside.current = false; }}
      onClick={(event) => {
        if (pointerStartedOutside.current && isOutside(event.clientX, event.clientY)) {
          ref.current?.close();
        }
        pointerStartedOutside.current = false;
      }}
    >
      <button type="button" className="policydialog_close" aria-label="Close policy" title="Close" autoFocus onClick={() => ref.current?.close()}>
        <Icon name="close" size="1.25rem" />
      </button>
      <div className="policydialog_content" onClickCapture={(event) => {
        // Keep registration details when following a reference in the policy.
        const link = (event.target as HTMLElement).closest("a");
        if (link && !link.getAttribute("href")?.startsWith("#")) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
      }}>
        {policy === "terms" ? <Terms /> : <Privacy />}
      </div>
    </dialog>
  );
}
