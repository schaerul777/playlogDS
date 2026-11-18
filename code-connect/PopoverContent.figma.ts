// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=65-543
// source=packages/ui/src/components/popover.tsx
// component=PopoverContent
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('title')
const description = instance.getString('description')
const showHeader = instance.getBoolean('show popover-header')
const showDescription = instance.getBoolean('show popover-description')
const children = instance.getSlot('children')

const descriptionCode = showDescription
  ? figma.code`
      <PopoverDescription>${description}</PopoverDescription>`
  : ''
const headerCode = showHeader
  ? figma.code`
    <PopoverHeader>
      <PopoverTitle>${title}</PopoverTitle>${descriptionCode}
    </PopoverHeader>`
  : ''

export default {
  example: figma.code`<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>Open</PopoverTrigger>
  <PopoverContent>${headerCode}${children || ''}
  </PopoverContent>
</Popover>`,
  imports: [
    'import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@workspace/ui/components/popover"',
    'import { Button } from "@workspace/ui/components/button"',
  ],
  id: 'popover-content',
  metadata: { nestable: false },
}
