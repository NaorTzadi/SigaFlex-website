import { version as reactVersion } from "react/package.json";
import { version as reactDomVersion } from "react-dom/package.json";
import { version as schedulerVersion } from "scheduler/package.json";
import { version as routerVersion } from "react-router/package.json";
import { version as routerDomVersion } from "react-router-dom/package.json";

import TableOfContents from "../../components/TableOfContents/TableOfContents";
import reactLicense from "../../../node_modules/react/LICENSE?raw";
import reactLicenseUrl from "../../../node_modules/react/LICENSE?url&no-inline";
import routerLicense from "../../../node_modules/react-router/LICENSE.md?raw";
import routerLicenseUrl from "../../../node_modules/react-router/LICENSE.md?url&no-inline";
import plexLicense from "../../assets/fonts/IBM-Plex-LICENSE.txt?raw";
import plexLicenseUrl from "../../assets/fonts/IBM-Plex-LICENSE.txt?url&no-inline";
import audiowideLicense from "../../assets/fonts/Audiowide-OFL.txt?raw";
import audiowideLicenseUrl from "../../assets/fonts/Audiowide-OFL.txt?url&no-inline";
import iconsLicense from "../../assets/icons/LobeHub-1.95.1-LICENSE.txt?raw";
import iconsLicenseUrl from "../../assets/icons/LobeHub-1.95.1-LICENSE.txt?url&no-inline";
import "../page.css";
import "./licenses.css";

const className = "licenses";

type LicenseNotice = {
  id: string;
  name: string;
  version: string;
  license: string;
  text: string;
  url: string;
  filename: string;
};

/* SAFEGUARD LIC-002 — see SAFEGUARDS.md */
const SECTIONS: Array<{ id: string; title: string; notices: LicenseNotice[] }> = [
  {
    id: "licenses-javascript",
    title: "JavaScript libraries",
    notices: [
      {
        id: "licenses-react",
        name: "React, React DOM and Scheduler",
        version: `React ${reactVersion} · React DOM ${reactDomVersion} · Scheduler ${schedulerVersion}`,
        license: "MIT",
        text: reactLicense,
        url: reactLicenseUrl,
        filename: "React-LICENSE.txt"
      },
      {
        id: "licenses-router",
        name: "React Router and React Router DOM",
        version: `React Router ${routerVersion} · React Router DOM ${routerDomVersion}`,
        license: "MIT",
        text: routerLicense,
        url: routerLicenseUrl,
        filename: "React-Router-LICENSE.txt"
      }
    ]
  },
  {
    id: "licenses-fonts",
    title: "Fonts",
    notices: [
      {
        id: "licenses-plex",
        name: "IBM Plex Sans and IBM Plex Mono",
        version: "",
        license: "SIL Open Font License 1.1",
        text: plexLicense,
        url: plexLicenseUrl,
        filename: "IBM-Plex-LICENSE.txt"
      },
      {
        id: "licenses-audiowide",
        name: "Audiowide",
        version: "Version 1.003",
        license: "SIL Open Font License 1.1",
        text: audiowideLicense,
        url: audiowideLicenseUrl,
        filename: "Audiowide-OFL.txt"
      }
    ]
  },
  {
    id: "licenses-icons",
    title: "Icons",
    notices: [
      {
        id: "licenses-lobehub",
        name: "LobeHub Icons",
        version: "Version 1.95.1 · Claude, Codex and Gemini icons",
        license: "MIT",
        text: iconsLicense,
        url: iconsLicenseUrl,
        filename: "LobeHub-LICENSE.txt"
      }
    ]
  }
];

export default function Licenses() {
  return (
    <article className={className}>
      <div className="page">
        <p className="page_eyebrow fa_eyebrow">Notices</p>
        <h1 className="page_title">Third-Party Licenses</h1>
        <p className="page_lead">
          The libraries, fonts and icons used by this website, with their copyright notices and
          license terms.
        </p>

        <div className="page_layout">
          <TableOfContents label="Sections of the licenses page" entries={SECTIONS} />

          <div className="page_prose">
            {SECTIONS.map((section) => (
              <section
                className="page_block"
                id={section.id}
                key={section.id}
                aria-labelledby={`${section.id}-heading`}
              >
                <h2 className="page_block_title" id={`${section.id}-heading`}>
                  {section.title}
                </h2>

                <div className={`${className}_notices`}>
                  {section.notices.map((notice) => (
                    <article
                      className={`page_card ${className}_notice`}
                      key={notice.id}
                      aria-labelledby={notice.id}
                    >
                      <header>
                        <h3 className={`${className}_notice_title`} id={notice.id}>
                          {notice.name}
                        </h3>
                        {notice.version && <p className={`${className}_meta`}>{notice.version}</p>}
                        <p className={`${className}_meta`}>{notice.license}</p>
                      </header>

                      {/* SAFEGUARD LIC-002 — see SAFEGUARDS.md */}
                      <details className={`${className}_details`}>
                        <summary className={`${className}_summary`} aria-describedby={notice.id}>
                          Read the full license
                        </summary>
                        <pre className={`${className}_text`}>{notice.text}</pre>
                      </details>

                      <a
                        className={`${className}_download`}
                        href={notice.url}
                        download={notice.filename}
                        aria-label={`Download the license text for ${notice.name}`}
                      >
                        Download license text
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
