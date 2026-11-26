<script setup lang="ts">
import { Checkbox } from "@workspace/ui-vue/components/checkbox"
import { Label } from "@workspace/ui-vue/components/label"
import { RadioGroup, RadioGroupItem } from "@workspace/ui-vue/components/radio-group"
import { Switch } from "@workspace/ui-vue/components/switch"
import { Textarea } from "@workspace/ui-vue/components/textarea"
</script>

<template>
  <section id="forms" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Forms: Textarea, Checkbox, Switch, Radio Group</h2>

    <div class="grid max-w-md gap-6">
      <div class="grid gap-1.5">
        <Label for="ta-default">Textarea</Label>
        <Textarea id="ta-default" placeholder="Write a note" data-specimen="textarea-default" />
      </div>
      <div class="grid gap-1.5">
        <Label for="ta-value">With value</Label>
        <Textarea id="ta-value" default-value="Roadside reach grew in Q1." data-specimen="textarea-value" />
      </div>
      <div class="grid gap-1.5">
        <Label for="ta-invalid">Invalid</Label>
        <Textarea id="ta-invalid" aria-invalid="true" default-value="x" data-specimen="textarea-invalid" />
      </div>
      <div class="grid gap-1.5">
        <Label for="ta-disabled">Disabled</Label>
        <Textarea id="ta-disabled" disabled default-value="Cannot edit" data-specimen="textarea-disabled" />
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2.5">
        <Checkbox id="cb-off" data-specimen="checkbox-off" />
        <Label for="cb-off">Unchecked</Label>
      </div>
      <div class="flex items-center gap-2.5">
        <Checkbox id="cb-on" :default-value="true" data-specimen="checkbox-on" />
        <Label for="cb-on">Checked</Label>
      </div>
      <div class="flex items-center gap-2.5">
        <Checkbox id="cb-invalid" aria-invalid="true" data-specimen="checkbox-invalid" />
        <Label for="cb-invalid">Invalid</Label>
      </div>
      <div class="flex items-center gap-2.5">
        <Checkbox id="cb-invalid-on" :default-value="true" aria-invalid="true" data-specimen="checkbox-invalid-on" />
        <Label for="cb-invalid-on">Invalid, checked</Label>
      </div>
      <div class="flex items-center gap-2.5">
        <Checkbox id="cb-dis" disabled data-specimen="checkbox-disabled" />
        <Label for="cb-dis">Disabled</Label>
      </div>
      <div class="flex items-center gap-2.5">
        <Checkbox id="cb-dis-on" disabled :default-value="true" data-specimen="checkbox-disabled-on" />
        <Label for="cb-dis-on">Disabled, checked</Label>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2.5">
        <Switch id="sw-off" data-specimen="switch-off" />
        <Label for="sw-off">Off</Label>
      </div>
      <div class="flex items-center gap-2.5">
        <Switch id="sw-on" :default-value="true" data-specimen="switch-on" />
        <Label for="sw-on">On</Label>
      </div>
      <div class="flex items-center gap-2.5">
        <Switch id="sw-sm-off" size="sm" data-specimen="switch-sm-off" />
        <Label for="sw-sm-off">Small, off</Label>
      </div>
      <div class="flex items-center gap-2.5">
        <Switch id="sw-sm-on" size="sm" :default-value="true" data-specimen="switch-sm-on" />
        <Label for="sw-sm-on">Small, on</Label>
      </div>
      <div class="flex items-center gap-2.5">
        <Switch id="sw-invalid" aria-invalid="true" data-specimen="switch-invalid" />
        <Label for="sw-invalid">Invalid</Label>
      </div>
      <div class="flex items-center gap-2.5">
        <Switch id="sw-dis" disabled data-specimen="switch-disabled" />
        <Label for="sw-dis">Disabled</Label>
      </div>
    </div>

    <RadioGroup default-value="roadside" class="max-w-md">
      <div class="flex items-center gap-2.5">
        <RadioGroupItem id="rg-1" value="roadside" data-specimen="radio-on" />
        <Label for="rg-1">Roadside</Label>
      </div>
      <div class="flex items-center gap-2.5">
        <RadioGroupItem id="rg-2" value="transit" data-specimen="radio-off" />
        <Label for="rg-2">Transit</Label>
      </div>
      <div class="flex items-center gap-2.5">
        <RadioGroupItem id="rg-3" value="place" aria-invalid="true" data-specimen="radio-invalid" />
        <Label for="rg-3">Invalid</Label>
      </div>
      <div class="flex items-center gap-2.5">
        <RadioGroupItem id="rg-4" value="ambience" disabled data-specimen="radio-disabled" />
        <Label for="rg-4">Disabled</Label>
      </div>
    </RadioGroup>
  </section>
</template>
