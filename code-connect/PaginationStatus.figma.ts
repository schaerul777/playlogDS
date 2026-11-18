// url=https://www.figma.com/design/tXPbrKiAf5OvePCXIFx51F/playlogDS?node-id=90-811
// source=packages/ui/src/components/pagination.tsx
// component=PaginationStatus
import figma from 'figma'
const instance = figma.selectedInstance

// The text is drawn in Figma; in code PaginationStatus formats "Page {page} of {pageCount}".
const text = instance.getString('text')
const match = text.match(/(\d+)\D+(\d+)/)
const page = match ? match[1] : '1'
const pageCount = match ? match[2] : '1'

export default {
  example: figma.code`<PaginationStatus page={${page}} pageCount={${pageCount}} />`,
  imports: ['import { PaginationStatus } from "@workspace/ui/components/pagination"'],
  id: 'pagination-status',
  metadata: { nestable: true },
}
