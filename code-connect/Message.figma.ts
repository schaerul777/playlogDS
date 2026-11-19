// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=124-1271
// source=packages/ui/src/components/message.tsx
// component=Message
import figma from 'figma'
const instance = figma.selectedInstance

// align="end" is the person (a secondary Bubble), align="start" is the assistant (plain text, a ghost Bubble).
// The message-content slot is the turn: Bubble, Reasoning, Tool, text, Sources.
const align = instance.getEnum('align', { start: 'start', end: 'end' })
const showAvatar = instance.getBoolean('show message-avatar')
const showHeader = instance.getBoolean('show message-header')
const showFooter = instance.getBoolean('show message-footer')
const header = instance.getString('header')
const content = instance.getSlot('message-content')
const alignAttr = align === 'end' ? ' align="end"' : ''

const avatarCode = showAvatar
  ? figma.code`
  <MessageAvatar>{/* Avatar size="sm" */}</MessageAvatar>`
  : ''
const headerCode = showHeader ? figma.code`
    <MessageHeader>${header}</MessageHeader>` : ''
const footerCode = showFooter ? figma.code`
    <MessageFooter>{/* MessageAction buttons */}</MessageFooter>` : ''

export default {
  example: figma.code`<Message${alignAttr}>${avatarCode}
  <MessageContent>${headerCode}${content || ''}${footerCode}
  </MessageContent>
</Message>`,
  imports: [
    'import { Message, MessageAvatar, MessageContent, MessageFooter, MessageHeader } from "@workspace/ui/components/message"',
  ],
  id: 'message',
  metadata: { nestable: true },
}
