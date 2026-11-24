import type { ComputedRef, Ref } from "vue"
import { createContext } from "reka-ui"
import { onMounted, onUnmounted, ref } from "vue"

export const SIDEBAR_COOKIE_NAME = "sidebar_state"
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
// Playlog: 248px (--pl-sidebar-width) on desktop and in the mobile sheet.
export const SIDEBAR_WIDTH = "var(--pl-sidebar-width)"
export const SIDEBAR_WIDTH_MOBILE = "var(--pl-sidebar-width)"
export const SIDEBAR_WIDTH_ICON = "3rem"
export const SIDEBAR_KEYBOARD_SHORTCUT = "b"
export const SIDEBAR_MOBILE_BREAKPOINT = 768

export const [useSidebar, provideSidebarContext] = createContext<{
  state: ComputedRef<"expanded" | "collapsed">
  open: Ref<boolean>
  setOpen: (value: boolean) => void
  isMobile: Ref<boolean>
  openMobile: Ref<boolean>
  setOpenMobile: (value: boolean) => void
  toggleSidebar: () => void
}>("Sidebar")

// Playlog: same query as the React `useIsMobile` hook (below 768px). Own code instead of @vueuse/core.
export function useIsMobile() {
  const query = `(max-width: ${SIDEBAR_MOBILE_BREAKPOINT - 1}px)`
  const isMobile = ref(typeof window !== "undefined" && window.matchMedia(query).matches)
  let mql: MediaQueryList | undefined
  const onChange = () => {
    isMobile.value = mql?.matches ?? false
  }
  onMounted(() => {
    mql = window.matchMedia(query)
    isMobile.value = mql.matches
    mql.addEventListener("change", onChange)
  })
  onUnmounted(() => mql?.removeEventListener("change", onChange))
  return isMobile
}
