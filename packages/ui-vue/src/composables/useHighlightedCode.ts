import { computed, shallowRef, toValue, watchEffect, type MaybeRefOrGetter } from "vue"
import { loadHighlighter, type GrammarState, type HighlightedLine, type LoadedHighlighter } from "@workspace/ui-vue/lib/highlighter"

export type CodeLine = string | HighlightedLine

// Port of useHighlightedCode (packages/ui/src/hooks/use-highlighted-code.ts). Returns one entry per line: a plain string
// until the language has loaded (or if it is not listed), then token arrays. While the code streams, only the new complete
// lines are tokenized, starting from the grammar state of the last one; the last, still-growing line is tokenized on each
// change.
export function useHighlightedCode(value: MaybeRefOrGetter<string>, language: MaybeRefOrGetter<string>) {
  const loaded = shallowRef<{ language: string; highlighter: LoadedHighlighter | null } | null>(null)

  watchEffect((onCleanup) => {
    const lang = toValue(language)
    let cancelled = false
    onCleanup(() => (cancelled = true))
    loadHighlighter(lang)
      .then((next) => {
        if (!cancelled) loaded.value = { language: lang, highlighter: next }
      })
      .catch(() => {})
  })

  // The complete lines, highlighted. Not reactive: it only caches work between runs of the computed below.
  let done: { highlighter: LoadedHighlighter | null; text: string; lines: HighlightedLine[]; state?: GrammarState } = {
    highlighter: null,
    text: "",
    lines: [],
  }

  return computed<CodeLine[]>(() => {
    const raw = toValue(value)
    // A trailing newline would render as an extra empty line.
    const code = raw.endsWith("\n") ? raw.slice(0, -1) : raw
    const lang = toValue(language)
    const highlighter = loaded.value?.language === lang ? loaded.value.highlighter : null
    if (!highlighter) return code.split("\n")

    let next = done
    if (next.highlighter !== highlighter || !code.startsWith(next.text)) {
      next = { highlighter, text: "", lines: [] }
    }
    const end = code.lastIndexOf("\n") + 1
    if (end > next.text.length) {
      const result = highlighter.highlight(code.slice(next.text.length, end - 1), next.state)
      next = { highlighter, text: code.slice(0, end), lines: [...next.lines, ...result.lines], state: result.state }
    }
    done = next
    // The last line is still being written, so it is tokenized on every run.
    const tail = code.slice(end)
    return [...next.lines, highlighter.highlight(tail, next.state).lines[0] ?? []]
  })
}
