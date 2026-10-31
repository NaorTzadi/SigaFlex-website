import Icon from "../../../../components/Icon/Icon";
import type { GlyphName } from "../../../../components/Icon/glyphs";
import BrandName from "../../../../components/BrandName/BrandName";
import "./analysistoolscomparison.css";

const className = "analysistoolscomparison";

type Tool = { glyph: GlyphName; name: string; gives: string; detail: string };

const TOOLS: Tool[] = [
  {
    glyph: "package",
    name: "Structural exploration",
    gives: "Explore the root file as a tree of files, folders, segments and more.",
    detail: "Follow nested content and inspect the parts that make up the file."
  },
  {
    glyph: "grid",
    name: "Byte inspection",
    gives: "Inspect raw bytes, hexadecimal values, readable strings and patterns.",
    detail: "Read-only views let you examine the data without editing the file."
  },
  {
    glyph: "fileDetails",
    name: "Format-specific details",
    gives: "Identify the format and extract metadata and extended details.",
    detail: "Inspect information specific to the file format, beyond its signature."
  },
  {
    glyph: "code",
    name: "Disassembly",
    gives: "Examine machine instructions alongside the file's other contents.",
    detail: "Move between code, bytes and structural details in the same window."
  },
  {
    glyph: "image",
    name: "File viewing",
    gives: "View images, videos, audio, 3D files, documents and more.",
    detail: "Preview supported content alongside its metadata and structure."
  }
];

const ANSWERS = [
  "Identity",
  "Structural tree",
  "Byte inspection",
  "Strings",
  "Disassembly",
  "File viewing",
  "Metadata",
  "Format details",
  "Unaccounted regions"
];

export default function AnalysisToolsComparison() {
  return (
    <div className={className}>
      <ul className={`${className}_tools`}>
        {TOOLS.map((tool) => (
          <li className={`${className}_tool`} key={tool.name}>
            <Icon className={`${className}_tool_glyph`} name={tool.glyph} size="1.25em" />
            <span className={`${className}_tool_name`}>{tool.name}</span>
            <span className={`${className}_tool_gives`}>{tool.gives}</span>
            <span className={`${className}_tool_detail`}>
              {tool.detail}
            </span>
          </li>
        ))}
      </ul>

      <div className={`${className}_answer`}>
        <p className={`${className}_answer_head`}>
          <Icon className={`${className}_answer_glyph`} name="inspect" size="1.25em" />
          <BrandName />
        </p>

        <ul className={`${className}_answer_list`}>
          {ANSWERS.map((answer) => (
            <li className={`${className}_answer_item`} key={answer}>
              <Icon name="success" size="0.875em" />
              {answer}
            </li>
          ))}
        </ul>

        <p className={`${className}_answer_note`}>
          One window, one file, every answer at once — and the file is never written back to.
        </p>
      </div>
    </div>
  );
}
