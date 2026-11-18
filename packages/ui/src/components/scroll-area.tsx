import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

function ScrollArea({
  className,
  children,
  ...props
}: ScrollAreaPrimitive.Root.Props) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("group/scroll-area relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        // Playlog: keeps the parent's radius and takes the focus ring. Base UI makes the viewport
        // focusable (tabIndex 0) while it overflows, so arrow keys and Page Up/Down scroll it.
        className="size-full rounded-[inherit] outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        // Playlog: COMPONENT-SPECS Scroll Area. Track 10 with 2 padding (thumb 6). Shown on hover, while scrolling
        // and while the viewport has keyboard focus (extrapolated, so keyboard users see their position);
        // fades at --pl-duration-fast.
        "flex touch-none p-0.5 opacity-0 transition-opacity duration-(--pl-duration-fast) ease-out select-none data-hovering:opacity-100 data-scrolling:opacity-100 group-has-[>[data-slot=scroll-area-viewport]:focus-visible]/scroll-area:opacity-100 data-horizontal:h-2.5 data-horizontal:flex-col data-vertical:h-full data-vertical:w-2.5",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        // Playlog: fully round, border colour; input colour on hover or drag.
        className="relative flex-1 rounded-(--pl-radius-full) bg-border transition-colors duration-(--pl-duration-fast) ease-out hover:bg-input active:bg-input"
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
