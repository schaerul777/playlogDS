<script setup lang="ts">
import { computed } from "vue"
import { Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceLine, TraceStatusIcon, TraceTitle } from "@workspace/ui-vue/components/trace"

export type QueueTodoStatus = "pending" | "in-progress" | "completed"
export type QueueTodo = { id: string; title: string; description?: string; status: QueueTodoStatus }

// Playlog: COMPONENT-SPECS Queue. The agent's todo list, read-only: "n to do" (open) and "n completed" (closed). A todo is a
// Trace line: pending `time`, in progress Spinner, completed `check`. A todo with a description is a collapsible that
// opens to the text. An empty section is hidden and an empty queue renders nothing. Place inside a <Trace>.
const props = defineProps<{ todos: QueueTodo[] }>()
const remaining = computed(() => props.todos.filter((t) => t.status !== "completed"))
const completed = computed(() => props.todos.filter((t) => t.status === "completed"))
const statusOf = (t: QueueTodo) => (t.status === "in-progress" ? "running" : t.status === "pending" ? "pending" : undefined)
</script>

<template>
  <template v-if="todos.length > 0">
    <TraceCollapsible v-if="remaining.length > 0" default-open>
      <TraceCollapsibleTrigger>
        <TraceLine><TraceStatusIcon icon="clipboard" /><TraceTitle>{{ remaining.length }} to do</TraceTitle></TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <template v-for="todo in remaining" :key="todo.id">
            <TraceLine v-if="!todo.description" :status="statusOf(todo)"><TraceStatusIcon :status="statusOf(todo)" /><TraceTitle>{{ todo.title }}</TraceTitle></TraceLine>
            <TraceCollapsible v-else>
              <TraceCollapsibleTrigger><TraceLine :status="statusOf(todo)"><TraceStatusIcon :status="statusOf(todo)" /><TraceTitle>{{ todo.title }}</TraceTitle></TraceLine></TraceCollapsibleTrigger>
              <TraceCollapsibleContent>{{ todo.description }}</TraceCollapsibleContent>
            </TraceCollapsible>
          </template>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
    <TraceCollapsible v-if="completed.length > 0">
      <TraceCollapsibleTrigger>
        <TraceLine><TraceStatusIcon icon="check" /><TraceTitle>{{ completed.length }} completed</TraceTitle></TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <template v-for="todo in completed" :key="todo.id">
            <TraceLine v-if="!todo.description" :status="statusOf(todo)"><TraceStatusIcon :status="statusOf(todo)" /><TraceTitle>{{ todo.title }}</TraceTitle></TraceLine>
            <TraceCollapsible v-else>
              <TraceCollapsibleTrigger><TraceLine :status="statusOf(todo)"><TraceStatusIcon :status="statusOf(todo)" /><TraceTitle>{{ todo.title }}</TraceTitle></TraceLine></TraceCollapsibleTrigger>
              <TraceCollapsibleContent>{{ todo.description }}</TraceCollapsibleContent>
            </TraceCollapsible>
          </template>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </template>
</template>
