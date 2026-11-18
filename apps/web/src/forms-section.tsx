import * as React from "react"

import { Icon } from "@workspace/ui/icons/icon"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"
import { Label } from "@workspace/ui/components/label"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@workspace/ui/components/progress"
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group"
import { toast } from "@workspace/ui/components/sonner"
import { Spinner } from "@workspace/ui/components/spinner"
import { Switch } from "@workspace/ui/components/switch"
import { Textarea } from "@workspace/ui/components/textarea"
import { Toggle } from "@workspace/ui/components/toggle"
import { ToggleGroup, ToggleGroupItem } from "@workspace/ui/components/toggle-group"

const CITIES = [
  "Jakarta",
  "Surabaya",
  "Bandung",
  "Medan",
  "Semarang",
  "Makassar",
  "Denpasar",
  "Yogyakarta",
]
const TEAMS = ["Media planning", "Sales", "Data science", "Finance", "Leadership"]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h3 font-bold text-ink-heading">{title}</h2>
      {children}
    </section>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="w-24 shrink-0 text-caption font-medium text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  )
}

function FieldSection() {
  const id = React.useId()
  return (
    <Section title="Label and Field">
      <div className="grid gap-6 md:grid-cols-3">
        <Field>
          <FieldLabel htmlFor={`${id}-a`} required>
            Report name
          </FieldLabel>
          <Input id={`${id}-a`} required aria-describedby={`${id}-a-d`} placeholder="Q3 roadside reach" />
          <FieldDescription id={`${id}-a-d`}>Shown in the report library.</FieldDescription>
        </Field>
        <Field data-invalid="true">
          <FieldLabel htmlFor={`${id}-b`} required>
            Budget (IDR)
          </FieldLabel>
          <Input id={`${id}-b`} required aria-invalid="true" aria-describedby={`${id}-b-e`} defaultValue="-5.000.000" />
          <FieldDescription>Total for the period.</FieldDescription>
          <FieldError id={`${id}-b-e`}>Enter an amount above zero.</FieldError>
        </Field>
        <Field data-disabled="true">
          <FieldLabel htmlFor={`${id}-c`}>Workspace</FieldLabel>
          <Input id={`${id}-c`} disabled defaultValue="Playlog Indonesia" />
          <FieldDescription>Set by your administrator.</FieldDescription>
        </Field>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <FieldSet>
          <FieldLegend>Notifications</FieldLegend>
          <FieldDescription>Choose what we email you about.</FieldDescription>
          <FieldGroup data-slot="checkbox-group">
            <Field orientation="horizontal">
              <Checkbox id={`${id}-n1`} defaultChecked />
              <FieldLabel htmlFor={`${id}-n1`}>Weekly summary</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id={`${id}-n2`} />
              <FieldContent>
                <FieldLabel htmlFor={`${id}-n2`}>Data alerts</FieldLabel>
                <FieldDescription>When a city drops more than 10%.</FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal" data-disabled="true">
              <Switch id={`${id}-n3`} disabled />
              <FieldLabel htmlFor={`${id}-n3`}>SMS (not available)</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSet>
          <FieldLegend variant="label">Plan</FieldLegend>
          <RadioGroup defaultValue="team">
            <FieldLabel htmlFor={`${id}-p1`}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Team</FieldTitle>
                  <FieldDescription>Up to 10 people, all cities.</FieldDescription>
                </FieldContent>
                <RadioGroupItem value="team" id={`${id}-p1`} />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor={`${id}-p2`}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Enterprise</FieldTitle>
                  <FieldDescription>Unlimited seats and API access.</FieldDescription>
                </FieldContent>
                <RadioGroupItem value="enterprise" id={`${id}-p2`} />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
      </div>
      <FieldSeparator>or</FieldSeparator>
      <div className="flex gap-6">
        <Label htmlFor={`${id}-l`}>Plain label</Label>
        <Label required>Required label</Label>
      </div>
    </Section>
  )
}

function TextareaSection() {
  const id = React.useId()
  return (
    <Section title="Textarea">
      <div className="grid gap-6 md:grid-cols-3">
        <Field>
          <FieldLabel htmlFor={`${id}-a`}>Notes</FieldLabel>
          <Textarea id={`${id}-a`} placeholder="Add context for the planning team" />
        </Field>
        <Field data-invalid="true">
          <FieldLabel htmlFor={`${id}-b`}>Methodology</FieldLabel>
          <Textarea id={`${id}-b`} aria-invalid="true" aria-describedby={`${id}-b-e`} defaultValue="TBD" />
          <FieldError id={`${id}-b-e`}>Describe the method in at least 20 characters.</FieldError>
        </Field>
        <Field data-disabled="true">
          <FieldLabel htmlFor={`${id}-c`}>Source</FieldLabel>
          <Textarea id={`${id}-c`} disabled defaultValue="Mobility panel, Q1 to Q3 2025." />
        </Field>
      </div>
    </Section>
  )
}

function InputGroupSection() {
  const id = React.useId()
  return (
    <Section title="Input Group">
      <div className="grid gap-6 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={`${id}-a`}>Search</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Icon name="search" />
            </InputGroupAddon>
            <InputGroupInput id={`${id}-a`} placeholder="Search cities" />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor={`${id}-b`}>Dashboard URL</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput id={`${id}-b`} defaultValue="playlog.id/reach" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                aria-label="Copy link"
                onClick={() => toast.success("Link copied")}
              >
                <Icon name="clipboard" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field data-invalid="true">
          <FieldLabel htmlFor={`${id}-c`}>Target reach</FieldLabel>
          <InputGroup>
            <InputGroupInput id={`${id}-c`} aria-invalid="true" aria-describedby={`${id}-c-e`} defaultValue="120" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>%</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <FieldError id={`${id}-c-e`}>Reach can't be above 100%.</FieldError>
        </Field>
        <Field data-disabled="true">
          <FieldLabel htmlFor={`${id}-d`}>Currency</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>IDR</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput id={`${id}-d`} disabled defaultValue="1.250.000" />
          </InputGroup>
        </Field>
        <Field className="md:col-span-2">
          <FieldLabel htmlFor={`${id}-e`}>Message</FieldLabel>
          <InputGroup>
            <InputGroupTextarea id={`${id}-e`} placeholder="Ask about this report" />
            <InputGroupAddon align="block-end">
              <InputGroupText>0 / 280</InputGroupText>
              <InputGroupButton size="sm" variant="default" className="ml-auto">
                Send
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </div>
    </Section>
  )
}

function CitiesMulti({
  id,
  invalid,
  value,
  onValueChange,
}: {
  id: string
  invalid?: boolean
  value?: string[]
  onValueChange?: (v: string[]) => void
}) {
  const anchor = useComboboxAnchor()
  return (
    <Combobox
      multiple
      items={CITIES}
      value={value}
      onValueChange={onValueChange ? (v) => onValueChange(v as string[]) : undefined}
      defaultValue={value ? undefined : ["Jakarta", "Surabaya"]}
    >
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(values: string[]) => (
            <>
              {values.map((v) => (
                <ComboboxChip key={v}>{v}</ComboboxChip>
              ))}
              <ComboboxChipsInput id={id} aria-invalid={invalid || undefined} placeholder="Add city" />
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
  )
}

function ComboboxSection() {
  const id = React.useId()
  return (
    <Section title="Combobox">
      <div className="grid gap-6 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={`${id}-a`}>City</FieldLabel>
          <Combobox items={CITIES} defaultValue="Bandung">
            <ComboboxInput id={`${id}-a`} placeholder="Select a city" />
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
          </Combobox>
          <FieldDescription>Type to filter. The clear button shows once a city is chosen.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor={`${id}-b`}>Cities (multiple)</FieldLabel>
          <CitiesMulti id={`${id}-b`} />
        </Field>
        <Field data-invalid="true">
          <FieldLabel htmlFor={`${id}-c`}>Team</FieldLabel>
          <Combobox items={TEAMS}>
            <ComboboxInput id={`${id}-c`} aria-invalid="true" aria-describedby={`${id}-c-e`} placeholder="Select a team" />
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
          </Combobox>
          <FieldError id={`${id}-c-e`}>Choose a team.</FieldError>
        </Field>
        <Field data-disabled="true">
          <FieldLabel htmlFor={`${id}-d`}>Region</FieldLabel>
          <Combobox items={["Java", "Sumatra", "Bali"]} defaultValue="Java" disabled>
            <ComboboxInput id={`${id}-d`} disabled placeholder="Select a region" />
            <ComboboxContent>
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
      </div>
    </Section>
  )
}

function NativeSelectSection() {
  const id = React.useId()
  return (
    <Section title="Native Select">
      <div className="grid gap-6 md:grid-cols-4">
        <Field>
          <FieldLabel htmlFor={`${id}-a`}>Period</FieldLabel>
          <NativeSelect id={`${id}-a`} defaultValue="q3">
            <NativeSelectOption value="q1">Q1 2025</NativeSelectOption>
            <NativeSelectOption value="q2">Q2 2025</NativeSelectOption>
            <NativeSelectOption value="q3">Q3 2025</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field>
          <FieldLabel htmlFor={`${id}-b`}>City (sm)</FieldLabel>
          <NativeSelect id={`${id}-b`} size="sm" defaultValue="Jakarta">
            <NativeSelectOptGroup label="Java">
              <NativeSelectOption>Jakarta</NativeSelectOption>
              <NativeSelectOption>Bandung</NativeSelectOption>
            </NativeSelectOptGroup>
            <NativeSelectOptGroup label="Sumatra">
              <NativeSelectOption>Medan</NativeSelectOption>
            </NativeSelectOptGroup>
          </NativeSelect>
        </Field>
        <Field data-invalid="true">
          <FieldLabel htmlFor={`${id}-c`}>Format</FieldLabel>
          <NativeSelect id={`${id}-c`} aria-invalid="true" aria-describedby={`${id}-c-e`} defaultValue="">
            <NativeSelectOption value="" disabled>
              Choose a format
            </NativeSelectOption>
            <NativeSelectOption value="csv">CSV</NativeSelectOption>
          </NativeSelect>
          <FieldError id={`${id}-c-e`}>Choose a format.</FieldError>
        </Field>
        <Field data-disabled="true">
          <FieldLabel htmlFor={`${id}-d`}>Currency</FieldLabel>
          <NativeSelect id={`${id}-d`} disabled defaultValue="idr">
            <NativeSelectOption value="idr">IDR</NativeSelectOption>
          </NativeSelect>
        </Field>
      </div>
    </Section>
  )
}

function RadioSection() {
  const id = React.useId()
  return (
    <Section title="Radio Group">
      <div className="grid gap-6 md:grid-cols-3">
        <FieldSet>
          <FieldLegend variant="label">Chart type</FieldLegend>
          <RadioGroup defaultValue="bar" name="chart">
            {["bar", "line", "table"].map((v) => (
              <Field key={v} orientation="horizontal">
                <RadioGroupItem value={v} id={`${id}-${v}`} />
                <FieldLabel htmlFor={`${id}-${v}`} className="font-normal">
                  {v[0].toUpperCase() + v.slice(1)}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </FieldSet>
        <FieldSet data-invalid="true">
          <FieldLegend variant="label">Audience</FieldLegend>
          <RadioGroup aria-invalid="true" aria-describedby={`${id}-aud-e`}>
            {["Adults", "Commuters"].map((v) => (
              <Field key={v} orientation="horizontal">
                <RadioGroupItem value={v} id={`${id}-${v}`} aria-invalid="true" />
                <FieldLabel htmlFor={`${id}-${v}`} className="font-normal">
                  {v}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
          <FieldError id={`${id}-aud-e`}>Choose an audience.</FieldError>
        </FieldSet>
        <FieldSet>
          <FieldLegend variant="label">Granularity (disabled)</FieldLegend>
          <RadioGroup defaultValue="city" disabled>
            {["city", "district"].map((v) => (
              <Field key={v} orientation="horizontal" data-disabled="true">
                <RadioGroupItem value={v} id={`${id}-g-${v}`} />
                <FieldLabel htmlFor={`${id}-g-${v}`} className="font-normal">
                  {v[0].toUpperCase() + v.slice(1)}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </FieldSet>
      </div>
    </Section>
  )
}

function ToggleSection() {
  return (
    <Section title="Toggle and Toggle Group">
      <div className="flex flex-col gap-4">
        {(["default", "outline"] as const).map((variant) => (
          <Row key={variant} label={variant}>
            <Toggle variant={variant} size="sm" aria-label="Bold">
              <Icon name="edit" />
            </Toggle>
            <Toggle variant={variant} aria-label="Show legend" defaultPressed>
              <Icon name="eye" />
            </Toggle>
            <Toggle variant={variant} size="lg">
              <Icon name="star" />
              Favourite
            </Toggle>
            <Toggle variant={variant} defaultPressed>
              Pressed
            </Toggle>
            <Toggle variant={variant} disabled>
              Disabled
            </Toggle>
          </Row>
        ))}
        <Row label="joined">
          <ToggleGroup variant="outline" defaultValue={["quarter"]}>
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
            <ToggleGroupItem value="quarter">Quarter</ToggleGroupItem>
            <ToggleGroupItem value="year">Year</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup defaultValue={["bar"]}>
            <ToggleGroupItem value="bar" aria-label="Bar chart">
              <Icon name="bar-chart" />
            </ToggleGroupItem>
            <ToggleGroupItem value="line" aria-label="Line chart">
              <Icon name="chart-line" />
            </ToggleGroupItem>
            <ToggleGroupItem value="pie" aria-label="Pie chart">
              <Icon name="pie-chart" />
            </ToggleGroupItem>
          </ToggleGroup>
        </Row>
        <Row label="spacing 2">
          <ToggleGroup variant="outline" size="sm" spacing={2} multiple defaultValue={["jkt", "sby"]}>
            <ToggleGroupItem value="jkt">Jakarta</ToggleGroupItem>
            <ToggleGroupItem value="sby">Surabaya</ToggleGroupItem>
            <ToggleGroupItem value="bdg">Bandung</ToggleGroupItem>
          </ToggleGroup>
        </Row>
        <Row label="vertical">
          <ToggleGroup variant="outline" orientation="vertical" defaultValue={["top"]}>
            <ToggleGroupItem value="top">Top 10</ToggleGroupItem>
            <ToggleGroupItem value="all">All cities</ToggleGroupItem>
          </ToggleGroup>
        </Row>
      </div>
    </Section>
  )
}

function AvatarSection() {
  return (
    <Section title="Avatar">
      <div className="flex flex-wrap items-center gap-6">
        {(["sm", "default", "lg"] as const).map((size) => (
          <Avatar key={size} size={size}>
            <AvatarFallback>DS</AvatarFallback>
          </Avatar>
        ))}
        <Avatar size="lg">
          <AvatarFallback>RA</AvatarFallback>
          <AvatarBadge>
            <span className="sr-only">Online</span>
          </AvatarBadge>
        </Avatar>
        <Avatar>
          <AvatarFallback>MK</AvatarFallback>
          <AvatarBadge className="bg-muted-foreground">
            <span className="sr-only">Away</span>
          </AvatarBadge>
        </Avatar>
        <AvatarGroup>
          {["AW", "BS", "CT"].map((i) => (
            <Avatar key={i}>
              <AvatarFallback>{i}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>+4</AvatarGroupCount>
        </AvatarGroup>
      </div>
    </Section>
  )
}

function ProgressSection() {
  const [value, setValue] = React.useState(35)
  return (
    <Section title="Progress and Spinner">
      <div className="grid gap-6 md:grid-cols-2">
        <Progress value={value}>
          <ProgressLabel>Data import</ProgressLabel>
          <ProgressValue />
        </Progress>
        <Progress value={100}>
          <ProgressLabel>Q3 export</ProgressLabel>
          <ProgressValue />
        </Progress>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => setValue((v) => (v >= 100 ? 0 : v + 15))}>
          Advance import
        </Button>
        <Spinner />
        <Spinner className="size-4 text-muted-foreground" />
        <Button disabled>
          <Spinner data-icon="inline-start" />
          Exporting
        </Button>
      </div>
    </Section>
  )
}

type Errors = Partial<Record<"name" | "recipients" | "format", string>>

function ExampleForm() {
  const id = React.useId()
  const [errors, setErrors] = React.useState<Errors>({})
  const [loading, setLoading] = React.useState(false)
  const [recipients, setRecipients] = React.useState<string[]>([])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next: Errors = {}
    if (!String(data.get("name") ?? "").trim()) next.name = "Enter a report name."
    if (recipients.length === 0) next.recipients = "Add at least one city."
    if (!data.get("format")) next.format = "Choose a file format."
    setErrors(next)
    if (Object.keys(next).length) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Export scheduled", {
        description: `${data.get("name")}, ${data.get("frequency")}, ${String(data.get("format")).toUpperCase()}`,
      })
    }, 1500)
  }

  return (
    <Section title="Example form">
      <form
        noValidate
        onSubmit={onSubmit}
        className="flex max-w-xl flex-col gap-6 rounded-lg border-(length:--pl-border-width) border-border bg-card p-6"
      >
        <FieldGroup>
          <Field data-invalid={errors.name ? "true" : undefined}>
            <FieldLabel htmlFor={`${id}-name`} required>
              Report name
            </FieldLabel>
            <Input
              id={`${id}-name`}
              name="name"
              required
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? `${id}-name-e` : `${id}-name-d`}
              placeholder="Q3 roadside reach"
            />
            <FieldDescription id={`${id}-name-d`}>Used as the file name.</FieldDescription>
            {errors.name && <FieldError id={`${id}-name-e`}>{errors.name}</FieldError>}
          </Field>
          <Field data-invalid={errors.recipients ? "true" : undefined}>
            <FieldLabel htmlFor={`${id}-cities`} required>
              Cities
            </FieldLabel>
            <CitiesMulti
              id={`${id}-cities`}
              invalid={!!errors.recipients}
              value={recipients}
              onValueChange={setRecipients}
            />
            {errors.recipients && <FieldError>{errors.recipients}</FieldError>}
          </Field>
          <FieldSet data-invalid={errors.format ? "true" : undefined}>
            <FieldLegend variant="label">File format</FieldLegend>
            <RadioGroup name="format" aria-invalid={errors.format ? true : undefined}>
              {["csv", "xlsx", "pdf"].map((v) => (
                <Field key={v} orientation="horizontal">
                  <RadioGroupItem value={v} id={`${id}-f-${v}`} aria-invalid={errors.format ? true : undefined} />
                  <FieldLabel htmlFor={`${id}-f-${v}`} className="font-normal">
                    {v.toUpperCase()}
                  </FieldLabel>
                </Field>
              ))}
            </RadioGroup>
            {errors.format && <FieldError>{errors.format}</FieldError>}
          </FieldSet>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor={`${id}-freq`}>Frequency</FieldLabel>
              <NativeSelect id={`${id}-freq`} name="frequency" defaultValue="Weekly" className="w-full">
                <NativeSelectOption>Daily</NativeSelectOption>
                <NativeSelectOption>Weekly</NativeSelectOption>
                <NativeSelectOption>Monthly</NativeSelectOption>
              </NativeSelect>
            </Field>
            <Field data-disabled="true">
              <FieldLabel htmlFor={`${id}-ws`}>Workspace</FieldLabel>
              <Input id={`${id}-ws`} name="workspace" disabled defaultValue="Playlog Indonesia" />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor={`${id}-notes`}>Notes</FieldLabel>
            <Textarea id={`${id}-notes`} name="notes" placeholder="Optional message for recipients" />
          </Field>
        </FieldGroup>
        <div className="flex justify-end gap-2">
          <Button type="reset" variant="outline" onClick={() => { setErrors({}); setRecipients([]) }}>
            Reset
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Spinner data-icon="inline-start" />}
            {loading ? "Scheduling" : "Schedule export"}
          </Button>
        </div>
      </form>
    </Section>
  )
}

export function FormsSection() {
  return (
    <>
      <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
        Forms
      </p>
      <FieldSection />
      <TextareaSection />
      <InputGroupSection />
      <ComboboxSection />
      <NativeSelectSection />
      <RadioSection />
      <ToggleSection />
      <AvatarSection />
      <ProgressSection />
      <ExampleForm />
    </>
  )
}
