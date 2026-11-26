// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=125-1336
// source=packages/ui-vue/src/components/attachment/Attachment.vue
// component=Attachment
import figma from 'figma'
const instance = figma.selectedInstance

// `state` and `size` match the code props. The glyph in the media tile is the Icon layer; the description is
// the text layer attachment-description (it differs per state, so it is edited on the layer).
const state = instance.getEnum('state', {
  done: 'done',
  idle: 'idle',
  uploading: 'uploading',
  processing: 'processing',
  error: 'error',
})
const size = instance.getEnum('size', { default: 'default', sm: 'sm', xs: 'xs' })
const title = instance.getString('title')
const showActions = instance.getBoolean('show attachment-actions')
const descriptionLayer = instance.findText('attachment-description')
const description = descriptionLayer && 'textContent' in descriptionLayer ? descriptionLayer.textContent : ''
let iconCode
const icon = instance.findInstance('attachment-icon')
if (icon && icon.type === 'INSTANCE' && icon.hasCodeConnect()) {
  iconCode = icon.executeTemplate().example
}
const stateAttr = state !== 'done' ? figma.code` state="${state}"` : ''
const sizeAttr = size !== 'default' ? figma.code` size="${size}"` : ''

export default {
  example: figma.code`<Attachment${stateAttr}${sizeAttr}>
  <AttachmentMedia>${iconCode || ''}</AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>${title}</AttachmentTitle>${description ? figma.code`
    <AttachmentDescription>${description}</AttachmentDescription>` : ''}
  </AttachmentContent>${showActions ? figma.code`
  <AttachmentActions>
    <AttachmentAction aria-label="Remove ${title}">
      <Icon name="close" />
    </AttachmentAction>
  </AttachmentActions>` : ''}
</Attachment>`,
  imports: [
    'import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from "@workspace/ui-vue/components/attachment"',
    'import { Icon } from "@workspace/ui-vue/icons"',
  ],
  id: 'attachment',
  metadata: { nestable: true },
}
