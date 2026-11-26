import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "vue"
import { cva } from "class-variance-authority"

export interface SidebarProps {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
  class?: HTMLAttributes["class"]
}

export { default as Sidebar } from "./Sidebar.vue"
export { default as SidebarContent } from "./SidebarContent.vue"
export { default as SidebarFooter } from "./SidebarFooter.vue"
export { default as SidebarGroup } from "./SidebarGroup.vue"
export { default as SidebarGroupAction } from "./SidebarGroupAction.vue"
export { default as SidebarGroupContent } from "./SidebarGroupContent.vue"
export { default as SidebarGroupLabel } from "./SidebarGroupLabel.vue"
export { default as SidebarHeader } from "./SidebarHeader.vue"
export { default as SidebarInput } from "./SidebarInput.vue"
export { default as SidebarInset } from "./SidebarInset.vue"
export { default as SidebarMenu } from "./SidebarMenu.vue"
export { default as SidebarMenuAction } from "./SidebarMenuAction.vue"
export { default as SidebarMenuBadge } from "./SidebarMenuBadge.vue"
export { default as SidebarMenuButton } from "./SidebarMenuButton.vue"
export { default as SidebarMenuItem } from "./SidebarMenuItem.vue"
export { default as SidebarMenuSkeleton } from "./SidebarMenuSkeleton.vue"
export { default as SidebarMenuSub } from "./SidebarMenuSub.vue"
export { default as SidebarMenuSubButton } from "./SidebarMenuSubButton.vue"
export { default as SidebarMenuSubItem } from "./SidebarMenuSubItem.vue"
export { default as SidebarProvider } from "./SidebarProvider.vue"
export { default as SidebarRail } from "./SidebarRail.vue"
export { default as SidebarSeparator } from "./SidebarSeparator.vue"
export { default as SidebarTrigger } from "./SidebarTrigger.vue"

export { useSidebar } from "./utils"

export const sidebarMenuButtonVariants = cva(
  [
    // Playlog: nav item. Padding 0 12, gap 12, 4px radius, 14/20 medium foreground, ink-muted icon at 24px (navigation size).
    "peer/menu-button group/menu-button flex w-full items-center gap-3 overflow-hidden rounded-md px-3 text-left text-body-sm font-medium text-sidebar-foreground transition-colors duration-(--pl-duration-fast) ease-out group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-has-data-[sidebar=menu-badge]/menu-item:pr-12 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-1! [&_svg]:size-6 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&>span:last-child]:truncate",
    // Playlog: hover is surface-hover (--accent).
    "hover:bg-accent data-[state=open]:hover:bg-accent",
    // Playlog: active is surface-selected (--sidebar-accent) with bold ink-heading text and icon.
    "data-[active]:bg-sidebar-accent data-[active]:font-bold data-[active]:text-sidebar-accent-foreground data-[active]:hover:bg-sidebar-accent data-[active]:[&_svg]:text-sidebar-accent-foreground",
    "outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled) aria-disabled:pointer-events-none aria-disabled:opacity-(--pl-opacity-disabled)",
  ],
  {
    variants: {
      variant: {
        default: "",
        outline:
          "border-(length:--pl-border-width) border-sidebar-border bg-background",
      },
      size: {
        // Playlog: 40px nav item (control height); sm is the 32px control height.
        default: "h-10",
        sm: "h-8 text-caption [&_svg]:size-4",
        lg: "h-12 group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>
