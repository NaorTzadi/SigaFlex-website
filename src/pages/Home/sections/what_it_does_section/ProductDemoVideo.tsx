import { useState } from "react";

import Icon from "../../../../components/Icon/Icon";
import { EXTERNAL_LINKS, PRODUCT_NAME } from "../../../../core/Constants";
import "./productdemovideo.css";

const className = "productdemovideo";

export default function ProductDemoVideo() {
  const [activated, setActivated] = useState(false);

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
          <button className={`${className}_activate`} type="button" onClick={() => setActivated(true)}>
            <Icon className={`${className}_activate_icon`} name="youtube" size="3.5rem" />
            <span className={`${className}_activate_label`}>Play the demonstration video</span>
            <span className={`${className}_activate_note`}>
              Playing it loads YouTube&apos;s player, which connects your browser to YouTube (Google).
            </span>
          </button>
        )}
      </div>

      <p className={`${className}_note`}>
        Hosted on YouTube. Nothing is requested from YouTube until you press play.
      </p>
    </div>
  );
}
