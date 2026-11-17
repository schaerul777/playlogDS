"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        // Playlog: fully rounded track (--pl-radius-full), flat, 150ms ease-out.
        // Playlog: sizes on the Tailwind scale: default 36x20 (thumb 16), sm 28x16 (thumb 12), 2px inset.
        "peer group/switch relative inline-flex shrink-0 items-center rounded-(--pl-radius-full) border-(length:--pl-border-width) border-transparent p-px transition-colors duration-150 ease-out after:absolute after:-inset-x-3 after:-inset-y-2 data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7",
        // Playlog: unchecked track is the control edge colour (--input); checked is primary.
        "data-unchecked:bg-input data-unchecked:hover:bg-muted-foreground data-checked:bg-primary data-checked:hover:bg-primary-hover",
        // Playlog: focus ring from --pl-focus-ring-width / --pl-focus-ring-offset.
        "outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring",
        // Playlog: disabled uses --pl-opacity-disabled.
        "data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled)",
        "aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive data-invalid:border-destructive data-invalid:focus-visible:outline-destructive",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-(--pl-radius-full) bg-card transition-transform duration-150 ease-out group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-checked:bg-primary-foreground data-unchecked:translate-x-0 group-data-[size=default]/switch:data-checked:translate-x-4 group-data-[size=sm]/switch:data-checked:translate-x-3"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
