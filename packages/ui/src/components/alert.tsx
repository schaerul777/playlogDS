import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

const alertVariants = cva(
  [
    // Playlog: COMPONENT-SPECS. Padding 12 16, 4px radius, 14/20 text, 12px gap to the icon.
    // Playlog: the icon is 20px (--pl-icon-size) in the text colour and aligns to the top.
    "group/alert relative grid w-full gap-0.5 rounded-md px-4 py-3 text-left text-body-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-3 *:[svg]:row-span-2 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-(--pl-icon-size)",
  ],
  {
    variants: {
      variant: {
        // Playlog: neutral alert. foreground text on card with a 1px border (fill and border not in the spec).
        default:
          "border-(length:--pl-border-width) border-border bg-card text-foreground",
        // Playlog: status alerts use the *-surface fill with *-text words, no border. destructive = danger.
        destructive: "bg-danger-surface text-danger-text",
        info: "bg-info-surface text-info-text",
        success: "bg-success-surface text-success-text",
        warning: "bg-warning-surface text-warning-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        // Playlog: title is bold in the alert's text colour.
        "font-bold group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        // Playlog: description keeps the alert's text colour (the spec gives one text colour per alert).
        "text-body-sm text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2.5 right-3", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
