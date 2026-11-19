import * as React from "react"

import { Badge } from "@workspace/ui/components/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { InputGroupButton } from "@workspace/ui/components/input-group"
import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set

type ModelOption = {
  value: string
  label: string
  /** Shown in the menu in place of the value, for example "New". */
  badge?: string
  disabled?: boolean
}

type ModelProvider = { name: string; models: ModelOption[] }

type Effort = { value: string; label: string }

const defaultEfforts: Effort[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]

// Playlog: COMPONENT-SPECS Model Selector. Two Dropdown Menus for the Prompt Input toolbar: the model (grouped by provider
// with radio items) and the effort. Triggers are InputGroupButton `sm` (32) with the current value and `chevron-down`.
// Enter and Space open a menu, arrows move, typing jumps to an item, Escape closes and returns focus to the trigger
// (Base UI menu). The list is data you pass in; the playground uses static example names.
function ModelSelector({
  providers,
  model,
  onModelChange,
  efforts = defaultEfforts,
  effort,
  onEffortChange,
  disabled,
}: {
  providers: ModelProvider[]
  model: string
  onModelChange: (model: string) => void
  /** Pass `null` to hide the effort menu. */
  efforts?: Effort[] | null
  effort?: string
  onEffortChange?: (effort: string) => void
  disabled?: boolean
}) {
  const current = providers.flatMap((provider) => provider.models).find((option) => option.value === model)
  const currentEffort = efforts?.find((option) => option.value === effort)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={disabled}
          render={<InputGroupButton size="sm" aria-label={`Model: ${current?.label ?? "none"}`} />}
        >
          {current?.label ?? "Model"}
          <Icon name="chevron-down" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuRadioGroup value={model} onValueChange={onModelChange}>
            {providers.map((provider, index) => (
              <React.Fragment key={provider.name}>
                {index > 0 ? <DropdownMenuSeparator /> : null}
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{provider.name}</DropdownMenuLabel>
                  {provider.models.map((option) => (
                    <DropdownMenuRadioItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      closeOnClick
                    >
                      {option.label}
                      {option.disabled ? <span className="text-muted-foreground">(unavailable)</span> : null}
                      {option.badge && !option.disabled ? (
                        <Badge variant="secondary" className="ml-auto">
                          {option.badge}
                        </Badge>
                      ) : null}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuGroup>
              </React.Fragment>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {efforts ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={disabled}
            render={<InputGroupButton size="sm" aria-label={`Effort: ${currentEffort?.label ?? "none"}`} />}
          >
            {currentEffort?.label ?? "Effort"}
            <Icon name="chevron-down" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-36">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Effort</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={effort} onValueChange={onEffortChange}>
                {efforts.map((option) => (
                  <DropdownMenuRadioItem key={option.value} value={option.value} closeOnClick>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </>
  )
}

export { ModelSelector, defaultEfforts }
export type { ModelOption, ModelProvider, Effort }
