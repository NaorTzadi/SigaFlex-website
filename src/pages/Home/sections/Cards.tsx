import type { MouseEvent } from "react";
import { Link } from "react-router-dom";

import Icon from "../../../components/Icon/Icon";
import type { GlyphName } from "../../../components/Icon/glyphs";
import "./cards.css";

const className = "cards";

export type Card = {
  glyph: GlyphName;
  title: string;
  body: string;
  /** Present when the whole card is a way to somewhere. */
  to?: string;
};

export default function Cards({ items }: { items: Card[] }) {
  function spotlight(event: MouseEvent<HTMLUListElement>) {
    const card = (event.target as HTMLElement).closest<HTMLElement>(`.${className}_card`);
    if (!card) return;
    const box = card.getBoundingClientRect();
    card.style.setProperty("--cards-x", `${event.clientX - box.left}px`);
    card.style.setProperty("--cards-y", `${event.clientY - box.top}px`);
  }

  return (
    <ul className={className} onMouseMove={spotlight}>
      {items.map((card) => {
        const inside = (
          <>
            <Icon className={`${className}_glyph`} name={card.glyph} size="1.5em" />
            <span className={`${className}_title`}>{card.title}</span>
            <span className={`${className}_body`}>{card.body}</span>
            {card.to && (
              <span className={`${className}_go`}>
                Open <Icon name="chevronRight" size="0.875em" />
              </span>
            )}
          </>
        );

        return (
          <li className={`${className}_item`} key={card.title}>
            {card.to ? (
              <Link className={`${className}_card ${className}_card-link`} to={card.to}>
                {inside}
              </Link>
            ) : (
              <div className={`${className}_card`}>{inside}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
