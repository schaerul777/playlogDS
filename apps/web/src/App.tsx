import * as React from "react"
import {
  RiAddLine,
  RiArrowRightLine,
  RiBarChartLine,
  RiDeleteBinLine,
  RiDownloadLine,
  RiMapPinLine,
  RiMoreLine,
  RiSearchLine,
} from "@remixicon/react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
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
import { Switch } from "@workspace/ui/components/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { cn } from "@workspace/ui/lib/utils"

import { useTheme } from "@/components/theme-provider"

type View = "both" | "light" | "dark"

const BUTTON_VARIANTS = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const
const BUTTON_SIZES = ["xs", "sm", "default", "lg"] as const
const ICON_SIZES = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const
const BADGE_VARIANTS = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const

export function App() {
  const { setTheme } = useTheme()
  const [view, setView] = React.useState<View>("both")

  // "Side by side" keeps the page light and renders a forced-dark column next to it.
  React.useEffect(() => {
    setTheme(view === "dark" ? "dark" : "light")
  }, [view, setTheme])

  function choose(next: View) {
    setView(next)
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4">
        <div>
          <h1 className="text-h2 font-bold text-ink-heading">Playground</h1>
          <p className="text-body-sm text-muted-foreground">
            Button, Input, Card and Badge. Hover and press Tab to check hover
            and focus.
          </p>
        </div>
        <div
          role="group"
          aria-label="Theme"
          className="flex gap-1 rounded-md border border-border p-1"
        >
          {(["both", "light", "dark"] as const).map((v) => (
            <Button
              key={v}
              size="sm"
              variant="ghost"
              aria-pressed={view === v}
              onClick={() => choose(v)}
            >
              {v === "both" ? "Side by side" : v === "light" ? "Light" : "Dark"}
            </Button>
          ))}
        </div>
      </header>

      <div
        className={cn(
          "grid",
          view === "both" ? "xl:grid-cols-2" : "grid-cols-1"
        )}
      >
        <Showcase label={view === "dark" ? "Dark" : "Light"} />
        {view === "both" && <Showcase label="Dark" className="dark" />}
      </div>
    </div>
  )
}

function Showcase({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <main
      className={cn(
        "flex min-w-0 flex-col gap-10 bg-background p-6 text-foreground",
        className
      )}
    >
      <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <ButtonSection />
      <InputSection />
      <BadgeSection />
      <CheckboxSection />
      <SwitchSection />
      <SelectSection />
      <TabsSection />
      <CardSection />
    </main>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h3 font-bold text-ink-heading">{title}</h2>
      {children}
    </section>
  )
}

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-24 shrink-0 text-caption font-medium text-muted-foreground">
      {children}
    </span>
  )
}

function ButtonSection() {
  return (
    <Section title="Button">
      <div className="flex flex-col gap-3 overflow-x-auto">
        {BUTTON_VARIANTS.map((variant) => (
          <div key={variant} className="flex items-center gap-3">
            <RowLabel>{variant}</RowLabel>
            {BUTTON_SIZES.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {size === "default" ? "Button" : size}
              </Button>
            ))}
            <Button variant={variant}>
              <RiDownloadLine data-icon="inline-start" />
              Export
            </Button>
            <Button variant={variant} aria-pressed>
              Selected
            </Button>
            <Button variant={variant} disabled>
              Disabled
            </Button>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <RowLabel>icon sizes</RowLabel>
          {ICON_SIZES.map((size) => (
            <Button key={size} variant="outline" size={size} aria-label="More">
              <RiMoreLine />
            </Button>
          ))}
          <Button size="icon" aria-label="Add">
            <RiAddLine />
          </Button>
          <Button size="icon" variant="destructive" aria-label="Delete">
            <RiDeleteBinLine />
          </Button>
          <Button size="icon" variant="ghost" aria-label="Search" disabled>
            <RiSearchLine />
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <RowLabel>trailing icon</RowLabel>
          <Button>
            View report
            <RiArrowRightLine data-icon="inline-end" />
          </Button>
          <Button size="sm" variant="secondary">
            View report
            <RiArrowRightLine data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </Section>
  )
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-label font-semibold">
        {label}
      </label>
      {children}
      {hint && (
        <p
          id={`${id}-hint`}
          className="text-caption font-medium text-muted-foreground"
        >
          {hint}
        </p>
      )}
    </div>
  )
}

function InputSection() {
  const id = React.useId()
  return (
    <Section title="Input">
      <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
        <Field id={`${id}-empty`} label="Empty">
          <Input id={`${id}-empty`} placeholder="Search campaigns" />
        </Field>
        <Field id={`${id}-filled`} label="Filled">
          <Input id={`${id}-filled`} defaultValue="Jakarta Selatan" />
        </Field>
        <Field id={`${id}-disabled`} label="Disabled">
          <Input id={`${id}-disabled`} defaultValue="Read only" disabled />
        </Field>
        <Field
          id={`${id}-invalid`}
          label="Invalid"
          hint="Enter a budget above Rp 1 M."
        >
          <Input
            id={`${id}-invalid`}
            defaultValue="Rp 0"
            aria-invalid
            aria-describedby={`${id}-invalid-hint`}
          />
        </Field>
        <Field id={`${id}-file`} label="File">
          <Input id={`${id}-file`} type="file" />
        </Field>
        <Field id={`${id}-num`} label="Number">
          <Input id={`${id}-num`} type="number" defaultValue={1284} />
        </Field>
      </div>
    </Section>
  )
}

function BadgeSection() {
  return (
    <Section title="Badge">
      <div className="flex flex-wrap items-center gap-3">
        <RowLabel>span</RowLabel>
        {BADGE_VARIANTS.map((variant) => (
          <Badge key={variant} variant={variant}>
            {variant}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <RowLabel>link (hover)</RowLabel>
        {BADGE_VARIANTS.map((variant) => (
          <Badge
            key={variant}
            variant={variant}
            render={<a href="#badge" />}
          >
            {variant}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <RowLabel>with icon</RowLabel>
        <Badge variant="secondary">
          <RiAddLine data-icon="inline-start" />
          New
        </Badge>
        <Badge variant="destructive">
          <RiDeleteBinLine data-icon="inline-start" />
          Removed
        </Badge>
      </div>
    </Section>
  )
}

function CardSection() {
  return (
    <Section title="Card">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Impressions</CardTitle>
            <CardDescription>Q1–Q3 2025 · 25 cities</CardDescription>
            <CardAction>
              <Badge variant="secondary">Roadside</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-kpi font-extrabold text-ink-heading tabular-nums">
              12,4 M
            </p>
            <p className="text-caption font-medium text-muted-foreground">
              Source: Playlog audience panel
            </p>
          </CardContent>
          <CardFooter className="gap-2 border-t border-border">
            <Button size="sm">View report</Button>
            <Button size="sm" variant="ghost">
              Dismiss
            </Button>
          </CardFooter>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Small card</CardTitle>
            <CardDescription>16px padding for dense panels.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input placeholder="Filter screens" aria-label="Filter screens" />
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline">
              Apply
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Section>
  )
}

function ChoiceLabel({ children }: { children: React.ReactNode }) {
  return (
    // Spec: 10px gap to the label; the checkbox box sits 1px below the label's first line.
    <label className="flex items-start gap-2.5 text-body-sm text-foreground [&>[data-slot=checkbox]]:mt-px">
      {children}
    </label>
  )
}

function CheckboxSection() {
  return (
    <Section title="Checkbox">
      <div className="flex flex-wrap items-center gap-6">
        <ChoiceLabel>
          <Checkbox /> Unchecked
        </ChoiceLabel>
        <ChoiceLabel>
          <Checkbox defaultChecked /> Checked
        </ChoiceLabel>
        <ChoiceLabel>
          <Checkbox disabled /> Disabled
        </ChoiceLabel>
        <ChoiceLabel>
          <Checkbox disabled defaultChecked /> Disabled checked
        </ChoiceLabel>
        <ChoiceLabel>
          <Checkbox aria-invalid /> Invalid
        </ChoiceLabel>
        <ChoiceLabel>
          <Checkbox aria-invalid defaultChecked /> Invalid checked
        </ChoiceLabel>
      </div>
    </Section>
  )
}

function SwitchSection() {
  return (
    <Section title="Switch">
      {(["default", "sm"] as const).map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-6">
          <RowLabel>size={size}</RowLabel>
          <ChoiceLabel>
            <Switch size={size} /> Off
          </ChoiceLabel>
          <ChoiceLabel>
            <Switch size={size} defaultChecked /> On
          </ChoiceLabel>
          <ChoiceLabel>
            <Switch size={size} disabled /> Disabled
          </ChoiceLabel>
          <ChoiceLabel>
            <Switch size={size} disabled defaultChecked /> Disabled on
          </ChoiceLabel>
          <ChoiceLabel>
            <Switch size={size} aria-invalid /> Invalid
          </ChoiceLabel>
        </div>
      ))}
    </Section>
  )
}

const CITIES = {
  jakarta: "Jakarta",
  bandung: "Bandung",
  surabaya: "Surabaya",
  medan: "Medan",
  makassar: "Makassar",
}

function CitySelect({
  size,
  defaultValue,
  disabled,
  invalid,
  label,
}: {
  size?: "default" | "sm"
  defaultValue?: keyof typeof CITIES
  disabled?: boolean
  invalid?: boolean
  label: string
}) {
  return (
    <Select items={CITIES} defaultValue={defaultValue} disabled={disabled}>
      <SelectTrigger
        size={size}
        aria-label={label}
        aria-invalid={invalid || undefined}
        className="w-48"
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
          <SelectItem value="makassar" disabled>
            Makassar
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function SelectSection() {
  return (
    <Section title="Select">
      <div className="flex flex-wrap items-start gap-4">
        <CitySelect label="Placeholder" />
        <CitySelect label="Selected" defaultValue="jakarta" />
        <CitySelect label="Small" size="sm" defaultValue="bandung" />
        <CitySelect label="Disabled" disabled defaultValue="surabaya" />
        <CitySelect label="Invalid" invalid />
      </div>
      <p className="text-caption font-medium text-muted-foreground">
        Open a select to see highlighted, selected and disabled items.
      </p>
    </Section>
  )
}

function TabsDemo({
  variant,
  orientation,
}: {
  variant: "default" | "line"
  orientation: "horizontal" | "vertical"
}) {
  return (
    <Tabs defaultValue="overview" orientation={orientation}>
      <TabsList variant={variant}>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="audience">
          <RiBarChartLine data-icon="inline-start" />
          Audience
        </TabsTrigger>
        <TabsTrigger value="locations">
          <RiMapPinLine data-icon="inline-start" />
          Locations
        </TabsTrigger>
        <TabsTrigger value="export" disabled>
          Export
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Impressions across 25 cities.</TabsContent>
      <TabsContent value="audience">Audience by age and gender.</TabsContent>
      <TabsContent value="locations">Screens by city.</TabsContent>
    </Tabs>
  )
}

function TabsSection() {
  return (
    <Section title="Tabs">
      <div className="grid gap-6 md:grid-cols-2">
        {(["default", "line"] as const).flatMap((variant) =>
          (["horizontal", "vertical"] as const).map((orientation) => (
            <div key={variant + orientation} className="flex flex-col gap-2">
              <span className="text-caption font-medium text-muted-foreground">
                variant={variant}, {orientation}
              </span>
              <TabsDemo variant={variant} orientation={orientation} />
            </div>
          ))
        )}
      </div>
    </Section>
  )
}
