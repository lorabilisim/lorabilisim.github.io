"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Shot = { src: string; width: number; height: number; alt: string };

// Öndeki kart ve iki yanındaki arka kartların konumları.
const SLOTS = [
  { x: "0%", scale: 1, rotate: 0, opacity: 1, zIndex: 30 },
  { x: "38%", scale: 0.84, rotate: 7, opacity: 0.55, zIndex: 20 },
  { x: "-38%", scale: 0.84, rotate: -7, opacity: 0.55, zIndex: 10 },
];

/** Uygulama görsellerini yelpaze gibi dizen, kendiliğinden dönen ve tıklanabilen deste. */
export function ScreenshotDeck({
  shots,
  name,
  className,
}: {
  shots: Shot[];
  name: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });

  useEffect(() => {
    if (paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % shots.length), 3800);
    return () => window.clearInterval(id);
  }, [paused, inView, shots.length]);

  return (
    <div
      ref={ref}
      className={cn("flex flex-col items-center", className)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div
        className="relative w-[62%] max-w-[270px]"
        style={{ aspectRatio: `${shots[0].width} / ${shots[0].height}` }}
      >
        <div className="absolute inset-[-12%] -z-10 rounded-full bg-primary/25 blur-[70px]" aria-hidden />
        {shots.map((shot, i) => {
          const slot = SLOTS[(i - index + shots.length) % shots.length] ?? SLOTS[2];
          const front = i === index;
          return (
            <motion.button
              key={shot.src}
              type="button"
              tabIndex={front ? -1 : 0}
              aria-label={`${name} görseli ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "absolute inset-0 overflow-hidden rounded-xl border border-line-strong shadow-soft",
                front ? "cursor-default" : "cursor-pointer",
              )}
              initial={false}
              animate={slot}
              transition={{ type: "spring", stiffness: 180, damping: 24 }}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(max-width: 640px) 62vw, 270px"
                className="size-full object-cover"
              />
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 flex gap-2" role="tablist" aria-label={`${name} görselleri`}>
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Görsel ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === index ? "w-8 bg-primary" : "w-2 bg-fg/25 hover:bg-fg/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}
