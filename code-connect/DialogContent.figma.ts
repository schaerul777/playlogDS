// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=65-549
// source=packages/ui/src/components/dialog.tsx
// component=DialogContent
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('title')
const description = instance.getString('description')
const showDescription = instance.getBoolean('show dialog-description')
const showCloseButton = instance.getBoolean('showCloseButton')
const showFooter = instance.getBoolean('show dialog-footer')
const children = instance.getSlot('children')
const footer = instance.getSlot('dialog-footer')

const closeAttr = showCloseButton ? '' : ' showCloseButton={false}'
const descriptionCode = showDescription
  ? figma.code`
      <DialogDescription>${description}</DialogDescription>`
  : ''
const footerCode = showFooter
  ? figma.code`
    <DialogFooter>${footer || ''}</DialogFooter>`
  : ''

export default {
  example: figma.code`<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
  <DialogContent${closeAttr}>
    <DialogHeader>
      <DialogTitle>${title}</DialogTitle>${descriptionCode}
    </DialogHeader>${children || ''}${footerCode}
  </DialogContent>
</Dialog>`,
  imports: [
    'import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog"',
    'import { Button } from "@workspace/ui/components/button"',
  ],
  id: 'dialog-content',
  metadata: { nestable: false },
}
