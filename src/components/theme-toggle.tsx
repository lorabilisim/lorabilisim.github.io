"use client";

import { Moon, Sun } from "lucide-react";

/** Koyu tema varsayılan; seçim localStorage'da saklanır ve layout'taki betik ilk boyamadan önce uygular. */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Depolama kapalıysa tercih yalnızca bu oturum için geçerli olur.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Temayı değiştir"
      className="grid size-10 place-items-center rounded-lg border border-line bg-fg/[0.04] text-fg transition-colors hover:border-primary/60 hover:bg-primary/10"
    >
      <Moon aria-hidden className="size-[18px] light:hidden" />
      <Sun aria-hidden className="hidden size-[18px] light:block" />
    </button>
  );
}
