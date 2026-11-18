import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS Toggle. Sizes and padding as Button; radius 4; 14/20 semibold ink-heading, icons 20.
// Playlog: hover accent; pressed surface-selected + ink-heading (the Button aria-pressed style).
const toggleVariants = cva(
  [
    "group/toggle inline-flex shrink-0 items-center justify-center gap-2 rounded-md border-(length:--pl-border-width) border-transparent text-label font-semibold whitespace-nowrap text-ink-heading transition-colors duration-(--pl-duration-fast) ease-out select-none hover:bg-accent hover:text-accent-foreground",
    "data-pressed:bg-surface-selected data-pressed:text-ink-heading",
    "outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled) data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled)",
    "aria-invalid:border-danger-text",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-input bg-card",
      },
      size: {
        // Playlog: icon-only toggles are square (padding drops, min width equals height).
        default: "h-10 min-w-10 px-4 has-[>svg:only-child]:px-0",
        sm: "h-8 min-w-8 gap-1.5 px-3 text-label-sm has-[>svg:only-child]:px-0 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 min-w-12 px-6 text-body has-[>svg:only-child]:px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
