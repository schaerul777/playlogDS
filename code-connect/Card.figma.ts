// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=12-156
// source=packages/ui/src/components/card.tsx
// component=Card
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('size', {
  default: 'default',
  sm: 'sm',
})
const title = instance.getString('title')
const description = instance.getString('description')

const showHeader = instance.getBoolean('show card-header')
const showDescription = instance.getBoolean('show card-description')
const showAction = instance.getBoolean('show card-action')
const showContent = instance.getBoolean('show card-content')
const showFooter = instance.getBoolean('show card-footer')

// Layers map to the sub-components: card-header -> CardHeader, card-title -> CardTitle,
// card-description -> CardDescription, and the slots card-action / card-content / card-footer
// -> CardAction / CardContent / CardFooter.
const action = instance.getSlot('card-action')
const content = instance.getSlot('card-content')
const footer = instance.getSlot('card-footer')

const sizeAttr = size !== 'default' ? figma.code` size="${size}"` : ''

const descriptionCode = showDescription
  ? figma.code`
    <CardDescription>${description}</CardDescription>`
  : ''
const actionCode = showAction
  ? figma.code`
    <CardAction>${action || ''}</CardAction>`
  : ''
const headerCode = showHeader
  ? figma.code`
  <CardHeader>
    <CardTitle>${title}</CardTitle>${descriptionCode}${actionCode}
  </CardHeader>`
  : ''
const contentCode = showContent
  ? figma.code`
  <CardContent>${content || ''}</CardContent>`
  : ''
const footerCode = showFooter
  ? figma.code`
  <CardFooter>${footer || ''}</CardFooter>`
  : ''

export default {
  example: figma.code`<Card${sizeAttr}>${headerCode}${contentCode}${footerCode}
</Card>`,
  imports: [
    'import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"',
  ],
  id: 'card',
  metadata: { nestable: false },
}
