import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Playlog: 18px box, 2px radius, 1.5px border-strong (--input) edge, surface fill, flat, 150ms ease-out (COMPONENT-SPECS).
        "peer relative flex size-4.5 shrink-0 items-center justify-center rounded-sm border-(length:--pl-checkbox-border-width) border-input bg-card transition-colors duration-150 ease-out after:absolute after:-inset-x-3 after:-inset-y-2",
        "hover:border-foreground",
        // Playlog: checked uses primary; hover uses primary-hover.
        "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-checked:hover:border-primary-hover data-checked:hover:bg-primary-hover",
        // Playlog: focus ring from --pl-focus-ring-width / --pl-focus-ring-offset.
        "outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
        // Playlog: disabled uses --pl-opacity-disabled.
        "data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled)",
        // Playlog: error edge is pl-danger-text, also when checked; the focus ring stays --ring.
        "aria-invalid:border-danger-text aria-invalid:data-checked:border-danger-text data-invalid:border-danger-text data-invalid:data-checked:border-danger-text",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <Icon name="check" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
