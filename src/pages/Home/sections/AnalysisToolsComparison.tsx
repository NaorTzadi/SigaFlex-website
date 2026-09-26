import Icon from "../../../components/Icon/Icon";
import type { GlyphName } from "../../../components/Icon/glyphs";
import BrandName from "../../../components/BrandName/BrandName";
import "./analysistoolscomparison.css";

const className = "analysistoolscomparison";

type Tool = { glyph: GlyphName; name: string; gives: string; misses: string };

const TOOLS: Tool[] = [
  {
    glyph: "package",
    name: "An archive tool",
    gives: "Lists the entries",
    misses: "Cannot tell you what any of them are"
  },
  {
    glyph: "grid",
    name: "A hex editor",
    gives: "Shows every byte",
    misses: "None of them mean anything"
  },
  {
    glyph: "seal",
    name: "A signature tool",
    gives: "Names the format",
    misses: "Will not open it"
  },
  {
    glyph: "code",
    name: "A disassembler",
    gives: "Decodes the code",
    misses: "Ignores everything that is not code"
  },
  {
    glyph: "image",
    name: "An image viewer",
    gives: "Draws the picture",
    misses: "Hides the metadata behind it"
  }
];

const ANSWERS = [
  "Identity",
  "Structure",
  "Raw bytes",
  "Strings",
  "Disassembly",
  "Render",
  "Metadata",
  "Coverage"
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
            <span className={`${className}_tool_misses`}>
              <Icon name="error" size="0.75em" />
              {tool.misses}
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
