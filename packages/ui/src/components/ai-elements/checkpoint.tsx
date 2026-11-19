import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { Button } from "@workspace/ui/components/button"
import { Marker, MarkerContent } from "@workspace/ui/components/marker"

// Playlog: COMPONENT-SPECS Checkpoint. Our Marker `separator` after a turn: the label, then Button `outline` `xs` "Restore",
// between two 1px `border` lines. Restore keeps that turn and drops every later message, so it asks first in an Alert
// Dialog; Cancel returns focus to the Restore button.
function Checkpoint({
  label,
  onRestore,
  restoreLabel = "Restore",
}: {
  /** What the person returns to, for example "Button renamed". */
  label: string
  onRestore: () => void
  restoreLabel?: string
}) {
  return (
    <Marker variant="separator" data-slot="checkpoint">
      <MarkerContent className="inline-flex items-center gap-2">
        {label}
        <AlertDialog>
          <AlertDialogTrigger render={<Button size="xs" variant="outline" />}>{restoreLabel}</AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Restore to “{label}”?</AlertDialogTitle>
              <AlertDialogDescription>Later messages are removed.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onRestore}>{restoreLabel}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </MarkerContent>
    </Marker>
  )
}

export { Checkpoint }
