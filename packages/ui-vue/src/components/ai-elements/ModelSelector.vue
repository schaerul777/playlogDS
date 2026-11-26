<script setup lang="ts">
import { computed } from "vue"
import { Badge } from "@workspace/ui-vue/components/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui-vue/components/dropdown-menu"
import { InputGroupButton } from "@workspace/ui-vue/components/input-group"
import { Icon } from "@workspace/ui-vue/icons"
import { defaultEfforts, type Effort, type ModelProvider } from "./model-selector-utils"

// Playlog: COMPONENT-SPECS Model Selector. Two Dropdown Menus for the Prompt Input toolbar: the model (grouped by provider
// with radio items) and the effort. Triggers are InputGroupButton `sm` (32) with the current value and `chevron-down`.
// `v-model:model` and `v-model:effort`; pass `:efforts="null"` to hide the effort menu.
const props = withDefaults(
  defineProps<{ providers: ModelProvider[]; efforts?: Effort[] | null; disabled?: boolean }>(),
  { efforts: () => defaultEfforts },
)
const model = defineModel<string>("model", { required: true })
const effort = defineModel<string>("effort")
const current = computed(() => props.providers.flatMap((p) => p.models).find((o) => o.value === model.value))
const currentEffort = computed(() => props.efforts?.find((o) => o.value === effort.value))
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child :disabled="disabled">
      <InputGroupButton size="sm" :aria-label="`Model: ${current?.label ?? 'none'}`" :disabled="disabled">
        {{ current?.label ?? "Model" }}
        <Icon name="chevron-down" />
      </InputGroupButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" class="w-48">
      <DropdownMenuRadioGroup v-model="model">
        <template v-for="(provider, index) in providers" :key="provider.name">
          <DropdownMenuSeparator v-if="index > 0" />
          <DropdownMenuGroup>
            <DropdownMenuLabel>{{ provider.name }}</DropdownMenuLabel>
            <DropdownMenuRadioItem v-for="option in provider.models" :key="option.value" :value="option.value" :disabled="option.disabled" close-on-click>
              {{ option.label }}
              <span v-if="option.disabled" class="text-muted-foreground">(unavailable)</span>
              <Badge v-if="option.badge && !option.disabled" variant="secondary" class="ml-auto">{{ option.badge }}</Badge>
            </DropdownMenuRadioItem>
          </DropdownMenuGroup>
        </template>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
  <DropdownMenu v-if="efforts">
    <DropdownMenuTrigger as-child :disabled="disabled">
      <InputGroupButton size="sm" :aria-label="`Effort: ${currentEffort?.label ?? 'none'}`" :disabled="disabled">
        {{ currentEffort?.label ?? "Effort" }}
        <Icon name="chevron-down" />
      </InputGroupButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" class="w-36">
      <DropdownMenuGroup>
        <DropdownMenuLabel>Effort</DropdownMenuLabel>
        <DropdownMenuRadioGroup v-model="effort">
          <DropdownMenuRadioItem v-for="option in efforts" :key="option.value" :value="option.value" close-on-click>{{ option.label }}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
