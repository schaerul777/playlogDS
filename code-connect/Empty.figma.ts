// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=97-884
// source=packages/ui/src/components/empty.tsx
// component=Empty
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('title')
const description = instance.getString('description')
const showMedia = instance.getBoolean('show empty-media')
const showDescription = instance.getBoolean('show empty-description')
const showContent = instance.getBoolean('show empty-content')
const content = instance.getSlot('empty-content')

let mediaCode
if (showMedia) {
  const media = instance.findInstance('empty-media')
  if (media && media.type === 'INSTANCE') mediaCode = media.executeTemplate().example
}
const descriptionCode = showDescription
  ? figma.code`
    <EmptyDescription>${description}</EmptyDescription>`
  : ''
const contentCode = showContent
  ? figma.code`
  <EmptyContent>${content || ''}
  </EmptyContent>`
  : ''

export default {
  example: figma.code`<Empty>
  <EmptyHeader>${mediaCode ? figma.code`
    ${mediaCode}` : ''}
    <EmptyTitle>${title}</EmptyTitle>${descriptionCode}
  </EmptyHeader>${contentCode}
</Empty>`,
  imports: [
    'import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@workspace/ui/components/empty"',
  ],
  id: 'empty',
  metadata: { nestable: false },
}
