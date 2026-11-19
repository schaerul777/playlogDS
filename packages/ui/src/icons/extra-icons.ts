// Playlog: stroke glyphs added for this library (approved), for needs the 48-icon set does not cover.
// Same style as the artifact's stroke glyphs: 2px stroke, round caps and joins, fill none, 24x24 grid.
// They are not part of the Playlog icon set in icon-data.ts. Replace them if the set gains equivalents.
export const extraStrokeIconPaths = {
  "sidebar": "M4 5h16v14H4zM9 5v14",
  "plus": "M12 5v14M5 12h14",
  "trash": "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6",
  "more": "M5 12h.01M12 12h.01M19 12h.01",
  "warning": "M12 4l9 16H3zM12 10v4M12 17h.01",
  "alert-circle": "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 8v5M12 16h.01",
  "info": "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 11v5M12 8h.01",
  "users": "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 20a6 6 0 0 1 12 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14a6 6 0 0 1 3 6",
  "loader": "M12 3a9 9 0 1 0 9 9",
  // Added for AI Elements (approved): same 2px round stroke style.
  "stop": "M7 7h10v10H7z",
  "thumbs-down": "M7 13V4H4v9h3zM7 13l4 8a2.5 2.5 0 0 0 2.5-2.5V15h5.2a2 2 0 0 0 2-2.3l-1.2-7a2 2 0 0 0-2-1.7H7",
  "terminal": "M3 5h18v14H3zM7 10l3 2-3 2M12 14h4",
  "arrow-up-right": "M7 17L17 7M8 7h9v9",
} as const

export type ExtraIconName = keyof typeof extraStrokeIconPaths
