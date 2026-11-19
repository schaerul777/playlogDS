import { Button } from "@workspace/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"
import { Icon, type IconName } from "@workspace/ui/icons/icon" // Playlog: brand icon set

// Playlog: COMPONENT-SPECS Confirmation. A question for the person, not a step the agent took, so it sits outside Trace:
// our Item (`outline`, `sm`) with the tool glyph, a title like "Run pnpm build?", a description, and Deny (Button
// `outline` `sm`) and Approve (Button `default` `sm`). After the answer, render a Tool line instead.
function Confirmation({
  title,
  description,
  icon = "terminal",
  denyLabel = "Deny",
  approveLabel = "Approve",
  onDeny,
  onApprove,
  disabled,
}: {
  title: string
  description?: string
  icon?: IconName
  denyLabel?: string
  approveLabel?: string
  onDeny?: () => void
  onApprove?: () => void
  disabled?: boolean
}) {
  return (
    <Item
      data-slot="confirmation"
      variant="outline"
      size="sm"
      role="group"
      aria-label={title}
    >
      <ItemMedia variant="icon">
        <Icon name={icon} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        {description ? <ItemDescription>{description}</ItemDescription> : null}
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline" disabled={disabled} onClick={onDeny}>
          {denyLabel}
        </Button>
        <Button size="sm" disabled={disabled} onClick={onApprove}>
          {approveLabel}
        </Button>
      </ItemActions>
    </Item>
  )
}

export { Confirmation }
