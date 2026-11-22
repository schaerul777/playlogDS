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
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
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
      <DialogSection />
    </main>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
