<script setup lang="ts">
import { Button } from "@workspace/ui-vue/components/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@workspace/ui-vue/components/item"
import { Icon, type IconName } from "@workspace/ui-vue/icons"

// Playlog: COMPONENT-SPECS Confirmation. A question for the person, not a step the agent took, so it sits outside Trace:
// our Item (`outline`, `sm`) with the tool glyph, a title like "Run pnpm build?", a description, and Deny (Button
// `outline` `sm`) and Approve (Button `default` `sm`). After the answer, render a Tool line instead.
withDefaults(
  defineProps<{ title: string; description?: string; icon?: IconName; denyLabel?: string; approveLabel?: string; disabled?: boolean }>(),
  { icon: "terminal", denyLabel: "Deny", approveLabel: "Approve" },
)
defineEmits<{ deny: []; approve: [] }>()
</script>

<template>
  <Item data-slot="confirmation" variant="outline" size="sm" role="group" :aria-label="title">
    <ItemMedia variant="icon"><Icon :name="icon" /></ItemMedia>
    <ItemContent>
      <ItemTitle>{{ title }}</ItemTitle>
      <ItemDescription v-if="description">{{ description }}</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button size="sm" variant="outline" :disabled="disabled" @click="$emit('deny')">{{ denyLabel }}</Button>
      <Button size="sm" :disabled="disabled" @click="$emit('approve')">{{ approveLabel }}</Button>
    </ItemActions>
  </Item>
</template>
