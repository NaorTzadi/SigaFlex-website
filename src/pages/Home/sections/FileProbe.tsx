/**
 * The claim, performed rather than asserted.
 *
 * The hero says the product identifies a file by its content. This reads the
 * first bytes of a file the visitor drops and says what they are, on their own
 * machine, with nothing uploaded and no server involved — which is the same
 * promise the application makes, kept by the page making it.
 *
 * It stops at the identity on purpose. It never lists what is inside anything:
 * that is the application's work, and saying so at the moment the reader has
 * just watched the page be right about their own file is the strongest thing
 * this band can do.
 *
 * Drag and drop is not reachable from a keyboard, so the same file picker sits
 * behind a real label and input.
 */

import { useId, useState } from "react";
import type { DragEvent } from "react";

import Icon from "../../../components/Icon/Icon";
import { cx } from "../../../core/Utility";
import { PROBE_LENGTH, identify } from "./formatCatalog";
import type { FormatEntry } from "./formatCatalog";
import "./fileprobe.css";

const className = "fileprobe";

type Result = {
  fileName: string;
  /** The opening bytes, as the Raw tab would set them. */
  hex: string;
  format?: FormatEntry;
  /** True when the name promised one thing and the bytes said another. */
  misnamed: boolean;
};

/** The sample shown before anything is dropped: a PE, as the tab would read it. */
const SAMPLE = "4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF";

function hexOf(bytes: Uint8Array, count: number): string {
  return Array.from(bytes.slice(0, count), (byte) => byte.toString(16).padStart(2, "0"))
    .join(" ")
    .toUpperCase();
}

function extensionOf(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  return dot > 0 ? fileName.slice(dot).toLowerCase() : "";
}

export default function FileProbe() {
  const [result, setResult] = useState<Result | null>(null);
  const [over, setOver] = useState(false);
  const inputId = useId();

  async function probe(file: File) {
    /* Only the opening bytes are ever read: enough for every signature the page
       knows, including the one that sits 32KB into an ISO. */
    const head = new Uint8Array(await file.slice(0, PROBE_LENGTH).arrayBuffer());
    const format = identify(head);
    const claimed = extensionOf(file.name);

    setResult({
      fileName: file.name,
      hex: hexOf(head, 12),
      format,
      misnamed: Boolean(format && claimed && !format.extensions.includes(claimed))
    });
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setOver(false);
    const file = event.dataTransfer.files[0];
    if (file) void probe(file);
  }

  return (
    <div
      className={cx(className, over && "fileprobe-over")}
      onDragOver={(event) => {
        event.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
    >
      <div className={`${className}_strip`}>
        <span className={cx(`${className}_bytes`, result && `${className}_bytes-read`)}>
          {result ? result.hex : SAMPLE}
        </span>
        <span className={`${className}_arrow`} aria-hidden="true">
          →
        </span>
        <span className={`${className}_verdict`}>
          {result ? (result.format ? result.format.tag : "no signature") : "PE32 executable"}
        </span>
      </div>

      <p className={`${className}_prompt`}>
        <label className={`${className}_pick`} htmlFor={inputId}>
          Drop a file here, or choose one
        </label>
        <input
          className={`${className}_input`}
          id={inputId}
          type="file"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void probe(file);
          }}
        />
        <span className={`${className}_privacy`}>
          <Icon name="info" size="0.875em" /> Read in this tab. Nothing is uploaded.
        </span>
      </p>

      <p className={`${className}_answer`} role="status" aria-live="polite">
        {result && result.format && (
          <>
            <strong className={`${className}_answer_name`}>{result.format.name}</strong>{" "}
            {result.misnamed
              ? `— and it is named ${result.fileName}, which it is not.`
              : `— which is what ${result.fileName} claims to be.`}{" "}
            <span className={`${className}_limit`}>
              That is the first stage, and where this page stops. Listing what is inside it is the
              application's work.
            </span>
          </>
        )}

        {result && !result.format && (
          <>
            <strong className={`${className}_answer_name`}>No signature matched.</strong>{" "}
            <span className={`${className}_limit`}>
              Not a dead end: around forty of the formats the engine knows have no signature at all
              and are confirmed by parsing them. This page only reads the opening bytes.
            </span>
          </>
        )}
      </p>
    </div>
  );
}
