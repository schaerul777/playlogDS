<script setup lang="ts">
import type { CodeBlockLineVariants } from "@workspace/ui-vue/components/code-block"
import { CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton, CodeBlockHeader, CodeBlockLine, CodeBlockTitle, useHighlightedCode } from "@workspace/ui-vue/components/code-block"

// Specimen helper (the same as HighlightedCode in apps/web/src/chat-section.tsx): a Code Block with a copy button around
// useHighlightedCode.
const props = defineProps<{
  code: string
  language: string
  title?: string
  lineNumbers?: boolean
  variants?: Record<number, NonNullable<CodeBlockLineVariants["variant"]>>
  size?: "default" | "sm"
  wrap?: boolean
  variant?: "default" | "destructive"
}>()
const lines = useHighlightedCode(() => props.code, () => props.language)
</script>

<template>
  <CodeBlock :size="size" :variant="variant">
    <CodeBlockHeader v-if="title">
      <CodeBlockTitle>{{ title }}</CodeBlockTitle>
      <CodeBlockActions><CodeBlockCopyButton :value="code" /></CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockActions v-else><CodeBlockCopyButton :value="code" /></CodeBlockActions>
    <CodeBlockContent :line-numbers="lineNumbers" :wrap="wrap">
      <CodeBlockLine v-for="(line, index) in lines" :key="index" :variant="variants?.[index + 1]">
        <template v-if="typeof line === 'string'">{{ line }}</template>
        <template v-else><span v-for="(token, i) in line" :key="i" :style="{ color: token.color }">{{ token.content }}</span></template>
      </CodeBlockLine>
    </CodeBlockContent>
  </CodeBlock>
</template>
