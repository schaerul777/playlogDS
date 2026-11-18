import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        // Playlog: COMPONENT-SPECS Avatar. Circle (brand rule), sm 24 / default 32 / lg 40.
        "group/avatar relative flex size-8 shrink-0 rounded-(--pl-radius-full) select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-(--pl-radius-full) object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        // Playlog: initials in ink-heading on accent, 12/16 semibold (lg 14/20).
        "flex size-full items-center justify-center rounded-(--pl-radius-full) bg-accent text-caption font-semibold text-ink-heading group-data-[size=lg]/avatar:text-label",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        // Playlog: status dot 8 / 10 / 12, success by default (pass a bg-* status class to change it), ringed in the page color.
        // Playlog: pair it with screen-reader text so status is never color alone.
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-(--pl-radius-full) bg-success text-primary-foreground ring-(length:--pl-ring-separator-width) ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        // Playlog: overlap 8, each avatar ringed in the page color at --pl-ring-separator-width.
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-(length:--pl-ring-separator-width) *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-(--pl-radius-full) bg-accent text-caption font-semibold text-ink-heading ring-(length:--pl-ring-separator-width) ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=lg]/avatar-group:text-label group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
