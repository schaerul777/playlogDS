<script setup lang="ts">
import { onMounted, ref } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import ButtonSection from "./sections/ButtonSection.vue"
import FormsSection from "./sections/FormsSection.vue"
import SelectFieldSection from "./sections/SelectFieldSection.vue"
import Batch3Section from "./sections/Batch3Section.vue"
import OverlaysSection from "./sections/OverlaysSection.vue"
import MenusSection from "./sections/MenusSection.vue"
import ToastSection from "./sections/ToastSection.vue"
import DialogSection from "./sections/DialogSection.vue"
import InputSection from "./sections/InputSection.vue"

// Dark mode is the .dark class on <html> (same as the React playground). `?theme=dark` starts dark.
const dark = ref(false)
function apply(value: boolean) {
  dark.value = value
  document.documentElement.classList.toggle("dark", value)
}
onMounted(() => apply(new URLSearchParams(location.search).get("theme") === "dark"))
</script>

<template>
  <main class="mx-auto flex max-w-4xl flex-col gap-12 p-6 text-body-sm">
    <header class="flex items-center justify-between gap-4">
      <h1 class="text-h1 text-ink-heading">Playlog UI (Vue): pilot</h1>
      <Button variant="outline" :aria-pressed="dark" @click="apply(!dark)">
        {{ dark ? "Dark" : "Light" }} mode
      </Button>
    </header>
    <ButtonSection />
    <InputSection />
    <FormsSection />
    <SelectFieldSection />
    <Batch3Section />
    <DialogSection />
    <OverlaysSection />
    <MenusSection />
    <ToastSection />
  </main>
</template>
