<script setup lang="ts">
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@workspace/ui-vue/components/alert"
import { Badge } from "@workspace/ui-vue/components/badge"
import { Button } from "@workspace/ui-vue/components/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui-vue/components/card"
import { StatCard } from "@workspace/ui-vue/components/stat-card"
import { Icon } from "@workspace/ui-vue/icons"

const badgeVariants = ["default", "secondary", "destructive", "info", "success", "warning", "accent", "outline", "ghost", "link"] as const
const alertVariants = ["default", "info", "success", "warning", "destructive"] as const
</script>

<template>
  <section id="display" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Display: Badge, Alert, Card, StatCard</h2>

    <div class="flex flex-wrap items-center gap-3">
      <Badge v-for="variant in badgeVariants" :key="variant" :variant="variant" :data-specimen="`badge-${variant}`">{{ variant }}</Badge>
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <Badge variant="success" data-specimen="badge-icon"><Icon name="check" />Live</Badge>
      <Badge variant="info" aria-disabled="true" data-specimen="badge-disabled">Disabled</Badge>
      <Badge variant="secondary" aria-invalid="true" data-specimen="badge-invalid">Invalid</Badge>
      <Badge as="a" href="#display" variant="outline" data-specimen="badge-link">As link</Badge>
    </div>

    <div class="flex max-w-xl flex-col gap-3">
      <Alert v-for="variant in alertVariants" :key="variant" :variant="variant" :data-specimen="`alert-${variant}`">
        <Icon name="info" />
        <AlertTitle>{{ variant }} alert</AlertTitle>
        <AlertDescription>Figures update after you save the report.</AlertDescription>
      </Alert>
      <Alert variant="info" data-specimen="alert-no-icon">
        <AlertTitle>No icon</AlertTitle>
        <AlertDescription>Text only alert.</AlertDescription>
      </Alert>
      <Alert variant="warning" data-specimen="alert-action">
        <Icon name="warning" />
        <AlertTitle>With action</AlertTitle>
        <AlertDescription>Coverage is below target.</AlertDescription>
        <AlertAction><Button size="xs" variant="outline">Review</Button></AlertAction>
      </Alert>
    </div>

    <div class="flex flex-wrap items-start gap-4">
      <Card class="w-80" data-specimen="card-default">
        <CardHeader data-specimen="card-header">
          <CardTitle data-specimen="card-title">Roadside reach</CardTitle>
          <CardDescription data-specimen="card-description">Q1 2025, 25 cities</CardDescription>
          <CardAction data-specimen="card-action"><Button size="sm" variant="outline">Export</Button></CardAction>
        </CardHeader>
        <CardContent data-specimen="card-content"><p>Reach grew in every city.</p></CardContent>
        <CardFooter data-specimen="card-footer"><Button size="sm">Open report</Button></CardFooter>
      </Card>
      <Card size="sm" class="w-80" data-specimen="card-sm">
        <CardHeader>
          <CardTitle data-specimen="card-sm-title">Dense card</CardTitle>
          <CardDescription>Small size</CardDescription>
        </CardHeader>
        <CardContent><p>Content</p></CardContent>
      </Card>
    </div>

    <div class="grid max-w-3xl grid-cols-3 gap-4">
      <StatCard label="Impressions" value="1,204,000" delta="+8,2%" trend="good" footer="Q1–Q3 2025 · 25 cities" data-specimen="stat-good">
        <template #icon><Icon name="chart-line" /></template>
      </StatCard>
      <StatCard label="Frequency" value="3,4" delta="-1,1%" trend="bad" footer="Per person" data-specimen="stat-bad" />
      <StatCard label="Reach" value="62%" delta="0,0%" data-specimen="stat-neutral" />
      <StatCard label="No footer" value="18" data-specimen="stat-bare" />
    </div>
  </section>
</template>
