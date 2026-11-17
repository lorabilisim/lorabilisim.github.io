import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  arrow?: boolean;
  external?: boolean;
  /** Hedef sayfayı önceden tam olarak indirir (dinamik rotalar için). */
  prefetch?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  external = false,
  prefetch = false,
  className,
}: ButtonProps) {
  const classes = cn(
    "group/btn inline-flex items-center justify-center gap-2 rounded-lg font-display font-semibold transition-all duration-300",
    size === "md" ? "px-6 py-3 text-[0.95rem]" : "px-4 py-2 text-sm",
    variant === "primary"
      ? "bg-gradient-to-r from-primary to-primary-strong text-white shadow-[0_10px_30px_-10px_var(--glow)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-10px_var(--glow)]"
      : "border border-line-strong bg-fg/[0.04] text-fg backdrop-blur hover:border-primary/60 hover:bg-primary/10",
    className,
  );
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} prefetch={prefetch ? true : "auto"} className={classes}>
      {content}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      )}
    </div>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-link",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Arka plandaki yumuşak renk bulutları. */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      // Alt kenara doğru saydamlaşır; bölüm bittiğinde renk sert bir çizgiyle kesilmez.
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_45%,transparent)]",
        className,
      )}
    >
      <div className="anim-aurora absolute -top-[20%] right-[-10%] h-[70%] w-[55%] rounded-full bg-primary/20 blur-[120px] light:bg-primary/15" />
      <div
        className="anim-aurora absolute bottom-[-25%] left-[-12%] h-[65%] w-[50%] rounded-full bg-accent/20 blur-[130px] light:bg-accent/10"
        style={{ animationDelay: "-8s" }}
      />
    </div>
  );
}

export function GooglePlayBadge({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/play inline-flex items-center gap-3 rounded-lg border border-line-strong bg-fg/[0.04] px-5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10"
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-7 text-cyan">
        <path
          fill="currentColor"
          d="M4.5 2.6c-.3.3-.5.8-.5 1.4v16c0 .6.2 1.1.5 1.4L13.9 12 4.5 2.6Zm10.8 8L6.1 2.3l11.1 6.3-1.9 2Zm0 2.8 1.9 2-11.1 6.3 9.2-8.3Zm3.3-3.5 2.6 1.5c.8.5.8 1.3 0 1.8l-2.6 1.5-2.2-2.4 2.2-2.4Z"
        />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">Hemen İndir</span>
        <span className="font-display text-lg font-semibold">Google Play</span>
      </span>
    </a>
  );
}
