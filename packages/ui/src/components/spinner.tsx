import * as React from "react"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set

// Playlog: COMPONENT-SPECS Spinner. The approved `loader` stroke glyph at 20 (--pl-icon-size) in the current
// text color, Tailwind animate-spin. It keeps spinning under reduced motion: it is the only loading signal.
function Spinner({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Icon>, "name">) {
  return (
    <Icon
      name="loader"
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      aria-hidden={false}
      className={cn("size-(--pl-icon-size) shrink-0 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
