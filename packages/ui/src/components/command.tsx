"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set

// Playlog: COMPONENT-SPECS Command. Built on the Base UI Combobox in inline mode instead of cmdk,
// which depends on Radix. Same component names as shadcn; items are data (like our Combobox):
//   <Command items={groups} onSelect={(item) => ...}>
//     <CommandInput placeholder="Search" />
//     <CommandEmpty>No results</CommandEmpty>
//     <CommandList>
//       {(group) => (
//         <CommandGroup key={group.value} items={group.items} heading={group.value}>
//           <CommandCollection>
//             {(item) => <CommandItem key={item.value} value={item}>{item.label}</CommandItem>}
//           </CommandCollection>
//         </CommandGroup>
//       )}
//     </CommandList>
//   </Command>

type CommandItemData = {
  value: string
  label: string
  keywords?: string[]
  disabled?: boolean
  [key: string]: unknown
}

type CommandGroupData<T extends CommandItemData = CommandItemData> = {
  value: string
  items: T[]
}

// Playlog: CommandDialog tells Command whether it is open, so the query resets when the dialog closes.
const CommandOpenContext = React.createContext<boolean | null>(null)

function Command<T extends CommandItemData>({
  className,
  items,
  onSelect,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "onSelect" | "children"> & {
  items: readonly T[] | readonly CommandGroupData<T>[]
  onSelect?: (item: T) => void
  children: React.ReactNode
}) {
  const dialogOpen = React.useContext(CommandOpenContext)
  return (
    <ComboboxPrimitive.Root
      inline
      open={dialogOpen ?? true}
      autoHighlight
      items={items as never}
      value={null}
      onValueChange={(item) => {
        if (item) onSelect?.(item as T)
      }}
      itemToStringLabel={(item: T) => [item.label, ...(item.keywords ?? [])].join(" ")}
      isItemEqualToValue={(a: T, b: T) => a?.value === b?.value}
    >
      <div
        data-slot="command"
        // Playlog: surface-raised, radius 4 inline (8 inside CommandDialog), overlay shadow, no border.
        className={cn(
          "flex size-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground shadow-(--pl-shadow-overlay) in-data-[slot=dialog-content]:rounded-(--pl-radius-0) in-data-[slot=dialog-content]:shadow-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ComboboxPrimitive.Root>
  )
}

function CommandDialog({
  title = "Command palette",
  description = "Search for a command to run.",
  children,
  className,
  open,
  onOpenChange,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string
  description?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent
        showCloseButton={false}
        // Playlog: our Dialog, max width 512, top edge at a third of the viewport, no padding; radius 8.
        className={cn("top-1/3 translate-y-0 gap-0 overflow-hidden p-0", className)}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <CommandOpenContext.Provider value={open ?? true}>
          {children}
        </CommandOpenContext.Provider>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <div
      data-slot="command-input-wrapper"
      // Playlog: search row 48 high, padding 0 12, gap 8, 1px border below; no field border.
      className="flex h-12 shrink-0 items-center gap-2 border-b-(length:--pl-border-width) border-border px-3"
    >
      <Icon name="search" className="size-4 shrink-0 text-muted-foreground" />
      <ComboboxPrimitive.Input
        data-slot="command-input"
        className={cn(
          "h-full w-full min-w-0 bg-transparent text-body-sm text-foreground outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled)",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="command-list"
      // Playlog: padding 4, max height 288.
      className={cn(
        "max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto overscroll-contain p-1 outline-none data-empty:p-0",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="command-empty"
      // Playlog: "No results" 14/20 muted-foreground, centred, padding 24 12.
      className={cn(
        "px-3 py-6 text-center text-body-sm text-muted-foreground empty:hidden",
        className
      )}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  heading,
  children,
  ...props
}: ComboboxPrimitive.Group.Props & { heading?: React.ReactNode }) {
  return (
    <ComboboxPrimitive.Group
      data-slot="command-group"
      className={cn("overflow-hidden", className)}
      {...props}
    >
      {heading ? (
        <ComboboxPrimitive.GroupLabel
          data-slot="command-group-heading"
          // Playlog: as the menu label. 12/16 medium muted-foreground, padding 6 8.
          className="px-2 py-1.5 text-caption font-medium text-muted-foreground"
        >
          {heading}
        </ComboboxPrimitive.GroupLabel>
      ) : null}
      {children}
    </ComboboxPrimitive.Group>
  )
}

function CommandCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection data-slot="command-collection" {...props} />
}

function CommandSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 my-1 h-(--pl-border-width) bg-border", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="command-item"
      // Playlog: as the Dropdown Menu item. 32 high, radius 2, body-sm, icons 16 muted; highlight accent.
      className={cn(
        "group/command-item relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-body-sm text-foreground outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled) [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[svg]:text-muted-foreground data-highlighted:*:[svg]:text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Item>
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      // Playlog: 12/16 muted-foreground, no extra tracking.
      className={cn(
        "ml-auto text-caption text-muted-foreground group-data-highlighted/command-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandCollection,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
export type { CommandItemData, CommandGroupData }
