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
import { Textarea } from "@workspace/ui/components/textarea"
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
    </main>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
