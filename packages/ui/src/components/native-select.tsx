import * as React from "react"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
}

function NativeSelect({
  className,
  size = "default",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-(--pl-opacity-disabled)",
        className
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        // Playlog: COMPONENT-SPECS Native Select, as the Select trigger. 40 (sm 32), padding 0 36 0 12, radius 4.
        className={cn(
          "h-10 w-full min-w-0 appearance-none rounded-md border-(length:--pl-border-width) border-input bg-card pr-9 pl-3 text-body-sm text-foreground transition-colors duration-(--pl-duration-fast) ease-out select-none hover:border-foreground data-[size=sm]:h-8",
          "outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
          "disabled:pointer-events-none aria-invalid:border-danger-text"
        )}
        {...props}
      />
      {/* Playlog: chevron-down 16 in muted-foreground, 10 from the right edge. */}
      <Icon
        name="chevron-down"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none"
      />
    </div>
  )
}

// Playlog: options keep the system colors so the native list stays readable on every platform.
function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
