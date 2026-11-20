// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=42-401
// source=packages/ui/src/components/chart.tsx
// component=ChartTooltipContent
import figma from 'figma'
const instance = figma.selectedInstance

// The tooltip is rendered by Recharts on hover or keyboard focus, so rows come from the chart's series. Pass
// `valueFormatter` (for example idNumber) for Indonesian number formats.
export default {
  example: figma.code`<ChartTooltip cursor content={<ChartTooltipContent valueFormatter={idNumber} />} />`,
  imports: ['import { ChartTooltip, ChartTooltipContent } from "@workspace/ui/components/chart"', 'import { idNumber } from "@workspace/ui/lib/chart-format"'],
  id: 'chart-tooltip-content',
  metadata: { nestable: true },
}
