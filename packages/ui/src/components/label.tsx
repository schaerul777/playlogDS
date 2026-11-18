import * as React from "react"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS Label. 14/20 semibold foreground; dims with a disabled control.
// Playlog: `required` adds the agreed marker: `*` in muted-foreground, hidden from screen readers
// (put `required` on the control itself so assistive tech announces it).
function Label({
  className,
  required = false,
  children,
  ...props
}: React.ComponentProps<"label"> & { required?: boolean }) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-label text-foreground select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-(--pl-opacity-disabled) peer-disabled:opacity-(--pl-opacity-disabled) peer-data-disabled:opacity-(--pl-opacity-disabled)",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" data-slot="label-required" className="-ml-1 text-muted-foreground">
          *
        </span>
      )}
    </label>
  )
}

export { Label }
