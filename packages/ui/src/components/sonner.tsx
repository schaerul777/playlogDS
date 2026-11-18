import * as React from "react"
import { Toaster as Sonner, toast, type ToasterProps } from "sonner"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { buttonVariants } from "@workspace/ui/components/button"
import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set

// Playlog: no next-themes. The theme follows the `.dark` class on <html>, like the rest of the library.
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

function useDocumentTheme(): ToasterProps["theme"] {
  return React.useSyncExternalStore(
    subscribeToTheme,
    () => (document.documentElement.classList.contains("dark") ? "dark" : "light"),
    () => "light"
  )
}

// Playlog: COMPONENT-SPECS Toast. Bottom-right, 24 from the edges (16 on small screens), 8 between toasts,
// shown for 6 seconds. Toasts are unstyled by Sonner and drawn here with tokens only.
const Toaster = ({ theme, style, toastOptions, ...props }: ToasterProps) => {
  const documentTheme = useDocumentTheme()

  return (
    <Sonner
      theme={theme ?? documentTheme}
      className="toaster group"
      position="bottom-right"
      duration={6000}
      gap={8}
      offset="var(--pl-space-5)"
      mobileOffset="var(--pl-space-4)"
      // Playlog: status is an icon in the matching *-text color plus the title words. No new glyphs:
      // success uses check; loading keeps Sonner's built-in spinner.
      icons={{
        success: <Icon name="check" />,
        info: <Icon name="info" />,
        warning: <Icon name="warning" />,
        error: <Icon name="alert-circle" />,
        close: <Icon name="close" />,
      }}
      style={
        {
          // Playlog: toast width 360 (Tailwind step 90) and the spinner bars in muted-foreground.
          "--width": "calc(var(--spacing) * 90)",
          "--gray11": "var(--muted-foreground)",
          transitionDuration: "var(--pl-duration-slow)",
          ...style,
        } as React.CSSProperties
      }
      toastOptions={{
        unstyled: true,
        ...toastOptions,
        // Playlog: Sonner's transitions run at --pl-duration-slow instead of 400ms.
        style: { transitionDuration: "var(--pl-duration-slow)", ...toastOptions?.style },
        classNames: {
          // Playlog: surface-raised with the overlay shadow, radius 4, padding 12 16, gap 12, no border.
          toast:
            "flex w-(--width) items-start gap-3 rounded-md bg-popover px-4 py-3 text-body-sm text-popover-foreground shadow-(--pl-shadow-overlay) *:duration-(--pl-duration-slow)! has-data-close-button:pr-12",
          icon: "relative flex size-5 shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-(--pl-icon-size)",
          content: "flex min-w-0 flex-1 flex-col gap-0.5",
          title: "font-bold text-foreground",
          description: "text-muted-foreground",
          actionButton: cn(buttonVariants({ size: "sm" }), "self-center"),
          cancelButton: cn(buttonVariants({ variant: "outline", size: "sm" }), "self-center"),
          closeButton: cn(
            buttonVariants({ variant: "ghost", size: "icon-sm" }),
            "absolute top-2 right-2"
          ),
          success: "[&_[data-icon]]:text-success-text",
          info: "[&_[data-icon]]:text-info-text",
          warning: "[&_[data-icon]]:text-warning-text",
          error: "[&_[data-icon]]:text-danger-text",
          loading: "[&_[data-icon]]:text-muted-foreground",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  )
}

// Playlog: toast is re-exported so apps import everything from the library.
export { Toaster, toast }
