<script setup lang="ts">
import { Checkbox } from "@workspace/ui-vue/components/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@workspace/ui-vue/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui-vue/components/input-group"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@workspace/ui-vue/components/native-select"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui-vue/components/select"
import { Icon } from "@workspace/ui-vue/icons"

const specimens = [
  { id: "default", props: {} },
  { id: "value", props: { defaultValue: "jakarta" } },
  { id: "sm", props: { defaultValue: "bandung", size: "sm" as const } },
  { id: "invalid", props: { defaultValue: "jakarta", invalid: true } },
  { id: "disabled", props: { defaultValue: "jakarta", disabled: true } },
]
</script>

<template>
  <section id="batch2" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Batch 2: Select, Native Select, Field, Input Group</h2>

    <div class="flex flex-wrap items-center gap-3">
      <Select
        v-for="s in specimens"
        :key="s.id"
        :default-value="s.props.defaultValue"
        :disabled="s.props.disabled"
      >
        <SelectTrigger
          :size="s.props.size"
          :aria-label="`City ${s.id}`"
          :aria-invalid="s.props.invalid ? 'true' : undefined"
          class="w-48"
          :data-specimen="`select-${s.id}`"
        >
          <SelectValue placeholder="Choose a city" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Java</SelectLabel>
            <SelectItem value="jakarta">Jakarta</SelectItem>
            <SelectItem value="bandung">Bandung</SelectItem>
            <SelectItem value="surabaya">Surabaya</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Outside Java</SelectLabel>
            <SelectItem value="medan">Medan</SelectItem>
            <SelectItem value="makassar" disabled>Makassar</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <NativeSelect class="w-48" aria-label="Native default" data-specimen="native-default">
        <NativeSelectOption value="">Choose a city</NativeSelectOption>
        <NativeSelectOptGroup label="Java">
          <NativeSelectOption value="jakarta">Jakarta</NativeSelectOption>
          <NativeSelectOption value="bandung">Bandung</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
      <NativeSelect class="w-48" size="sm" aria-label="Native small" data-specimen="native-sm">
        <NativeSelectOption value="jakarta">Jakarta</NativeSelectOption>
      </NativeSelect>
      <NativeSelect class="w-48" aria-label="Native invalid" aria-invalid="true" data-specimen="native-invalid">
        <NativeSelectOption value="jakarta">Jakarta</NativeSelectOption>
      </NativeSelect>
      <NativeSelect class="w-48" disabled aria-label="Native disabled" data-specimen="native-disabled">
        <NativeSelectOption value="jakarta">Jakarta</NativeSelectOption>
      </NativeSelect>
    </div>

    <FieldGroup class="max-w-md" data-specimen="field-group">
      <FieldSet data-specimen="field-set">
        <FieldLegend>Report settings</FieldLegend>
        <Field data-specimen="field-vertical">
          <FieldLabel for="f-name">Report name</FieldLabel>
          <InputGroup>
            <InputGroupInput id="f-name" default-value="Roadside reach Q1" />
          </InputGroup>
          <FieldDescription>Shown in the report header.</FieldDescription>
        </Field>
        <Field data-specimen="field-error-state">
          <FieldLabel for="f-reach">Target reach</FieldLabel>
          <InputGroup>
            <InputGroupInput id="f-reach" aria-invalid="true" default-value="120" />
            <InputGroupAddon align="inline-end"><InputGroupText>%</InputGroupText></InputGroupAddon>
          </InputGroup>
          <FieldDescription>Hidden while the error shows.</FieldDescription>
          <FieldError>Reach can't be above 100%.</FieldError>
        </Field>
        <Field orientation="horizontal" data-specimen="field-horizontal">
          <Checkbox id="f-share" />
          <FieldLabel for="f-share">Share with the team</FieldLabel>
        </Field>
      </FieldSet>
      <FieldSeparator data-specimen="field-separator">Or</FieldSeparator>
      <Field>
        <FieldLabel for="f-search">Search</FieldLabel>
        <InputGroup data-specimen="ig-search">
          <InputGroupAddon><Icon name="search" /></InputGroupAddon>
          <InputGroupInput id="f-search" placeholder="Search cities" />
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel for="f-url">Dashboard URL</FieldLabel>
        <InputGroup data-specimen="ig-url">
          <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
          <InputGroupInput id="f-url" default-value="playlog.id/reach" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" aria-label="Copy link"><Icon name="clipboard" /></InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel for="f-note">Note</FieldLabel>
        <InputGroup data-specimen="ig-textarea">
          <InputGroupTextarea id="f-note" placeholder="Write a note" />
          <InputGroupAddon align="block-end"><InputGroupText>0 / 280</InputGroupText></InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel for="f-dis">Disabled</FieldLabel>
        <InputGroup data-specimen="ig-disabled">
          <InputGroupInput id="f-dis" disabled default-value="Cannot edit" />
        </InputGroup>
      </Field>
    </FieldGroup>
  </section>
</template>
