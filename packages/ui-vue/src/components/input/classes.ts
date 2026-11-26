// Playlog: the Input classes, shared so controls that wrap another element (Combobox input) match Input exactly.
export const inputClass = [
        // Playlog: 40px control, 4px radius, surface fill, border-strong (--input) outline, body-sm text.
  'h-10 w-full min-w-0 rounded-md border-(length:--pl-border-width) border-input bg-card px-3 py-2 text-body-sm text-foreground transition-colors duration-(--pl-duration-fast) ease-out',
  'placeholder:text-muted-foreground',
  'file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-label file:font-semibold file:text-foreground',
        // Playlog: hover darkens the border to ink.
  'hover:border-foreground',
        // Playlog: focus ring is 2px solid --ring with a 2px offset.
  'outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
        // Playlog: disabled is 40% opacity with no pointer events.
  'disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled) data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled)',
        // Playlog: error edge is pl-danger-text; the fill stays card and the focus ring stays --ring (COMPONENT-SPECS).
  'aria-invalid:border-danger-text',
]
