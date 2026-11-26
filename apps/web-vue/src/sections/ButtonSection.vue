<script setup lang="ts">
import { Button } from "@workspace/ui-vue/components/button"
import { Icon } from "@workspace/ui-vue/icons"

// Same variant and size names as the React Button (packages/ui).
const variants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const
const sizes = ["xs", "sm", "default", "lg"] as const
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const
</script>

<template>
  <section id="button" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Button</h2>

    <div class="flex flex-col gap-3">
      <div v-for="variant in variants" :key="variant" class="flex flex-wrap items-center gap-3">
        <span class="w-28 text-caption text-muted-foreground">{{ variant }}</span>
        <Button
          v-for="size in sizes"
          :key="size"
          :variant="variant"
          :size="size"
          :data-specimen="`button-${variant}-${size}`"
        >
          Button
        </Button>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <span class="w-28 text-caption text-muted-foreground">icon only</span>
      <Button
        v-for="size in iconSizes"
        :key="size"
        variant="outline"
        :size="size"
        :data-specimen="`button-icon-${size}`"
      >
        <Icon name="plus" />
        <span class="sr-only">Add</span>
      </Button>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <span class="w-28 text-caption text-muted-foreground">with icon</span>
      <Button data-specimen="button-icon-start">
        <Icon name="plus" />
        New report
      </Button>
      <Button variant="outline" data-specimen="button-icon-end">
        Next
        <Icon name="chevron-right" />
      </Button>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <span class="w-28 text-caption text-muted-foreground">states</span>
      <Button disabled data-specimen="button-disabled">Disabled</Button>
      <Button variant="outline" disabled data-specimen="button-disabled-outline">Disabled</Button>
      <Button variant="outline" aria-pressed="true" data-specimen="button-pressed">Pressed</Button>
      <Button variant="outline" aria-invalid="true" data-specimen="button-invalid">Invalid</Button>
      <Button as="a" href="#button" variant="link" data-specimen="button-as-link">As link</Button>
    </div>
  </section>
</template>
