import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

// Playlog: brand-specific classes are marked "Playlog:" so they can be re-applied after shadcn updates.
const badgeVariants = cva(
  [
    // Playlog: COMPONENT-SPECS. Height 22, padding 0 8, gap 6, 2px radius, 12/16 semibold, no wrapping, 150ms ease-out.
    "group/badge inline-flex h-5.5 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-sm border-(length:--pl-border-width) border-transparent px-2 text-caption font-semibold whitespace-nowrap transition-colors duration-(--pl-duration-fast) ease-out",
    // Playlog: focus ring is 2px solid --ring with a 2px offset (badges rendered as links).
    "outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
    // Playlog: disabled is 40% opacity with no pointer events.
    "aria-disabled:pointer-events-none aria-disabled:opacity-(--pl-opacity-disabled) data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled)",
    // Playlog: invalid edge is pl-danger-text (COMPONENT-SPECS).
    "aria-invalid:border-danger-text [&>svg]:pointer-events-none [&>svg]:size-3!",
  ],
  {
    variants: {
      variant: {
        // Playlog: COMPONENT-SPECS "Brand": surface-brand fill, ink-on-brand text.
        default: "bg-surface-brand text-ink-on-brand",
        // Playlog: COMPONENT-SPECS "Neutral": muted fill, foreground text, inset 1px border.
        secondary: "border-border bg-muted text-foreground",
        // Playlog: COMPONENT-SPECS status badges: *-surface fill with *-text words. destructive = danger.
        destructive: "bg-danger-surface text-danger-text",
        info: "bg-info-surface text-info-text",
        success: "bg-success-surface text-success-text",
        warning: "bg-warning-surface text-warning-text",
        // Playlog: COMPONENT-SPECS "Accent": surface-accent fill, ink-on-accent text.
        accent: "bg-surface-accent text-ink-on-accent",
        outline:
          "border-border text-foreground [a]:hover:bg-accent [a]:hover:text-accent-foreground",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-link underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
