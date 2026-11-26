// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=77-636
// source=packages/ui-vue/src/components/avatar/AvatarGroup.vue
// component=AvatarGroup
import figma from 'figma'
const instance = figma.selectedInstance

const avatars = instance.findConnectedInstances((node) => node.name !== 'avatar-group-count')
const count = instance.findInstance('avatar-group-count')
let countText = '+4'
if (count && count.type === 'INSTANCE') {
  const t = count.findText('avatar-fallback')
  if (t && 'textContent' in t) countText = t.textContent
}

// Each avatar renders through its own template, joined as nested sections (no string concatenation).
let avatarsCode = figma.code``
for (const avatar of avatars) {
  avatarsCode = figma.code`${avatarsCode}
  ${avatar.executeTemplate().example}`
}

export default {
  example: figma.code`<AvatarGroup>${avatarsCode}
  <AvatarGroupCount>${countText}</AvatarGroupCount>
</AvatarGroup>`,
  imports: ['import { AvatarGroup, AvatarGroupCount } from "@workspace/ui-vue/components/avatar"'],
  id: 'avatar-group',
  metadata: { nestable: false },
}
