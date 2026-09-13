// Compatibility shims so the Infinity Store components (originally written
// for Next.js) run on TanStack Router without modification.
import {
  Link as TanStackLink,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useMemo, type CSSProperties, type MouseEventHandler, type ReactNode } from "react";

function splitHref(href: string): { path: string; search: Record<string, string> } {
  const [path, qs] = href.split("?");
  return { path, search: Object.fromEntries(new URLSearchParams(qs ?? "")) };
}

const AnyLink = TanStackLink as unknown as React.ComponentType<Record<string, unknown>>;

export function Link({
  href,
  children,
  ...rest
}: {
  href: string;
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
  "aria-label"?: string;
  prefetch?: boolean;
}) {
  const { path, search } = splitHref(href);
  return (
    <AnyLink to={path} search={search} {...rest}>
      {children}
    </AnyLink>
  );
}

export function Image({
  src,
  alt,
  fill,
  className,
  priority,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  style?: CSSProperties;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? undefined : "lazy"}
      className={fill ? `absolute inset-0 h-full w-full ${className ?? ""}` : className}
    />
  );
}

export function useRouter() {
  const navigate = useNavigate();
  return useMemo(
    () => ({
      push: (href: string) => {
        const { path, search } = splitHref(href);
        void navigate({ to: path, search } as never);
      },
      replace: (href: string) => {
        const { path, search } = splitHref(href);
        void navigate({ to: path, search, replace: true } as never);
      },
      back: () => window.history.back(),
    }),
    [navigate],
  );
}

export function useSearchParams(): URLSearchParams {
  const searchStr = useRouterState({ select: (s) => s.location.searchStr });
  return useMemo(() => new URLSearchParams(searchStr), [searchStr]);
}

export function usePathname(): string {
  return useRouterState({ select: (s) => s.location.pathname });
}
