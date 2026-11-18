import * as React from "react"

import {
  extraStrokeIconPaths,
  type ExtraIconName,
} from "@workspace/ui/icons/extra-icons"
import {
  iconPaths,
  strokeIconPaths,
  type IconName as SetIconName,
} from "@workspace/ui/icons/icon-data"

/** Every glyph Icon can draw: the Playlog set (48 filled + 5 stroke) and the approved extra stroke glyphs. */
type IconName = SetIconName | ExtraIconName

const strokePaths: Record<string, string> = {
  ...strokeIconPaths,
  ...extraStrokeIconPaths,
}

type IconProps = Omit<React.SVGProps<SVGSVGElement>, "name" | "children"> & {
  /** Glyph from the Playlog icon set. */
  name: IconName
  /** Rendered width and height in px. Defaults to 20 (the UI icon size). Component CSS can override it. */
  size?: number
  /** Accessible name. Without it the icon is decorative (aria-hidden). */
  title?: string
}

const isStroke = (
  name: IconName
): name is Exclude<IconName, keyof typeof iconPaths> =>
  Object.prototype.hasOwnProperty.call(strokePaths, name)

// Playlog: the only icon source. The 48 set glyphs are filled outlines (fill-rule evenodd);
// check, chevron-down, chevron-right, close and search (and the extra glyphs) are 2px round strokes on the same 24px grid.
function Icon({ name, size = 20, className, title, ...props }: IconProps) {
  const titleId = React.useId()
  const a11y = title
    ? { role: "img", "aria-labelledby": titleId }
    : { "aria-hidden": true as const, focusable: false as const }

  return (
    <svg
      data-slot="icon"
      data-icon-name={name}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...a11y}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      {isStroke(name) ? (
        <path
          d={strokePaths[name]}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        iconPaths[name].map((d, i) => (
          <path key={i} d={d} fill="currentColor" fillRule="evenodd" />
        ))
      )}
    </svg>
  )
}

export { Icon }
export type { IconName, IconProps }
