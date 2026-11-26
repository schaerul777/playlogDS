// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=98-892
// source=packages/ui-vue/src/components/item/ItemMedia.vue
// component=ItemMedia
import figma from 'figma'
const instance = figma.selectedInstance

// `size` is Figma-only: the image size follows the parent Item size in code.
const variant = instance.getEnum('variant', { icon: 'icon', image: 'image' })
let iconCode
if (variant === 'icon') {
  const icon = instance.getInstanceSwap('icon')
  if (icon && icon.type === 'INSTANCE') iconCode = icon.executeTemplate().example
}

export default {
  example: variant === 'icon'
    ? figma.code`<ItemMedia variant="icon">
  ${iconCode || ''}
</ItemMedia>`
    : figma.code`<ItemMedia variant="image">
  <img src="" alt="" />
</ItemMedia>`,
  imports: ['import { ItemMedia } from "@workspace/ui-vue/components/item"'],
  id: 'item-media',
  metadata: { nestable: true },
}
