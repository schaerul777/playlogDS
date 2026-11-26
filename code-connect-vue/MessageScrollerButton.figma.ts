// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=120-1128
// source=packages/ui-vue/src/components/message-scroller/MessageScrollerButton.vue
// component=MessageScrollerButton
import figma from 'figma'
const instance = figma.selectedInstance

// Button outline icon-sm with chevron-down and the overlay shadow. Place it inside MessageScroller, after the viewport;
// it hides itself (inert) when the thread is at the live edge.
export default {
  example: figma.code`<MessageScroller>
  <MessageScrollerViewport>
    <MessageScrollerContent><!-- turns --></MessageScrollerContent>
  </MessageScrollerViewport>
  <MessageScrollerButton />
</MessageScroller>`,
  imports: [
    'import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerViewport } from "@workspace/ui-vue/components/message-scroller"',
  ],
  id: 'message-scroller-button',
  metadata: { nestable: false },
}
