// Tremor cx [v0.0.2]

import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

// Tremor focusRing [v0.0.1]

export const focusRing = [
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  "outline-blue-500",
];

// Tremor hasErrorInput [v0.0.1]

export const hasErrorInput = [
  "ring-2",
  "border-red-500 ring-red-200",
];
