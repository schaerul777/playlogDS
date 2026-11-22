import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

// Playlog: same classes, variant names and size names as packages/ui/src/components/button.tsx (React).
// Brand-specific classes are marked "Playlog:" so they can be re-applied after shadcn-vue updates.
export const buttonVariants = cva(
  [
    // Playlog: 4px radius, label type (14/20, 600), 150ms ease-out colour transitions, no press offset.
    "group/button inline-flex shrink-0 items-center justify-center rounded-md border-(length:--pl-border-width) border-transparent bg-clip-padding text-label font-semibold whitespace-nowrap transition-colors duration-(--pl-duration-fast) ease-out select-none",
    // Playlog: focus ring is 2px solid --ring with a 2px offset.
    "outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
    // Playlog: disabled is 40% opacity with no pointer events (native disabled, or data-disabled on non-native elements).
    "disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled) data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled)",
    // Playlog: invalid edge is pl-danger-text (COMPONENT-SPECS); the focus ring stays --ring, as on Input.
    "aria-invalid:border-danger-text",
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
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover",
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

export type ButtonVariants = VariantProps<typeof buttonVariants>
