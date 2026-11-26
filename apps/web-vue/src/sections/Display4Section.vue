<script setup lang="ts">
import { AspectRatio } from "@workspace/ui-vue/components/aspect-ratio"
import { Button } from "@workspace/ui-vue/components/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@workspace/ui-vue/components/button-group"
import { Input } from "@workspace/ui-vue/components/input"
import { Kbd, KbdGroup } from "@workspace/ui-vue/components/kbd"
import { ScrollArea, ScrollBar } from "@workspace/ui-vue/components/scroll-area"
import { Icon } from "@workspace/ui-vue/icons"

const rows = Array.from({ length: 20 }, (_, i) => `Report ${i + 1}`)
</script>

<template>
  <section id="display4" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Display: Kbd, Scroll Area, Aspect Ratio, Button Group</h2>

    <div class="flex flex-wrap items-center gap-4">
      <Kbd data-specimen="kbd">K</Kbd>
      <KbdGroup data-specimen="kbd-group"><Kbd data-specimen="kbd-in-group">Ctrl</Kbd><Kbd>B</Kbd></KbdGroup>
      <Kbd data-specimen="kbd-icon"><Icon name="search" />Search</Kbd>
    </div>

    <div class="flex flex-wrap items-start gap-6">
      <ScrollArea class="h-48 w-56 rounded-md border border-border" data-specimen="scroll-area">
        <div class="p-3" data-specimen="scroll-content">
          <p v-for="row in rows" :key="row" class="py-1 text-body-sm">{{ row }}</p>
        </div>
      </ScrollArea>
      <ScrollArea class="h-24 w-56 rounded-md border border-border" data-specimen="scroll-area-h">
        <div class="w-[480px] p-3 text-body-sm whitespace-nowrap">A wide line of content that overflows the box sideways.</div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ScrollArea class="h-24 w-56 rounded-md border border-border" data-specimen="scroll-area-short">
        <div class="p-3 text-body-sm">Fits, no bar.</div>
      </ScrollArea>
    </div>

    <div class="flex flex-wrap items-start gap-4">
      <AspectRatio :ratio="16 / 9" class="w-64 bg-muted" data-specimen="aspect-wide"><span class="p-2 text-body-sm">16:9</span></AspectRatio>
      <AspectRatio :ratio="1" class="w-32 bg-muted" data-specimen="aspect-square"><span class="p-2 text-body-sm">1:1</span></AspectRatio>
    </div>

    <div class="flex flex-wrap items-start gap-6">
      <ButtonGroup data-specimen="bg-outline">
        <Button variant="outline" data-specimen="bg-outline-first">Day</Button>
        <Button variant="outline">Week</Button>
        <Button variant="outline" data-specimen="bg-outline-last">Month</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" data-specimen="bg-vertical">
        <Button variant="outline">Day</Button>
        <Button variant="outline">Week</Button>
        <Button variant="outline">Month</Button>
      </ButtonGroup>
      <ButtonGroup data-specimen="bg-filled">
        <Button>Save</Button>
        <ButtonGroupSeparator data-specimen="bg-separator" />
        <Button>Save as</Button>
      </ButtonGroup>
      <ButtonGroup data-specimen="bg-text">
        <ButtonGroupText data-specimen="bg-text-label">https://</ButtonGroupText>
        <Input placeholder="playlog.com" data-specimen="bg-input" />
        <Button variant="outline">Go</Button>
      </ButtonGroup>
      <ButtonGroup data-specimen="bg-nested">
        <ButtonGroup><Button variant="outline">A</Button><Button variant="outline">B</Button></ButtonGroup>
        <ButtonGroup><Button variant="outline">C</Button></ButtonGroup>
      </ButtonGroup>
    </div>
  </section>
</template>
