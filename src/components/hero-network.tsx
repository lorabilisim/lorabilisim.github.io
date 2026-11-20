"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  r: number;
  gateway: boolean;
  /** Görsel derinlik: 1 en önde, öndeki düğümler daha belirgin çizilir. */
  depth: number;
};

type Palette = { link: string; node: string; gateway: string; linkAlpha: number };

const DARK: Palette = {
  link: "61,131,255",
  node: "147,187,255",
  gateway: "34,211,238",
  linkAlpha: 0.36,
};
const LIGHT: Palette = {
  link: "37,99,235",
  node: "37,99,235",
  gateway: "8,145,178",
  linkAlpha: 0.3,
};

const GATEWAY_SPOTS = [
  [0.66, 0.3],
  [0.86, 0.64],
  [0.46, 0.74],
  [0.2, 0.24],
] as const;

/** Ağ geçitlerinin çevresindeki sabit sinyal halkaları (0 = merkez, 1 = en dış). */
const GATEWAY_RINGS = [0.2, 0.55];

/**
 * Hero arka planı: LoRaWAN ağını andıran durağan bir çizim. Hareket etmez ve imlece
 * tepki vermez; yalnızca sahnenin boyutu ya da tema değiştiğinde yeniden çizilir.
 */
export function HeroNetwork({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let palette = document.documentElement.dataset.theme === "light" ? LIGHT : DARK;

    const linkDist = () => Math.min(165, Math.max(110, w / 8));

    function seed() {
      const count = Math.round(Math.min(84, Math.max(26, (w * h) / 15500)));
      const gateways = w < 640 ? 2 : 4;
      nodes = Array.from({ length: count }, (_, i) => {
        const gateway = i < gateways;
        return {
          x: gateway ? GATEWAY_SPOTS[i][0] * w : Math.random() * w,
          y: gateway ? GATEWAY_SPOTS[i][1] * h : Math.random() * h,
          r: gateway ? 4 : 1.2 + Math.random() * 1.4,
          gateway,
          depth: gateway ? 1 : 0.35 + Math.random() * 0.65,
        };
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const maxDist = linkDist();

      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d > maxDist) continue;
          ctx!.strokeStyle = `rgba(${palette.link},${(1 - d / maxDist) * palette.linkAlpha})`;
          ctx!.beginPath();
          ctx!.moveTo(nodes[i].x, nodes[i].y);
          ctx!.lineTo(nodes[j].x, nodes[j].y);
          ctx!.stroke();
        }
      }

      for (const n of nodes) {
        if (n.gateway) {
          ctx!.lineWidth = 1.2;
          for (const p of GATEWAY_RINGS) {
            ctx!.strokeStyle = `rgba(${palette.gateway},${(1 - p) * 0.5})`;
            ctx!.beginPath();
            ctx!.arc(n.x, n.y, 8 + p * 150, 0, Math.PI * 2);
            ctx!.stroke();
          }
          ctx!.fillStyle = `rgba(${palette.gateway},0.18)`;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, 11, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.fillStyle = `rgba(${palette.gateway},1)`;
        } else {
          ctx!.fillStyle = `rgba(${palette.node},${Math.min(1, 0.4 + 0.5 * n.depth)})`;
        }
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const hadNodes = nodes.length > 0;
      const prevW = w;
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Yalnızca genişlik belirgin değiştiğinde yeniden dağıt; mobilde adres çubuğu
      // gizlenip görünürken çizim baştan değişmesin.
      if (!hadNodes || Math.abs(prevW - w) > 80) seed();
      draw();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      palette = document.documentElement.dataset.theme === "light" ? LIGHT : DARK;
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    resize();

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
