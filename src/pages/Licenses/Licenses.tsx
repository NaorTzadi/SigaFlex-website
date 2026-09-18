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

import { EXTERNAL_LINKS } from "../../core/Constants";
import "../page.css";

export default function Licenses() {
  return (
    <article className="page">
      <h1 className="page_title">Third-Party Licenses</h1>
      <p className="page_lead">
        Components distributed with the application, and the notices they carry.
      </p>

      <section className="page_block" aria-labelledby="licenses-ffmpeg">
        <h2 className="page_block_title" id="licenses-ffmpeg">
          FFmpeg
        </h2>
        <p className="page_placeholder">
          Version and build configuration, the LGPL text, FFmpeg&apos;s copyright notice, and the
          notices of the libraries inside that build go here.
        </p>
        <p>
          <a href={EXTERNAL_LINKS.FFMPEG_SOURCE} rel="noreferrer noopener" target="_blank">
            Corresponding FFmpeg source
            <span className="page_external_note"> (opens ffmpeg.org in a new tab)</span>
          </a>
        </p>
      </section>

      <section className="page_block" aria-labelledby="licenses-bundled">
        <h2 className="page_block_title" id="licenses-bundled">
          Other bundled components
        </h2>
        <p className="page_placeholder">
          UnRAR, zlib, the LZMA SDK, Zstandard, stb_image, Capstone, JavaFX and the Java libraries
          each get an attribution entry here.
        </p>
      </section>
    </article>
  );
}
