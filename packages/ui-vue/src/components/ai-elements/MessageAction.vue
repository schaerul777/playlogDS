<script setup lang="ts">
import { Button } from "@workspace/ui-vue/components/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui-vue/components/tooltip"
import { Icon, type IconName } from "@workspace/ui-vue/icons"

// Playlog: Button ghost icon-sm with an aria-label and a Tooltip.
withDefaults(defineProps<{ label: string; icon: IconName; ariaPressed?: boolean }>(), { ariaPressed: undefined })
defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="ghost" size="icon-sm" :aria-label="label" :aria-pressed="ariaPressed" @click="$emit('click', $event)"><Icon :name="icon" /></Button>
      </TooltipTrigger>
      <TooltipContent>{{ label }}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
