// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=98-1101
// source=packages/ui/src/components/item.tsx
// component=Item
import figma from 'figma'
const instance = figma.selectedInstance

// `state` is Figma-only. hover and focus come from the browser; selected and disabled apply when the row
// is rendered as a link (data-selected="true", aria-disabled). default is a static row.
const variant = instance.getEnum('variant', { default: 'default', outline: 'outline', muted: 'muted' })
const size = instance.getEnum('size', { default: 'default', sm: 'sm', xs: 'xs' })
const state = instance.getEnum('state', { default: 'default', hover: 'hover', focus: 'focus', selected: 'selected', disabled: 'disabled' })
const title = instance.getString('title')
const description = instance.getString('description')
const showMedia = instance.getBoolean('show item-media')
const showDescription = instance.getBoolean('show item-description')
const showActions = instance.getBoolean('show item-actions')
const actions = instance.getSlot('item-actions')

let mediaCode
if (showMedia) {
  const media = instance.findInstance('item-media')
  if (media && media.type === 'INSTANCE') mediaCode = media.executeTemplate().example
}
const variantAttr = variant !== 'default' ? figma.code` variant="${variant}"` : ''
const sizeAttr = size !== 'default' ? figma.code` size="${size}"` : ''
const linkAttr = state !== 'default' ? figma.code` render={<a href="#" />}` : ''
const stateAttr = state === 'selected' ? ' data-selected="true"' : state === 'disabled' ? ' aria-disabled="true"' : ''
const descriptionCode = showDescription
  ? figma.code`
    <ItemDescription>${description}</ItemDescription>`
  : ''
const actionsCode = showActions
  ? figma.code`
  <ItemActions>${actions || ''}
  </ItemActions>`
  : ''

export default {
  example: figma.code`<Item${variantAttr}${sizeAttr}${linkAttr}${stateAttr}>${mediaCode ? figma.code`
  ${mediaCode}` : ''}
  <ItemContent>
    <ItemTitle>${title}</ItemTitle>${descriptionCode}
  </ItemContent>${actionsCode}
</Item>`,
  imports: [
    'import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@workspace/ui/components/item"',
  ],
  id: 'item',
  metadata: { nestable: true },
}
