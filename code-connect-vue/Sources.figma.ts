// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=124-1226
// source=packages/ui-vue/src/components/ai-elements/Sources.vue
// component=Sources
import figma from 'figma'
const instance = figma.selectedInstance

// `open` is Figma-only (code: collapsed by default). The titles come from the link rows when the set is open.
const titles = instance
  .findLayers((layer) => layer.name === 'source-title')
  .map((layer) => (layer as { textContent: string }).textContent)
const list = (titles.length ? titles : ['Source title'])
  .map((title) => `{ url: 'https://example.com', title: '${title.replace(/'/g, "\\'")}' }`)
  .join(', ')

export default {
  example: figma.code`<Sources :sources="[${list}]" />`,
  imports: ['import { Sources } from "@workspace/ui-vue/components/ai-elements"'],
  id: 'sources',
  metadata: { nestable: true },
}
