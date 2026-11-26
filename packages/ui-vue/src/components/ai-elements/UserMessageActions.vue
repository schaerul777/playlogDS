<script setup lang="ts">
import MessageAction from "./MessageAction.vue"
import { useCopy } from "./useCopy"

// Copy and edit, for the person's own message. Edit shows only when `@edit` is passed.
const props = defineProps<{ text: string; onEdit?: () => void }>()
const { copied, copy } = useCopy(() => props.text)
</script>

<template>
  <MessageAction :label="copied ? 'Copied' : 'Copy'" :icon="copied ? 'check' : 'clipboard'" @click="copy" />
  <MessageAction v-if="onEdit" label="Edit" icon="edit" @click="onEdit" />
</template>
