<script setup lang="ts">
import { ref } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui-vue/components/drawer"
import { Field, FieldLabel } from "@workspace/ui-vue/components/field"
import { Input } from "@workspace/ui-vue/components/input"
import { Slider, SliderLabel, SliderValue } from "@workspace/ui-vue/components/slider"

const saved = ref(false)
const open = ref(false)
</script>

<template>
  <section id="drawer" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Drawer</h2>
    <p class="text-caption text-muted-foreground">
      A bottom panel for small screens: swipe down, press Escape, tap the scrim or use the close button. Focus stays inside and returns to the trigger.
    </p>
    <div class="flex flex-wrap items-center gap-3">
      <Drawer>
        <DrawerTrigger as-child>
          <Button variant="outline" data-specimen="drawer-trigger">Edit campaign</Button>
        </DrawerTrigger>
        <DrawerContent data-specimen="drawer-edit">
          <DrawerHeader data-specimen="drawer-header">
            <DrawerTitle data-specimen="drawer-title">Edit campaign</DrawerTitle>
            <DrawerDescription data-specimen="drawer-description">Change the name and the daily budget. Reach is recounted overnight.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody data-specimen="drawer-body">
            <div class="flex flex-col gap-4 pb-1">
              <Field>
                <FieldLabel for="drawer-name">Campaign name</FieldLabel>
                <Input id="drawer-name" default-value="Rail network, Q3 2025" />
              </Field>
              <Slider :default-value="[40]">
                <SliderLabel>Daily budget</SliderLabel>
                <SliderValue />
              </Slider>
            </div>
          </DrawerBody>
          <DrawerFooter data-specimen="drawer-footer">
            <DrawerClose as-child><Button variant="outline">Cancel</Button></DrawerClose>
            <DrawerClose as-child><Button @click="saved = true">Save changes</Button></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger as-child>
          <Button variant="outline" data-specimen="drawer-trigger-long">Long content</Button>
        </DrawerTrigger>
        <DrawerContent data-specimen="drawer-long">
          <DrawerHeader>
            <DrawerTitle>Screens in this campaign</DrawerTitle>
            <DrawerDescription>The list scrolls inside the drawer; the header and footer stay put.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody data-specimen="drawer-body-long">
            <ul class="flex flex-col gap-2 text-body-sm">
              <li v-for="i in 24" :key="i" class="flex justify-between border-b-(length:--pl-border-width) border-border py-2">
                <span>Screen SCR-{{ 1000 + i }}</span>
                <span class="text-caption text-muted-foreground">Live</span>
              </li>
            </ul>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose as-child><Button variant="outline">Close</Button></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer :show-swipe-handle="false">
        <DrawerTrigger as-child>
          <Button variant="outline" data-specimen="drawer-trigger-bare">No handle</Button>
        </DrawerTrigger>
        <DrawerContent :show-close-button="false" data-specimen="drawer-bare">
          <DrawerHeader>
            <DrawerTitle>Discard changes?</DrawerTitle>
            <DrawerDescription>Without a handle or a close button; swipe, Escape or the buttons close it.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose as-child><Button variant="outline">Keep editing</Button></DrawerClose>
            <DrawerClose as-child><Button variant="destructive">Discard</Button></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer v-model:open="open">
        <DrawerTrigger as-child>
          <Button variant="outline" data-specimen="drawer-trigger-controlled">Controlled</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Controlled drawer</DrawerTitle>
            <DrawerDescription>Opened and closed with v-model:open.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button data-specimen="drawer-controlled-close" @click="open = false">Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <span class="text-caption text-muted-foreground" data-specimen="drawer-state">open: {{ open }}</span>
      <span v-if="saved" class="text-caption text-muted-foreground">Saved</span>
    </div>
  </section>
</template>
