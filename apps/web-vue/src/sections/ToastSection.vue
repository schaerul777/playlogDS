<script setup lang="ts">
import { Button } from "@workspace/ui-vue/components/button"
import { toast, Toaster } from "@workspace/ui-vue/components/sonner"
</script>

<template>
  <section id="toast" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Toast</h2>
    <Toaster />
    <div class="flex flex-wrap gap-3">
      <Button variant="outline" data-specimen="toast-default" @click="toast('Report saved')">Default</Button>
      <Button variant="outline" data-specimen="toast-success" @click="toast.success('Export ready', { description: 'Q3 roadside reach.csv, 2,4 MB' })">Success</Button>
      <Button variant="outline" data-specimen="toast-info" @click="toast.info('New data available', { description: 'September figures for 25 cities.' })">Info</Button>
      <Button variant="outline" data-specimen="toast-warning" @click="toast.warning('Partial data', { description: 'Medan has no figures for August.' })">Warning</Button>
      <Button variant="outline" data-specimen="toast-error" @click="toast.error('Export failed', { description: 'The file is too large. Narrow the period and try again.' })">Error</Button>
    </div>
  </section>
</template>
