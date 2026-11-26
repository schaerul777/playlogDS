import { onBeforeUnmount, ref } from "vue"

// Copies `text()` and shows "Copied" for 2 seconds.
export function useCopy(text: () => string) {
  const copied = ref(false)
  let timer: number | undefined
  function copy() {
    return navigator.clipboard
      .writeText(text())
      .then(() => {
        copied.value = true
        window.clearTimeout(timer)
        timer = window.setTimeout(() => (copied.value = false), 2000)
      })
      .catch(() => {})
  }
  onBeforeUnmount(() => window.clearTimeout(timer))
  return { copied, copy }
}
