import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

// Playlog: COMPONENT-SPECS Field. Same classes as packages/ui/src/components/field.tsx (React).
export const fieldVariants = cva("group/field flex w-full", {
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

export type FieldVariants = VariantProps<typeof fieldVariants>

export { default as Field } from "./Field.vue"
export { default as FieldContent } from "./FieldContent.vue"
export { default as FieldDescription } from "./FieldDescription.vue"
export { default as FieldError } from "./FieldError.vue"
export { default as FieldGroup } from "./FieldGroup.vue"
export { default as FieldLabel } from "./FieldLabel.vue"
export { default as FieldLegend } from "./FieldLegend.vue"
export { default as FieldSeparator } from "./FieldSeparator.vue"
export { default as FieldSet } from "./FieldSet.vue"
export { default as FieldTitle } from "./FieldTitle.vue"
