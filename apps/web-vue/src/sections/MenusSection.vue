<script setup lang="ts">
import { Button } from "@workspace/ui-vue/components/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@workspace/ui-vue/components/context-menu"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@workspace/ui-vue/components/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@workspace/ui-vue/components/hover-card"
import { Icon } from "@workspace/ui-vue/icons"
</script>

<template>
  <section id="menus" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Menus: Dropdown Menu, Context Menu, Hover Card</h2>
    <div class="flex flex-wrap items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" data-specimen="dd-trigger">Report actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent data-specimen="dd">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Report</DropdownMenuLabel>
            <DropdownMenuItem><Icon name="edit" />Edit<DropdownMenuShortcut>Cmd E</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem><Icon name="download" />Download</DropdownMenuItem>
            <DropdownMenuItem disabled>Archive</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem :model-value="true">Show totals</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem :model-value="false">Show deltas</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup model-value="quarter">
            <DropdownMenuRadioItem value="month">Month</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="quarter">Quarter</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Copy link</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive"><Icon name="trash" />Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ContextMenu>
        <ContextMenuTrigger as-child>
          <div class="flex h-24 w-56 items-center justify-center rounded-lg border border-dashed border-border text-body-sm text-muted-foreground" data-specimen="cm-trigger">
            Right-click here
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent data-specimen="cm">
          <ContextMenuGroup>
            <ContextMenuLabel>City</ContextMenuLabel>
          </ContextMenuGroup>
          <ContextMenuItem>Open<ContextMenuShortcut>Enter</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem disabled>Compare</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">Remove</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <HoverCard>
        <HoverCardTrigger as-child>
          <Button variant="link" data-specimen="hc-trigger">@playlog</Button>
        </HoverCardTrigger>
        <HoverCardContent data-specimen="hc">
          <p class="text-label text-ink-heading">Playlog</p>
          <p class="text-body-sm text-muted-foreground">Out-of-home audience analytics for 25 Indonesian cities.</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  </section>
</template>
