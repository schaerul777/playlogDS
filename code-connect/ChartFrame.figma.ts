// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=167-2876
// source=packages/ui/src/components/chart-panel.tsx
// component=ChartPanel
import figma from 'figma'
const instance = figma.selectedInstance

// `state` matches the code prop (ready, loading, empty, error). The Chart | Table toggle appears when `columns` and
// `rows` are passed. In Figma the plot is illustrative only: in code the chart is the child.
const state = instance.getEnum('state', { ready: 'ready', loading: 'loading', empty: 'empty', error: 'error' })
const stateAttr = state === 'ready' ? '' : ` state="${state}"`
const retry = state === 'error' ? ' onRetry={retry}' : ''

export default {
  example: figma.code`<ChartPanel title="Survey completions per week" description="Completed surveys · last 6 weeks" summary="One sentence for screen readers." columns={columns} rows={rows}${stateAttr}${retry}><BarChart data={rows} categoryKey="week" config={config} /></ChartPanel>`,
  imports: ['import { ChartPanel } from "@workspace/ui/components/chart-panel"', 'import { BarChart } from "@workspace/ui/components/bar-chart"'],
  id: 'chart-frame',
  metadata: { nestable: true },
}
