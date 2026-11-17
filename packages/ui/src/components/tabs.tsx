"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  // Playlog: muted ink for inactive tabs.
  "group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        // Playlog: segmented list on surface-sunken, 40px (control height), 4px radius. Not in COMPONENT-SPECS.
        default: "rounded-md bg-muted p-1 group-data-horizontal/tabs:h-10",
        // Playlog: COMPONENT-SPECS tab row. Gap 24 and a 1px border under the row (right border when vertical).
        line: "bg-transparent group-data-horizontal/tabs:gap-6 group-data-horizontal/tabs:border-b-(length:--pl-border-width) group-data-horizontal/tabs:border-border group-data-vertical/tabs:items-stretch group-data-vertical/tabs:gap-1 group-data-vertical/tabs:border-r-(length:--pl-border-width) group-data-vertical/tabs:border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        // Playlog: label type (14/20, 600), 2px radius, 150ms ease-out, icons 16px.
        "relative inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-sm border-(length:--pl-border-width) border-transparent px-3 text-label font-semibold whitespace-nowrap text-muted-foreground transition-colors duration-150 ease-out group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-ink-heading has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Playlog: focus ring from --pl-focus-ring-width / --pl-focus-ring-offset.
        "outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
        // Playlog: disabled uses --pl-opacity-disabled.
        "disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled) data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled) aria-disabled:pointer-events-none aria-disabled:opacity-(--pl-opacity-disabled)",
        // Playlog: selected is surface-selected + ink-heading (default variant).
        "group-data-[variant=default]/tabs-list:data-active:bg-surface-selected group-data-[variant=default]/tabs-list:data-active:text-ink-heading",
        // Playlog: line variant follows COMPONENT-SPECS. Padding 10 0 12, no border or radius, hugs its label.
        // Playlog: vertical line tabs (not in the spec) pad 8 16 8 0 so the label clears the row border.
        "group-data-[variant=line]/tabs-list:h-auto group-data-[variant=line]/tabs-list:flex-none group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:border-0 group-data-[variant=line]/tabs-list:px-0 group-data-[variant=line]/tabs-list:pt-2.5 group-data-[variant=line]/tabs-list:pb-3 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:py-2 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:pr-4",
        // Playlog: active line tab has a 2px ink-heading underline sitting on the row border (bottom -1px).
        "group-data-[variant=line]/tabs-list:data-active:text-ink-heading after:absolute after:bg-ink-heading after:opacity-0 after:transition-opacity after:duration-150 after:ease-out group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:-bottom-px group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-px group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "flex-1 text-body-sm",
        // Playlog: panels are focusable; show the brand focus ring.
        "outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
