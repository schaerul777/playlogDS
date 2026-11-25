<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@workspace/ui-vue/components/accordion"
import { Button } from "@workspace/ui-vue/components/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui-vue/components/collapsible"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@workspace/ui-vue/components/empty"
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle } from "@workspace/ui-vue/components/item"
import { Icon } from "@workspace/ui-vue/icons"

const itemVariants = ["default", "outline", "muted"] as const
const itemSizes = ["default", "sm", "xs"] as const
</script>

<template>
  <section id="display3" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Display: Accordion, Collapsible, Empty, Item</h2>

    <Accordion class="max-w-md" default-value="a" data-specimen="accordion">
      <AccordionItem value="a" data-specimen="accordion-item">
        <AccordionTrigger data-specimen="accordion-trigger-open">What is reach?</AccordionTrigger>
        <AccordionContent data-specimen="accordion-content">The share of the audience that saw the ad at least once.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger data-specimen="accordion-trigger">What is frequency?</AccordionTrigger>
        <AccordionContent>The average number of times each person saw it.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c" disabled>
        <AccordionTrigger data-specimen="accordion-trigger-disabled">Disabled item</AccordionTrigger>
        <AccordionContent>Hidden.</AccordionContent>
      </AccordionItem>
    </Accordion>

    <Collapsible class="max-w-md" default-open data-specimen="collapsible">
      <CollapsibleTrigger as-child>
        <Button variant="outline" data-specimen="collapsible-trigger">Toggle details</Button>
      </CollapsibleTrigger>
      <CollapsibleContent data-specimen="collapsible-content">
        <p class="pt-3 text-body-sm">Figures update after you save the report.</p>
      </CollapsibleContent>
    </Collapsible>

    <div class="max-w-xl rounded-lg border border-border bg-card" data-specimen="empty-wrap">
      <Empty data-specimen="empty">
        <EmptyHeader data-specimen="empty-header">
          <EmptyMedia variant="icon" data-specimen="empty-media"><Icon name="folder" /></EmptyMedia>
          <EmptyTitle data-specimen="empty-title">No reports yet</EmptyTitle>
          <EmptyDescription data-specimen="empty-description">Create a report to see reach and frequency here.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent data-specimen="empty-content">
          <Button>Create report</Button>
          <Button variant="outline">Import</Button>
        </EmptyContent>
      </Empty>
    </div>

    <div class="flex max-w-xl flex-col gap-6">
      <ItemGroup data-specimen="item-group">
        <template v-for="variant in itemVariants" :key="variant">
          <Item v-for="size in itemSizes" :key="`${variant}-${size}`" :variant="variant" :size="size" :data-specimen="`item-${variant}-${size}`">
            <ItemMedia variant="icon" :data-specimen="`item-media-${variant}-${size}`"><Icon name="chart-line" /></ItemMedia>
            <ItemContent>
              <ItemTitle :data-specimen="`item-title-${variant}-${size}`">Roadside reach</ItemTitle>
              <ItemDescription :data-specimen="`item-description-${variant}-${size}`">Q1 2025, 25 cities</ItemDescription>
            </ItemContent>
            <ItemActions><Button size="sm" variant="outline">Open</Button></ItemActions>
          </Item>
        </template>
      </ItemGroup>
      <ItemGroup data-specimen="item-group-2">
        <Item as="a" href="#display3" variant="outline" data-specimen="item-link">
          <ItemMedia variant="image" data-specimen="item-media-image"><span class="size-full bg-primary" /></ItemMedia>
          <ItemContent><ItemTitle>As link</ItemTitle></ItemContent>
        </Item>
        <Item as="a" href="#display3" data-selected="true" data-specimen="item-selected">
          <ItemMedia variant="icon"><Icon name="star" /></ItemMedia>
          <ItemContent><ItemTitle>Selected</ItemTitle></ItemContent>
        </Item>
        <Item as="button" disabled data-specimen="item-disabled">
          <ItemContent><ItemTitle>Disabled button</ItemTitle></ItemContent>
        </Item>
        <ItemSeparator data-specimen="item-separator" />
        <Item variant="outline" data-specimen="item-header-footer">
          <ItemHeader data-specimen="item-header"><ItemTitle>Header</ItemTitle></ItemHeader>
          <ItemContent><ItemDescription>Body text</ItemDescription></ItemContent>
          <ItemFooter data-specimen="item-footer"><ItemDescription>Footer</ItemDescription></ItemFooter>
        </Item>
      </ItemGroup>
    </div>
  </section>
</template>
