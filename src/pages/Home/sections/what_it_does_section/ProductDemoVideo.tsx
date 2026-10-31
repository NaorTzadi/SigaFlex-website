import { useId, useRef, useState } from "react";

import Icon from "../../../../components/Icon/Icon";
import { EXTERNAL_LINKS, PRODUCT_NAME } from "../../../../core/Constants";
import "./productdemovideo.css";

const className = "productdemovideo";

export default function ProductDemoVideo() {
  const [activated, setActivated] = useState(false);
  const playButton = useRef<HTMLButtonElement>(null);
  const disclosureId = useId();

  return (
    <div className={className}>
      <div className={`${className}_frame`}>
        {/* SAFEGUARD PRIV-004 — see SAFEGUARDS.md */}
        {activated ? (
          <iframe
            className={`${className}_player`}
            ref={(player) => player?.focus()}
            src={`${EXTERNAL_LINKS.DEMO_VIDEO}?autoplay=1`}
            title={`${PRODUCT_NAME} demonstration video`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            className={`${className}_activate`}
            ref={playButton}
            type="button"
            aria-describedby={disclosureId}
            onClick={() => setActivated(true)}
          >
            <Icon className={`${className}_activate_icon`} name="youtube" size="3.5rem" />
            <span className={`${className}_activate_label`}>Play video on YouTube</span>
          </button>
        )}
      </div>

      {/* SAFEGUARD PRIV-006 — see SAFEGUARDS.md */}
      {activated && (
        <div className={`${className}_controls`}>
          <button
            className="fa_button"
            type="button"
            onClick={() => {
              setActivated(false);
              requestAnimationFrame(() => playButton.current?.focus());
            }}
          >
            Stop and unload video
          </button>
          <p className={`${className}_unload_note`}>
            Unloading removes the player. It does not erase data Google already received or stored.
          </p>
        </div>
      )}

      {/* SAFEGUARD PRIV-004, PRIV-005 — see SAFEGUARDS.md */}
      <p className={`${className}_note`} id={disclosureId}>
        Pressing Play loads YouTube&apos;s player (Google), sharing your IP address, browser and
        viewing information. The player may use cookies or other browser storage. Nothing is
        loaded from YouTube automatically. Read the{" "}
        <a href={EXTERNAL_LINKS.GOOGLE_PRIVACY_POLICY} target="_blank" rel="noreferrer noopener">
          Google Privacy Policy (opens in a new tab)
        </a>{" "}
        and{" "}
        <a href={EXTERNAL_LINKS.GOOGLE_COOKIES} target="_blank" rel="noreferrer noopener">
          Google cookie information (opens in a new tab)
        </a>{" "}
        before choosing to play.
      </p>
    </div>
  );
}
