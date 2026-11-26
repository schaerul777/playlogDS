<script setup lang="ts">
import { ref } from "vue"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@workspace/ui-vue/components/combobox"
import { Field, FieldDescription, FieldError, FieldLabel } from "@workspace/ui-vue/components/field"
import { Slider, SliderLabel, SliderValue } from "@workspace/ui-vue/components/slider"
import { Toggle } from "@workspace/ui-vue/components/toggle"
import { ToggleGroup, ToggleGroupItem } from "@workspace/ui-vue/components/toggle-group"
import { Icon } from "@workspace/ui-vue/icons"

const CITIES = ["Jakarta", "Bandung", "Surabaya", "Medan", "Makassar"]
const multi = ref<string[]>(["Jakarta", "Surabaya"])
const sizes = ["sm", "default", "lg"] as const
</script>

<template>
  <section id="batch3" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Batch 3: Toggle, Toggle Group, Slider, Combobox</h2>

    <div class="flex flex-col gap-3">
      <div v-for="variant in ['default', 'outline'] as const" :key="variant" class="flex flex-wrap items-center gap-3">
        <span class="w-28 text-caption text-muted-foreground">toggle {{ variant }}</span>
        <Toggle v-for="size in sizes" :key="size" :variant="variant" :size="size" :data-specimen="`toggle-${variant}-${size}`">Toggle</Toggle>
        <Toggle :variant="variant" default-value :data-specimen="`toggle-${variant}-pressed`">Pressed</Toggle>
        <Toggle :variant="variant" aria-label="Bold" :data-specimen="`toggle-${variant}-icon`"><Icon name="star" /></Toggle>
        <Toggle :variant="variant" disabled :data-specimen="`toggle-${variant}-disabled`">Disabled</Toggle>
        <Toggle :variant="variant" aria-invalid="true" :data-specimen="`toggle-${variant}-invalid`">Invalid</Toggle>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div class="flex flex-wrap items-center gap-3">
        <ToggleGroup variant="outline" type="single" default-value="quarter" data-specimen="tg-joined-outline">
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
          <ToggleGroupItem value="quarter">Quarter</ToggleGroupItem>
          <ToggleGroupItem value="year">Year</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" default-value="bar" data-specimen="tg-joined-default">
          <ToggleGroupItem value="bar" aria-label="Bar chart"><Icon name="bar-chart" /></ToggleGroupItem>
          <ToggleGroupItem value="line" aria-label="Line chart"><Icon name="chart-line" /></ToggleGroupItem>
          <ToggleGroupItem value="pie" aria-label="Pie chart" disabled><Icon name="pie-chart" /></ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup variant="outline" size="sm" :spacing="2" type="multiple" :default-value="['jkt', 'sby']" data-specimen="tg-spacing">
          <ToggleGroupItem value="jkt">Jakarta</ToggleGroupItem>
          <ToggleGroupItem value="sby">Surabaya</ToggleGroupItem>
          <ToggleGroupItem value="bdg">Bandung</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup variant="outline" orientation="vertical" type="single" default-value="top" data-specimen="tg-vertical">
          <ToggleGroupItem value="top">Top 10</ToggleGroupItem>
          <ToggleGroupItem value="all">All cities</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>

    <div class="grid max-w-md gap-6">
      <Slider :default-value="[40]" aria-label="Reach" data-specimen="slider-single">
        <SliderLabel>Reach target</SliderLabel>
        <SliderValue />
      </Slider>
      <Slider :default-value="[20, 80]" :thumb-labels="['Minimum', 'Maximum']" data-specimen="slider-range">
        <SliderLabel>Range</SliderLabel>
        <SliderValue />
      </Slider>
      <Slider :default-value="[60]" disabled aria-label="Disabled" data-specimen="slider-disabled" />
      <div class="h-40">
        <Slider :default-value="[30]" orientation="vertical" aria-label="Vertical" data-specimen="slider-vertical" />
      </div>
    </div>

    <div class="grid max-w-md gap-6">
      <Field>
        <FieldLabel for="cb-a">City</FieldLabel>
        <Combobox default-value="Bandung">
          <ComboboxInput id="cb-a" placeholder="Select a city" data-specimen="cb-single" />
          <ComboboxContent>
            <ComboboxEmpty>No results</ComboboxEmpty>
            <ComboboxList>
              <ComboboxItem v-for="city in CITIES" :key="city" :value="city">{{ city }}</ComboboxItem>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <FieldDescription>Type to filter. The clear button shows once a city is chosen.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel for="cb-b">Cities (multiple)</FieldLabel>
        <Combobox v-model="multi" multiple :reset-search-term-on-select="true">
          <ComboboxChips data-specimen="cb-chips">
            <ComboboxChip v-for="v in multi" :key="v" :value="v">{{ v }}</ComboboxChip>
            <ComboboxChipsInput id="cb-b" placeholder="Add city" />
          </ComboboxChips>
          <ComboboxContent>
            <ComboboxEmpty>No results</ComboboxEmpty>
            <ComboboxList>
              <ComboboxItem v-for="city in CITIES" :key="city" :value="city">{{ city }}</ComboboxItem>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
      <Field>
        <FieldLabel for="cb-c">Team</FieldLabel>
        <Combobox>
          <ComboboxInput id="cb-c" aria-invalid="true" placeholder="Select a team" data-specimen="cb-invalid" />
          <ComboboxContent>
            <ComboboxEmpty>No results</ComboboxEmpty>
            <ComboboxList>
              <ComboboxItem v-for="t in ['Roadside', 'Transit']" :key="t" :value="t">{{ t }}</ComboboxItem>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <FieldError>Choose a team.</FieldError>
      </Field>
      <Field>
        <FieldLabel for="cb-d">Region</FieldLabel>
        <Combobox default-value="Java" disabled>
          <ComboboxInput id="cb-d" disabled placeholder="Select a region" data-specimen="cb-disabled" />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxItem v-for="r in ['Java', 'Bali']" :key="r" :value="r">{{ r }}</ComboboxItem>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  </section>
</template>
