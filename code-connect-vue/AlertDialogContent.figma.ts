// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=66-585
// source=packages/ui-vue/src/components/alert-dialog/AlertDialogContent.vue
// component=AlertDialogContent
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('size', {
  default: 'default',
  sm: 'sm',
})
const title = instance.getString('title')
const description = instance.getString('description')
const showMedia = instance.getBoolean('show alert-dialog-media')
// The footer slot holds AlertDialogCancel (outline) and AlertDialogAction (default or destructive).
const footer = instance.getSlot('alert-dialog-footer')

let mediaCode
const icon = instance.getInstanceSwap('icon')
if (showMedia && icon && icon.type === 'INSTANCE') {
  mediaCode = figma.code`
      <AlertDialogMedia>${icon.executeTemplate().example}</AlertDialogMedia>`
}
const sizeAttr = size !== 'default' ? figma.code` size="${size}"` : ''

export default {
  example: figma.code`<AlertDialog>
  <AlertDialogTrigger as-child>
    <Button variant="outline">Open</Button>
  </AlertDialogTrigger>
  <AlertDialogContent${sizeAttr}>
    <AlertDialogHeader>${mediaCode || ''}
      <AlertDialogTitle>${title}</AlertDialogTitle>
      <AlertDialogDescription>${description}</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>${footer || ''}</AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  imports: [
    'import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@workspace/ui-vue/components/alert-dialog"',
    'import { Button } from "@workspace/ui-vue/components/button"',
  ],
  id: 'alert-dialog-content',
  metadata: { nestable: false },
}
