import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { RiCheckLine } from "@remixicon/react"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Playlog: 2px radius, surface fill, border-strong (--input) edge, flat (no shadow), 150ms ease-out.
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-sm border-(length:--pl-border-width) border-input bg-card transition-colors duration-150 ease-out after:absolute after:-inset-x-3 after:-inset-y-2",
        "hover:border-foreground",
        // Playlog: checked uses primary; hover uses primary-hover.
        "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-checked:hover:border-primary-hover data-checked:hover:bg-primary-hover",
        // Playlog: focus ring from --pl-focus-ring-width / --pl-focus-ring-offset.
        "outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
        // Playlog: disabled uses --pl-opacity-disabled.
        "data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled)",
        // Playlog: invalid keeps the destructive edge, also when checked.
        "aria-invalid:border-destructive aria-invalid:data-checked:border-destructive aria-invalid:focus-visible:outline-destructive data-invalid:border-destructive data-invalid:focus-visible:outline-destructive",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <RiCheckLine />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
