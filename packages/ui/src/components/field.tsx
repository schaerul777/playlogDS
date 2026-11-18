import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { Label } from "@workspace/ui/components/label"
import { Separator } from "@workspace/ui/components/separator"

// Playlog: COMPONENT-SPECS Field. Label above the control, 6 between label, control and description or error.

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      // Playlog: 16 between the children of a fieldset; 12 between radio or checkbox items.
      className={cn(
        "flex min-w-0 flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      // Playlog: legend 16/24 bold ink-heading; variant label 14/20 semibold foreground.
      className={cn(
        "mb-2 data-[variant=label]:text-label data-[variant=label]:font-semibold data-[variant=label]:text-foreground data-[variant=legend]:text-h3 data-[variant=legend]:font-bold data-[variant=legend]:text-ink-heading",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      // Playlog: 24 between fields; nested groups 16.
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-6 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva("group/field flex w-full", {
  variants: {
    orientation: {
      // Playlog: vertical gap 6; horizontal (checkbox, switch, radio beside the label) gap 10.
      vertical: "flex-col gap-1.5 *:w-full [&>.sr-only]:w-auto",
      horizontal:
        "flex-row items-center gap-2.5 has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      responsive:
        "flex-col gap-1.5 *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:gap-2.5 @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("group/field-content flex flex-1 flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 group-data-[disabled=true]/field:opacity-(--pl-opacity-disabled)",
        // Playlog: choice card (a FieldLabel wrapping a Field). card fill, 1px border, radius 4, padding 12 16;
        // checked uses surface-selected with a primary border; the focus ring goes on the card.
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border-(length:--pl-border-width) has-[>[data-slot=field]]:border-border has-[>[data-slot=field]]:bg-card has-[>[data-slot=field]]:transition-colors has-[>[data-slot=field]]:duration-(--pl-duration-fast) has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-accent *:data-[slot=field]:px-4 *:data-[slot=field]:py-3",
        "has-[>[data-slot=field]]:has-data-checked:border-primary has-[>[data-slot=field]]:has-data-checked:bg-surface-selected",
        "has-[>[data-slot=field]]:has-[:focus-visible]:outline-(length:--pl-focus-ring-width) has-[>[data-slot=field]]:has-[:focus-visible]:outline-offset-(--pl-focus-ring-offset) has-[>[data-slot=field]]:has-[:focus-visible]:outline-solid has-[>[data-slot=field]]:has-[:focus-visible]:outline-ring",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-label font-semibold text-foreground group-data-[disabled=true]/field:opacity-(--pl-opacity-disabled)",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      // Playlog: 12/16 medium muted-foreground. Hidden while the field shows an error (the error replaces it).
      className={cn(
        "text-left text-caption font-medium text-muted-foreground group-has-[[data-slot=field-error]]/field:hidden group-has-data-horizontal/field:text-balance",
        "[&>a]:text-link [&>a]:underline",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      // Playlog: 1px border, optional centred caption on the page background.
      className={cn("relative h-4 text-caption", className)}
      {...props}
    >
      <Separator className="absolute inset-x-0 top-1/2" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = React.useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      // Playlog: 12/16 medium pl-danger-text, text only (agreed).
      className={cn("text-caption font-medium text-danger-text", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
