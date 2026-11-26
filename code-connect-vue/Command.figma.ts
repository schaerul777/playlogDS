// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-912
// source=packages/ui-vue/src/components/command/Command.vue
// component=Command
import figma from 'figma'
const instance = figma.selectedInstance

// `surface` is Figma-only: dialog = CommandDialog (opened with Cmd/Ctrl+K in the app).
// Items are written as children (v-for over your data), not passed as an `items` prop.
const surface = instance.getEnum('surface', { inline: 'inline', dialog: 'dialog' })

const body = figma.code`<Command>
    <CommandInput placeholder="Search commands" />
    <CommandList>
      <CommandEmpty>No results</CommandEmpty>
      <CommandGroup v-for="group in groups" :key="group.value" :heading="group.value">
        <CommandItem v-for="item in group.items" :key="item.value" :value="item.value" @select="run(item)">
          {{ item.label }}
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>`

export default {
  example:
    surface === 'dialog'
      ? figma.code`<CommandDialog v-model:open="open">
  ${body}
</CommandDialog>`
      : body,
  imports: [
    'import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@workspace/ui-vue/components/command"',
  ],
  id: 'command',
  metadata: { nestable: false },
}
