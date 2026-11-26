<script setup lang="ts">
import { ref } from "vue"
import { AreaChart, BarChart, ChartPanel, LineChart, PieChart, type ChartPanelColumn } from "@workspace/ui-vue/components/chart"
import { idCompact, idNumber, idRupiah } from "@workspace/ui-vue/lib/chart-format"

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
const REVENUE = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].map((month, i) => ({
  month,
  revenue: [182_000_000, 205_500_000, 198_250_000, 231_000_000, 247_800_000, 262_400_000][i]!,
}))
const BY_CHANNEL = WEEKS.slice(-8).map((week, i) => ({
  week,
  panel: [150, 160, 158, 171, 180, 177, 190, 198][i]!,
  streetIntercept: [60, 64, 70, 66, 75, 78, 80, 83][i]!,
  qr: [38, 48, 50, 63, 65, 83, 100, 152][i]!,
}))
const BILLBOARD_STATUS = [
  { name: "Active", value: 612 },
  { name: "Scheduled", value: 141 },
  { name: "Maintenance", value: 88 },
  { name: "Offline", value: 47 },
  { name: "Draft", value: 31 },
  { name: "Pending approval", value: 18 },
  { name: "Archived", value: 9 },
]
const CITY_SHARE = [
  { name: "Jakarta", value: 4.8 },
  { name: "Surabaya", value: 2.8 },
  { name: "Bandung", value: 2.3 },
  { name: "Medan", value: 1.9 },
]
const REVENUE_COLUMNS: ChartPanelColumn[] = [
  { key: "month", label: "Month" },
  { key: "revenue", label: "Revenue", format: idRupiah },
]
const CHANNEL_COLUMNS: ChartPanelColumn[] = [
  { key: "week", label: "Week" },
  { key: "panel", label: "Panel", format: idNumber },
  { key: "streetIntercept", label: "Street intercept", format: idNumber },
  { key: "qr", label: "QR code", format: idNumber },
]
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
    <h2 class="text-h3 font-bold text-ink-heading">Line</h2>
    <p class="text-caption text-muted-foreground">2px straight segments; points appear on hover or keyboard focus (arrow keys). Two series differ by shape as well as colour.</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <ChartPanel title="Completion trend" description="Surveys · 12 weeks" summary="Started and completed surveys both grew steadily over 12 weeks, from 310 to 503 started and 248 to 433 completed." :columns="TREND_COLUMNS" :rows="SURVEY_TREND" data-specimen="line-two">
        <LineChart class="aspect-auto h-64" :data="SURVEY_TREND" category-key="week" :config="{ started: { label: 'Started' }, completed: { label: 'Completed' } }" :value-formatter="idNumber" />
      </ChartPanel>
      <ChartPanel title="Monthly revenue" description="Rupiah · Jun–Nov 2026 · one series, Indonesian format" summary="Revenue grew from Rp 182 million in June to Rp 262 million in November." :columns="REVENUE_COLUMNS" :rows="REVENUE" data-specimen="line-one">
        <LineChart class="aspect-auto h-64" :data="REVENUE" category-key="month" :config="{ revenue: { label: 'Revenue', color: 'var(--chart-1)' } }" :value-formatter="idRupiah" :axis-formatter="(v: number) => `Rp ${idCompact(v)}`" />
      </ChartPanel>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Area</h2>
    <p class="text-caption text-muted-foreground">Flat 20% fill with a 2px line on top; stacked layers use 40% fill. No gradient.</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <ChartPanel title="Completed surveys" description="Surveys · 12 weeks · single series" summary="Completed surveys grew from 248 to 433 over 12 weeks." :columns="TREND_COLUMNS.filter((c) => c.key !== 'started')" :rows="SURVEY_TREND" data-specimen="area-one">
        <AreaChart class="aspect-auto h-64" :data="SURVEY_TREND" category-key="week" :config="{ completed: { label: 'Completed' } }" :value-formatter="idNumber" />
      </ChartPanel>
      <ChartPanel title="Respondents by channel" description="Respondents · last 8 weeks · stacked" summary="QR code respondents grew fastest, from 38 to 152 a week, while panel stayed the largest channel." :columns="CHANNEL_COLUMNS" :rows="BY_CHANNEL" data-specimen="area-stacked">
        <AreaChart class="aspect-auto h-64" :data="BY_CHANNEL" category-key="week" stacked :config="{ panel: { label: 'Panel' }, streetIntercept: { label: 'Street intercept' }, qr: { label: 'QR code' } }" :value-formatter="idNumber" />
      </ChartPanel>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Donut and Pie</h2>
    <p class="text-caption text-muted-foreground">Largest slice first from 12 o'clock, 2px gaps, at most 5 slices then "Other". The legend carries name, value and percent.</p>
    <div class="grid gap-4 lg:grid-cols-2">
      <ChartPanel title="Billboard status" description="Billboards · 7 statuses, 5 shown plus Other" summary="Of 946 billboards, 612 are active, 141 scheduled and 88 under maintenance." :columns="[{ key: 'name', label: 'Status' }, { key: 'value', label: 'Billboards', format: idNumber }]" :rows="BILLBOARD_STATUS" data-specimen="pie-donut">
        <PieChart :data="BILLBOARD_STATUS" center-caption="Billboards" :value-formatter="idNumber" aria-label="Donut chart of billboard status" />
      </ChartPanel>
      <ChartPanel title="Share by city" description="Millions of impressions · Pie" summary="Jakarta has 40,7% of impressions, Surabaya 23,7%, Bandung 19,5% and Medan 16,1%." data-specimen="pie-pie">
        <PieChart :data="CITY_SHARE" :donut="false" :value-formatter="idNumber" />
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
