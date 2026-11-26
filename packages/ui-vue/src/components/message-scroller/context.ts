import { createContext } from "reka-ui"
import type { MessageScrollerContext } from "./scroller"
import { useVisibilityStore } from "./scroller"

export const [injectMessageScroller, provideMessageScroller] = createContext<MessageScrollerContext>("MessageScroller")

/** `scrollToEnd`, `scrollToMessage` and `scrollToStart` (same as React `useMessageScroller`). */
export function useMessageScroller() {
  const { scrollToEnd, scrollToMessage, scrollToStart } = injectMessageScroller()
  return { scrollToEnd, scrollToMessage, scrollToStart }
}
/** A ref holding `{ start, end }`: whether there is more to scroll in each direction. */
export function useMessageScrollerScrollable() {
  return injectMessageScroller().stateStore.value
}
/** A ref holding `{ currentAnchorId, visibleMessageIds }`. Observing starts while a component uses it. */
export function useMessageScrollerVisibility() {
  return useVisibilityStore(injectMessageScroller())
}
