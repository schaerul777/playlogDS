// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=67-670
// source=packages/ui-vue/src/components/sonner/Sonner.vue
// component=Toaster
import figma from 'figma'
const instance = figma.selectedInstance

// A toast is created with toast() from the library; <Toaster /> is mounted once at the app root (App.vue).
const method = instance.getEnum('type', {
  default: 'toast',
  success: 'toast.success',
  info: 'toast.info',
  warning: 'toast.warning',
  error: 'toast.error',
})
const title = instance.getString('title')
const description = instance.getString('description')
const showDescription = instance.getBoolean('show description')
const showAction = instance.getBoolean('show action')
const closeButton = instance.getBoolean('closeButton')

// title, description and the flags are plain values, so the options are built as a plain string.
const options = [
  showDescription ? `description: ${JSON.stringify(description)}` : '',
  showAction ? 'action: { label: "Undo", onClick: () => {} }' : '',
  closeButton ? 'closeButton: true' : '',
].filter(Boolean)
const call = `${method}(${JSON.stringify(title)}${options.length ? `, { ${options.join(', ')} }` : ''})`

export default {
  example: figma.code`${call}`,
  imports: ['import { toast } from "@workspace/ui-vue/components/sonner"'],
  id: 'toast',
  metadata: { nestable: false },
}
