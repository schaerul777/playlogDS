// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=91-912
// source=packages/ui/src/components/command.tsx
// component=Command
import figma from 'figma'
const instance = figma.selectedInstance

// `surface` is Figma-only: dialog = CommandDialog (opened with Cmd/Ctrl+K in the app).
// Items are data: groups of { value, label, keywords?, disabled? }, rendered through the list functions.
const surface = instance.getEnum('surface', { inline: 'inline', dialog: 'dialog' })

const body = figma.code`<Command items={groups} onSelect={(item) => run(item)}>
    <CommandInput placeholder="Search commands" />
    <CommandEmpty>No results</CommandEmpty>
    <CommandList>
      {(group) => (
        <CommandGroup key={group.value} items={group.items} heading={group.value}>
          <CommandCollection>
            {(item) => (
              <CommandItem key={item.value} value={item}>
                {item.label}
              </CommandItem>
            )}
          </CommandCollection>
        </CommandGroup>
      )}
    </CommandList>
  </Command>`

export default {
  example:
    surface === 'dialog'
      ? figma.code`<CommandDialog open={open} onOpenChange={setOpen}>
  ${body}
</CommandDialog>`
      : body,
  imports: [
    'import { Command, CommandCollection, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@workspace/ui/components/command"',
  ],
  id: 'command',
  metadata: { nestable: false },
}
