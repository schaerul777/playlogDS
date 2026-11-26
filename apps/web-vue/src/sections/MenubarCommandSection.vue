<script setup lang="ts">
import { ref } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@workspace/ui-vue/components/command"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@workspace/ui-vue/components/menubar"
import { Icon } from "@workspace/ui-vue/icons"

const open = ref(false)
</script>

<template>
  <section id="menubar-command" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Menubar and Command</h2>

    <Menubar class="w-fit" data-specimen="menubar">
      <MenubarMenu>
        <MenubarTrigger data-specimen="mb-trigger">File</MenubarTrigger>
        <MenubarContent data-specimen="mb-content">
          <MenubarGroup>
            <MenubarLabel>Report</MenubarLabel>
            <MenubarItem><Icon name="edit" />Rename<MenubarShortcut>Cmd R</MenubarShortcut></MenubarItem>
            <MenubarItem disabled>Archive</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarCheckboxItem :model-value="true">Show totals</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup model-value="quarter">
            <MenubarRadioItem value="month">Month</MenubarRadioItem>
            <MenubarRadioItem value="quarter">Quarter</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email</MenubarItem>
              <MenubarItem>Copy link</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem variant="destructive"><Icon name="trash" />Delete</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger data-specimen="mb-trigger-2">View</MenubarTrigger>
        <MenubarContent><MenubarItem>Zoom in</MenubarItem><MenubarItem>Zoom out</MenubarItem></MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger disabled data-specimen="mb-trigger-disabled">Help</MenubarTrigger>
        <MenubarContent><MenubarItem>Docs</MenubarItem></MenubarContent>
      </MenubarMenu>
    </Menubar>

    <div class="max-w-md" data-specimen="command-wrap">
      <Command>
        <CommandInput placeholder="Search commands" data-specimen="command-input" />
        <CommandList data-specimen="command-list">
          <CommandEmpty>No results</CommandEmpty>
          <CommandGroup heading="Reports">
            <CommandItem value="Reach"><Icon name="chart-line" />Reach</CommandItem>
            <CommandItem value="Frequency"><Icon name="bar-chart" />Frequency<CommandShortcut>Cmd F</CommandShortcut></CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem value="Export"><Icon name="download" />Export<CommandShortcut>Cmd E</CommandShortcut></CommandItem>
            <CommandItem value="Delete" disabled><Icon name="trash" />Delete</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>

    <div>
      <Button variant="outline" data-specimen="cmd-open" @click="open = true">Open command palette</Button>
      <CommandDialog v-model:open="open">
        <CommandInput placeholder="Search commands" />
        <CommandList>
          <CommandEmpty>No results</CommandEmpty>
          <CommandGroup heading="Reports">
            <CommandItem value="Reach"><Icon name="chart-line" />Reach</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  </section>
</template>
