/**
 * Third-Party Licenses.
 *
 * This route is mandatory, not optional: the application distributes FFmpeg,
 * and the LGPL obliges us to publish the licence text, the copyright notices,
 * the build configuration, and a route to the exact corresponding source.
 * It is reserved here while empty so it cannot be dropped later.
 *
 * It is also the one page that links outside our own domain. Every such link
 * is recorded in OUTSIDE_ROUTES.md and declared in Constants.EXTERNAL_LINKS.
 */

import Icon from "../../components/Icon/Icon";
import { EXTERNAL_LINKS, PRODUCT_NAME } from "../../core/Constants";
import "../page.css";

/** What travels inside the application, and what each one is there to do. */
const BUNDLED: Array<{ name: string; purpose: string }> = [
  { name: "UnRAR", purpose: "Reads RAR archives." },
  { name: "zlib", purpose: "Deflate — the compression inside ZIP, PNG and much else." },
  { name: "LZMA SDK", purpose: "7-Zip's compression, and the .7z container." },
  { name: "Zstandard", purpose: "Zstd streams, wherever they turn up." },
  { name: "stb_image", purpose: "Decodes images so their pixels can be counted." },
  { name: "Capstone", purpose: "The disassembler behind the instruction view." },
  { name: "JavaFX", purpose: "The windows, panes and controls the application is drawn with." },
  { name: "Java libraries", purpose: "Everything else the application carries on its classpath." }
];

export default function Licenses() {
  return (
    <article className="page">
      <p className="page_eyebrow fa_eyebrow">Notices</p>
      <h1 className="page_title">Third-Party Licenses</h1>
      <p className="page_lead">
        Components distributed with the application, and the notices they carry.
      </p>

      <p className="page_note">
        <Icon name="info" size="1em" />
        {PRODUCT_NAME} is not published yet, so the notices below are reserved rather than written.
        Each entry gets its version, its licence text and its copyright line when the build that
        carries it ships.
      </p>

      <section className="page_block" aria-labelledby="licenses-ffmpeg">
        <h2 className="page_block_title" id="licenses-ffmpeg">
          FFmpeg
        </h2>
        <p>
          FFmpeg converts what the application cannot read directly. It is distributed under the
          LGPL, which obliges us to publish its licence text, its copyright notices, the
          configuration the build was made with, and a route to the exact source that build came
          from.
        </p>
        <p className="page_placeholder">
          Version and build configuration, the LGPL text, FFmpeg&apos;s copyright notice, and the
          notices of the libraries inside that build go here.
        </p>
        <p>
          <a href={EXTERNAL_LINKS.FFMPEG_SOURCE} rel="noreferrer noopener" target="_blank">
            Corresponding FFmpeg source{" "}
            <Icon name="externalLink" size="0.875em" />
            <span className="page_external_note"> (opens ffmpeg.org in a new tab)</span>
          </a>
        </p>
      </section>

      <section className="page_block" aria-labelledby="licenses-bundled">
        <h2 className="page_block_title" id="licenses-bundled">
          Other bundled components
        </h2>
        <p>
          Each of these travels inside the application and carries its own terms. Where one of them
          gives you more than our terms do, it wins for that component.
        </p>

        <ul className="page_cards">
          {BUNDLED.map((component) => (
            <li className="page_card" key={component.name}>
              <p className="page_card_title">{component.name}</p>
              <p className="page_card_body">{component.purpose}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
