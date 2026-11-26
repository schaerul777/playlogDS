<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, ref } from "vue"
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentMedia, AttachmentTitle } from "@workspace/ui-vue/components/attachment"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@workspace/ui-vue/components/input-group"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

export type PromptInputStatus = "ready" | "streaming" | "disabled"
export type PromptInputSubmit = { text: string; files: File[] }

// Playlog: COMPONENT-SPECS Prompt Input. Our Input Group around a Textarea: attached files as Attachment `sm` chips above
// the text, and a toolbar below: attach (Button `outline` `icon-sm`), a slot for the Model Selector and send (Button
// `default` `icon-sm`), which becomes Stop while the reply streams.
// Keys: Enter sends, Shift+Enter adds a line, Escape stops a running reply.
const props = withDefaults(
  defineProps<{
    status?: PromptInputStatus
    placeholder?: string
    /** Initial text and attached files, for a prefilled field. */
    defaultText?: string
    defaultFiles?: File[]
    class?: HTMLAttributes["class"]
  }>(),
  { status: "ready", placeholder: "Message the assistant", defaultText: "", defaultFiles: () => [] },
)
const emit = defineEmits<{ submit: [message: PromptInputSubmit]; stop: [] }>()

type AttachedFile = { id: string; file: File }
const text = ref(props.defaultText)
const files = ref<AttachedFile[]>(props.defaultFiles.map((file) => ({ id: crypto.randomUUID(), file })))
const formRef = ref<HTMLFormElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const disabled = computed(() => props.status === "disabled")
const streaming = computed(() => props.status === "streaming")
const canSend = computed(() => text.value.trim().length > 0 && !disabled.value && !streaming.value)

function submit() {
  if (!canSend.value) return
  emit("submit", { text: text.value.trim(), files: files.value.map((item) => item.file) })
  text.value = ""
  files.value = []
}
function attach(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) files.value = [...files.value, ...Array.from(input.files, (file) => ({ id: crypto.randomUUID(), file }))]
  input.value = ""
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
    event.preventDefault()
    formRef.value?.requestSubmit()
  }
  if (event.key === "Escape" && streaming.value) {
    event.preventDefault()
    emit("stop")
  }
}
</script>

<template>
  <form ref="formRef" :class="cn('w-full', props.class)" @submit.prevent="submit">
    <input ref="inputRef" type="file" multiple class="sr-only" tabindex="-1" aria-hidden="true" @change="attach" />
    <InputGroup>
      <InputGroupAddon v-if="files.length > 0" align="block-start" class="flex-wrap gap-2">
        <Attachment v-for="item in files" :key="item.id" size="sm">
          <AttachmentMedia><Icon name="sticky-note" /></AttachmentMedia>
          <AttachmentContent><AttachmentTitle>{{ item.file.name }}</AttachmentTitle></AttachmentContent>
          <AttachmentActions>
            <AttachmentAction :aria-label="`Remove ${item.file.name}`" @click="files = files.filter((f) => f.id !== item.id)">
              <Icon name="close" />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </InputGroupAddon>
      <!-- Playlog: grows up to 8 lines (160), then scrolls. -->
      <InputGroupTextarea v-model="text" :disabled="disabled" :placeholder="placeholder" aria-label="Message" class="max-h-40 min-h-10 overflow-y-auto px-3" @keydown="onKeydown" />
      <InputGroupAddon align="block-end">
        <InputGroupButton size="icon-sm" variant="outline" aria-label="Attach files" :disabled="disabled" @click="inputRef?.click()">
          <Icon name="attachment" />
        </InputGroupButton>
        <div class="flex min-w-0 flex-1 items-center gap-2"><slot /></div>
        <InputGroupButton v-if="streaming" size="icon-sm" variant="default" aria-label="Stop" @click="emit('stop')">
          <Icon name="stop" />
        </InputGroupButton>
        <InputGroupButton v-else type="submit" size="icon-sm" variant="default" aria-label="Send" :disabled="!canSend">
          <Icon name="send" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </form>
</template>
