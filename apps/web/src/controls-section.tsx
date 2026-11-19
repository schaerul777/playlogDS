import * as React from "react"

import { Icon } from "@workspace/ui/icons/icon"
import { Button } from "@workspace/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@workspace/ui/components/button-group"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Field, FieldDescription, FieldError, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Slider, SliderLabel, SliderValue } from "@workspace/ui/components/slider"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h3 font-bold text-ink-heading">{title}</h2>
      {children}
    </section>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="text-caption text-muted-foreground">{children}</p>
}

const SCOPES = [
  { value: "all", label: "All screens" },
  { value: "rail", label: "Rail" },
  { value: "airport", label: "Airport" },
]

const formatRp = (v: number) => `Rp ${v >= 1000 ? `${(v / 1000).toLocaleString("id-ID")} M` : `${v} K`}`

// ---------------------------------------------------------------------------
// Button Group
// ---------------------------------------------------------------------------

function ButtonGroupExample() {
  return (
    <Section title="Button Group">
      <Caption>
        Outline buttons share one edge; filled buttons are split by a page-colour divider. Sizes, variants and focus
        come from Button. Tab moves through each button (no roving arrows).
      </Caption>
      <div className="flex flex-wrap items-center gap-6">
        <ButtonGroup aria-label="View">
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Save options">
          <Button>Save</Button>
          <ButtonGroupSeparator />
          <Button>Save and close</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Secondary actions">
          <Button variant="secondary">Archive</Button>
          <ButtonGroupSeparator />
          <Button variant="secondary">Duplicate</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Danger zone">
          <Button variant="destructive">Pause</Button>
          <ButtonGroupSeparator />
          <Button variant="destructive">Delete</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Quiet actions">
          <Button variant="ghost">Cut</Button>
          <Button variant="ghost">Copy</Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        {(["sm", "default", "lg"] as const).map((size) => (
          <ButtonGroup key={size} aria-label={`Size ${size}`}>
            <Button variant="outline" size={size}>
              {size}
            </Button>
            <Button variant="outline" size={size}>
              Two
            </Button>
            <Button variant="outline" size={size}>
              Three
            </Button>
          </ButtonGroup>
        ))}
        <ButtonGroup aria-label="Row actions">
          <Button variant="outline" size="icon" aria-label="Add">
            <Icon name="plus" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Edit">
            <Icon name="edit" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Delete">
            <Icon name="trash" />
          </Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical" aria-label="Zoom">
          <Button variant="outline" size="icon" aria-label="Zoom in">
            <Icon name="plus" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Zoom out">
            <Icon name="more" />
          </Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical" aria-label="Vertical filled">
          <Button>First</Button>
          <ButtonGroupSeparator orientation="horizontal" />
          <Button>Second</Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-wrap items-start gap-6">
        <ButtonGroup aria-label="Share link" className="w-80">
          <ButtonGroupText>https://</ButtonGroupText>
          <Input aria-label="Report address" defaultValue="playlog.example/q3" />
          <Button variant="outline">Copy</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Search scope">
          <Select items={SCOPES} defaultValue="all">
            <SelectTrigger aria-label="Scope" className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SCOPES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input aria-label="Search" placeholder="Search campaigns" />
        </ButtonGroup>
        <ButtonGroup aria-label="Export">
          <Button variant="outline">Export</Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="icon" aria-label="More export options" />}
            >
              <Icon name="chevron-down" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>CSV</DropdownMenuItem>
              <DropdownMenuItem>PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
        <ButtonGroup aria-label="Nested groups">
          <ButtonGroup aria-label="Period">
            <Button variant="outline">Q2</Button>
            <Button variant="outline">Q3</Button>
          </ButtonGroup>
          <ButtonGroup aria-label="Actions">
            <Button variant="outline" size="icon" aria-label="Edit">
              <Icon name="edit" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Delete">
              <Icon name="trash" />
            </Button>
          </ButtonGroup>
        </ButtonGroup>
        <ButtonGroup aria-label="Disabled">
          <Button variant="outline" disabled>
            One
          </Button>
          <Button variant="outline" disabled>
            Two
          </Button>
        </ButtonGroup>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Slider
// ---------------------------------------------------------------------------

function SliderExample() {
  return (
    <Section title="Slider">
      <div className="grid max-w-3xl gap-8 md:grid-cols-2">
        <Slider defaultValue={[40]} aria-label="Budget">
          <SliderLabel>Daily budget</SliderLabel>
          <SliderValue>{(_, values) => `${values[0]} %`}</SliderValue>
        </Slider>
        <Slider
          defaultValue={[200, 800]}
          min={0}
          max={1000}
          step={50}
          thumbLabels={["Minimum price", "Maximum price"]}
        >
          <SliderLabel>Price range</SliderLabel>
          <SliderValue>{(_, values) => `${formatRp(values[0]!)} – ${formatRp(values[1]!)}`}</SliderValue>
        </Slider>
        <Slider defaultValue={[60]} disabled aria-label="Disabled">
          <SliderLabel>Disabled</SliderLabel>
          <SliderValue>{(_, values) => `${values[0]} %`}</SliderValue>
        </Slider>
        <Slider defaultValue={[20, 70]} thumbLabels={["From", "To"]} aria-label="Range without a label row" />
        <div className="flex h-48 gap-10">
          <Slider orientation="vertical" defaultValue={[30]} aria-label="Vertical volume" />
          <Slider orientation="vertical" defaultValue={[20, 80]} thumbLabels={["Low", "High"]} />
        </div>
      </div>
      <Caption>Arrows move by one step, PageUp and PageDown by a large step, Home and End jump to the ends.</Caption>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Input OTP
// ---------------------------------------------------------------------------

function Slots({ sizes = [3, 3] }: { sizes?: number[] }) {
  return (
    <>
      {sizes.map((n, g) => (
        <React.Fragment key={g}>
          {g > 0 && <InputOTPSeparator />}
          <InputOTPGroup>
            {Array.from({ length: n }, (_, i) => (
              <InputOTPSlot key={i} />
            ))}
          </InputOTPGroup>
        </React.Fragment>
      ))}
    </>
  )
}

function OtpExample() {
  const [complete, setComplete] = React.useState<string | null>(null)
  return (
    <Section title="Input OTP">
      <div className="grid max-w-3xl gap-8 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="otp-default">Verification code</FieldLabel>
          <InputOTP id="otp-default" length={6} onValueComplete={setComplete} onValueChange={() => setComplete(null)}>
            <Slots />
          </InputOTP>
          <FieldDescription>
            {complete ? `Complete: ${complete}` : "Enter the 6 digits we sent to your email. You can paste them."}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="otp-filled">Filled</FieldLabel>
          <InputOTP id="otp-filled" length={6} defaultValue="428613">
            <Slots />
          </InputOTP>
        </Field>
        <Field>
          <FieldLabel htmlFor="otp-invalid">Invalid</FieldLabel>
          <InputOTP id="otp-invalid" length={6} defaultValue="428613" invalid aria-describedby="otp-invalid-error">
            <Slots />
          </InputOTP>
          <FieldError id="otp-invalid-error">That code has expired. Request a new one.</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="otp-disabled">Disabled</FieldLabel>
          <InputOTP id="otp-disabled" length={6} defaultValue="42" disabled>
            <Slots />
          </InputOTP>
        </Field>
        <Field>
          <FieldLabel htmlFor="otp-mask">Masked</FieldLabel>
          <InputOTP id="otp-mask" length={4} mask defaultValue="1234">
            <Slots sizes={[4]} />
          </InputOTP>
        </Field>
        <Field>
          <FieldLabel htmlFor="otp-alpha">Letters and digits</FieldLabel>
          <InputOTP id="otp-alpha" length={6} validationType="alphanumeric">
            <Slots sizes={[6]} />
          </InputOTP>
        </Field>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Drawer
// ---------------------------------------------------------------------------

function DrawerExample() {
  const [saved, setSaved] = React.useState(false)
  return (
    <Section title="Drawer">
      <Caption>
        A bottom panel for small screens: swipe down, press Escape, tap the scrim or use the close button. Focus stays
        inside and returns to the trigger.
      </Caption>
      <div className="flex flex-wrap items-center gap-3">
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>Edit campaign</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit campaign</DrawerTitle>
              <DrawerDescription>Change the name and the daily budget. Reach is recounted overnight.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <div className="flex flex-col gap-4 pb-1">
                <Field>
                  <FieldLabel htmlFor="drawer-name">Campaign name</FieldLabel>
                  <Input id="drawer-name" defaultValue="Rail network, Q3 2025" />
                </Field>
                <Slider defaultValue={[40]}>
                  <SliderLabel>Daily budget</SliderLabel>
                  <SliderValue>{(_, values) => `${values[0]} %`}</SliderValue>
                </Slider>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
              <DrawerClose render={<Button onClick={() => setSaved(true)} />}>Save changes</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>Long content</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Screens in this campaign</DrawerTitle>
              <DrawerDescription>The list scrolls inside the drawer; the header and footer stay put.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <ul className="flex flex-col gap-2 text-body-sm">
                {Array.from({ length: 24 }, (_, i) => (
                  <li key={i} className="flex justify-between border-b-(length:--pl-border-width) border-border py-2">
                    <span>Screen SCR-{1001 + i}</span>
                    <span className="text-caption text-muted-foreground">Live</span>
                  </li>
                ))}
              </ul>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer showSwipeHandle={false}>
          <DrawerTrigger render={<Button variant="outline" />}>No handle</DrawerTrigger>
          <DrawerContent showCloseButton={false}>
            <DrawerHeader>
              <DrawerTitle>Discard changes?</DrawerTitle>
              <DrawerDescription>Without a handle or a close button; swipe, Escape or the buttons close it.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>Keep editing</DrawerClose>
              <DrawerClose render={<Button variant="destructive" />}>Discard</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        {saved && <span className="text-caption text-muted-foreground">Saved</span>}
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// A realistic example: a filter toolbar, a price range and a verification step in one place.
// ---------------------------------------------------------------------------

function RealisticExample() {
  return (
    <Section title="Example: campaign filters">
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Q3 campaigns</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <ButtonGroup aria-label="Period">
              <Button variant="outline">Day</Button>
              <Button variant="outline" aria-pressed="true">
                Week
              </Button>
              <Button variant="outline">Month</Button>
            </ButtonGroup>
            <ButtonGroup aria-label="Export">
              <Button variant="outline">Export</Button>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="More export options" />}>
                  <Icon name="chevron-down" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>CSV</DropdownMenuItem>
                  <DropdownMenuItem>PDF</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </div>
          <Slider
            defaultValue={[200, 800]}
            min={0}
            max={1000}
            step={50}
            thumbLabels={["Minimum price", "Maximum price"]}
          >
            <SliderLabel>Price per 1,000 impressions</SliderLabel>
            <SliderValue>{(_, values) => `${formatRp(values[0]!)} – ${formatRp(values[1]!)}`}</SliderValue>
          </Slider>
          <Field>
            <FieldLabel htmlFor="otp-example">Confirm with your code</FieldLabel>
            <InputOTP id="otp-example" length={6}>
              <Slots />
            </InputOTP>
            <FieldDescription>Sent to your email. It expires in 10 minutes.</FieldDescription>
          </Field>
        </CardContent>
      </Card>
    </Section>
  )
}

export function ControlsSection() {
  return (
    <>
      <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">Controls</p>
      <RealisticExample />
      <ButtonGroupExample />
      <SliderExample />
      <OtpExample />
      <DrawerExample />
    </>
  )
}
