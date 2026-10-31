/**
 * The tree, on the page.
 *
 * "Recursive containment" is a phrase. Expanding an executable into an appended
 * ZIP, that ZIP into a JAR, and that JAR into class files — four formats deep,
 * in one view, without a single temporary file — is the argument.
 *
 * It is a real ARIA tree rather than a list of divs, which means it behaves the
 * way the application's own tree does and the way any file browser does: arrows
 * walk and expand, Home and End jump to the ends, and one row at a time is in
 * the tab order so the whole tree is a single tab stop.
 *
 * Icons are the application's own glyphs.
 */

import { useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import Icon from "../../../../components/Icon/Icon";
import type { GlyphName } from "../../../../components/Icon/glyphs";
import { cx } from "../../../../core/Utility";
import "./containmenttree.css";

const className = "containmenttree";

type Node = {
  id: string;
  name: string;
  /** A container is a file that opens into more files. */
  kind: "folder" | "file" | "container";
  glyph: GlyphName;
  format?: string;
  type: string;
  size: string;
  compressed?: string;
  children?: Node[];
};

/**
 * Sample tree. Four formats deep on purpose: PE → ZIP → JAR → class. Every
 * level here is something the engine opens without writing to disk.
 */
const TREE: Node[] = [
  {
    id: "root",
    name: "installer.exe",
    kind: "container",
    glyph: "package",
    format: "PE",
    type: "PE32 executable",
    size: "4.1 MB",
    children: [
      {
        id: "structure",
        name: "Structure",
        kind: "folder",
        glyph: "layers",
        type: "Static structure",
        size: "—",
        children: [
          { id: "dos", name: "DOS header", kind: "file", glyph: "table", type: "Header", size: "128 B" },
          { id: "coff", name: "COFF header", kind: "file", glyph: "table", type: "Header", size: "384 B" },
          { id: "sections", name: "Section table", kind: "file", glyph: "table", type: "Table", size: "280 B" }
        ]
      },
      {
        id: "rsrc",
        name: ".rsrc",
        kind: "folder",
        glyph: "folder",
        type: "Resource tree",
        size: "176 KB",
        children: [
          { id: "icon", name: "MAINICON", kind: "file", glyph: "image", type: "Icon group", size: "67 KB" },
          { id: "manifest", name: "Manifest", kind: "file", glyph: "code", type: "XML", size: "1.1 KB" },
          { id: "version", name: "Version info", kind: "file", glyph: "tag", type: "Version", size: "892 B" }
        ]
      },
      {
        id: "appended",
        name: "setup.zip",
        kind: "container",
        glyph: "package",
        format: "ZIP",
        type: "Appended ZIP archive",
        size: "3.1 MB",
        compressed: "3.1 MB",
        children: [
          {
            id: "jar",
            name: "app.jar",
            kind: "container",
            glyph: "package",
            format: "JAR",
            type: "Java archive",
            size: "842 KB",
            compressed: "781 KB",
            children: [
              { id: "mf", name: "META-INF/MANIFEST.MF", kind: "file", glyph: "code", type: "Manifest", size: "1.4 KB", compressed: "712 B" },
              { id: "main", name: "com/example/Main.class", kind: "file", glyph: "code", type: "Java class", size: "4.2 KB", compressed: "2.1 KB" },
              { id: "res", name: "resources/strings.properties", kind: "file", glyph: "file", type: "Properties", size: "8.8 KB", compressed: "2.9 KB" }
            ]
          },
          { id: "cfg", name: "config.xml", kind: "file", glyph: "code", type: "XML", size: "3.2 KB", compressed: "1.1 KB" },
          { id: "logo", name: "logo.png", kind: "container", glyph: "image", format: "PNG", type: "PNG image", size: "44 KB", compressed: "44 KB",
            children: [
              { id: "ihdr", name: "IHDR", kind: "file", glyph: "table", type: "Chunk", size: "13 B" },
              { id: "exif", name: "eXIf", kind: "file", glyph: "tag", type: "EXIF metadata", size: "1.8 KB" }
            ]
          }
        ]
      }
    ]
  }
];

type Row = { node: Node; level: number; posInSet: number; setSize: number };

/** The tree as it is currently shown: only what is open, in visual order. */
function flatten(nodes: Node[], open: Set<string>, level = 1): Row[] {
  return nodes.flatMap((node, index) => {
    const row: Row = { node, level, posInSet: index + 1, setSize: nodes.length };
    const children = node.children && open.has(node.id) ? flatten(node.children, open, level + 1) : [];
    return [row, ...children];
  });
}

export default function ContainmentTree() {
  /* Opens part-way down the nesting, so the recursion is visible at a glance
     rather than waiting behind three clicks. */
  const [open, setOpen] = useState(new Set(["root", "appended"]));
  const [active, setActive] = useState("root");
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const rows = useMemo(() => flatten(TREE, open), [open]);

  function toggle(id: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function focusRow(id: string) {
    setActive(id);
    rowRefs.current[id]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>, row: Row) {
    const index = rows.findIndex((r) => r.node.id === row.node.id);
    const expandable = Boolean(row.node.children);
    const isOpen = open.has(row.node.id);

    switch (event.key) {
      case "ArrowDown":
        if (index < rows.length - 1) focusRow(rows[index + 1].node.id);
        break;
      case "ArrowUp":
        if (index > 0) focusRow(rows[index - 1].node.id);
        break;
      case "ArrowRight":
        if (expandable && !isOpen) toggle(row.node.id);
        else if (expandable && index < rows.length - 1) focusRow(rows[index + 1].node.id);
        break;
      case "ArrowLeft":
        if (expandable && isOpen) toggle(row.node.id);
        else {
          /* Out to the parent, which is the nearest row above at a lower level. */
          const parent = rows.slice(0, index).reverse().find((r) => r.level < row.level);
          if (parent) focusRow(parent.node.id);
        }
        break;
      case "Home":
        focusRow(rows[0].node.id);
        break;
      case "End":
        focusRow(rows[rows.length - 1].node.id);
        break;
      case "Enter":
      case " ":
        if (expandable) toggle(row.node.id);
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  return (
    <div className={className}>
      <div className={`${className}_columns`} aria-hidden="true">
        <span>Name</span>
        <span>Type</span>
        <span>Uncompressed</span>
        <span>Compressed</span>
      </div>

      <div className={`${className}_tree`} role="tree" aria-label="installer.exe, expanded">
        {rows.map((row) => {
          const { node, level } = row;
          const expandable = Boolean(node.children);
          const isOpen = open.has(node.id);

          return (
            <div
              className={cx(
                `${className}_row`,
                `${className}_row-${node.kind}`,
                node.id === active && `${className}_row-active`
              )}
              key={node.id}
              ref={(element) => {
                rowRefs.current[node.id] = element;
              }}
              role="treeitem"
              aria-level={level}
              aria-posinset={row.posInSet}
              aria-setsize={row.setSize}
              aria-expanded={expandable ? isOpen : undefined}
              tabIndex={node.id === active ? 0 : -1}
              onClick={() => {
                setActive(node.id);
                if (expandable) toggle(node.id);
              }}
              onKeyDown={(event) => onKeyDown(event, row)}
            >
              <span
                className={`${className}_name`}
                /* Indent is presentation; aria-level carries the depth. */
                style={{ paddingLeft: `calc(${level - 1} * var(--fa-space-6))` }}
              >
                <span className={cx(`${className}_twisty`, isOpen && `${className}_twisty-open`)}>
                  {expandable ? <Icon name="chevronDown" size="0.75em" /> : null}
                </span>
                <Icon name={node.glyph} />
                <span className={`${className}_label`} title={node.name}>
                  {node.name}
                </span>
                {node.format && <span className={`${className}_badge`}>{node.format}</span>}
              </span>

              <span className={`${className}_cell`} title={node.type}>
                {node.type}
              </span>
              <span className={`${className}_cell ${className}_num`}>{node.size}</span>
              <span className={`${className}_cell ${className}_num`}>{node.compressed ?? "—"}</span>
            </div>
          );
        })}
      </div>

      {/* SAFEGUARD CLAIM-001 — see SAFEGUARDS.md */}
      <p className={`${className}_note`}>
        Four formats deep — <span className={`${className}_mono`}>PE → ZIP → JAR → class</span> — in
        one tree, without extracting anything yourself. Expanding a container lists what is inside
        it; a member is written to the application&apos;s temporary folder only when you inspect,
        preview, copy, drag out or convert it.
      </p>
    </div>
  );
}
