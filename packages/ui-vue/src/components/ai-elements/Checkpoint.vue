<script setup lang="ts">
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@workspace/ui-vue/components/alert-dialog"
import { Button } from "@workspace/ui-vue/components/button"
import { Marker, MarkerContent } from "@workspace/ui-vue/components/marker"

// Playlog: COMPONENT-SPECS Checkpoint. Our Marker `separator` after a turn: the label, then Button `outline` `xs` "Restore",
// between two 1px `border` lines. Restore keeps that turn and drops every later message, so it asks first in an Alert
// Dialog; Cancel returns focus to the Restore button. Emits `restore`.
withDefaults(defineProps<{ /** What the person returns to, for example "Button renamed". */ label: string; restoreLabel?: string }>(), { restoreLabel: "Restore" })
defineEmits<{ restore: [] }>()
</script>

<template>
  <Marker variant="separator" data-slot="checkpoint">
    <MarkerContent class="inline-flex items-center gap-2">
      {{ label }}
      <AlertDialog>
        <AlertDialogTrigger as-child><Button size="xs" variant="outline">{{ restoreLabel }}</Button></AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Restore to “{{ label }}”?</AlertDialogTitle>
            <AlertDialogDescription>Later messages are removed.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction @click="$emit('restore')">{{ restoreLabel }}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MarkerContent>
  </Marker>
</template>
