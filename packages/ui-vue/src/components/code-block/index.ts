import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as CodeBlock } from "./CodeBlock.vue"
export { default as CodeBlockHeader } from "./CodeBlockHeader.vue"
export { default as CodeBlockTitle } from "./CodeBlockTitle.vue"
export { default as CodeBlockActions } from "./CodeBlockActions.vue"
export { default as CodeBlockCopyButton } from "./CodeBlockCopyButton.vue"
export { default as CodeBlockContent } from "./CodeBlockContent.vue"
export { default as CodeBlockLine } from "./CodeBlockLine.vue"
export { default as CodeBlockFooter } from "./CodeBlockFooter.vue"

// Playlog: COMPONENT-SPECS Code Block. Radius 8, 1px `border`, `muted` fill (an inset area), foreground text, mono font
// (Reddit Mono, code only). Syntax colours are the --pl-syntax-* tokens through shiki's CSS-variable theme (see
// lib/highlighter.ts); everything else is foreground. Diff lines carry a + or − marker, not only a tint.
export const codeBlockVariants = cva(
  [
    "group/code-block relative flex w-full min-w-0 flex-col overflow-hidden rounded-lg border-(length:--pl-border-width) bg-muted text-body-sm data-[size=sm]:text-caption",
    // Playlog: the code viewport is focusable, so the block takes the 2px focus ring when it has focus.
    "has-[>[data-slot=code-block-content]:focus-visible]:outline-(length:--pl-focus-ring-width) has-[>[data-slot=code-block-content]:focus-visible]:outline-offset-(--pl-focus-ring-offset) has-[>[data-slot=code-block-content]:focus-visible]:outline-solid has-[>[data-slot=code-block-content]:focus-visible]:outline-ring",
    // Playlog: syntax colours (tokens only).
    "[--shiki-foreground:var(--foreground)] [--shiki-background:transparent] [--shiki-token-keyword:var(--pl-syntax-keyword)] [--shiki-token-string:var(--pl-syntax-string)] [--shiki-token-string-expression:var(--pl-syntax-string)] [--shiki-token-constant:var(--pl-syntax-number)] [--shiki-token-comment:var(--pl-syntax-comment)] [--shiki-token-function:var(--foreground)] [--shiki-token-parameter:var(--foreground)] [--shiki-token-punctuation:var(--foreground)] [--shiki-token-link:var(--pl-syntax-keyword)]",
  ],
  {
    variants: {
      variant: {
        default: "border-border text-foreground",
        destructive: "border-danger-text text-danger-text",
      },
    },
    defaultVariants: { variant: "default" },
  },
)
export type CodeBlockVariants = VariantProps<typeof codeBlockVariants>

// Playlog: added = success-surface with a + in success-text, removed = danger-surface with a − in danger-text,
// highlighted = surface-selected.
export const codeBlockLineVariants = cva(
  "relative -mx-4 block min-h-lh px-4 group-data-[size=sm]/code-block:-mx-3 group-data-[size=sm]/code-block:px-3 before:min-w-6 before:text-end before:text-muted-foreground after:absolute after:start-1 after:top-0 after:select-none in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:gap-x-3 in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']",
  {
    variants: {
      variant: {
        default: "",
        added: "bg-success-surface after:text-success-text after:content-['+']",
        removed: "bg-danger-surface after:text-danger-text after:content-['−']",
        highlighted: "bg-surface-selected",
      },
    },
    defaultVariants: { variant: "default" },
  },
)
export type CodeBlockLineVariants = VariantProps<typeof codeBlockLineVariants>

export { useHighlightedCode, type CodeLine } from "@workspace/ui-vue/composables/useHighlightedCode"
