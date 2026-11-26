export type ModelOption = {
  value: string
  label: string
  /** Shown in the menu in place of the value, for example "New". */
  badge?: string
  disabled?: boolean
}
export type ModelProvider = { name: string; models: ModelOption[] }
export type Effort = { value: string; label: string }
export const defaultEfforts: Effort[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]
