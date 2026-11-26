// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=167-2876
// source=packages/ui-vue/src/components/chart/ChartPanel.vue
// component=ChartPanel
import figma from 'figma'
const instance = figma.selectedInstance

// `state` matches the code prop (ready, loading, empty, error). The Chart | Table toggle appears when `columns` and
// `rows` are passed. In Figma the plot is illustrative only: in code the chart is the default slot. The error state shows
// "Try again" when `retryable` is set and emits `retry`.
const state = instance.getEnum('state', { ready: 'ready', loading: 'loading', empty: 'empty', error: 'error' })
const stateAttr = state === 'ready' ? '' : ` state="${state}"`
const retry = state === 'error' ? ' retryable @retry="retry"' : ''

export default {
  example: figma.code`<ChartPanel title="Survey completions per week" description="Completed surveys · last 6 weeks" summary="One sentence for screen readers." :columns="columns" :rows="rows"${stateAttr}${retry}>
  <BarChart :data="rows" category-key="week" :config="config" />
</ChartPanel>`,
  imports: ['import { ChartPanel, BarChart } from "@workspace/ui-vue/components/chart"'],
  id: 'chart-frame',
  metadata: { nestable: true },
}
