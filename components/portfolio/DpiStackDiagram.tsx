import { projects } from "@/data/projects";
import { stackLabels, stackLayers, stackTitle } from "@/data/stack";

/*
 * Static diagram of Pakistan's digital public infrastructure stack, with
 * current projects pinned to the layer each one addresses.
 *
 * Content comes from data/stack.ts (layers) and the `layer` field in
 * data/projects.ts (pins). Two drawings are rendered and CSS shows one:
 * a wide table like drawing for desktop and a tall one for phones, so text
 * never drops below 13px. Colours and fonts are set in styles/globals.css
 * under "DPI stack diagram".
 */

/** Break a string into lines of at most `max` characters, on spaces. */
function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (line && (line + " " + word).length > max) {
      lines.push(line);
      line = word;
    } else {
      line = line ? line + " " + word : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** A drawn line. `cont` marks the second and later lines of one item. */
interface Line {
  text: string;
  cont: boolean;
}

function wrapAll(items: readonly string[], max: number): Line[] {
  return items.flatMap((item) =>
    wrap(item, max).map((text, i) => ({ text, cont: i > 0 })),
  );
}

/** Indent for continuation lines, so wrapped items read as one item. */
const INDENT = 14;

function Lines({
  lines,
  x,
  y,
  lineHeight,
  className,
}: {
  lines: Line[];
  x: number;
  y: number;
  lineHeight: number;
  className: string;
}) {
  return (
    <text x={x} y={y} className={className}>
      {lines.map((line, i) => (
        <tspan key={i} x={line.cont ? x + INDENT : x} dy={i === 0 ? 0 : lineHeight}>
          {line.text}
        </tspan>
      ))}
    </text>
  );
}

const current = projects.filter((p) => !p.archived);
const rows = stackLayers.map((layer, index) => ({
  ...layer,
  number: index + 1,
  work: current.filter((p) => p.layer === layer.id),
}));
const spanning = current.filter((p) => p.layer === "all");

const description =
  rows
    .map((row) => {
      const work = row.work.length
        ? row.work.map((p) => p.title).join(", ")
        : stackLabels.none;
      return `${stackLabels.layer} ${row.number}, ${row.name}: ${row.facts.join(", ")}. ${stackLabels.work}: ${work}.`;
    })
    .join(" ") +
  (spanning.length
    ? ` ${stackLabels.spanning}: ${spanning.map((p) => p.title).join(", ")}.`
    : "");

/* ---------- Wide drawing (desktop) ---------- */

function WideDiagram() {
  const W = 1100;
  const HEAD = 32;
  const LH = 23;
  const COL_LAYER = 26;
  const COL_FACTS = 222;
  const COL_WORK = 500;
  const SIDE_W = spanning.length ? 200 : 0;
  const MAIN_W = W - SIDE_W;

  let y = HEAD;
  const drawn = rows.map((row) => {
    const facts = wrapAll(row.facts, 30);
    const work = row.work.length
      ? wrapAll(
          row.work.map((p) => p.title),
          44,
        )
      : wrapAll([stackLabels.none], 99);
    const height = 20 + Math.max(facts.length, work.length, 1) * LH + 10;
    const top = y;
    y += height;
    return { row, facts, work, top, height };
  });
  const H = y;

  const sideLabel = wrap(stackLabels.spanning, 18).map((text) => ({ text, cont: false }));
  const sideWork = wrapAll(
    spanning.map((p) => p.title),
    18,
  );

  return (
    <svg
      className="stack-svg stack-svg-wide"
      viewBox={`0 0 ${W} ${H + 1}`}
      role="img"
      aria-labelledby="stack-wide-title stack-wide-desc"
    >
      <title id="stack-wide-title">{stackTitle}</title>
      <desc id="stack-wide-desc">{description}</desc>

      <text x={COL_LAYER} y={20} className="stack-label">
        {stackLabels.layer}
      </text>
      <text x={COL_FACTS} y={20} className="stack-label">
        {stackLabels.facts}
      </text>
      <text x={COL_WORK} y={20} className="stack-label">
        {stackLabels.work}
      </text>

      {drawn.map(({ row, facts, work, top, height }) => (
        <g key={row.id}>
          <rect
            x={0.5}
            y={top + 0.5}
            width={MAIN_W - 1}
            height={height}
            className="stack-box"
          />
          <rect x={0} y={top} width={5} height={height + 1} className="stack-bar" />
          <text x={COL_LAYER} y={top + 38}>
            <tspan className="stack-num">{row.number}</tspan>
            <tspan dx={12} className="stack-name">
              {row.name}
            </tspan>
          </text>
          <Lines
            lines={facts}
            x={COL_FACTS}
            y={top + 36}
            lineHeight={LH}
            className="stack-fact"
          />
          <Lines
            lines={work}
            x={COL_WORK}
            y={top + 36}
            lineHeight={LH}
            className={row.work.length ? "stack-work" : "stack-none"}
          />
        </g>
      ))}

      {spanning.length > 0 && (
        <g>
          <rect
            x={MAIN_W + 11.5}
            y={HEAD + 0.5}
            width={SIDE_W - 12}
            height={H - HEAD}
            className="stack-box stack-box-span"
          />
          <Lines
            lines={sideLabel}
            x={MAIN_W + 28}
            y={HEAD + 34}
            lineHeight={21}
            className="stack-label"
          />
          <Lines
            lines={sideWork}
            x={MAIN_W + 28}
            y={HEAD + 34 + sideLabel.length * 21 + 14}
            lineHeight={LH}
            className="stack-work"
          />
        </g>
      )}
    </svg>
  );
}

/* ---------- Tall drawing (phones and tablets) ---------- */

function TallDiagram() {
  const W = 340;
  const X = 22;
  const LH = 22;
  const WRAP = 33;

  let y = 0;
  const drawn = rows.map((row) => {
    const facts = wrapAll(row.facts, WRAP);
    const work = row.work.length
      ? wrapAll(
          row.work.map((p) => p.title),
          WRAP,
        )
      : wrapAll([stackLabels.none], 99);
    const factsTop = 64;
    const ruleY = factsTop + (facts.length - 1) * LH + 14;
    const labelY = ruleY + 24;
    const workTop = labelY + 24;
    const height = workTop + (work.length - 1) * LH + 18;
    const top = y;
    y += height;
    return { row, facts, work, top, height, factsTop, ruleY, labelY, workTop };
  });

  const spanLines = wrapAll(
    spanning.map((p) => p.title),
    WRAP,
  );
  const spanTop = y + 12;
  const spanHeight = spanning.length ? 34 + 24 + (spanLines.length - 1) * LH + 18 : 0;
  const H = spanning.length ? spanTop + spanHeight : y;

  return (
    <svg
      className="stack-svg stack-svg-tall"
      viewBox={`0 0 ${W} ${H + 1}`}
      role="img"
      aria-labelledby="stack-tall-title stack-tall-desc"
    >
      <title id="stack-tall-title">{stackTitle}</title>
      <desc id="stack-tall-desc">{description}</desc>

      {drawn.map(
        ({ row, facts, work, top, height, factsTop, ruleY, labelY, workTop }) => (
          <g key={row.id}>
            <rect
              x={0.5}
              y={top + 0.5}
              width={W - 1}
              height={height}
              className="stack-box"
            />
            <rect x={0} y={top} width={5} height={height + 1} className="stack-bar" />
            <text x={X} y={top + 36}>
              <tspan className="stack-num">{row.number}</tspan>
              <tspan dx={10} className="stack-name">
                {row.name}
              </tspan>
            </text>
            <Lines
              lines={facts}
              x={X}
              y={top + factsTop}
              lineHeight={LH}
              className="stack-fact"
            />
            <line
              x1={X}
              x2={W - X}
              y1={top + ruleY}
              y2={top + ruleY}
              className="stack-rule"
            />
            <text x={X} y={top + labelY} className="stack-label">
              {stackLabels.work}
            </text>
            <Lines
              lines={work}
              x={X}
              y={top + workTop}
              lineHeight={LH}
              className={row.work.length ? "stack-work" : "stack-none"}
            />
          </g>
        ),
      )}

      {spanning.length > 0 && (
        <g>
          <rect
            x={0.5}
            y={spanTop + 0.5}
            width={W - 1}
            height={spanHeight}
            className="stack-box stack-box-span"
          />
          <text x={X} y={spanTop + 30} className="stack-label">
            {stackLabels.spanning}
          </text>
          <Lines
            lines={spanLines}
            x={X}
            y={spanTop + 56}
            lineHeight={LH}
            className="stack-work"
          />
        </g>
      )}
    </svg>
  );
}

export default function DpiStackDiagram() {
  return (
    <figure className="stack-figure">
      <figcaption className="eyebrow">{stackLabels.caption}</figcaption>
      <WideDiagram />
      <TallDiagram />
      <details className="disclosure stack-text">
        <summary>{stackLabels.textVersion}</summary>
        <ol>
          {rows.map((row) => (
            <li key={row.id}>
              <strong>{row.name}.</strong> {row.facts.join(". ")}.{" "}
              {stackLabels.work}:{" "}
              {row.work.length
                ? row.work.map((p, i) => (
                    <span key={p.id}>
                      {i > 0 && ", "}
                      <a href={`#project-${p.id}`}>{p.title}</a>
                    </span>
                  ))
                : stackLabels.none}
              .
            </li>
          ))}
        </ol>
        {spanning.length > 0 && (
          <p>
            {stackLabels.spanning}:{" "}
            {spanning.map((p, i) => (
              <span key={p.id}>
                {i > 0 && ", "}
                <a href={`#project-${p.id}`}>{p.title}</a>
              </span>
            ))}
            .
          </p>
        )}
      </details>
    </figure>
  );
}
