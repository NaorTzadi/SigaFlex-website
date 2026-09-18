/**
 * Download and system requirements. Reached from the hero and the footer.
 */

import "../page.css";

export default function Download() {
  return (
    <article className="page">
      <h1 className="page_title">Download</h1>
      <p className="page_lead">Windows desktop. No account, no cloud.</p>

      <section className="page_block" aria-labelledby="download-build">
        <h2 className="page_block_title" id="download-build">
          Current build
        </h2>
        <p className="page_placeholder">Installer, version and checksum go here.</p>
      </section>

      <section className="page_block" aria-labelledby="download-requirements">
        <h2 className="page_block_title" id="download-requirements">
          System requirements
        </h2>
        <p className="page_placeholder">Requirements go here.</p>
      </section>
    </article>
  );
}
