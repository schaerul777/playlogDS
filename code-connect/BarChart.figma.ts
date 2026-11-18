// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=42-565
// source=packages/ui/src/components/bar-chart.tsx
// component=BarChart
import figma from 'figma'
const instance = figma.selectedInstance

// `series` is Figma-only (it picks a static drawing). The chart data, the series
// config and the category key live in code, so the snippet uses placeholders.
// Colours come from chart-1 to chart-8 in order; a single series gets direct labels,
// several get the legend.
export default {
  example: figma.code`<BarChart
  data={data}
  config={chartConfig}
  categoryKey="category"
  valueFormatter={formatNumber}
/>`,
  imports: ['import { BarChart } from "@workspace/ui/components/bar-chart"'],
  id: 'bar-chart',
  metadata: { nestable: true },
}
