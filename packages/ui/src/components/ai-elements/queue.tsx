import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceStatusIcon,
  TraceTitle,
  Trace,
} from "@workspace/ui/components/trace"

type QueueTodoStatus = "pending" | "in-progress" | "completed"

type QueueTodo = {
  id: string
  title: string
  description?: string
  status: QueueTodoStatus
}

// Playlog: COMPONENT-SPECS Queue. The agent's todo list, read-only: "n to do" (open) and "n completed" (closed). A todo is a
// Trace line: pending `time`, in progress Spinner, completed `check`. A todo with a description is a collapsible that
// opens to the text. An empty section is hidden and an empty queue renders nothing. Place inside a <Trace>.
function Queue({ todos }: { todos: QueueTodo[] }) {
  const remaining = todos.filter((todo) => todo.status !== "completed")
  const completed = todos.filter((todo) => todo.status === "completed")

  if (todos.length === 0) {
    return null
  }

  return (
    <>
      {remaining.length > 0 ? (
        <QueueSection title={`${remaining.length} to do`} icon="clipboard" todos={remaining} defaultOpen />
      ) : null}
      {completed.length > 0 ? (
        <QueueSection title={`${completed.length} completed`} icon="check" todos={completed} />
      ) : null}
    </>
  )
}

function QueueSection({
  title,
  icon,
  todos,
  defaultOpen,
}: {
  title: string
  icon: "clipboard" | "check"
  todos: QueueTodo[]
  defaultOpen?: boolean
}) {
  return (
    <TraceCollapsible defaultOpen={defaultOpen}>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceStatusIcon icon={icon} />
          <TraceTitle>{title}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          {todos.map((todo) => (
            <QueueItem key={todo.id} todo={todo} />
          ))}
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

function QueueItem({ todo }: { todo: QueueTodo }) {
  const status = todo.status === "in-progress" ? "running" : todo.status === "pending" ? "pending" : undefined
  const line = (
    <TraceLine status={status}>
      <TraceStatusIcon status={status} />
      <TraceTitle>{todo.title}</TraceTitle>
    </TraceLine>
  )

  if (!todo.description) {
    return line
  }

  return (
    <TraceCollapsible>
      <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
      <TraceCollapsibleContent>{todo.description}</TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

export { Queue }
export type { QueueTodo, QueueTodoStatus }
