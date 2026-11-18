import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS Kbd. Height 20, min width 20, padding 0 4, radius 2, muted fill, 1px border,
// Reddit Sans 12/16 medium muted-foreground (no monospace). Our Tooltip is the popover surface, so no inversion.
// Menus (Command, Dropdown Menu) keep their plain-text shortcuts; Kbd is for standalone hints.
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm border-(length:--pl-border-width) border-border bg-muted px-1 font-sans text-caption font-medium text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      // Playlog: keys 4 apart.
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
