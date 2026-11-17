import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

// Playlog: brand-specific classes are marked "Playlog:" so they can be re-applied after shadcn updates.
const buttonVariants = cva(
  [
    // Playlog: 4px radius, label type (14/20, 600), 150ms ease-out colour transitions, no press offset.
    "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-label font-semibold whitespace-nowrap transition-colors duration-150 ease-out select-none",
    // Playlog: focus ring is 2px solid --ring with a 2px offset.
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-ring",
    // Playlog: disabled is 40% opacity with no pointer events (native disabled or Base UI focusableWhenDisabled).
    "disabled:pointer-events-none disabled:opacity-40 data-disabled:pointer-events-none data-disabled:opacity-40",
    "aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive",
    // Playlog: icons default to 20px.
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  ],
  {
    variants: {
      variant: {
        // Playlog: primary hover uses the primary-hover token.
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        // Playlog: COMPONENT-SPECS "secondary": card fill, ink-heading text, 1px --input border, surface-hover on hover.
        // Playlog: selected is surface-selected + ink-heading.
        outline:
          "border-input bg-card text-ink-heading hover:bg-accent hover:text-accent-foreground aria-expanded:bg-surface-selected aria-expanded:text-ink-heading aria-pressed:bg-surface-selected aria-pressed:text-ink-heading",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-surface-selected aria-expanded:bg-surface-selected aria-expanded:text-ink-heading aria-pressed:bg-surface-selected aria-pressed:text-ink-heading",
        // Playlog: COMPONENT-SPECS "quiet": transparent, ink-heading text, surface-hover on hover.
        ghost:
          "text-ink-heading hover:bg-accent hover:text-accent-foreground aria-expanded:bg-surface-selected aria-expanded:text-ink-heading aria-pressed:bg-surface-selected aria-pressed:text-ink-heading",
        // Playlog: destructive is a solid danger-strong fill.
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-link underline-offset-4 hover:underline",
      },
      size: {
        // Playlog: COMPONENT-SPECS. Height 40 / sm 32 / lg 48, side padding 16 / 12 / 24 (no narrower icon side),
        // Playlog: gap 8 / 6 / 8, text 14 / 13 / 16 semibold. xs is not in the spec (24px, 8px padding, caption text).
        default: "h-10 gap-2 px-4",
        xs: "h-6 gap-1 px-2 text-caption [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 text-label-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 gap-2 px-6 text-body",
        icon: "size-10",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
