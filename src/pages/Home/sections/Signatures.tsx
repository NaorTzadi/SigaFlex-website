import Icon from "../../../components/Icon/Icon";
import "./signatures.css";

const className = "signatures";

type Claim = {
  file: string;
  bytes: string;
  verdict: string;
  detail: string;
};

const CLAIMS: Claim[] = [
  {
    file: "quarterly-report.pdf",
    bytes: "50 4B 03 04",
    verdict: "ZIP",
    detail: "A Word document with the extension changed. Opens as an archive, and the archive opens."
  },
  {
    file: "holiday-photo.jpg",
    bytes: "89 50 4E 47 0D 0A 1A 0A",
    verdict: "PNG",
    detail: "Wrong extension, right file. Rendered, and its EXIF read, all the same."
  },
  {
    file: "cache.bin",
    bytes: "53 51 4C 69 74 65 20 66",
    verdict: "SQLite",
    detail: "A database nothing named. Its pages and tables are structure like any other."
  },
  {
    file: "notes.txt",
    bytes: "D0 CF 11 E0 A1 B1 1A E1",
    verdict: "OLE",
    detail: "A compound document in plain-text clothing. The storage tree opens as folders."
  },
  {
    file: "setup.exe",
    bytes: "4D 5A",
    verdict: "PE + ZIP",
    detail: "Honest about being an executable. Silent about the archive appended past its last section."
  }
];

export default function Signatures() {
  return (
    <div className={className}>
      <ul className={`${className}_list`}>
        {CLAIMS.map((claim) => (
          <li className={`${className}_row`} key={claim.file}>
            <span className={`${className}_claimed`}>
              <Icon className={`${className}_glyph`} name="file" />
              {claim.file}
            </span>

            <span className={`${className}_bytes`}>{claim.bytes}</span>

            <span className={`${className}_verdict`}>
              <Icon name="chevronRight" size="0.875em" />
              {claim.verdict}
            </span>

            <span className={`${className}_detail`}>{claim.detail}</span>
          </li>
        ))}
      </ul>

      <p className={`${className}_note`}>
        <Icon name="info" size="1em" /> Nothing here is decided by the name. The first bytes are
        read, the structure they promise is checked, and the file is opened as what it turned out
        to be.
      </p>
    </div>
  );
}
