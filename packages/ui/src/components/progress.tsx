import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

function Progress({
  className,
  children,
  value,
  ...props
}: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      // Playlog: COMPONENT-SPECS Progress. Label left and value right, 8 above the track.
      className={cn("flex flex-wrap items-baseline gap-x-3 gap-y-2", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        // Playlog: track muted, 8 high, square-cut (radius 0).
        "relative flex h-2 w-full items-center overflow-x-hidden bg-muted",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      // Playlog: fill Playlog Green (--pl-brand-accent, BRAND.md), eased at --pl-duration-fast.
      className={cn("h-full bg-brand-accent transition-all duration-(--pl-duration-fast) ease-out", className)}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-label text-foreground", className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-caption text-muted-foreground tabular-nums",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
