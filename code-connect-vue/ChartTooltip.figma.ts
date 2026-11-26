// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=42-401
// source=packages/ui-vue/src/components/chart/ChartTooltip.vue
// component=ChartTooltip
import figma from 'figma'
const instance = figma.selectedInstance

// The tooltip is drawn by the chart itself on hover or keyboard focus (BarChart, and the other charts in the next step), so
// rows come from the chart's series. Pass `value-formatter` (for example idNumber) to the chart for Indonesian number formats.
// ChartTooltip is also exported for custom charts: it takes a `label` and `rows` of { key, label, color, value }.
export default {
  example: figma.code`<ChartTooltip label="W9" :rows="[{ key: 'started', label: 'Started', color: 'var(--chart-1)', value: '462' }]" />`,
  imports: ['import { ChartTooltip } from "@workspace/ui-vue/components/chart"'],
  id: 'chart-tooltip',
  metadata: { nestable: true },
}
