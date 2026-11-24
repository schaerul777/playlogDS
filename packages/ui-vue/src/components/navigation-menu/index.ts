import { cva } from "class-variance-authority"

export { default as NavigationMenu } from "./NavigationMenu.vue"
export { default as NavigationMenuContent } from "./NavigationMenuContent.vue"
export { default as NavigationMenuIndicator } from "./NavigationMenuIndicator.vue"
export { default as NavigationMenuItem } from "./NavigationMenuItem.vue"
export { default as NavigationMenuLink } from "./NavigationMenuLink.vue"
export { default as NavigationMenuList } from "./NavigationMenuList.vue"
export { default as NavigationMenuTrigger } from "./NavigationMenuTrigger.vue"
export { default as NavigationMenuViewport } from "./NavigationMenuViewport.vue"

// Playlog: COMPONENT-SPECS Navigation Menu. Triggers and top-level links look like the Sidebar nav item laid
// out horizontally: 40 high, padding 0 12, radius 4, 14/20 medium foreground, hover accent.
// The current page (data-active) is ink-heading with a 2px ink-heading underline at the bottom edge (Tabs line).
export const navigationMenuTriggerStyle = cva(
  "group/navigation-menu-trigger relative inline-flex h-10 w-max items-center justify-center gap-1 rounded-md px-3 text-body-sm font-medium text-foreground transition-colors duration-(--pl-duration-fast) ease-out hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled) data-[active]:text-ink-heading after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-ink-heading after:opacity-0 data-[active]:after:opacity-100",
)
