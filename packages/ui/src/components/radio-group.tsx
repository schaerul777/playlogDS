import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      // Playlog: 12 between items.
      className={cn("grid w-full gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        // Playlog: COMPONENT-SPECS Radio Group. 18px circle, 1.5px --input edge, card fill, flat, mirrors Checkbox.
        "group/radio-group-item peer relative flex size-4.5 shrink-0 items-center justify-center rounded-(--pl-radius-full) border-(length:--pl-checkbox-border-width) border-input bg-card transition-colors duration-(--pl-duration-fast) ease-out after:absolute after:-inset-x-3 after:-inset-y-2",
        // Playlog: checked is primary with a primary-foreground dot; hover primary-hover.
        "data-checked:border-primary data-checked:bg-primary data-checked:hover:border-primary-hover data-checked:hover:bg-primary-hover",
        "outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
        "data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled)",
        // Playlog: error edge is pl-danger-text, also when checked.
        "aria-invalid:border-danger-text aria-invalid:data-checked:border-danger-text data-invalid:border-danger-text data-invalid:data-checked:border-danger-text",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        {/* Playlog: 6px dot. */}
        <span className="size-1.5 rounded-(--pl-radius-full) bg-primary-foreground" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
