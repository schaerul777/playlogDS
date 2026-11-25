import { createContext } from "reka-ui"

// Shared by Drawer and its parts: the same two settings the React Drawer keeps in context (the primitive keeps modal itself).
export const [injectDrawerContext, provideDrawerContext] = createContext<{
  hasSnapPoints: () => boolean
  showSwipeHandle: () => boolean
}>("Drawer")
