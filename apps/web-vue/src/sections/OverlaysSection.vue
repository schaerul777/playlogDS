<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui-vue/components/alert-dialog"
import { Button } from "@workspace/ui-vue/components/button"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@workspace/ui-vue/components/popover"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@workspace/ui-vue/components/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui-vue/components/tooltip"
import { Icon } from "@workspace/ui-vue/icons"

const sides = ["right", "left", "top", "bottom"] as const
</script>

<template>
  <section id="overlays" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Overlays: Alert Dialog, Sheet, Popover, Tooltip</h2>

    <div class="flex flex-wrap items-center gap-3">
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button variant="outline" data-specimen="ad-trigger-default">Delete report</Button>
        </AlertDialogTrigger>
        <AlertDialogContent data-specimen="ad-default">
          <AlertDialogHeader>
            <AlertDialogMedia><Icon name="trash" /></AlertDialogMedia>
            <AlertDialogTitle>Delete this report?</AlertDialogTitle>
            <AlertDialogDescription>This removes the report and its shared links. You can't undo it.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Delete report</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button variant="outline" data-specimen="ad-trigger-sm">Small alert dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm" data-specimen="ad-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>Your edits are not saved.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Sheet v-for="side in sides" :key="side">
        <SheetTrigger as-child>
          <Button variant="outline" :data-specimen="`sheet-trigger-${side}`">Sheet {{ side }}</Button>
        </SheetTrigger>
        <SheetContent :side="side" :data-specimen="`sheet-${side}`">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Choose the period and the cities.</SheetDescription>
          </SheetHeader>
          <div class="px-6 text-body-sm">Sheet body</div>
          <SheetFooter>
            <Button variant="outline">Reset</Button>
            <Button>Apply</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" data-specimen="pop-trigger">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent data-specimen="pop">
          <PopoverHeader>
            <PopoverTitle>Report period</PopoverTitle>
            <PopoverDescription>Figures cover Q1 to Q3 2025 in 25 cities.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" size="icon" aria-label="Add" data-specimen="tip-trigger"><Icon name="plus" /></Button>
          </TooltipTrigger>
          <TooltipContent data-specimen="tip">Add a report</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </section>
</template>
