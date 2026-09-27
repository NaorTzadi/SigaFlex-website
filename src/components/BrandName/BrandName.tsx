import { ASSETS, BRAND_NAME_PARTS, PRODUCT_NAME } from "../../core/Constants";
import "./brandname.css";

const className = "brandname";

/** When the symbol's SVG animation finishes, so the letters follow it. */
const SYMBOL_ANIMATION_SECONDS = 3.6;
const REVEAL_STEP_SECONDS = 0.08;

/**
 * Display branding only. Use PRODUCT_NAME/SITE_NAME directly in prose and metadata.
 * Animated, the symbol draws itself in place of the first letter and the rest slide in after it.
 */
export default function BrandName({ animated = false }: { animated?: boolean }) {
  const silver = animated ? BRAND_NAME_PARTS.silver.slice(1) : BRAND_NAME_PARTS.silver;
  const letters = [
    ...[...silver].map((letter) => ({ letter, tone: "silver" })),
    ...[...BRAND_NAME_PARTS.gold].map((letter) => ({ letter, tone: "gold" }))
  ];

  return (
    <span className={className} role="img" aria-label={PRODUCT_NAME}>
      {animated && <img className={`${className}_symbol`} src={ASSETS.animatedLogo} alt="" width={100} height={100} />}
      {letters.map(({ letter, tone }, index) => (
        <span
          key={index}
          className={`${className}_letter ${className}_${tone}${animated ? ` ${className}_letter-reveal` : ""}`}
          style={animated ? { animationDelay: `${SYMBOL_ANIMATION_SECONDS + index * REVEAL_STEP_SECONDS}s` } : undefined}
          aria-hidden="true"
        >
          {letter}
        </span>
      ))}
    </span>
  );
}
