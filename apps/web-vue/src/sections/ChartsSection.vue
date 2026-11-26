<script setup lang="ts">
import { ref } from "vue"
import { BarChart, ChartPanel, type ChartPanelColumn } from "@workspace/ui-vue/components/chart"
import { idCompact, idNumber } from "@workspace/ui-vue/lib/chart-format"

// Static example data. Nothing here calls a network. Same values as the React playground.
const WEEKS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"]
const STARTED = [310, 342, 365, 351, 398, 412, 405, 440, 462, 451, 489, 503]
const COMPLETED = [248, 270, 301, 289, 322, 341, 338, 372, 391, 380, 418, 433]
const SURVEYS_PER_WEEK = WEEKS.slice(-6).map((week, i) => ({ week, completions: COMPLETED.slice(-6)[i]! }))
const SURVEY_TREND = WEEKS.map((week, i) => ({ week, started: STARTED[i]!, completed: COMPLETED[i]! }))

const WEEK_COLUMNS: ChartPanelColumn[] = [
  { key: "week", label: "Week" },
  { key: "completions", label: "Completions", format: idNumber },
]
const TREND_COLUMNS: ChartPanelColumn[] = [
  { key: "week", label: "Week" },
  { key: "started", label: "Started", format: idNumber },
  { key: "completed", label: "Completed", format: idNumber },
]
const CITIES = [
  { city: "Jakarta", roadside: 4800, urban: 3100 },
  { city: "Bandung", roadside: 3200, urban: 2500 },
  { city: "Surabaya", roadside: 2900, urban: 1800 },
  { city: "Medan", roadside: 2100, urban: 1500 },
]
const CITY_CONFIG = { roadside: { label: "Roadside" }, urban: { label: "Urban" } }
const retries = ref(0)
</script>

<template>
  <p class="text-caption font-medium tracking-wide text-muted-foreground uppercase">Charts</p>
  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Bar</h2>
    <p class="text-caption text-muted-foreground">
      The Bar chart with a 2px corner radius on the data end, 4px between bars and 16% between categories.
    </p>
    <div class="grid gap-4 lg:grid-cols-2">
      <ChartPanel
        title="Survey completions per week"
        description="Completed surveys · last 6 weeks"
        summary="Completions rose from 341 in week 7 to 433 in week 12."
        :columns="WEEK_COLUMNS"
        :rows="SURVEYS_PER_WEEK"
        data-specimen="bar-single"
      >
        <BarChart
          class="aspect-auto h-64"
          :data="SURVEYS_PER_WEEK"
          category-key="week"
          :config="{ completions: { label: 'Completions' } }"
          :value-formatter="idNumber"
          aria-label="Bar chart of survey completions per week"
        />
      </ChartPanel>
      <ChartPanel
        title="Started and completed"
        description="Surveys · last 6 weeks · grouped"
        summary="Completed surveys trail started surveys by about 80 each week."
        :columns="TREND_COLUMNS"
        :rows="SURVEY_TREND.slice(-6)"
        data-specimen="bar-grouped"
      >
        <BarChart
          class="aspect-auto h-64"
          :data="SURVEY_TREND.slice(-6)"
          category-key="week"
          :config="{ started: { label: 'Started' }, completed: { label: 'Completed' } }"
          :value-formatter="idNumber"
        />
      </ChartPanel>
    </div>
    <div class="grid gap-4 lg:grid-cols-2">
      <ChartPanel
        title="Impressions by city"
        description="Horizontal bars · compact axis"
        summary="Jakarta has the most impressions, 4.800, then Bandung with 3.200."
        :columns="[{ key: 'city', label: 'City' }, { key: 'roadside', label: 'Roadside', format: idNumber }, { key: 'urban', label: 'Urban', format: idNumber }]"
        :rows="CITIES"
        data-specimen="bar-horizontal"
      >
        <BarChart class="aspect-auto h-64" :data="CITIES" category-key="city" layout="vertical" :config="CITY_CONFIG" :value-formatter="idNumber" :axis-formatter="idCompact" />
      </ChartPanel>
      <ChartPanel
        title="Impressions by city, stacked"
        description="Stacked · square joins"
        summary="Roadside and urban impressions are stacked per city."
        :columns="[{ key: 'city', label: 'City' }, { key: 'roadside', label: 'Roadside', format: idNumber }, { key: 'urban', label: 'Urban', format: idNumber }]"
        :rows="CITIES"
        data-specimen="bar-stacked"
      >
        <BarChart class="aspect-auto h-64" :data="CITIES" category-key="city" stacked :config="CITY_CONFIG" :value-formatter="idNumber" :axis-formatter="idCompact" />
      </ChartPanel>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">States</h2>
    <p class="text-caption text-muted-foreground">Loading, empty and error replace the plot; the card, title and header stay.</p>
    <div class="grid gap-4 lg:grid-cols-3">
      <ChartPanel title="Loading" description="Skeleton, aria-busy" summary="Loading" state="loading" data-specimen="state-loading" />
      <ChartPanel title="Empty" description="No data" summary="No data" state="empty" data-specimen="state-empty" />
      <ChartPanel
        title="Error"
        :description="retries ? `Retried ${retries} time${retries > 1 ? 's' : ''}` : 'With a retry'"
        summary="Error"
        state="error"
        retryable
        data-specimen="state-error"
        @retry="retries++"
      />
    </div>
    <p class="text-caption text-muted-foreground">
      Axis ticks in the compact Indonesian form: {{ idCompact(1_200_000) }}, {{ idCompact(950) }}, {{ idCompact(3_400_000_000) }}.
    </p>
  </section>
</template>
