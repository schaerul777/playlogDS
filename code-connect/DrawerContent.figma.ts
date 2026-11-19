// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=143-1270
// source=packages/ui/src/components/drawer.tsx
// component=Drawer
import figma from 'figma'
const instance = figma.selectedInstance

// The Base UI Drawer: bottom only, swipe down to close. The handle and the close button are on by default in code.
const title = instance.getString('title')
const description = instance.getString('description')
const showHandle = instance.getBoolean('show swipe-handle')
const showClose = instance.getBoolean('show close-button')
const showFooter = instance.getBoolean('show drawer-footer')
const body = instance.getSlot('drawer-body')
const footer = instance.getSlot('drawer-footer')
const handleAttr = showHandle ? '' : ' showSwipeHandle={false}'
const closeAttr = showClose ? '' : ' showCloseButton={false}'

export default {
  example: figma.code`<Drawer${handleAttr}>
  <DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
  <DrawerContent${closeAttr}>
    <DrawerHeader>
      <DrawerTitle>${title}</DrawerTitle>
      <DrawerDescription>${description}</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>${body || ''}</DrawerBody>${showFooter ? figma.code`
    <DrawerFooter>${footer || ''}
    </DrawerFooter>` : ''}
  </DrawerContent>
</Drawer>`,
  imports: [
    'import { Drawer, DrawerBody, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@workspace/ui/components/drawer"',
    'import { Button } from "@workspace/ui/components/button"',
  ],
  id: 'drawer-content',
  metadata: { nestable: false },
}
