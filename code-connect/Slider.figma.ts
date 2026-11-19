// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=142-1351
// source=packages/ui/src/components/slider.tsx
// component=Slider
import figma from 'figma'
const instance = figma.selectedInstance

// `orientation` matches the code prop. `range` and `state` are Figma-only: two values make a range, and disabled is the only
// state that is a prop (hover and focus come from the browser). Edit the label and value text on the layers.
const orientation = instance.getEnum('orientation', { horizontal: 'horizontal', vertical: 'vertical' })
const range = instance.getEnum('range', { single: 'single', range: 'range' })
const state = instance.getEnum('state', { default: 'default', hover: 'hover', focus: 'focus', disabled: 'disabled' })
const showLabelRow = instance.getBoolean('show slider-label-row')
const labelLayer = instance.findText('slider-label')
const label = labelLayer && 'textContent' in labelLayer ? labelLayer.textContent : ''
const valueAttr = range === 'range' ? ' defaultValue={[20, 80]} thumbLabels={["Minimum", "Maximum"]}' : ' defaultValue={[40]}'
const orientationAttr = orientation === 'vertical' ? ' orientation="vertical"' : ''
const disabledAttr = state === 'disabled' ? ' disabled' : ''
const nameAttr = range === 'single' && (!showLabelRow || orientation === 'vertical') ? ' aria-label=""' : ''
const row = showLabelRow && orientation === 'horizontal'
  ? figma.code`
  <SliderLabel>${label}</SliderLabel>
  <SliderValue />
`
  : ''

export default {
  example: figma.code`<Slider${valueAttr}${orientationAttr}${disabledAttr}${nameAttr}>${row}</Slider>`,
  imports: ['import { Slider, SliderLabel, SliderValue } from "@workspace/ui/components/slider"'],
  id: 'slider',
  metadata: { nestable: true },
}
