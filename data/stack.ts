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
}

export const stackTitle = "Pakistan's digital public infrastructure stack";

export const stackLayers: StackLayer[] = [
  {
    id: "identity",
    name: "Identity",
    facts: ["NADRA national ID"],
  },
  {
    id: "payments",
    name: "Payments",
    facts: ["Raast instant payments, live", "1LINK"],
  },
  {
    id: "data",
    name: "Data sharing",
    facts: ["Open banking", "SBP draft regulations published October 2026"],
  },
];

/** Labels used inside the diagram and its text version. */
export const stackLabels = {
  caption: "The stack, and where my work sits",
  layer: "Layer",
  facts: "In Pakistan",
  work: "My work on this layer",
  spanning: "Across all three layers",
  none: "No project yet",
  textVersion: "Read the diagram as text",
};
