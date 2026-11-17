"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

export type Step = { title: string; text: string };

/** Numaralı adımlar; aralarındaki bağlantı çizgileri sayfa kaydırıldıkça sırayla dolar. */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <ol
      ref={ref}
      className={cn("grid", steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}
    >
      {steps.map((step, i) => (
        <StepItem key={step.title} step={step} index={i} count={steps.length} progress={progress} />
      ))}
    </ol>
  );
}

function StepItem({
  step,
  index,
  count,
  progress,
}: {
  step: Step;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const last = index === count - 1;
  const segments = Math.max(1, count - 1);
  // Her çizgi parçası, toplam ilerlemenin kendi dilimine karşılık gelir.
  const fill = useTransform(progress, [index / segments, (index + 1) / segments], [0, 1], {
    clamp: true,
  });

  return (
    <motion.li
      data-reveal
      className="flex gap-5 lg:block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex flex-col items-center lg:flex-row">
        <span className="grid size-12 shrink-0 place-items-center rounded-full border border-primary/50 bg-primary/10 font-display text-sm font-bold text-link">
          {String(index + 1).padStart(2, "0")}
        </span>
        {!last && (
          <>
            <span aria-hidden className="my-2 w-px flex-1 bg-line lg:hidden">
              <motion.span
                className="block size-full origin-top bg-gradient-to-b from-primary to-cyan"
                style={{ scaleY: fill }}
              />
            </span>
            <span aria-hidden className="mx-3 hidden h-px flex-1 bg-line lg:block">
              <motion.span
                className="block size-full origin-left bg-gradient-to-r from-primary to-cyan"
                style={{ scaleX: fill }}
              />
            </span>
          </>
        )}
      </div>
      <div className={cn("pt-2 lg:pt-6 lg:pr-8 lg:pb-0", last ? "pb-0" : "pb-9")}>
        <h3 className="text-xl font-semibold">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
      </div>
    </motion.li>
  );
}
