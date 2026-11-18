import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      // Playlog: muted fill, radius 4. Pulse stops for reduced motion. Decorative: set aria-busy on the loading region.
      className={cn("animate-pulse rounded-md bg-muted motion-reduce:animate-none", className)}
      {...props}
    />
  )
}

export { Skeleton }
