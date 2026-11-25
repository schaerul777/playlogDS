// React side of the pilot comparison. Keep the markup, classes and data-specimen ids identical to
// apps/web-vue/src/sections/*.vue so the two pages can be compared element by element.
import * as React from "react"
import { createRoot } from "react-dom/client"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group"
import { Switch } from "@workspace/ui/components/switch"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@workspace/ui/components/native-select"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@workspace/ui/components/combobox"
import { Slider, SliderLabel, SliderValue } from "@workspace/ui/components/slider"
import { Toggle } from "@workspace/ui/components/toggle"
import { ToggleGroup, ToggleGroupItem } from "@workspace/ui/components/toggle-group"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@workspace/ui/components/popover"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@workspace/ui/components/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@workspace/ui/components/context-menu"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@workspace/ui/components/hover-card"
import { Toaster, toast } from "@workspace/ui/components/sonner"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationStatus,
} from "@workspace/ui/components/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@workspace/ui/components/command"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@workspace/ui/components/menubar"
import { Textarea } from "@workspace/ui/components/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@workspace/ui/components/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@workspace/ui/components/empty"
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle } from "@workspace/ui/components/item"
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@workspace/ui/components/avatar"
import { Progress, ProgressLabel, ProgressValue } from "@workspace/ui/components/progress"
import { Spinner } from "@workspace/ui/components/spinner"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@workspace/ui/components/alert"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { StatCard } from "@workspace/ui/components/stat-card"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { Icon } from "@workspace/ui/icons/icon"
import "./styles.css"

const variants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const
const sizes = ["xs", "sm", "default", "lg"] as const
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const

function ButtonSection() {
  return (
    <section id="button" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Button</h2>
      <div className="flex flex-col gap-3">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-3">
            <span className="w-28 text-caption text-muted-foreground">{variant}</span>
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size} data-specimen={`button-${variant}-${size}`}>
                Button
              </Button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-28 text-caption text-muted-foreground">icon only</span>
        {iconSizes.map((size) => (
          <Button key={size} variant="outline" size={size} data-specimen={`button-icon-${size}`}>
            <Icon name="plus" />
            <span className="sr-only">Add</span>
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-28 text-caption text-muted-foreground">with icon</span>
        <Button data-specimen="button-icon-start">
          <Icon name="plus" />
          New report
        </Button>
        <Button variant="outline" data-specimen="button-icon-end">
          Next
          <Icon name="chevron-right" />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-28 text-caption text-muted-foreground">states</span>
        <Button disabled data-specimen="button-disabled">Disabled</Button>
        <Button variant="outline" disabled data-specimen="button-disabled-outline">Disabled</Button>
        <Button variant="outline" aria-pressed="true" data-specimen="button-pressed">Pressed</Button>
        <Button variant="outline" aria-invalid="true" data-specimen="button-invalid">Invalid</Button>
        <Button
          nativeButton={false}
          render={<a href="#button" />}
          variant="link"
          data-specimen="button-as-link"
        >
          As link
        </Button>
      </div>
    </section>
  )
}

function InputSection() {
  const [email, setEmail] = React.useState("")
  return (
    <section id="input" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Input and Label</h2>
      <div className="grid max-w-md gap-6">
        <div className="grid gap-1.5">
          <Label htmlFor="in-default">Label</Label>
          <Input id="in-default" placeholder="Placeholder" data-specimen="input-default" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="in-value">With value</Label>
          <Input id="in-value" defaultValue="Jakarta" data-specimen="input-value" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="in-required" required>Required</Label>
          <Input id="in-required" required placeholder="name@company.com" data-specimen="input-required" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="in-v-model">Controlled (v-model)</Label>
          <Input
            id="in-v-model"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type here"
            data-specimen="input-model"
          />
          <p className="text-caption text-muted-foreground">Model value: {email || "(empty)"}</p>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="in-invalid">Invalid</Label>
          <Input
            id="in-invalid"
            aria-invalid="true"
            aria-describedby="in-invalid-error"
            defaultValue="not-an-email"
            data-specimen="input-invalid"
          />
          <p id="in-invalid-error" role="alert" className="text-caption text-danger-text">
            Enter an email address, for example name@company.com.
          </p>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="in-disabled">Disabled</Label>
          <Input id="in-disabled" disabled defaultValue="Cannot edit" data-specimen="input-disabled" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="in-file">File</Label>
          <Input id="in-file" type="file" data-specimen="input-file" />
        </div>
      </div>
    </section>
  )
}

function FormsSection() {
  const row = "flex items-center gap-2.5"
  return (
    <section id="forms" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Forms: Textarea, Checkbox, Switch, Radio Group</h2>
      <div className="grid max-w-md gap-6">
        <div className="grid gap-1.5">
          <Label htmlFor="ta-default">Textarea</Label>
          <Textarea id="ta-default" placeholder="Write a note" data-specimen="textarea-default" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="ta-value">With value</Label>
          <Textarea id="ta-value" defaultValue="Roadside reach grew in Q1." data-specimen="textarea-value" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="ta-invalid">Invalid</Label>
          <Textarea id="ta-invalid" aria-invalid="true" defaultValue="x" data-specimen="textarea-invalid" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="ta-disabled">Disabled</Label>
          <Textarea id="ta-disabled" disabled defaultValue="Cannot edit" data-specimen="textarea-disabled" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className={row}><Checkbox id="cb-off" data-specimen="checkbox-off" /><Label htmlFor="cb-off">Unchecked</Label></div>
        <div className={row}><Checkbox id="cb-on" defaultChecked data-specimen="checkbox-on" /><Label htmlFor="cb-on">Checked</Label></div>
        <div className={row}><Checkbox id="cb-invalid" aria-invalid="true" data-specimen="checkbox-invalid" /><Label htmlFor="cb-invalid">Invalid</Label></div>
        <div className={row}><Checkbox id="cb-invalid-on" defaultChecked aria-invalid="true" data-specimen="checkbox-invalid-on" /><Label htmlFor="cb-invalid-on">Invalid, checked</Label></div>
        <div className={row}><Checkbox id="cb-dis" disabled data-specimen="checkbox-disabled" /><Label htmlFor="cb-dis">Disabled</Label></div>
        <div className={row}><Checkbox id="cb-dis-on" disabled defaultChecked data-specimen="checkbox-disabled-on" /><Label htmlFor="cb-dis-on">Disabled, checked</Label></div>
      </div>
      <div className="flex flex-col gap-3">
        <div className={row}><Switch id="sw-off" data-specimen="switch-off" /><Label htmlFor="sw-off">Off</Label></div>
        <div className={row}><Switch id="sw-on" defaultChecked data-specimen="switch-on" /><Label htmlFor="sw-on">On</Label></div>
        <div className={row}><Switch id="sw-sm-off" size="sm" data-specimen="switch-sm-off" /><Label htmlFor="sw-sm-off">Small, off</Label></div>
        <div className={row}><Switch id="sw-sm-on" size="sm" defaultChecked data-specimen="switch-sm-on" /><Label htmlFor="sw-sm-on">Small, on</Label></div>
        <div className={row}><Switch id="sw-invalid" aria-invalid="true" data-specimen="switch-invalid" /><Label htmlFor="sw-invalid">Invalid</Label></div>
        <div className={row}><Switch id="sw-dis" disabled data-specimen="switch-disabled" /><Label htmlFor="sw-dis">Disabled</Label></div>
      </div>
      <RadioGroup defaultValue="roadside" className="max-w-md">
        <div className={row}><RadioGroupItem id="rg-1" value="roadside" data-specimen="radio-on" /><Label htmlFor="rg-1">Roadside</Label></div>
        <div className={row}><RadioGroupItem id="rg-2" value="transit" data-specimen="radio-off" /><Label htmlFor="rg-2">Transit</Label></div>
        <div className={row}><RadioGroupItem id="rg-3" value="place" aria-invalid="true" data-specimen="radio-invalid" /><Label htmlFor="rg-3">Invalid</Label></div>
        <div className={row}><RadioGroupItem id="rg-4" value="ambience" disabled data-specimen="radio-disabled" /><Label htmlFor="rg-4">Disabled</Label></div>
      </RadioGroup>
    </section>
  )
}

const CITIES = [
  { value: "jakarta", label: "Jakarta" },
  { value: "bandung", label: "Bandung" },
  { value: "surabaya", label: "Surabaya" },
  { value: "medan", label: "Medan" },
  { value: "makassar", label: "Makassar" },
]

function SelectFieldSection() {
  const specimens = [
    { id: "default", defaultValue: undefined, size: undefined, invalid: false, disabled: false },
    { id: "value", defaultValue: "jakarta", size: undefined, invalid: false, disabled: false },
    { id: "sm", defaultValue: "bandung", size: "sm" as const, invalid: false, disabled: false },
    { id: "invalid", defaultValue: "jakarta", size: undefined, invalid: true, disabled: false },
    { id: "disabled", defaultValue: "jakarta", size: undefined, invalid: false, disabled: true },
  ]
  return (
    <section id="batch2" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Batch 2: Select, Native Select, Field, Input Group</h2>
      <div className="flex flex-wrap items-center gap-3">
        {specimens.map((s) => (
          <Select key={s.id} items={CITIES} defaultValue={s.defaultValue} disabled={s.disabled}>
            <SelectTrigger
              size={s.size}
              aria-label={`City ${s.id}`}
              aria-invalid={s.invalid ? "true" : undefined}
              className="w-48"
              data-specimen={`select-${s.id}`}
            >
              <SelectValue placeholder="Choose a city" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Java</SelectLabel>
                <SelectItem value="jakarta">Jakarta</SelectItem>
                <SelectItem value="bandung">Bandung</SelectItem>
                <SelectItem value="surabaya">Surabaya</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Outside Java</SelectLabel>
                <SelectItem value="medan">Medan</SelectItem>
                <SelectItem value="makassar" disabled>Makassar</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <NativeSelect className="w-48" aria-label="Native default" data-specimen="native-default">
          <NativeSelectOption value="">Choose a city</NativeSelectOption>
          <NativeSelectOptGroup label="Java">
            <NativeSelectOption value="jakarta">Jakarta</NativeSelectOption>
            <NativeSelectOption value="bandung">Bandung</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
        <NativeSelect className="w-48" size="sm" aria-label="Native small" data-specimen="native-sm">
          <NativeSelectOption value="jakarta">Jakarta</NativeSelectOption>
        </NativeSelect>
        <NativeSelect className="w-48" aria-label="Native invalid" aria-invalid="true" data-specimen="native-invalid">
          <NativeSelectOption value="jakarta">Jakarta</NativeSelectOption>
        </NativeSelect>
        <NativeSelect className="w-48" disabled aria-label="Native disabled" data-specimen="native-disabled">
          <NativeSelectOption value="jakarta">Jakarta</NativeSelectOption>
        </NativeSelect>
      </div>
      <FieldGroup className="max-w-md" data-specimen="field-group">
        <FieldSet data-specimen="field-set">
          <FieldLegend>Report settings</FieldLegend>
          <Field data-specimen="field-vertical">
            <FieldLabel htmlFor="f-name">Report name</FieldLabel>
            <InputGroup>
              <InputGroupInput id="f-name" defaultValue="Roadside reach Q1" />
            </InputGroup>
            <FieldDescription>Shown in the report header.</FieldDescription>
          </Field>
          <Field data-specimen="field-error-state">
            <FieldLabel htmlFor="f-reach">Target reach</FieldLabel>
            <InputGroup>
              <InputGroupInput id="f-reach" aria-invalid="true" defaultValue="120" />
              <InputGroupAddon align="inline-end"><InputGroupText>%</InputGroupText></InputGroupAddon>
            </InputGroup>
            <FieldDescription>Hidden while the error shows.</FieldDescription>
            <FieldError>Reach can't be above 100%.</FieldError>
          </Field>
          <Field orientation="horizontal" data-specimen="field-horizontal">
            <Checkbox id="f-share" />
            <FieldLabel htmlFor="f-share">Share with the team</FieldLabel>
          </Field>
        </FieldSet>
        <FieldSeparator data-specimen="field-separator">Or</FieldSeparator>
        <Field>
          <FieldLabel htmlFor="f-search">Search</FieldLabel>
          <InputGroup data-specimen="ig-search">
            <InputGroupAddon><Icon name="search" /></InputGroupAddon>
            <InputGroupInput id="f-search" placeholder="Search cities" />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="f-url">Dashboard URL</FieldLabel>
          <InputGroup data-specimen="ig-url">
            <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
            <InputGroupInput id="f-url" defaultValue="playlog.id/reach" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label="Copy link"><Icon name="clipboard" /></InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="f-note">Note</FieldLabel>
          <InputGroup data-specimen="ig-textarea">
            <InputGroupTextarea id="f-note" placeholder="Write a note" />
            <InputGroupAddon align="block-end"><InputGroupText>0 / 280</InputGroupText></InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="f-dis">Disabled</FieldLabel>
          <InputGroup data-specimen="ig-disabled">
            <InputGroupInput id="f-dis" disabled defaultValue="Cannot edit" />
          </InputGroup>
        </Field>
      </FieldGroup>
    </section>
  )
}

const CITY_LIST = ["Jakarta", "Bandung", "Surabaya", "Medan", "Makassar"]

function Batch3Section() {
  const anchor = useComboboxAnchor()
  const sizes = ["sm", "default", "lg"] as const
  const cbList = (items: string[]) => (
    <ComboboxContent>
      <ComboboxEmpty>No results</ComboboxEmpty>
      <ComboboxList>
        {(item: string) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  )
  return (
    <section id="batch3" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Batch 3: Toggle, Toggle Group, Slider, Combobox</h2>
      <div className="flex flex-col gap-3">
        {(["default", "outline"] as const).map((variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-3">
            <span className="w-28 text-caption text-muted-foreground">toggle {variant}</span>
            {sizes.map((size) => (
              <Toggle key={size} variant={variant} size={size} data-specimen={`toggle-${variant}-${size}`}>Toggle</Toggle>
            ))}
            <Toggle variant={variant} defaultPressed data-specimen={`toggle-${variant}-pressed`}>Pressed</Toggle>
            <Toggle variant={variant} aria-label="Bold" data-specimen={`toggle-${variant}-icon`}><Icon name="star" /></Toggle>
            <Toggle variant={variant} disabled data-specimen={`toggle-${variant}-disabled`}>Disabled</Toggle>
            <Toggle variant={variant} aria-invalid="true" data-specimen={`toggle-${variant}-invalid`}>Invalid</Toggle>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <ToggleGroup variant="outline" defaultValue={["quarter"]} data-specimen="tg-joined-outline">
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
            <ToggleGroupItem value="quarter">Quarter</ToggleGroupItem>
            <ToggleGroupItem value="year">Year</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup defaultValue={["bar"]} data-specimen="tg-joined-default">
            <ToggleGroupItem value="bar" aria-label="Bar chart"><Icon name="bar-chart" /></ToggleGroupItem>
            <ToggleGroupItem value="line" aria-label="Line chart"><Icon name="chart-line" /></ToggleGroupItem>
            <ToggleGroupItem value="pie" aria-label="Pie chart" disabled><Icon name="pie-chart" /></ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup variant="outline" size="sm" spacing={2} multiple defaultValue={["jkt", "sby"]} data-specimen="tg-spacing">
            <ToggleGroupItem value="jkt">Jakarta</ToggleGroupItem>
            <ToggleGroupItem value="sby">Surabaya</ToggleGroupItem>
            <ToggleGroupItem value="bdg">Bandung</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup variant="outline" orientation="vertical" defaultValue={["top"]} data-specimen="tg-vertical">
            <ToggleGroupItem value="top">Top 10</ToggleGroupItem>
            <ToggleGroupItem value="all">All cities</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="grid max-w-md gap-6">
        <Slider defaultValue={[40]} aria-label="Reach" data-specimen="slider-single">
          <SliderLabel>Reach target</SliderLabel>
          <SliderValue />
        </Slider>
        <Slider defaultValue={[20, 80]} thumbLabels={["Minimum", "Maximum"]} data-specimen="slider-range">
          <SliderLabel>Range</SliderLabel>
          <SliderValue />
        </Slider>
        <Slider defaultValue={[60]} disabled aria-label="Disabled" data-specimen="slider-disabled" />
        <div className="h-40">
          <Slider defaultValue={[30]} orientation="vertical" aria-label="Vertical" data-specimen="slider-vertical" />
        </div>
      </div>
      <div className="grid max-w-md gap-6">
        <Field>
          <FieldLabel htmlFor="cb-a">City</FieldLabel>
          <Combobox items={CITY_LIST} defaultValue="Bandung">
            <ComboboxInput id="cb-a" placeholder="Select a city" data-specimen="cb-single" />
            {cbList(CITY_LIST)}
          </Combobox>
          <FieldDescription>Type to filter. The clear button shows once a city is chosen.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="cb-b">Cities (multiple)</FieldLabel>
          <Combobox multiple items={CITY_LIST} defaultValue={["Jakarta", "Surabaya"]}>
            <ComboboxChips ref={anchor} data-specimen="cb-chips">
              <ComboboxValue>
                {(values: string[]) => (
                  <>
                    {values.map((v) => (
                      <ComboboxChip key={v}>{v}</ComboboxChip>
                    ))}
                    <ComboboxChipsInput id="cb-b" placeholder="Add city" />
                  </>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>No results</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
        <Field>
          <FieldLabel htmlFor="cb-c">Team</FieldLabel>
          <Combobox items={["Roadside", "Transit"]}>
            <ComboboxInput id="cb-c" aria-invalid="true" placeholder="Select a team" data-specimen="cb-invalid" />
            {cbList(["Roadside", "Transit"])}
          </Combobox>
          <FieldError>Choose a team.</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="cb-d">Region</FieldLabel>
          <Combobox items={["Java", "Bali"]} defaultValue="Java" disabled>
            <ComboboxInput id="cb-d" disabled placeholder="Select a region" data-specimen="cb-disabled" />
            {cbList(["Java", "Bali"])}
          </Combobox>
        </Field>
      </div>
    </section>
  )
}

function OverlaysSection() {
  const sides = ["right", "left", "top", "bottom"] as const
  return (
    <section id="overlays" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Overlays: Alert Dialog, Sheet, Popover, Tooltip</h2>
      <div className="flex flex-wrap items-center gap-3">
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" data-specimen="ad-trigger-default" />}>Delete report</AlertDialogTrigger>
          <AlertDialogContent data-specimen="ad-default">
            <AlertDialogHeader>
              <AlertDialogMedia><Icon name="trash" /></AlertDialogMedia>
              <AlertDialogTitle>Delete this report?</AlertDialogTitle>
              <AlertDialogDescription>This removes the report and its shared links. You can't undo it.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Delete report</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" data-specimen="ad-trigger-sm" />}>Small alert dialog</AlertDialogTrigger>
          <AlertDialogContent size="sm" data-specimen="ad-sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Discard changes?</AlertDialogTitle>
              <AlertDialogDescription>Your edits are not saved.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep editing</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Discard</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {sides.map((side) => (
          <Sheet key={side}>
            <SheetTrigger render={<Button variant="outline" data-specimen={`sheet-trigger-${side}`} />}>Sheet {side}</SheetTrigger>
            <SheetContent side={side} data-specimen={`sheet-${side}`}>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Choose the period and the cities.</SheetDescription>
              </SheetHeader>
              <div className="px-6 text-body-sm">Sheet body</div>
              <SheetFooter>
                <Button variant="outline">Reset</Button>
                <Button>Apply</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
        <Popover>
          <PopoverTrigger render={<Button variant="outline" data-specimen="pop-trigger" />}>Open popover</PopoverTrigger>
          <PopoverContent data-specimen="pop">
            <PopoverHeader>
              <PopoverTitle>Report period</PopoverTitle>
              <PopoverDescription>Figures cover Q1 to Q3 2025 in 25 cities.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Add" data-specimen="tip-trigger" />}><Icon name="plus" /></TooltipTrigger>
            <TooltipContent data-specimen="tip">Add a report</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </section>
  )
}

function MenusSection() {
  return (
    <section id="menus" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Menus: Dropdown Menu, Context Menu, Hover Card</h2>
      <div className="flex flex-wrap items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" data-specimen="dd-trigger" />}>Report actions</DropdownMenuTrigger>
          <DropdownMenuContent data-specimen="dd">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Report</DropdownMenuLabel>
              <DropdownMenuItem><Icon name="edit" />Edit<DropdownMenuShortcut>Cmd E</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem><Icon name="download" />Download</DropdownMenuItem>
              <DropdownMenuItem disabled>Archive</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Show totals</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={false}>Show deltas</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value="quarter">
              <DropdownMenuRadioItem value="month">Month</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="quarter">Quarter</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive"><Icon name="trash" />Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ContextMenu>
          <ContextMenuTrigger render={<div className="flex h-24 w-56 items-center justify-center rounded-lg border border-dashed border-border text-body-sm text-muted-foreground" data-specimen="cm-trigger" />}>
            Right-click here
          </ContextMenuTrigger>
          <ContextMenuContent data-specimen="cm">
            <ContextMenuGroup>
              <ContextMenuLabel>City</ContextMenuLabel>
            </ContextMenuGroup>
            <ContextMenuItem>Open<ContextMenuShortcut>Enter</ContextMenuShortcut></ContextMenuItem>
            <ContextMenuItem disabled>Compare</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">Remove</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <HoverCard>
          <HoverCardTrigger render={<Button variant="link" data-specimen="hc-trigger" />}>@playlog</HoverCardTrigger>
          <HoverCardContent data-specimen="hc">
            <p className="text-label text-ink-heading">Playlog</p>
            <p className="text-body-sm text-muted-foreground">Out-of-home audience analytics for 25 Indonesian cities.</p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </section>
  )
}

function ToastSection() {
  return (
    <section id="toast" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Toast</h2>
      <Toaster />
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" data-specimen="toast-default" onClick={() => toast("Report saved")}>Default</Button>
        <Button variant="outline" data-specimen="toast-success" onClick={() => toast.success("Export ready", { description: "Q3 roadside reach.csv, 2,4 MB" })}>Success</Button>
        <Button variant="outline" data-specimen="toast-info" onClick={() => toast.info("New data available", { description: "September figures for 25 cities." })}>Info</Button>
        <Button variant="outline" data-specimen="toast-warning" onClick={() => toast.warning("Partial data", { description: "Medan has no figures for August." })}>Warning</Button>
        <Button variant="outline" data-specimen="toast-error" onClick={() => toast.error("Export failed", { description: "The file is too large. Narrow the period and try again." })}>Error</Button>
      </div>
    </section>
  )
}

function NavSection() {
  const reports = [
    ["Reach", "Share of adults who saw the campaign."],
    ["Frequency", "Average exposures per person."],
    ["Impressions", "Total exposures by city."],
    ["Audience", "Who passed the screens."],
  ]
  return (
    <section id="nav" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Navigation: Tabs, Breadcrumb, Pagination, Navigation Menu</h2>
      <div className="flex flex-col gap-6">
        <Tabs defaultValue="overview" data-specimen="tabs-default">
          <TabsList data-specimen="tabs-list-default">
            <TabsTrigger value="overview" data-specimen="tab-default-active">Overview</TabsTrigger>
            <TabsTrigger value="cities" data-specimen="tab-default-idle">Cities</TabsTrigger>
            <TabsTrigger value="export" disabled data-specimen="tab-default-disabled">Export</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Overview panel</TabsContent>
          <TabsContent value="cities">Cities panel</TabsContent>
        </Tabs>
        <Tabs defaultValue="overview">
          <TabsList variant="line" data-specimen="tabs-list-line">
            <TabsTrigger value="overview" data-specimen="tab-line-active">Overview</TabsTrigger>
            <TabsTrigger value="cities" data-specimen="tab-line-idle">Cities</TabsTrigger>
            <TabsTrigger value="export" disabled data-specimen="tab-line-disabled">Export</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Overview panel</TabsContent>
          <TabsContent value="cities">Cities panel</TabsContent>
        </Tabs>
        <Tabs defaultValue="overview" orientation="vertical">
          <TabsList variant="line" data-specimen="tabs-list-vertical">
            <TabsTrigger value="overview" data-specimen="tab-vertical-active">Overview</TabsTrigger>
            <TabsTrigger value="cities" data-specimen="tab-vertical-idle">Cities</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Overview panel</TabsContent>
          <TabsContent value="cities">Cities panel</TabsContent>
        </Tabs>
      </div>
      <Breadcrumb data-specimen="breadcrumb">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Reports</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Roadside reach</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Pagination data-specimen="pagination">
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationEllipsis /></PaginationItem>
          <PaginationItem><PaginationLink href="#">12</PaginationLink></PaginationItem>
          <PaginationStatus page={2} pageCount={12} />
          <PaginationItem><PaginationNext href="#" /></PaginationItem>
        </PaginationContent>
      </Pagination>
      <NavigationMenu data-specimen="navmenu">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger data-specimen="nm-trigger">Reports</NavigationMenuTrigger>
            <NavigationMenuContent data-specimen="nm-content">
              <ul className="grid w-96 grid-cols-2 gap-1">
                {reports.map(([t, d]) => (
                  <li key={t}>
                    <NavigationMenuLink href="#">
                      <span className="font-semibold text-ink-heading">{t}</span>
                      <span className="text-caption text-muted-foreground">{d}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Cities</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex w-56 flex-col gap-1">
                {["Jakarta", "Surabaya", "Bandung"].map((c) => (
                  <li key={c}><NavigationMenuLink href="#">{c}</NavigationMenuLink></li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" active className={navigationMenuTriggerStyle()} data-specimen="nm-active">Dashboard</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()} data-specimen="nm-link">Docs</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </section>
  )
}

type Cmd = { value: string; label: string; icon: "chart-line" | "bar-chart" | "download" | "trash"; shortcut?: string; disabled?: boolean }
const COMMANDS: { value: string; items: Cmd[] }[] = [
  { value: "Reports", items: [
    { value: "Reach", label: "Reach", icon: "chart-line" },
    { value: "Frequency", label: "Frequency", icon: "bar-chart", shortcut: "Cmd F" },
  ] },
  { value: "Actions", items: [
    { value: "Export", label: "Export", icon: "download", shortcut: "Cmd E" },
    { value: "Delete", label: "Delete", icon: "trash", disabled: true },
  ] },
]

function CommandBody({ groups }: { groups: typeof COMMANDS }) {
  return (
    <Command items={groups} onSelect={() => {}}>
      <CommandInput placeholder="Search commands" data-specimen="command-input" />
      <CommandEmpty>No results</CommandEmpty>
      <CommandList data-specimen="command-list">
        {(group: { value: string; items: Cmd[] }) => (
          <CommandGroup key={group.value} items={group.items} heading={group.value}>
            <CommandCollection>
              {(item: Cmd) => (
                <CommandItem key={item.value} value={item} disabled={item.disabled}>
                  <Icon name={item.icon} />
                  {item.label}
                  {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                </CommandItem>
              )}
            </CommandCollection>
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  )
}

function MenubarCommandSection() {
  const [open, setOpen] = React.useState(false)
  return (
    <section id="menubar-command" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Menubar and Command</h2>
      <Menubar className="w-fit" data-specimen="menubar">
        <MenubarMenu>
          <MenubarTrigger data-specimen="mb-trigger">File</MenubarTrigger>
          <MenubarContent data-specimen="mb-content">
            <MenubarGroup>
              <MenubarLabel>Report</MenubarLabel>
              <MenubarItem><Icon name="edit" />Rename<MenubarShortcut>Cmd R</MenubarShortcut></MenubarItem>
              <MenubarItem disabled>Archive</MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarCheckboxItem checked>Show totals</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarRadioGroup value="quarter">
              <MenubarRadioItem value="month">Month</MenubarRadioItem>
              <MenubarRadioItem value="quarter">Quarter</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email</MenubarItem>
                <MenubarItem>Copy link</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem variant="destructive"><Icon name="trash" />Delete</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger data-specimen="mb-trigger-2">View</MenubarTrigger>
          <MenubarContent><MenubarItem>Zoom in</MenubarItem><MenubarItem>Zoom out</MenubarItem></MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger disabled data-specimen="mb-trigger-disabled">Help</MenubarTrigger>
          <MenubarContent><MenubarItem>Docs</MenubarItem></MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="max-w-md" data-specimen="command-wrap">
        <CommandBody groups={COMMANDS} />
      </div>
      <div>
        <Button variant="outline" data-specimen="cmd-open" onClick={() => setOpen(true)}>Open command palette</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandBody groups={COMMANDS.slice(0, 1).map((g) => ({ ...g, items: g.items.slice(0, 1) }))} />
        </CommandDialog>
      </div>
    </section>
  )
}

function DialogSection() {
  return (
    <section id="dialog" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Dialog</h2>
      <div className="flex flex-wrap items-center gap-3">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" data-specimen="dialog-trigger-default" />}>
            Edit report
          </DialogTrigger>
          <DialogContent data-specimen="dialog-default">
            <DialogHeader>
              <DialogTitle>Edit report</DialogTitle>
              <DialogDescription>Change the name and period. Figures update after you save.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-1.5">
              <Label htmlFor="dlg-name">Report name</Label>
              <Input id="dlg-name" defaultValue="Roadside reach Q1" />
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger render={<Button variant="outline" data-specimen="dialog-trigger-no-close" />}>
            Without close button
          </DialogTrigger>
          <DialogContent showCloseButton={false} data-specimen="dialog-no-close">
            <DialogHeader>
              <DialogTitle>Share report</DialogTitle>
              <DialogDescription>Anyone with the link can view this report.</DialogDescription>
            </DialogHeader>
            <DialogFooter showCloseButton>
              <Button>Copy link</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

function SidebarSection() {
  return (

  <section id="sidebar" className="flex flex-col gap-6">
    <h2 className="text-h2 text-ink-heading">Sidebar</h2>

    {/* Static: collapsible="none", every part in flow so styles can be compared. */}
    <div className="h-[760px] w-fit" data-specimen="sidebar-static-wrap">
      <SidebarProvider className="h-full min-h-0 w-fit">
        <Sidebar collapsible="none" className="border-r-(length:--pl-border-width) border-sidebar-border" data-specimen="sidebar-static">
          <SidebarHeader data-specimen="sb-header">
            <SidebarInput placeholder="Search" data-specimen="sb-input" />
          </SidebarHeader>
          <SidebarContent data-specimen="sb-content">
            <SidebarGroup data-specimen="sb-group">
              <SidebarGroupLabel data-specimen="sb-group-label">Reports</SidebarGroupLabel>
              <SidebarGroupAction aria-label="Add report" data-specimen="sb-group-action"><Icon name="plus" /></SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton data-specimen="sb-item"><Icon name="home" /><span>Overview</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem data-specimen="sb-item-active-wrap">
                    <SidebarMenuButton isActive data-specimen="sb-item-active"><Icon name="chart-line" /><span>Reach</span></SidebarMenuButton>
                    <SidebarMenuBadge data-specimen="sb-badge">12</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton data-specimen="sb-item-action"><Icon name="bar-chart" /><span>Frequency</span></SidebarMenuButton>
                    <SidebarMenuAction aria-label="More" data-specimen="sb-action"><Icon name="more" /></SidebarMenuAction>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="sm" data-specimen="sb-item-sm"><Icon name="clock" /><span>Recent</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg" data-specimen="sb-item-lg"><Icon name="star" /><span>Starred</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton variant="outline" data-specimen="sb-item-outline"><Icon name="folder" /><span>Folders</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton disabled data-specimen="sb-item-disabled"><Icon name="database" /><span>Sources</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton data-specimen="sb-item-parent"><Icon name="settings" /><span>Settings</span></SidebarMenuButton>
                    <SidebarMenuSub data-specimen="sb-sub">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" isActive data-specimen="sb-sub-active"><span>Profile</span></SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" data-specimen="sb-sub-item"><span>Billing</span></SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" size="sm" data-specimen="sb-sub-sm"><span>Team</span></SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator data-specimen="sb-separator" />
            <SidebarGroup>
              <SidebarGroupLabel>Loading</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem><SidebarMenuSkeleton showIcon data-specimen="sb-skeleton" /></SidebarMenuItem>
                  <SidebarMenuItem><SidebarMenuSkeleton /></SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter data-specimen="sb-footer">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton><Icon name="users" /><span>Account</span></SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </div>

    {/* Interactive: collapsible="icon" inside a transformed box so the fixed sidebar stays in the box. */}
    <div className="relative h-96 overflow-hidden border border-border [transform:translateZ(0)]" data-specimen="sidebar-demo-wrap">
      <SidebarProvider className="h-full min-h-0">
        <Sidebar collapsible="icon" className="h-full" data-specimen="sidebar-demo">
          <SidebarHeader>
            <SidebarTrigger data-specimen="sb-trigger" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Reports</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip="Reach" data-specimen="sb-demo-item"><Icon name="chart-line" /><span>Reach</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Frequency"><Icon name="bar-chart" /><span>Frequency</span></SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="p-6">
          <p className="text-body-sm">Page content. Press Cmd or Ctrl B to toggle the sidebar.</p>
        </SidebarInset>
      </SidebarProvider>
    </div>
  </section>
  )
}

const badgeVariants = ["default", "secondary", "destructive", "info", "success", "warning", "accent", "outline", "ghost", "link"] as const
const alertVariants = ["default", "info", "success", "warning", "destructive"] as const

function DisplaySection() {
  return (

  <section id="display" className="flex flex-col gap-6">
    <h2 className="text-h2 text-ink-heading">Display: Badge, Alert, Card, StatCard</h2>

    <div className="flex flex-wrap items-center gap-3">
      {badgeVariants.map((variant) => (
        <Badge key={variant} variant={variant} data-specimen={`badge-${variant}`}>{variant}</Badge>
      ))}
    </div>
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success" data-specimen="badge-icon"><Icon name="check" />Live</Badge>
      <Badge variant="info" aria-disabled="true" data-specimen="badge-disabled">Disabled</Badge>
      <Badge variant="secondary" aria-invalid="true" data-specimen="badge-invalid">Invalid</Badge>
      <Badge render={<a href="#display" />} variant="outline" data-specimen="badge-link">As link</Badge>
    </div>

    <div className="flex max-w-xl flex-col gap-3">
      {alertVariants.map((variant) => (
        <Alert key={variant} variant={variant} data-specimen={`alert-${variant}`}>
          <Icon name="info" />
          <AlertTitle>{variant} alert</AlertTitle>
          <AlertDescription>Figures update after you save the report.</AlertDescription>
        </Alert>
      ))}
      <Alert variant="info" data-specimen="alert-no-icon">
        <AlertTitle>No icon</AlertTitle>
        <AlertDescription>Text only alert.</AlertDescription>
      </Alert>
      <Alert variant="warning" data-specimen="alert-action">
        <Icon name="warning" />
        <AlertTitle>With action</AlertTitle>
        <AlertDescription>Coverage is below target.</AlertDescription>
        <AlertAction><Button size="xs" variant="outline">Review</Button></AlertAction>
      </Alert>
    </div>

    <div className="flex flex-wrap items-start gap-4">
      <Card className="w-80" data-specimen="card-default">
        <CardHeader data-specimen="card-header">
          <CardTitle data-specimen="card-title">Roadside reach</CardTitle>
          <CardDescription data-specimen="card-description">Q1 2025, 25 cities</CardDescription>
          <CardAction data-specimen="card-action"><Button size="sm" variant="outline">Export</Button></CardAction>
        </CardHeader>
        <CardContent data-specimen="card-content"><p>Reach grew in every city.</p></CardContent>
        <CardFooter data-specimen="card-footer"><Button size="sm">Open report</Button></CardFooter>
      </Card>
      <Card size="sm" className="w-80" data-specimen="card-sm">
        <CardHeader>
          <CardTitle data-specimen="card-sm-title">Dense card</CardTitle>
          <CardDescription>Small size</CardDescription>
        </CardHeader>
        <CardContent><p>Content</p></CardContent>
      </Card>
    </div>

    <div className="grid max-w-3xl grid-cols-3 gap-4">
      <StatCard label="Impressions" value="1,204,000" delta="+8,2%" trend="good" footer="Q1–Q3 2025 · 25 cities" icon={<Icon name="chart-line" />} data-specimen="stat-good" />
      <StatCard label="Frequency" value="3,4" delta="-1,1%" trend="bad" footer="Per person" data-specimen="stat-bad" />
      <StatCard label="Reach" value="62%" delta="0,0%" data-specimen="stat-neutral" />
      <StatCard label="No footer" value="18" data-specimen="stat-bare" />
    </div>
  </section>
  )
}

const avatarSizes = ["sm", "default", "lg"] as const
const photo = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><rect width='40' height='40' fill='%23004d9f'/></svg>"

function Display2Section() {
  return (

  <section id="display2" className="flex flex-col gap-6">
    <h2 className="text-h2 text-ink-heading">Display: Table, Avatar, Progress, Spinner</h2>

    <div className="flex max-w-2xl flex-col gap-6">
      <Table data-specimen="table-default">
        <TableCaption data-specimen="table-caption">Reach by city, Q1 2025</TableCaption>
        <TableHeader data-specimen="table-header">
          <TableRow>
            <TableHead data-specimen="table-head">City</TableHead>
            <TableHead numeric data-specimen="table-head-numeric">Reach</TableHead>
            <TableHead numeric>Frequency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-specimen="table-body">
          <TableRow data-specimen="table-row">
            <TableCell data-specimen="table-cell">Jakarta</TableCell>
            <TableCell numeric data-specimen="table-cell-numeric">1,204,000</TableCell>
            <TableCell numeric>3,4</TableCell>
          </TableRow>
          <TableRow data-state="selected" data-specimen="table-row-selected">
            <TableCell>Bandung</TableCell>
            <TableCell numeric>640,500</TableCell>
            <TableCell numeric>2,9</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Surabaya</TableCell>
            <TableCell numeric>588,120</TableCell>
            <TableCell numeric>3,1</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter data-specimen="table-footer">
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell numeric>2,432,620</TableCell>
            <TableCell numeric>3,1</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Table dense data-specimen="table-dense">
        <TableBody>
          <TableRow>
            <TableCell data-specimen="table-dense-cell">Jakarta</TableCell>
            <TableCell numeric>1,204,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bandung</TableCell>
            <TableCell numeric>640,500</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div className="flex flex-wrap items-center gap-4">
      {avatarSizes.map((size) => (
        <Avatar key={size} size={size} data-specimen={`avatar-${size}`}>
          <AvatarFallback data-specimen={`avatar-fallback-${size}`}>SC</AvatarFallback>
        </Avatar>
      ))}
      <Avatar data-specimen="avatar-image">
        <AvatarImage src={photo} alt="Sample" data-specimen="avatar-img" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      {avatarSizes.map((size) => (
        <Avatar key={`b-${size}`} size={size} data-specimen={`avatar-badge-${size}`}>
          <AvatarFallback>AB</AvatarFallback>
          <AvatarBadge data-specimen={`avatar-dot-${size}`}><span className="sr-only">Online</span></AvatarBadge>
        </Avatar>
      ))}
      <AvatarGroup data-specimen="avatar-group">
        <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
        <AvatarGroupCount data-specimen="avatar-group-count">+3</AvatarGroupCount>
      </AvatarGroup>
    </div>

    <div className="flex max-w-md flex-col gap-4">
      <Progress value={40} data-specimen="progress-40">
        <ProgressLabel data-specimen="progress-label">Reach</ProgressLabel>
        <ProgressValue data-specimen="progress-value" />
      </Progress>
      <Progress value={0} data-specimen="progress-0">
        <ProgressLabel>Frequency</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={100} data-specimen="progress-100" />
    </div>

    <div className="flex items-center gap-4">
      <Spinner data-specimen="spinner" />
      <Spinner className="size-6 text-muted-foreground" data-specimen="spinner-large" />
    </div>
  </section>
  )
}

const itemVariants = ["default", "outline", "muted"] as const
const itemSizes = ["default", "sm", "xs"] as const

function Display3Section() {
  return (

  <section id="display3" className="flex flex-col gap-6">
    <h2 className="text-h2 text-ink-heading">Display: Accordion, Collapsible, Empty, Item</h2>

    <Accordion className="max-w-md" defaultValue={["a"]} data-specimen="accordion">
      <AccordionItem value="a" data-specimen="accordion-item">
        <AccordionTrigger data-specimen="accordion-trigger-open">What is reach?</AccordionTrigger>
        <AccordionContent data-specimen="accordion-content">The share of the audience that saw the ad at least once.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger data-specimen="accordion-trigger">What is frequency?</AccordionTrigger>
        <AccordionContent>The average number of times each person saw it.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c" disabled>
        <AccordionTrigger data-specimen="accordion-trigger-disabled">Disabled item</AccordionTrigger>
        <AccordionContent>Hidden.</AccordionContent>
      </AccordionItem>
    </Accordion>

    <Collapsible className="max-w-md" defaultOpen data-specimen="collapsible">
      <CollapsibleTrigger render={<Button variant="outline" data-specimen="collapsible-trigger" />}>Toggle details</CollapsibleTrigger>
      <CollapsibleContent data-specimen="collapsible-content">
        <p className="pt-3 text-body-sm">Figures update after you save the report.</p>
      </CollapsibleContent>
    </Collapsible>

    <div className="max-w-xl rounded-lg border border-border bg-card" data-specimen="empty-wrap">
      <Empty data-specimen="empty">
        <EmptyHeader data-specimen="empty-header">
          <EmptyMedia variant="icon" data-specimen="empty-media"><Icon name="folder" /></EmptyMedia>
          <EmptyTitle data-specimen="empty-title">No reports yet</EmptyTitle>
          <EmptyDescription data-specimen="empty-description">Create a report to see reach and frequency here.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent data-specimen="empty-content">
          <Button>Create report</Button>
          <Button variant="outline">Import</Button>
        </EmptyContent>
      </Empty>
    </div>

    <div className="flex max-w-xl flex-col gap-6">
      <ItemGroup data-specimen="item-group">
        {itemVariants.flatMap((variant) =>
          itemSizes.map((size) => (
            <Item key={`${variant}-${size}`} variant={variant} size={size} data-specimen={`item-${variant}-${size}`}>
              <ItemMedia variant="icon" data-specimen={`item-media-${variant}-${size}`}><Icon name="chart-line" /></ItemMedia>
              <ItemContent>
                <ItemTitle data-specimen={`item-title-${variant}-${size}`}>Roadside reach</ItemTitle>
                <ItemDescription data-specimen={`item-description-${variant}-${size}`}>Q1 2025, 25 cities</ItemDescription>
              </ItemContent>
              <ItemActions><Button size="sm" variant="outline">Open</Button></ItemActions>
            </Item>
          ))
        )}
      </ItemGroup>
      <ItemGroup data-specimen="item-group-2">
        <Item render={<a href="#display3" />} variant="outline" data-specimen="item-link">
          <ItemMedia variant="image" data-specimen="item-media-image"><span className="size-full bg-primary" /></ItemMedia>
          <ItemContent><ItemTitle>As link</ItemTitle></ItemContent>
        </Item>
        <Item render={<a href="#display3" />} data-selected="true" data-specimen="item-selected">
          <ItemMedia variant="icon"><Icon name="star" /></ItemMedia>
          <ItemContent><ItemTitle>Selected</ItemTitle></ItemContent>
        </Item>
        <Item render={<button type="button" disabled />} data-specimen="item-disabled">
          <ItemContent><ItemTitle>Disabled button</ItemTitle></ItemContent>
        </Item>
        <ItemSeparator data-specimen="item-separator" />
        <Item variant="outline" data-specimen="item-header-footer">
          <ItemHeader data-specimen="item-header"><ItemTitle>Header</ItemTitle></ItemHeader>
          <ItemContent><ItemDescription>Body text</ItemDescription></ItemContent>
          <ItemFooter data-specimen="item-footer"><ItemDescription>Footer</ItemDescription></ItemFooter>
        </Item>
      </ItemGroup>
    </div>
  </section>
  )
}

function App() {
  const [dark, setDark] = React.useState(false)
  const apply = (value: boolean) => {
    setDark(value)
    document.documentElement.classList.toggle("dark", value)
  }
  React.useEffect(() => {
    apply(new URLSearchParams(location.search).get("theme") === "dark")
  }, [])
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-12 p-6 text-body-sm">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-h1 text-ink-heading">Playlog UI (React): pilot</h1>
        <Button variant="outline" aria-pressed={dark} onClick={() => apply(!dark)}>
          {dark ? "Dark" : "Light"} mode
        </Button>
      </header>
      <ButtonSection />
      <InputSection />
      <FormsSection />
      <SelectFieldSection />
      <Batch3Section />
      <DialogSection />
      <OverlaysSection />
      <MenusSection />
      <ToastSection />
      <NavSection />
      <MenubarCommandSection />
      <SidebarSection />
      <DisplaySection />
      <Display2Section />
      <Display3Section />
    </main>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
