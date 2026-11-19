import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS Slider. Track as Progress (muted, 8 high, radius 0); the range is `primary` (a control's fill has
// to read against the track). Thumb 20x20, radius 4, card fill, 2px primary border, 40x40 hit area, focus ring as Switch.
// Single value or range (two thumbs: name them with `thumbLabels`). Optional SliderLabel and SliderValue row as Progress.
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  thumbLabels,
  ...props
}: SliderPrimitive.Root.Props & {
  /** Accessible names for the thumbs, in order, for example ["Minimum price", "Maximum price"]. */
  thumbLabels?: string[]
}) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Root
      className={cn(
        // Playlog: label on the left and value on the right, 8 above the track (as Progress).
        "group/slider flex flex-wrap items-baseline gap-x-3 gap-y-2 data-horizontal:w-full data-vertical:h-full data-vertical:flex-col data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled)",
        className
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      {props.children}
      <SliderPrimitive.Control
        data-slot="slider-control"
        // Playlog: the control is 40 high (the touch target); the track sits in the middle.
        className="relative flex min-h-10 w-full touch-none items-center select-none data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:min-w-10 data-vertical:flex-col"
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden bg-muted select-none data-horizontal:h-2 data-horizontal:w-full data-vertical:h-full data-vertical:w-2"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            // Playlog: eases at --pl-duration-fast, but not while dragging (it would lag behind the thumb).
            className="bg-primary select-none group-not-data-dragging/slider:transition-[width,height] group-not-data-dragging/slider:duration-(--pl-duration-fast) group-not-data-dragging/slider:ease-out data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            index={index}
            getAriaLabel={
              thumbLabels
                ? () => thumbLabels[index] ?? ""
                : _values.length === 1 && props["aria-label"]
                  ? () => props["aria-label"] as string
                  : undefined
            }
            className={cn(
              // Playlog: 20x20 square-cut thumb, card fill, 2px primary border, hit area 40x40.
              "relative block size-5 shrink-0 rounded-md border-2 border-primary bg-card transition-colors duration-(--pl-duration-fast) ease-out select-none after:absolute after:-inset-3 hover:bg-accent",
              // Playlog: focus ring 2px solid --ring with a 2px offset.
              "outline-none has-focus-visible:outline-(length:--pl-focus-ring-width) has-focus-visible:outline-offset-(--pl-focus-ring-offset) has-focus-visible:outline-solid has-focus-visible:outline-ring"
            )}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

function SliderLabel({ className, ...props }: SliderPrimitive.Label.Props) {
  return (
    <SliderPrimitive.Label
      data-slot="slider-label"
      className={cn("text-label text-foreground", className)}
      {...props}
    />
  )
}

function SliderValue({ className, ...props }: SliderPrimitive.Value.Props) {
  return (
    <SliderPrimitive.Value
      data-slot="slider-value"
      className={cn("ml-auto text-caption text-muted-foreground tabular-nums", className)}
      {...props}
    />
  )
}

export { Slider, SliderLabel, SliderValue }
