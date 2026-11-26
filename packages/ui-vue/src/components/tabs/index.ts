import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Tabs } from "./Tabs.vue"
export { default as TabsContent } from "./TabsContent.vue"
export { default as TabsList } from "./TabsList.vue"
export { default as TabsTrigger } from "./TabsTrigger.vue"

// Playlog: same classes as packages/ui/src/components/tabs.tsx (React); Reka sets data-orientation and data-state.
export const tabsListVariants = cva(
  // Playlog: muted ink for inactive tabs.
  "group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
  {
    variants: {
      variant: {
        // Playlog: segmented list on surface-sunken, 40px (control height), 4px radius. Not in COMPONENT-SPECS.
        default: "rounded-md bg-muted p-1 group-data-[orientation=horizontal]/tabs:h-10",
        // Playlog: COMPONENT-SPECS tab row. Gap 24 and a 1px border under the row (right border when vertical).
        line: "bg-transparent group-data-[orientation=horizontal]/tabs:gap-6 group-data-[orientation=horizontal]/tabs:border-b-(length:--pl-border-width) group-data-[orientation=horizontal]/tabs:border-border group-data-[orientation=vertical]/tabs:items-stretch group-data-[orientation=vertical]/tabs:gap-1 group-data-[orientation=vertical]/tabs:border-r-(length:--pl-border-width) group-data-[orientation=vertical]/tabs:border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type TabsListVariants = VariantProps<typeof tabsListVariants>
