// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=121-1118
// source=packages/ui-vue/src/components/code-block/CodeBlock.vue
// component=CodeBlock
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('variant', { default: 'default', destructive: 'destructive' })
const size = instance.getEnum('size', { default: 'default', sm: 'sm' })
const title = instance.getString('title')
const code = instance.getString('code')
const showHeader = instance.getBoolean('show code-block-header')
const variantAttr = variant !== 'default' ? figma.code` variant="${variant}"` : ''
const sizeAttr = size !== 'default' ? figma.code` size="${size}"` : ''
const literal = JSON.stringify(code)

// Syntax colours are not in Figma props: in code, highlight with useHighlightedCode (see the playground).
const headerCode = showHeader
  ? figma.code`
  <CodeBlockHeader>
    <CodeBlockTitle>${title}</CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockCopyButton :value="${literal}" />
    </CodeBlockActions>
  </CodeBlockHeader>`
  : ''

export default {
  example: figma.code`<CodeBlock${variantAttr}${sizeAttr}>${headerCode}
  <CodeBlockContent>{{ ${literal} }}</CodeBlockContent>
</CodeBlock>`,
  imports: [
    'import { CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton, CodeBlockHeader, CodeBlockTitle } from "@workspace/ui-vue/components/code-block"',
  ],
  id: 'code-block',
  metadata: { nestable: true },
}
