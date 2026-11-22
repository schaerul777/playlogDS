<script setup lang="ts">
import { ref } from "vue"
import { Input } from "@workspace/ui-vue/components/input"
import { Label } from "@workspace/ui-vue/components/label"

const email = ref("")
</script>

<template>
  <section id="input" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Input and Label</h2>

    <div class="grid max-w-md gap-6">
      <div class="grid gap-1.5">
        <Label for="in-default">Label</Label>
        <Input id="in-default" placeholder="Placeholder" data-specimen="input-default" />
      </div>

      <div class="grid gap-1.5">
        <Label for="in-value">With value</Label>
        <Input id="in-value" default-value="Jakarta" data-specimen="input-value" />
      </div>

      <div class="grid gap-1.5">
        <Label for="in-required" required>Required</Label>
        <Input id="in-required" required placeholder="name@company.com" data-specimen="input-required" />
      </div>

      <div class="grid gap-1.5">
        <Label for="in-v-model">Controlled (v-model)</Label>
        <Input id="in-v-model" v-model="email" placeholder="Type here" data-specimen="input-model" />
        <p class="text-caption text-muted-foreground">Model value: {{ email || "(empty)" }}</p>
      </div>

      <div class="grid gap-1.5">
        <Label for="in-invalid">Invalid</Label>
        <Input
          id="in-invalid"
          aria-invalid="true"
          aria-describedby="in-invalid-error"
          default-value="not-an-email"
          data-specimen="input-invalid"
        />
        <p id="in-invalid-error" role="alert" class="text-caption text-danger-text">
          Enter an email address, for example name@company.com.
        </p>
      </div>

      <div class="grid gap-1.5">
        <Label for="in-disabled">Disabled</Label>
        <Input id="in-disabled" disabled default-value="Cannot edit" data-specimen="input-disabled" />
      </div>

      <div class="grid gap-1.5">
        <Label for="in-file">File</Label>
        <Input id="in-file" type="file" data-specimen="input-file" />
      </div>
    </div>
  </section>
</template>
