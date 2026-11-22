import type { ExtraIconName } from "@workspace/tokens/icons/extra-icons"
import type { IconName as SetIconName } from "@workspace/tokens/icons/icon-data"

export { default as Icon } from "./Icon.vue"
/** Every glyph Icon can draw (Playlog set plus approved extra stroke glyphs). */
export type IconName = SetIconName | ExtraIconName
