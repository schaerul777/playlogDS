import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        // Playlog: 40px control, 4px radius, surface fill, border-strong (--input) outline, body-sm text.
        "h-10 w-full min-w-0 rounded-md border border-input bg-card px-3 py-2 text-body-sm text-foreground transition-colors duration-150 ease-out",
        "placeholder:text-muted-foreground",
        "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-label file:font-semibold file:text-foreground",
        // Playlog: hover darkens the border to ink.
        "hover:border-foreground",
        // Playlog: focus ring is 2px solid --ring with a 2px offset.
        "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-ring",
        // Playlog: disabled is 40% opacity with no pointer events.
        "disabled:pointer-events-none disabled:opacity-40 data-disabled:pointer-events-none data-disabled:opacity-40",
        // Playlog: error edge is pl-danger-text; the fill stays card and the focus ring stays --ring (COMPONENT-SPECS).
        "aria-invalid:border-danger-text",
        className
      )}
      {...props}
    />
  )
}

export { Input }
