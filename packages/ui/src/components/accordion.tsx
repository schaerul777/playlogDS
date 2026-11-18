import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      // Playlog: COMPONENT-SPECS Accordion. 1px border between items, none above the first or below the last.
      className={cn("border-border not-last:border-b-(length:--pl-border-width)", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          // Playlog: full width, padding 16 0, 14/20 semibold foreground; hover ink-heading, no underline.
          "group/accordion-trigger relative flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-body-sm font-semibold text-foreground transition-colors duration-(--pl-duration-fast) ease-out hover:text-ink-heading",
          "outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
          "aria-disabled:pointer-events-none aria-disabled:opacity-(--pl-opacity-disabled) data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled)",
          className
        )}
        {...props}
      >
        {children}
        {/* Playlog: one chevron-down that turns 180° when open, at --pl-duration-fast. */}
        <Icon
          name="chevron-down"
          data-slot="accordion-trigger-icon"
          className="pointer-events-none mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-(--pl-duration-fast) ease-out group-aria-expanded/accordion-trigger:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      // Playlog: height animates at --pl-duration-fast (Base UI panel height variable).
      className="h-(--accordion-panel-height) overflow-hidden text-body-sm text-muted-foreground transition-[height] duration-(--pl-duration-fast) ease-out data-ending-style:h-0 data-starting-style:h-0"
      {...props}
    >
      <div
        // Playlog: padding 0 0 16; links use the link token.
        className={cn("pb-4 [&_a]:text-link [&_a]:underline [&_p:not(:last-child)]:mb-4", className)}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
