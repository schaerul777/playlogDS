import { onBeforeUnmount, onMounted, shallowRef, type ShallowRef } from "vue"

// Playlog: a Vue port of the scroll behaviour in `@shadcn/react/message-scroller` 0.3.1 (MIT), which has no Vue build.
// The person's message is the scroll anchor: it is scrolled to the top (a hidden spacer makes room) and the reply streams
// in below it; with `autoScroll` the view follows the live edge until the person scrolls up. Names follow the React source.

export type DefaultScrollPosition = "start" | "end" | "last-anchor"
export type ButtonDirection = "start" | "end"
export type ScrollAlign = "start" | "center" | "end" | "nearest"
export type ScrollOptions = { align?: ScrollAlign; behavior?: ScrollBehavior; scrollMargin?: number }
export type Scrollable = { start: boolean; end: boolean }
export type VisibilityState = { currentAnchorId: string | null; visibleMessageIds: string[] }
export type ProviderOptions = {
  autoScroll: () => boolean
  defaultScrollPosition: () => DefaultScrollPosition
  scrollEdgeThreshold: () => number
  scrollPreviousItemPeek: () => number
  scrollMargin: () => number
}

const EPS = 0.5
const AUTOSCROLL_FLAG_MS = 180
const NO_SCROLL: Scrollable = { start: false, end: false }
const NO_VISIBILITY: VisibilityState = { currentAnchorId: null, visibleMessageIds: [] }

type Mode = "following-bottom" | "free-scrolling" | "settling-jump" | "anchored-to-message"

// A tiny external store: a shallow ref (so Vue components react to it) plus subscribers (for the first/last hooks).
function createStore<T>(initial: T, equal: (a: T, b: T) => boolean) {
  const value: ShallowRef<T> = shallowRef(initial)
  const listeners = new Set<() => void>()
  return {
    value,
    getSnapshot: () => value.value,
    hasListeners: () => listeners.size > 0,
    setSnapshot(next: T) {
      if (equal(value.value, next)) return
      value.value = next
      listeners.forEach((l) => l())
    },
    subscribe(listener: () => void, onFirst?: () => void, onLast?: () => void) {
      const first = listeners.size === 0
      listeners.add(listener)
      if (first) onFirst?.()
      return () => {
        listeners.delete(listener)
        if (listeners.size === 0) onLast?.()
      }
    },
  }
}
const sameScrollable = (a: Scrollable, b: Scrollable) => a.start === b.start && a.end === b.end
const sameVisibility = (a: VisibilityState, b: VisibilityState) =>
  a.currentAnchorId === b.currentAnchorId && a.visibleMessageIds.length === b.visibleMessageIds.length && a.visibleMessageIds.every((id, i) => id === b.visibleMessageIds[i])

const px = (v: string | null | undefined) => {
  const n = Number.parseFloat(v ?? "")
  return Number.isFinite(n) ? n : 0
}
const padding = (el: Element) => {
  const cs = window.getComputedStyle(el)
  return { start: px(cs.paddingBlockStart || cs.paddingTop), end: px(cs.paddingBlockEnd || cs.paddingBottom) }
}
const rowGap = (el: Element | null) => {
  if (!el) return 0
  const cs = window.getComputedStyle(el)
  return px(cs.rowGap === "normal" ? cs.gap : cs.rowGap)
}
const items = (content: HTMLElement, spacer: HTMLElement | null) => Array.from(content.children).filter((c): c is HTMLElement => c instanceof HTMLElement && c !== spacer)
const isAnchor = (el: HTMLElement | undefined) => el?.dataset.scrollAnchor === "true"
const topIn = (el: HTMLElement, viewport: HTMLElement) => el.getBoundingClientRect().top - viewport.getBoundingClientRect().top
const offsetIn = (el: HTMLElement, viewport: HTMLElement) => topIn(el, viewport) + viewport.scrollTop
const maxScroll = (v: HTMLElement) => Math.max(0, v.scrollHeight - v.clientHeight)

// Height of everything in the content, including the bottom padding.
function contentExtent(content: HTMLElement, spacer: HTMLElement | null, viewport: HTMLElement) {
  const pad = padding(content)
  const vb = viewport.getBoundingClientRect()
  let total = pad.start + pad.end
  for (const item of items(content, spacer)) total = Math.max(total, item.getBoundingClientRect().bottom - vb.top + viewport.scrollTop + pad.end)
  return total
}

function computeScrollable(content: HTMLElement | null, threshold: number, spacer: HTMLElement | null, viewport: HTMLElement | null): Scrollable {
  if (!viewport || !content) return NO_SCROLL
  const extent = contentExtent(content, spacer, viewport)
  return { start: viewport.scrollTop > threshold, end: extent - viewport.scrollTop - viewport.clientHeight > threshold }
}

function computeScrollTop(o: { align: ScrollAlign; element: HTMLElement; scrollMargin: number; spacer: HTMLElement | null; viewport: HTMLElement }) {
  const { align, element, scrollMargin, spacer, viewport } = o
  const top = offsetIn(element, viewport)
  const height = element.getBoundingClientRect().height
  const pad = spacer?.parentElement ? padding(spacer.parentElement) : { start: 0, end: 0 }
  if (align === "center") {
    const room = Math.max(0, viewport.clientHeight - pad.start - pad.end)
    return top - pad.start - (room - height) / 2 - scrollMargin
  }
  if (align === "end") return top - viewport.clientHeight + height + pad.end + scrollMargin
  if (align === "nearest") {
    const bottom = top + height
    const lo = viewport.scrollTop + pad.start
    const hi = viewport.scrollTop + viewport.clientHeight - pad.end
    return top >= lo && bottom <= hi ? viewport.scrollTop : top < lo ? top - pad.start - scrollMargin : bottom - viewport.clientHeight + pad.end + scrollMargin
  }
  return top - pad.start - scrollMargin
}

export function createMessageScroller(opts: ProviderOptions) {
  // --- state (React refs) ---
  let content: HTMLElement | null = null
  let viewport: HTMLElement | null = null
  let root: HTMLElement | null = null
  let spacer: HTMLElement | null = null
  let spacerHeight = 0
  let mode: Mode = opts.autoScroll() ? "following-bottom" : "free-scrolling"
  let autoscrolling = false
  let autoscrollingTimer: number | null = null
  let streamingTurn: HTMLElement | null = null
  let defaultApplied = false
  let itemCount = 0
  let firstItem: HTMLElement | null = null
  let lastScrollTop = 0
  let prependRestore: { element: HTMLElement; viewportTop: number } | null = null
  let pendingScrollToMessage: { messageId: string; options?: ScrollOptions } | null = null
  let stateFrame: number | null = null
  let visibilityFrame: number | null = null
  let scrollFrame: number | null = null
  let observer: IntersectionObserver | null = null
  const messageElements = new Map<string, HTMLElement>()
  const visibleIds = new Set<string>()
  const handledAnchors = new WeakSet<HTMLElement>()
  const preserveScrollOnPrepend = { current: true }
  let appliedDefault = opts.defaultScrollPosition()

  const initialPending = () => opts.defaultScrollPosition() === "end" || opts.defaultScrollPosition() === "last-anchor"
  const pendingDefaultScroll = createStore<boolean>(initialPending(), (a, b) => a === b)
  const stateStore = createStore<Scrollable>(NO_SCROLL, sameScrollable)
  const visibilityStore = createStore<VisibilityState>(NO_VISIBILITY, sameVisibility)

  const markDefaultApplied = () => {
    defaultApplied = true
    pendingDefaultScroll.setSnapshot(false)
  }

  // --- derived DOM state ---
  function applyAttributes(s: Scrollable) {
    const flag = [s.start && "start", s.end && "end"].filter(Boolean).join(" ")
    for (const el of [root, viewport]) {
      if (!el) continue
      if (flag) el.setAttribute("data-scrollable", flag)
      else el.removeAttribute("data-scrollable")
      el.toggleAttribute("data-autoscrolling", autoscrolling)
    }
  }
  function updateMode(s: Scrollable) {
    const top = viewport?.scrollTop ?? 0
    const scrolledUp = top < lastScrollTop - EPS
    lastScrollTop = top
    if (opts.autoScroll() && !s.end && mode !== "settling-jump" && mode !== "anchored-to-message") mode = "following-bottom"
    else if (mode === "following-bottom" && s.end && scrolledUp && !autoscrolling) mode = "free-scrolling"
  }
  function commitState() {
    const s = computeScrollable(content, opts.scrollEdgeThreshold(), spacer, viewport)
    updateMode(s)
    const shown = mode === "following-bottom" ? { ...s, end: false } : s
    applyAttributes(shown)
    stateStore.setSnapshot(shown)
  }
  function scheduleStateCommit() {
    if (stateFrame === null)
      stateFrame = window.requestAnimationFrame(() => {
        stateFrame = null
        commitState()
      })
  }
  function computeVisibility(): VisibilityState {
    if (!content || !viewport) return NO_VISIBILITY
    const vb = viewport.getBoundingClientRect()
    const line = vb.top + opts.scrollMargin() + opts.scrollPreviousItemPeek()
    const noObserver = typeof IntersectionObserver === "undefined"
    const visible: string[] = []
    let current: string | null = null
    for (const el of items(content, spacer)) {
      const id = el.dataset.messageId
      if (!id) continue
      const anchor = isAnchor(el)
      const rect = anchor || noObserver ? el.getBoundingClientRect() : null
      if (noObserver && rect ? rect.bottom > line && rect.top < vb.bottom : visibleIds.has(id)) visible.push(id)
      if (anchor && rect && rect.top <= line + EPS) current = id
    }
    return visible.length === 0 && current === null ? NO_VISIBILITY : { currentAnchorId: current, visibleMessageIds: visible }
  }
  function scheduleVisibilitySync() {
    if (visibilityStore.hasListeners() && visibilityFrame === null)
      visibilityFrame = window.requestAnimationFrame(() => {
        visibilityFrame = null
        if (visibilityStore.hasListeners()) visibilityStore.setSnapshot(computeVisibility())
      })
  }

  // --- actions ---
  function setAutoscrolling(on: boolean) {
    if (autoscrollingTimer !== null) {
      window.clearTimeout(autoscrollingTimer)
      autoscrollingTimer = null
    }
    if (autoscrolling !== on) {
      autoscrolling = on
      commitState()
    }
    if (on)
      autoscrollingTimer = window.setTimeout(() => {
        autoscrollingTimer = null
        autoscrolling = false
        commitState()
      }, AUTOSCROLL_FLAG_MS)
  }
  function setSpacerHeight(h: number) {
    if (!spacer) return
    const next = Math.max(0, Math.ceil(h))
    if (spacerHeight !== next) {
      spacerHeight = next
      spacer.hidden = next === 0
      spacer.style.height = `${next}px`
      spacer.style.marginTop = next > 0 ? `${-rowGap(spacer.parentElement)}px` : ""
    }
  }
  function scrollTo(top: number, o: { behavior?: ScrollBehavior; autoscrolling?: boolean } = {}) {
    const v = viewport
    if (!v) return
    const target = Math.max(0, top)
    if (Math.abs(v.scrollTop - target) <= EPS) {
      v.scrollTop = target
      commitState()
      return
    }
    if (o.autoscrolling) setAutoscrolling(true)
    v.scrollTo({ top: target, behavior: o.behavior ?? "auto" })
    scheduleStateCommit()
  }
  function scrollToStart({ behavior = "auto" }: { behavior?: ScrollBehavior } = {}) {
    if (!viewport) return false
    setSpacerHeight(0)
    streamingTurn = null
    mode = "free-scrolling"
    scrollTo(0, { behavior })
    scheduleVisibilitySync()
    return true
  }
  function scrollToEnd({ behavior = "auto" }: { behavior?: ScrollBehavior } = {}) {
    const v = viewport
    if (!v) return false
    setSpacerHeight(0)
    streamingTurn = null
    mode = opts.autoScroll() ? "following-bottom" : "free-scrolling"
    scrollTo(maxScroll(v), { autoscrolling: true, behavior })
    scheduleVisibilitySync()
    return true
  }
  function scrollToElement(el: HTMLElement, o: ScrollOptions = {}, { keepPreviousPeek = false } = {}) {
    const c = content
    const v = viewport
    if (!c || !v || !c.contains(el)) return false
    const margin = o.scrollMargin ?? opts.scrollMargin()
    const top = computeScrollTop({ align: o.align ?? "start", element: el, scrollMargin: keepPreviousPeek ? margin + opts.scrollPreviousItemPeek() : margin, spacer, viewport: v })
    // The spacer makes the content long enough to scroll the target to the top.
    setSpacerHeight(top + v.clientHeight - contentExtent(c, spacer, v))
    prependRestore = { element: el, viewportTop: topIn(el, v) }
    mode = keepPreviousPeek ? "anchored-to-message" : "settling-jump"
    streamingTurn = keepPreviousPeek ? el : null
    scrollTo(top, { behavior: o.behavior })
    scheduleVisibilitySync()
    return true
  }
  function reanchorToAnchoredMessage() {
    const t = streamingTurn
    if (!t || !t.isConnected || mode !== "anchored-to-message") return false
    return scrollToElement(t, { align: "start" }, { keepPreviousPeek: true })
  }
  function scrollToMessage(id: string, o?: ScrollOptions) {
    const el = messageElements.get(id)
    if (el) {
      markDefaultApplied()
      if (scrollToElement(el, o)) pendingScrollToMessage = null
      else pendingScrollToMessage = { messageId: id, options: o }
      return true
    }
    if (itemCount === 0) {
      pendingScrollToMessage = { messageId: id, options: o }
      markDefaultApplied()
      return true
    }
    return false
  }
  function flushPendingScrollToMessage() {
    const p = pendingScrollToMessage
    if (!p) return false
    const el = messageElements.get(p.messageId)
    if (!el || !scrollToElement(el, p.options)) return false
    pendingScrollToMessage = null
    markDefaultApplied()
    return true
  }
  function restorePrependedScroll() {
    const r = prependRestore
    const v = viewport
    if (!r || !v || !r.element.isConnected) return false
    const delta = topIn(r.element, v) - r.viewportTop
    if (Math.abs(delta) <= EPS) return false
    v.scrollTop += delta
    r.viewportTop = topIn(r.element, v)
    scheduleStateCommit()
    scheduleVisibilitySync()
    return true
  }
  function captureRestoreAnchor() {
    const c = content
    const v = viewport
    if (!c || !v) {
      prependRestore = null
      return
    }
    const vb = v.getBoundingClientRect()
    const first = items(c, spacer).find((el) => el.dataset.messageId && el.getBoundingClientRect().bottom > vb.top && el.getBoundingClientRect().top < vb.bottom)
    prependRestore = first ? { element: first, viewportTop: topIn(first, v) } : null
  }
  function scheduleFlushPending() {
    if (scrollFrame === null)
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = null
        if (flushPendingScrollToMessage()) captureRestoreAnchor()
      })
  }
  function applyDefaultScroll() {
    const pos = opts.defaultScrollPosition()
    if (!pos || defaultApplied || itemCount === 0) return false
    let done: boolean
    if (pos === "last-anchor") {
      const c = content
      const v = viewport
      const list = c ? items(c, spacer) : []
      const last = [...list].reverse().find((el) => isAnchor(el)) ?? null
      if (!c || !v || !last) done = scrollToEnd({ behavior: "auto" })
      else done = contentExtent(c, spacer, v) - offsetIn(last, v) <= v.clientHeight ? scrollToEnd({ behavior: "auto" }) : scrollToElement(last, { align: "start" }, { keepPreviousPeek: true })
    } else done = pos === "end" ? scrollToEnd({ behavior: "auto" }) : scrollToStart({ behavior: "auto" })
    if (done) {
      markDefaultApplied()
      return true
    }
    return false
  }

  // --- reactions to the DOM ---
  function handleContentChange() {
    const c = content
    if (!c) return
    const list = items(c, spacer)
    const before = itemCount
    const prevFirst = firstItem
    itemCount = list.length
    firstItem = list[0] ?? null
    ;(() => {
      if (flushPendingScrollToMessage()) return
      if (before === 0) {
        if (applyDefaultScroll() || (list.length > 0 && opts.autoScroll() && scrollToEnd({ behavior: "auto" }))) return
        commitState()
        scheduleVisibilitySync()
        return
      }
      const idx = prevFirst ? list.indexOf(prevFirst) : -1
      if (preserveScrollOnPrepend.current && idx > 0) {
        restorePrependedScroll()
        return
      }
      if (list.length > before) {
        const anchor = list.slice(before).find((el) => isAnchor(el))
        if (anchor) {
          const anchorsAdded = list.slice(before).filter((el) => isAnchor(el)).length
          if (opts.autoScroll() && mode === "following-bottom" && anchorsAdded > 1) {
            scrollToEnd({ behavior: "auto" })
            return
          }
          scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true })
          handledAnchors.add(anchor)
          return
        }
      }
      if (list.length === before) {
        const anchor = list.find((el) => isAnchor(el) && !handledAnchors.has(el))
        if (anchor) {
          scrollToElement(anchor, { align: "start" }, { keepPreviousPeek: true })
          handledAnchors.add(anchor)
          return
        }
      }
      if (mode === "following-bottom" && opts.autoScroll()) scrollToEnd({ behavior: "auto" })
      else {
        commitState()
        scheduleVisibilitySync()
      }
    })()
    captureRestoreAnchor()
  }
  function handleResize() {
    if (mode === "following-bottom" && opts.autoScroll()) {
      scrollToEnd({ behavior: "auto" })
      return
    }
    const before = spacerHeight
    if (reanchorToAnchoredMessage()) {
      if (opts.autoScroll() && before > 0 && spacerHeight === 0) scrollToEnd({ behavior: "auto" })
      return
    }
    scheduleStateCommit()
    scheduleVisibilitySync()
  }
  function observeVisibility() {
    const v = viewport
    if (!v || !visibilityStore.hasListeners()) return
    if (typeof IntersectionObserver === "undefined") {
      scheduleVisibilitySync()
      return
    }
    if (!observer)
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const id = (e.target as HTMLElement).dataset.messageId
            if (!id) continue
            if (e.isIntersecting) visibleIds.add(id)
            else visibleIds.delete(id)
          }
          scheduleVisibilitySync()
        },
        { root: v, rootMargin: `${-(opts.scrollMargin() + opts.scrollPreviousItemPeek())}px 0px 0px 0px`, threshold: [0, 0.01, 0.5, 1] },
      )
    messageElements.forEach((el) => observer?.observe(el))
    scheduleVisibilitySync()
  }
  function unobserveVisibility() {
    if (visibilityFrame !== null) {
      window.cancelAnimationFrame(visibilityFrame)
      visibilityFrame = null
    }
    observer?.disconnect()
    observer = null
    visibleIds.clear()
    visibilityStore.setSnapshot(NO_VISIBILITY)
  }
  function registerMessage(id: string, el: HTMLElement | null, previous?: HTMLElement | null) {
    if (el) {
      messageElements.set(id, el)
      observer?.observe(el)
      scheduleVisibilitySync()
      if (pendingScrollToMessage?.messageId === id) scheduleFlushPending()
      return
    }
    if (previous && messageElements.get(id) === previous) {
      messageElements.delete(id)
      visibleIds.delete(id)
      observer?.unobserve(previous)
      scheduleVisibilitySync()
    }
  }
  function userScrollIntent() {
    if (mode === "following-bottom" || mode === "anchored-to-message" || mode === "settling-jump") {
      streamingTurn = null
      mode = "free-scrolling"
    }
  }
  const refreshAttributes = () => applyAttributes(stateStore.getSnapshot())
  function syncAfterScroll() {
    commitState()
    scheduleVisibilitySync()
    captureRestoreAnchor()
  }

  // --- lifecycle (call from the provider component) ---
  function onProviderMounted() {
    if (!applyDefaultScroll() && itemCount === 0) markDefaultApplied()
    if (opts.autoScroll() && mode === "following-bottom" && itemCount > 0) scrollToEnd({ behavior: "auto" })
    else commitState()
  }
  function dispose() {
    for (const f of [stateFrame, visibilityFrame, scrollFrame]) if (f !== null) window.cancelAnimationFrame(f)
    if (autoscrollingTimer !== null) window.clearTimeout(autoscrollingTimer)
    observer?.disconnect()
    observer = null
  }

  return {
    handleContentChange,
    handleResize,
    observeVisibility,
    unobserveVisibility,
    registerMessage,
    pendingDefaultScroll,
    stateStore,
    visibilityStore,
    preserveScrollOnPrepend,
    scrollToEnd,
    scrollToMessage,
    scrollToStart,
    syncAfterScroll,
    userScrollIntent,
    getViewport: () => viewport,
    setRoot(el: HTMLElement | null) {
      root = el
      if (el) refreshAttributes()
    },
    setViewport(el: HTMLElement | null) {
      viewport = el
      if (el) refreshAttributes()
    },
    setContent(el: HTMLElement | null) {
      content = el
    },
    setSpacer(el: HTMLElement | null) {
      spacer = el
    },
    onProviderMounted,
    dispose,
    // Re-run the default position when the prop changes (React resets the applied flag).
    notePropChange() {
      const now = opts.defaultScrollPosition()
      if (now !== appliedDefault) {
        appliedDefault = now
        defaultApplied = false
      }
    },
  }
}
export type MessageScrollerContext = ReturnType<typeof createMessageScroller>

// Subscribe a Vue component to a store for as long as it is mounted (the visibility store starts the observer on the first one).
export function useVisibilityStore(ctx: MessageScrollerContext) {
  let stop: (() => void) | null = null
  onMounted(() => {
    stop = ctx.visibilityStore.subscribe(() => {}, ctx.observeVisibility, ctx.unobserveVisibility)
  })
  onBeforeUnmount(() => stop?.())
  return ctx.visibilityStore.value
}
