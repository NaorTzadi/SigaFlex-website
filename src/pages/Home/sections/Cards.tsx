import { Link } from "react-router-dom";

import Icon from "../../../components/Icon/Icon";
import type { GlyphName } from "../../../components/Icon/glyphs";
import "./cards.css";

export type Card = {
  glyph: GlyphName;
  title: string;
  body: string;
  /** Present when the whole card is a way to somewhere. */
  to?: string;
};

export default function Cards({ items }: { items: Card[] }) {
  return (
    <ul className="cards">
      {items.map((card) => {
        const inside = (
          <>
            <Icon className="cards_glyph" name={card.glyph} size="1.5em" />
            <span className="cards_title">{card.title}</span>
            <span className="cards_body">{card.body}</span>
            {card.to && (
              <span className="cards_go">
                Open <Icon name="doubleArrowRight" size="0.875em" />
              </span>
            )}
          </>
        );

        return (
          <li className="cards_item" key={card.title}>
            {card.to ? (
              <Link className="cards_card cards_card-link" to={card.to}>
                {inside}
              </Link>
            ) : (
              <div className="cards_card">{inside}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
