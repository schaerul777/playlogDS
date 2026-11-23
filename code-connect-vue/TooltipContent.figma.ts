// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=63-481
// source=packages/ui-vue/src/components/tooltip/TooltipContent.vue
// component=TooltipContent
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('label')

// Wrap the app (or a section) in TooltipProvider once; it sets the 300ms delay.
export default {
  example: figma.code`<Tooltip>
  <TooltipTrigger as-child>
    <Button variant="outline">Trigger</Button>
  </TooltipTrigger>
  <TooltipContent>${label}</TooltipContent>
</Tooltip>`,
  imports: [
    'import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui-vue/components/tooltip"',
    'import { Button } from "@workspace/ui-vue/components/button"',
  ],
  id: 'tooltip-content',
  metadata: { nestable: false },
}
