import { useEffect, useRef, useState } from "react";

import { EXTERNAL_LINKS } from "../../../core/Constants";
import "./demo.css";

const className = "demo";

export default function Demo() {
  const [near, setNear] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (near) return;

    const frame = frameRef.current;
    if (!frame || !("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [near]);

  return (
    <div className={className}>
      <div className={`${className}_frame`} ref={frameRef}>
        {near && (
          <iframe
            className={`${className}_player`}
            src={EXTERNAL_LINKS.DEMO_VIDEO}
            title="File Analyzer demonstration video"
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>

      <p className={`${className}_note`}>Hosted on YouTube; the player loads from youtube-nocookie.com.</p>
    </div>
  );
}
