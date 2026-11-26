// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=77-635
// source=packages/ui-vue/src/components/avatar/Avatar.vue
// component=Avatar
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('size', { sm: 'sm', default: 'default', lg: 'lg' })
const initials = instance.getString('initials')
const showBadge = instance.getBoolean('show avatar-badge')
const sizeAttr = size !== 'default' ? figma.code` size="${size}"` : ''
const badgeCode = showBadge
  ? figma.code`
  <AvatarBadge>
    <span class="sr-only">Online</span>
  </AvatarBadge>`
  : ''

export default {
  example: figma.code`<Avatar${sizeAttr}>
  <AvatarImage src="" alt="" />
  <AvatarFallback>${initials}</AvatarFallback>${badgeCode}
</Avatar>`,
  imports: ['import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@workspace/ui-vue/components/avatar"'],
  id: 'avatar',
  metadata: { nestable: true },
}
