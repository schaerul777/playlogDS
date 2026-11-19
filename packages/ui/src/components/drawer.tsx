"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { Button } from "@workspace/ui/components/button"
import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set

// Playlog: COMPONENT-SPECS Drawer. A bottom panel for small screens on the Base UI Drawer (no Vaul). Bottom only (swipe
// down to close): Sheet stays for the other edges. Same surface, scrim and header/body/footer as Sheet; radius 8 on the top
// corners; a handle and a close button. The nested-drawer scale and brightness effect is dropped.
type DrawerContextProps = {
  hasSnapPoints: boolean
  modal: DrawerPrimitive.Root.Props["modal"]
  showSwipeHandle: boolean
}

const DrawerContext = React.createContext<DrawerContextProps | null>(null)

function useDrawer() {
  const context = React.useContext(DrawerContext)

  if (!context) {
    throw new Error("useDrawer must be used within a Drawer.")
  }

  return context
}

function Drawer({
  modal = true,
  showSwipeHandle = true, // Playlog: the handle is shown by default.
  snapPoints,
  ...props
}: Omit<DrawerPrimitive.Root.Props, "swipeDirection"> & {
  showSwipeHandle?: boolean
}) {
  const hasSnapPoints = snapPoints != null && snapPoints.length > 0
  const contextValue = React.useMemo(
    () => ({ hasSnapPoints, modal, showSwipeHandle }),
    [hasSnapPoints, modal, showSwipeHandle]
  )

  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        modal={modal}
        snapPoints={snapPoints}
        swipeDirection="down"
        {...props}
      />
    </DrawerContext.Provider>
  )
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        // Playlog: dims the page with --pl-scrim, no blur; fades with the swipe and at --pl-duration-fast.
        "fixed inset-0 z-50 min-h-dvh bg-scrim opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] transition-opacity duration-(--pl-duration-fast) ease-out select-none data-ending-style:pointer-events-none data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-snap-points:[--drawer-overlay-min-opacity:0.5] data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute",
        className
      )}
      {...props}
    />
  )
}

// Playlog: 40x4 handle, radius 2, --input colour, 8 from the top, centred; a 24px-high grab area. Hidden from screen readers.
function DrawerSwipeHandle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      className={cn(
        "absolute inset-x-0 top-0 z-10 flex h-6 cursor-grab justify-center pt-2 after:block after:h-1 after:w-10 after:rounded-sm after:bg-input active:cursor-grabbing",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DrawerPrimitive.Popup.Props & { showCloseButton?: boolean }) {
  const { hasSnapPoints, modal, showSwipeHandle } = useDrawer()

  return (
    <DrawerPortal data-slot="drawer-portal">
      {modal === true && (
        <DrawerOverlay data-snap-points={hasSnapPoints ? "" : undefined} />
      )}
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        data-modal={modal}
        className="pointer-events-none fixed inset-0 z-50 select-none data-[modal=true]:pointer-events-auto"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-popup"
          data-snap-points={hasSnapPoints ? "" : undefined}
          className={cn(
            // Playlog: surface as Sheet (popover fill, overlay shadow, no border); radius 8 on the top corners; full width,
            // at most the viewport minus 48 high.
            "group/drawer-popup pointer-events-auto fixed inset-x-0 bottom-0 z-50 flex h-(--drawer-content-height) max-h-[calc(100dvh-3rem)] min-h-0 flex-col rounded-t-lg bg-popover text-body-sm text-popover-foreground shadow-(--pl-shadow-overlay) outline-none select-none",
            "[--drawer-content-height:var(--drawer-height,auto)] data-snap-points:[--drawer-content-height:100dvh]",
            // Playlog: slides in from the bottom at --pl-duration-slow; no transition while dragging; the release speed follows
            // the swipe (Base UI).
            "origin-bottom transform-[translate3d(0,var(--translate-y,0px),0)] transition-[transform,height] duration-(--pl-duration-slow) ease-out will-change-transform [interpolate-size:allow-keywords] [--closed-transform:translate3d(0,calc(100%+2px),0)] [--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y))]",
            "data-starting-style:transform-(--closed-transform) data-ending-style:transform-(--closed-transform) data-ending-style:opacity-[0.9999] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-swiping:duration-0 data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
            // Playlog: keeps the panel edge covered while it is dragged past the bottom.
            "after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-12 after:bg-popover",
            className
          )}
          {...props}
        >
          {showSwipeHandle && <DrawerSwipeHandle />}
          <DrawerPrimitive.Content
            data-slot="drawer-content"
            // Playlog: 16 between header, body and footer (as Sheet).
            className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden overscroll-contain rounded-[inherit] select-text group-data-swiping/drawer-popup:select-none"
          >
            {children}
          </DrawerPrimitive.Content>
          {showCloseButton && (
            <DrawerPrimitive.Close
              data-slot="drawer-close"
              render={
                <Button
                  variant="ghost"
                  className="absolute top-4 right-4 z-20"
                  size="icon-sm"
                />
              }
            >
              <Icon name="close" />
              <span className="sr-only">Close</span>
            </DrawerPrimitive.Close>
          )}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      // Playlog: padding 24 24 0, left-aligned at every width; description 4 below the title (as Sheet).
      className={cn("flex shrink-0 flex-col gap-1 px-6 pt-6", className)}
      {...props}
    />
  )
}

// Playlog addition: the scrolling body, padding 0 24. The drawer is at most the viewport minus 48 high, so a long body scrolls.
function DrawerBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-body"
      className={cn("min-h-0 flex-1 overflow-y-auto px-6", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      // Playlog: padding 0 24 24, Buttons stacked full width with gap 8 below sm, a row aligned right from sm (as Sheet).
      className={cn(
        "mt-auto flex shrink-0 flex-col-reverse gap-2 px-6 pb-6 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("font-heading text-h3 text-ink-heading", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-body-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
