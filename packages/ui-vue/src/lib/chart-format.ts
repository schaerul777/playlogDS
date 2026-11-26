// Playlog: COMPONENT-SPECS Charts. Indonesian number formats (id-ID): "." for thousands, "," for decimals.
// Pass one of these as a chart's `valueFormatter`. Same output as the React `lib/chart-format.ts`.

/** 1.284 or 12,4 */
export const idNumber = (value: number) => value.toLocaleString("id-ID", { maximumFractionDigits: 1 })

/** Rp 1.250.000 */
export const idRupiah = (value: number) => `Rp ${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`

/** 12,5% (the value is already a percentage, 12.5) */
export const idPercent = (value: number) => `${value.toLocaleString("id-ID", { maximumFractionDigits: 1 })}%`

/** 1,2 jt, 950 rb, 3,4 M: compact form for axes */
export const idCompact = (value: number) => {
  const abs = Math.abs(value)
  const f = (n: number) => n.toLocaleString("id-ID", { maximumFractionDigits: 1 })
  if (abs >= 1_000_000_000) return `${f(value / 1_000_000_000)} M`
  if (abs >= 1_000_000) return `${f(value / 1_000_000)} jt`
  if (abs >= 1_000) return `${f(value / 1_000)} rb`
  return f(value)
}
