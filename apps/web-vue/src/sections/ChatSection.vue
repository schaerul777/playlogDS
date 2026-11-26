<script setup lang="ts">
import { ref } from "vue"
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from "@workspace/ui-vue/components/attachment"
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@workspace/ui-vue/components/bubble"
import { Button } from "@workspace/ui-vue/components/button"
import { Marker, MarkerContent, MarkerIcon } from "@workspace/ui-vue/components/marker"
import { Message, MessageContent, MessageFooter, MessageHeader } from "@workspace/ui-vue/components/message"
import { Spinner } from "@workspace/ui-vue/components/spinner"
import { Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceDescription, TraceLine, TraceStatusIcon, TraceTitle } from "@workspace/ui-vue/components/trace"
import { Icon } from "@workspace/ui-vue/icons"

const variants = ["default", "secondary", "muted", "tinted", "outline", "ghost", "destructive"] as const
const open = ref(false)
</script>

<template>
  <p class="text-caption font-medium tracking-wide text-muted-foreground uppercase">Chat pieces</p>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Bubble</h2>
    <div class="flex flex-col gap-3" data-specimen="bubbles">
      <Bubble v-for="v in variants" :key="v" :variant="v">
        <BubbleContent>{{ v }} bubble with some text that wraps when it gets long enough to fill the row.</BubbleContent>
      </Bubble>
      <Bubble variant="secondary" align="end"><BubbleContent as="button">Interactive bubble (button)</BubbleContent></Bubble>
      <BubbleGroup>
        <Bubble variant="secondary" class="mb-3">
          <BubbleContent>With reactions</BubbleContent>
          <BubbleReactions>👍 2</BubbleReactions>
        </Bubble>
      </BubbleGroup>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Message and Marker</h2>
    <div class="flex max-w-xl flex-col gap-6" data-specimen="messages">
      <Marker variant="separator"><MarkerContent>Today</MarkerContent></Marker>
      <Message align="end">
        <MessageContent>
          <Bubble variant="secondary"><BubbleContent>How many billboards are active in Jakarta?</BubbleContent></Bubble>
        </MessageContent>
      </Message>
      <Message align="start">
        <MessageContent>
          <MessageHeader>Playlog assistant</MessageHeader>
          <Bubble variant="ghost"><BubbleContent>There are 612 active billboards, 141 scheduled and 88 under maintenance.</BubbleContent></Bubble>
          <MessageFooter>
            <Button variant="ghost" size="icon-sm" aria-label="Copy"><Icon name="clipboard" /></Button>
            <Button variant="ghost" size="icon-sm" aria-label="Good response" :aria-pressed="true"><Icon name="thumbs-up" /></Button>
            <Button variant="ghost" size="icon-sm" aria-label="Bad response"><Icon name="thumbs-down" /></Button>
            <Button variant="ghost" size="icon-sm" aria-label="Retry"><Icon name="refresh" /></Button>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Marker><MarkerIcon><Icon name="info" /></MarkerIcon><MarkerContent>Context was summarised</MarkerContent></Marker>
      <Marker variant="border"><MarkerContent>Border marker</MarkerContent></Marker>
      <Marker role="status"><MarkerIcon><Spinner class="size-4" /></MarkerIcon><MarkerContent>Checking the logs…</MarkerContent></Marker>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Trace</h2>
    <div class="max-w-xl" data-specimen="trace">
      <Trace>
        <TraceLine><TraceStatusIcon icon="terminal" /><TraceTitle>Ran pnpm test</TraceTitle></TraceLine>
        <TraceLine status="running"><TraceStatusIcon status="running" /><TraceTitle>Running pnpm build</TraceTitle></TraceLine>
        <TraceLine status="error"><TraceStatusIcon status="error" /><TraceTitle>Failed to run pnpm lint</TraceTitle><TraceDescription>exit 1</TraceDescription></TraceLine>
        <TraceLine status="pending"><TraceStatusIcon status="pending" /><TraceTitle>Waiting for approval</TraceTitle></TraceLine>
        <TraceCollapsible v-model:open="open">
          <TraceCollapsibleTrigger>
            <TraceLine><TraceStatusIcon icon="brain" /><TraceTitle>Thought for 5s</TraceTitle></TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>Checking the status counts first, then the city filter.</TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Attachment</h2>
    <div class="flex max-w-xl flex-col gap-3" data-specimen="attachments">
      <Attachment><AttachmentMedia><Icon name="sticky-note" /></AttachmentMedia><AttachmentContent><AttachmentTitle>report-nov.pdf</AttachmentTitle><AttachmentDescription>2,4 MB</AttachmentDescription></AttachmentContent><AttachmentActions><AttachmentAction aria-label="Remove"><Icon name="close" /></AttachmentAction></AttachmentActions></Attachment>
      <Attachment state="idle"><AttachmentMedia><Icon name="sticky-note" /></AttachmentMedia><AttachmentContent><AttachmentTitle>Drop a file</AttachmentTitle><AttachmentDescription>or browse</AttachmentDescription></AttachmentContent></Attachment>
      <Attachment state="uploading"><AttachmentMedia><Spinner class="size-4" /></AttachmentMedia><AttachmentContent><AttachmentTitle>upload.csv</AttachmentTitle><AttachmentDescription>Uploading…</AttachmentDescription></AttachmentContent></Attachment>
      <Attachment state="error"><AttachmentMedia><Icon name="alert-circle" /></AttachmentMedia><AttachmentContent><AttachmentTitle>big.mov</AttachmentTitle><AttachmentDescription>Too large (max 25 MB)</AttachmentDescription></AttachmentContent></Attachment>
      <Attachment size="sm"><AttachmentMedia><Icon name="sticky-note" /></AttachmentMedia><AttachmentContent><AttachmentTitle>small.txt</AttachmentTitle><AttachmentDescription>1 KB</AttachmentDescription></AttachmentContent><AttachmentTrigger aria-label="Open small.txt" /></Attachment>
      <Attachment size="xs"><AttachmentMedia><Icon name="sticky-note" /></AttachmentMedia><AttachmentContent><AttachmentTitle>tiny.txt</AttachmentTitle></AttachmentContent></Attachment>
      <AttachmentGroup>
        <Attachment v-for="n in 4" :key="n" orientation="vertical"><AttachmentMedia><Icon name="sticky-note" /></AttachmentMedia><AttachmentContent><AttachmentTitle>file-{{ n }}.png</AttachmentTitle></AttachmentContent></Attachment>
      </AttachmentGroup>
    </div>
  </section>
</template>
