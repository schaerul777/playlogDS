// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=66-680
// source=packages/ui/src/components/sheet.tsx
// component=SheetContent
import figma from 'figma'
const instance = figma.selectedInstance

const side = instance.getEnum('side', {
  right: 'right',
  left: 'left',
  top: 'top',
  bottom: 'bottom',
})
const title = instance.getString('title')
const description = instance.getString('description')
const showDescription = instance.getBoolean('show sheet-description')
const showCloseButton = instance.getBoolean('showCloseButton')
const showFooter = instance.getBoolean('show sheet-footer')
// The children slot is the sheet body; give it px-6 in code (padding 0 24).
const children = instance.getSlot('children')
const footer = instance.getSlot('sheet-footer')

const sideAttr = side !== 'right' ? figma.code` side="${side}"` : ''
const closeAttr = showCloseButton ? '' : ' showCloseButton={false}'
const descriptionCode = showDescription
  ? figma.code`
      <SheetDescription>${description}</SheetDescription>`
  : ''
const footerCode = showFooter
  ? figma.code`
    <SheetFooter>${footer || ''}</SheetFooter>`
  : ''

export default {
  example: figma.code`<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>Open</SheetTrigger>
  <SheetContent${sideAttr}${closeAttr}>
    <SheetHeader>
      <SheetTitle>${title}</SheetTitle>${descriptionCode}
    </SheetHeader>
    <div className="px-6">${children || ''}</div>${footerCode}
  </SheetContent>
</Sheet>`,
  imports: [
    'import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@workspace/ui/components/sheet"',
    'import { Button } from "@workspace/ui/components/button"',
  ],
  id: 'sheet-content',
  metadata: { nestable: false },
}
