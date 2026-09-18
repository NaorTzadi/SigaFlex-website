import Icon from "../../../components/Icon/Icon";
import type { GlyphName } from "../../../components/Icon/glyphs";
import { PRODUCT_NAME } from "../../../core/Constants";
import "./problem.css";

type Tool = { glyph: GlyphName; name: string; gives: string; misses: string };

const TOOLS: Tool[] = [
  {
    glyph: "package",
    name: "An archive tool",
    gives: "Lists the entries",
    misses: "Cannot tell you what any of them are"
  },
  {
    glyph: "table",
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
    glyph: "chip",
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

export default function Problem() {
  return (
    <div className="problem">
      <ul className="problem_tools">
        {TOOLS.map((tool) => (
          <li className="problem_tool" key={tool.name}>
            <Icon className="problem_tool_glyph" name={tool.glyph} size="1.25em" />
            <span className="problem_tool_name">{tool.name}</span>
            <span className="problem_tool_gives">{tool.gives}</span>
            <span className="problem_tool_misses">
              <Icon name="close" size="0.75em" />
              {tool.misses}
            </span>
          </li>
        ))}
      </ul>

      <div className="problem_answer">
        <p className="problem_answer_head">
          <Icon className="problem_answer_glyph" name="inspect" size="1.25em" />
          {PRODUCT_NAME}
        </p>

        <ul className="problem_answer_list">
          {ANSWERS.map((answer) => (
            <li className="problem_answer_item" key={answer}>
              <Icon name="success" size="0.875em" />
              {answer}
            </li>
          ))}
        </ul>

        <p className="problem_answer_note">
          One window, one file, every answer at once — and the file is never written back to.
        </p>
      </div>
    </div>
  );
}
