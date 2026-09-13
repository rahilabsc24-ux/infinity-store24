"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { CheckCircle2, Heart, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type ToastVariant = "success" | "info" | "wishlist"

export type Toast = {
  id: number
  title: string
  description?: string
  variant: ToastVariant
  action?: { label: string; href: string }
}

type ToastContextValue = {
  toasts: Toast[]
  showToast: (toast: Omit<Toast, "id">) => void
  dismissToast: (id: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let toastCounter = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = ++toastCounter
      setToasts((prev) => [...prev, { ...toast, id }])
      window.setTimeout(() => dismissToast(id), 3500)
    },
    [dismissToast],
  )

  const value = useMemo(() => ({ toasts, showToast, dismissToast }), [toasts, showToast, dismissToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within a ToastProvider")
  return ctx
}

const variantIcon: Record<ToastVariant, typeof CheckCircle2> = {
  success: CheckCircle2,
  info: Info,
  wishlist: Heart,
}

const variantStyles: Record<ToastVariant, string> = {
  success: "text-brand",
  info: "text-foreground",
  wishlist: "text-destructive",
}

function Toaster() {
  const { toasts, dismissToast } = useContext(ToastContext) as ToastContextValue

  if (toasts.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-end sm:px-6">
      {toasts.map((toast) => {
        const Icon = variantIcon[toast.variant]
        return (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-lg animate-in fade-in slide-in-from-bottom-2"
          >
            <Icon className={cn("mt-0.5 size-5 shrink-0", variantStyles[toast.variant])} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{toast.title}</p>
              {toast.description && <p className="mt-0.5 text-xs text-muted-foreground">{toast.description}</p>}
              {toast.action && (
                <a
                  href={toast.action.href}
                  className="mt-1.5 inline-block text-xs font-semibold text-brand hover:underline"
                >
                  {toast.action.label}
                </a>
              )}
            </div>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => dismissToast(toast.id)}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
