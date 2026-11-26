import { nextTick, onBeforeUnmount, onMounted, ref, type Ref } from "vue"

export type Point = { x: number; y: number }
export type Plot = { left: number; top: number; width: number; height: number }

// Playlog: pointer and keyboard interaction shared by Bar, Line and Area. Unovis draws the marks; this owns "which category is
// active" so hover and the arrow keys (the React `accessibilityLayer`) show the same tooltip and cursor.
// `getAnchors` returns one point per category in root coordinates; `axis` is the axis the categories run along.
export function useChartInteraction(root: Ref<HTMLElement | null>, getAnchors: () => Point[], axis: Ref<"x" | "y">) {
  const anchors = ref<Point[]>([])
  const plot = ref<Plot>({ left: 0, top: 0, width: 0, height: 0 })
  const active = ref<number | null>(null)
  // Widest label on the left axis; Recharts gives that axis a fixed 60px, so the chart adds margin to match (see `leftMargin`).
  const labelWidth = ref(0)
  const pointer = ref<Point | null>(null) // set while hovering; null for keyboard focus

  function measure() {
    const el = root.value
    if (!el) return
    anchors.value = getAnchors()
    const svg = el.querySelector("svg")
    const comp = svg?.querySelector<SVGGElement>("g[class*='-component']:not([axis-type])")
    const clip = svg?.querySelector("clipPath rect")
    if (!svg || !comp || !clip) return
    const texts = Array.from(svg?.querySelectorAll<SVGTextElement>("g[axis-type='y'] .tick text") ?? [])
    const widest = Math.max(0, ...texts.map((t) => t.getBBox().width))
    if (Math.abs(widest - labelWidth.value) > 0.5) labelWidth.value = widest
    const rootBox = el.getBoundingClientRect()
    const svgBox = svg.getBoundingClientRect()
    const t = /translate\(([-\d.e]+)[ ,]+([-\d.e]+)\)/.exec(comp.getAttribute("transform") ?? "")
    const tx = Number(t?.[1] ?? 0)
    const ty = Number(t?.[2] ?? 0)
    // The clip rect is 2px larger than the plot on every side.
    plot.value = {
      left: svgBox.left - rootBox.left + tx,
      top: svgBox.top - rootBox.top + ty,
      width: Number(clip.getAttribute("width")) - 4,
      height: Number(clip.getAttribute("height")) - 4,
    }
  }
  function scheduleMeasure() {
    void nextTick(() => requestAnimationFrame(measure))
  }
  let observer: ResizeObserver | undefined
  onMounted(() => {
    scheduleMeasure()
    if (root.value && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(scheduleMeasure)
      observer.observe(root.value)
    }
  })
  onBeforeUnmount(() => observer?.disconnect())

  function nearest(event: PointerEvent): number | null {
    const el = root.value
    if (!el || !anchors.value.length) return null
    const box = el.getBoundingClientRect()
    const p = axis.value === "x" ? event.clientX - box.left : event.clientY - box.top
    let best = 0
    let dist = Infinity
    anchors.value.forEach((a, i) => {
      const d = Math.abs((axis.value === "x" ? a.x : a.y) - p)
      if (d < dist) {
        dist = d
        best = i
      }
    })
    return best
  }
  function inPlot(event: PointerEvent) {
    const el = root.value
    if (!el) return false
    const box = el.getBoundingClientRect()
    const x = event.clientX - box.left
    const y = event.clientY - box.top
    const p = plot.value
    return x >= p.left && x <= p.left + p.width && y >= p.top && y <= p.top + p.height
  }
  function onPointerMove(event: PointerEvent) {
    if (event.pointerType === "touch" && event.type === "pointerleave") return
    if (!inPlot(event)) return onPointerLeave()
    const el = root.value!
    const box = el.getBoundingClientRect()
    pointer.value = { x: event.clientX - box.left, y: event.clientY - box.top }
    active.value = nearest(event)
  }
  function onPointerLeave() {
    pointer.value = null
    if (!hasFocus.value) active.value = null
  }
  const hasFocus = ref(false)
  function onFocus() {
    hasFocus.value = true
    if (active.value === null) active.value = 0
  }
  function onBlur() {
    hasFocus.value = false
    pointer.value = null
    active.value = null
  }
  function onKeydown(event: KeyboardEvent) {
    const n = anchors.value.length
    if (!n) return
    const horizontal = axis.value === "x"
    const next = horizontal ? ["ArrowRight", "ArrowLeft"] : ["ArrowDown", "ArrowUp"]
    let index = active.value ?? -1
    if (event.key === next[0]) index = Math.min(n - 1, index + 1)
    else if (event.key === next[1]) index = Math.max(0, index - 1)
    else if (event.key === "Home") index = 0
    else if (event.key === "End") index = n - 1
    else if (event.key === "Escape") {
      active.value = null
      return
    } else return
    event.preventDefault()
    pointer.value = null
    active.value = index
  }

  return { anchors, labelWidth, plot, active, pointer, measure, scheduleMeasure, onPointerMove, onPointerLeave, onFocus, onBlur, onKeydown }
}
