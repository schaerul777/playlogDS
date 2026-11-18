import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { cva } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set

function NavigationMenu({
  align = "start",
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Root.Props &
  Pick<NavigationMenuPrimitive.Positioner.Props, "align">) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      // Playlog: label the nav landmark; pass aria-label to override.
      aria-label="Main"
      // Playlog: hidden below md; small screens use the Sidebar (Sheet) instead (agreed).
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center max-md:hidden",
        className
      )}
      {...props}
    >
      {children}
      <NavigationMenuPositioner align={align} />
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

// Playlog: COMPONENT-SPECS Navigation Menu. Triggers and top-level links look like the Sidebar nav item laid
// out horizontally: 40 high, padding 0 12, radius 4, 14/20 medium foreground, hover accent.
// The current page (data-active) is ink-heading with a 2px ink-heading underline at the bottom edge (Tabs line).
const navigationMenuTriggerStyle = cva(
  "group/navigation-menu-trigger relative inline-flex h-10 w-max items-center justify-center gap-1 rounded-md px-3 text-body-sm font-medium text-foreground transition-colors duration-(--pl-duration-fast) ease-out hover:bg-accent hover:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled) data-active:text-ink-heading after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-ink-heading after:opacity-0 data-active:after:opacity-100"
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}
      {/* Playlog: chevron-down 16 turns 180° while the panel is open. */}
      <Icon
        name="chevron-down"
        aria-hidden="true"
        className="size-4 text-muted-foreground transition-transform duration-(--pl-duration-fast) ease-out group-data-popup-open/navigation-menu-trigger:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      // Playlog: panel padding 8; panels fade at --pl-duration-fast (no slide).
      className={cn(
        "h-full w-auto p-2 transition-opacity duration-(--pl-duration-fast) ease-out data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuPositioner({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  ...props
}: NavigationMenuPrimitive.Positioner.Props) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        // Playlog: the panel moves between triggers at --pl-duration-slow.
        className={cn(
          "isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-(--pl-duration-slow) ease-out data-instant:transition-none",
          className
        )}
        {...props}
      >
        {/* Playlog: surface-raised, radius 4 (anchored), overlay shadow, no border. Fades at --pl-duration-fast;
            resizes between panels at --pl-duration-slow. */}
        <NavigationMenuPrimitive.Popup className="relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-md bg-popover text-popover-foreground shadow-(--pl-shadow-overlay) outline-none [transition:opacity_var(--pl-duration-fast)_ease-out,width_var(--pl-duration-slow)_ease-out,height_var(--pl-duration-slow)_ease-out] data-ending-style:opacity-0 data-starting-style:opacity-0">
          <NavigationMenuPrimitive.Viewport className="relative size-full overflow-hidden" />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      // Playlog: panel link. Padding 8 12, radius 2, body-sm foreground; hover accent; current page ink-heading.
      // For a top-level link, pass className={navigationMenuTriggerStyle()} instead.
      className={cn(
        "flex flex-col items-start gap-0.5 rounded-sm px-3 py-2 text-body-sm text-foreground transition-colors duration-(--pl-duration-fast) ease-out hover:bg-accent hover:text-accent-foreground data-active:text-ink-heading outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Icon>) {
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-indicator"
      // Playlog: not part of the Playlog look (no arrows on popups); kept for API parity.
      className={cn("top-full z-1 flex h-1.5 items-end justify-center overflow-hidden", className)}
      {...props}
    >
      <div className="relative top-1 size-2 rotate-45 rounded-sm bg-popover" />
    </NavigationMenuPrimitive.Icon>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuPositioner,
}
