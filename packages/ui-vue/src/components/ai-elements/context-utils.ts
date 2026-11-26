export type ContextLevel = "low" | "medium" | "near-full"

export function formatTokens(value: number) {
  if (value < 1000) return String(value)
  return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`
}

/** low under 75%, medium 75 to 89%, near-full 90% and above. */
export function getContextLevel(percent: number): ContextLevel {
  return percent >= 90 ? "near-full" : percent >= 75 ? "medium" : "low"
}
