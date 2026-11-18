// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=42-401
// source=packages/ui/src/components/chart.tsx
// component=ChartTooltipContent
import figma from 'figma'
const instance = figma.selectedInstance

// The tooltip label and rows come from the hovered data point at runtime, so the
// Figma `label` text has no code prop. BarChart renders this tooltip for you.
export default {
  example: figma.code`<ChartTooltip content={<ChartTooltipContent valueFormatter={formatNumber} />} />`,
  imports: ['import { ChartTooltip, ChartTooltipContent } from "@workspace/ui/components/chart"'],
  id: 'chart-tooltip-content',
  metadata: { nestable: true },
}
