import type { StackLayerId } from "./projects";

/**
 * The three layers of Pakistan's digital public infrastructure, as drawn in
 * the hero diagram (components/portfolio/DpiStackDiagram.tsx).
 *
 * To update the diagram, edit the text here. To pin a project to a layer,
 * set its `layer` field in data/projects.ts. Only add facts that are verified.
 */
export interface StackLayer {
  id: StackLayerId;
  name: string;
  /** Short lines describing what exists in Pakistan on this layer. */
  facts: string[];
  /**
   * How the rail is drawn. "live" has pulses moving along it, "steady" is a
   * solid line, "draft" is a dashed, dim line.
   */
  state: "steady" | "live" | "draft";
  /** Optional short chip next to the layer name. */
  badge?: string;
  /** Shown in place of the project list when no project is pinned here. */
  note?: string;
}

export const stackTitle = "Pakistan's digital public infrastructure stack";

export const stackLayers: StackLayer[] = [
  {
    id: "identity",
    name: "Identity",
    facts: ["NADRA national ID"],
    state: "steady",
  },
  {
    id: "payments",
    name: "Payments",
    facts: ["Raast instant payments, live", "1LINK"],
    state: "live",
    badge: "Live",
  },
  {
    id: "data",
    name: "Data sharing",
    facts: ["Open banking", "SBP draft regulations published October 2026"],
    state: "draft",
    badge: "Draft",
    note: "Part 3 of the series, in progress",
  },
];

/** The layer that is open when the page loads. */
export const stackDefaultLayer: StackLayerId = "payments";

/** Labels used inside the diagram and its text version. */
export const stackLabels = {
  caption: "The stack, and where my work sits",
  hint: "Select a layer",
  layer: "Layer",
  facts: "In Pakistan",
  work: "My work on this layer",
  spanning: "Across all three layers",
  textVersion: "Read the diagram as text",
};
