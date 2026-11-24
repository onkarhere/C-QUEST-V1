"use client";
import { Toaster as Sonner } from "sonner"
import { useTheme } from "@/lib/theme/ThemeProvider"

const Toaster = ({
  ...props
}) => {
  const { resolved } = useTheme()

  return (
    (<Sonner
      theme={resolved}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-ink group-[.toaster]:border-frame group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-ink-soft",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-ink-soft",
        },
      }}
      {...props} />)
  );
}

export { Toaster }
