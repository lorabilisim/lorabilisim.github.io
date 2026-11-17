"use client";

import { MousePointerClick } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Node = {
  x: number;
  y: number;
  /** Anlık hız; imleç ve sinyal dalgaları bunu değiştirir. */
  vx: number;
  vy: number;
  /** Düğümün kendi sürüklenme hızı; anlık hız zamanla buna geri döner. */
  bvx: number;
  bvy: number;
  r: number;
  gateway: boolean;
  phase: number;
  /** Sinyal dalgası çarptığında 1 olur, sonra söner. */
  glow: number;
  /** Paralaks derinliği: 1 en önde. */
  depth: number;
};

/** `to === TO_POINTER` ise paket imlece doğru gider. */
type Packet = { from: number; to: number; t: number; speed: number; hops: number };

type Ripple = { x: number; y: number; r: number; max: number };

type Palette = { link: string; node: string; gateway: string; packet: string; linkAlpha: number };

const DARK: Palette = {
  link: "61,131,255",
  node: "147,187,255",
  gateway: "34,211,238",
  packet: "226,240,255",
  linkAlpha: 0.36,
};
const LIGHT: Palette = {
  link: "37,99,235",
  node: "37,99,235",
  gateway: "8,145,178",
  packet: "124,58,237",
  linkAlpha: 0.3,
};

const GATEWAY_SPOTS = [
  [0.66, 0.3],
  [0.86, 0.64],
  [0.46, 0.74],
  [0.2, 0.24],
] as const;

const TO_POINTER = -1;
const POINTER_RADIUS = 230;
const PARALLAX = 38;

/**
 * Hero arka planı: LoRaWAN ağını andıran, ziyaretçiye tepki veren bir sahne.
 * - İmleç bir verici gibi davranır: çevresindeki düğümleri çeker, yörüngeye sokar,
 *   onlara bağlanır ve onlardan veri paketi alır. Hızlı hareket düğümleri sürükler.
 * - Tıklama/dokunma bir sinyal dalgası yayar; dalganın çarptığı düğümler parlar,
 *   savrulur ve ağ geçitlerine paket gönderir.
 * - İmleç konumuna göre sahne derinlikli biçimde kayar (paralaks).
 */
export function HeroNetwork({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, vx: 0, vy: 0, active: false, lastT: 0, phase: 0, glow: 0 };
    const parallax = { x: 0, y: 0 };
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let ripples: Ripple[] = [];
    let palette = document.documentElement.dataset.theme === "light" ? LIGHT : DARK;
    let raf = 0;
    let last = 0;
    let spawnTimer = 0;
    let pointerSpawnTimer = 0;
    let inView = true;

    const linkDist = () => Math.min(165, Math.max(110, w / 8));

    function seed() {
      const count = Math.round(Math.min(84, Math.max(26, (w * h) / 15500)));
      const gateways = w < 640 ? 2 : 4;
      nodes = Array.from({ length: count }, (_, i) => {
        const gateway = i < gateways;
        const speed = gateway ? 4 : 8 + Math.random() * 14;
        const angle = Math.random() * Math.PI * 2;
        const bvx = Math.cos(angle) * speed;
        const bvy = Math.sin(angle) * speed;
        return {
          x: gateway ? GATEWAY_SPOTS[i][0] * w : Math.random() * w,
          y: gateway ? GATEWAY_SPOTS[i][1] * h : Math.random() * h,
          vx: bvx,
          vy: bvy,
          bvx,
          bvy,
          r: gateway ? 4 : 1.2 + Math.random() * 1.4,
          gateway,
          phase: Math.random(),
          glow: 0,
          depth: gateway ? 1 : 0.35 + Math.random() * 0.65,
        };
      });
      packets = [];
      ripples = [];
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
      // gizlenip görünürken sahne baştan başlamasın.
      if (!hadNodes || Math.abs(prevW - w) > 80) seed();
      if (reduceMotion || !raf) draw();
    }

    /** Komşular arasından seçer; ağ geçitlerini tercih eder ki paketler onlara aksın. */
    function pickNeighbour(index: number, exclude: number, maxDist: number) {
      const origin = nodes[index];
      let best = -1;
      let bestScore = -1;
      for (let j = 0; j < nodes.length; j++) {
        if (j === index || j === exclude) continue;
        const d = Math.hypot(nodes[j].x - origin.x, nodes[j].y - origin.y);
        if (d > maxDist) continue;
        const score = Math.random() + (nodes[j].gateway ? 0.8 : 0);
        if (score > bestScore) {
          bestScore = score;
          best = j;
        }
      }
      return best;
    }

    function update(dt: number) {
      const maxDist = linkDist();
      const relax = 1 - Math.exp(-dt * 1.4);

      // Paralaks hedefi imleç konumu; imleç yokken merkeze döner.
      const targetX = pointer.active ? pointer.x / w - 0.5 : 0;
      const targetY = pointer.active ? pointer.y / h - 0.5 : 0;
      const ease = Math.min(1, dt * 3);
      parallax.x += (targetX - parallax.x) * ease;
      parallax.y += (targetY - parallax.y) * ease;

      const decay = Math.exp(-dt * 6);
      pointer.vx *= decay;
      pointer.vy *= decay;
      pointer.phase = (pointer.phase + dt / 1.6) % 1;
      pointer.glow = Math.max(0, pointer.glow - dt * 2.5);

      for (const n of nodes) {
        if (pointer.active && !n.gateway) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < POINTER_RADIUS && d > 0.001) {
            const f = 1 - d / POINTER_RADIUS;
            const ux = dx / d;
            const uy = dy / d;
            // Uzaktan çekim, çok yakında itme: düğümler imlecin çevresinde toplanır.
            const pull = d > 70 ? 240 * f : -320 * (1 - d / 70);
            // Teğet kuvvet düğümleri imlecin etrafında döndürür.
            n.vx += (ux * pull - uy * 90 * f + pointer.vx * 0.6 * f) * dt;
            n.vy += (uy * pull + ux * 90 * f + pointer.vy * 0.6 * f) * dt;
          }
        }

        n.vx += (n.bvx - n.vx) * relax;
        n.vy += (n.bvy - n.vy) * relax;
        const speed = Math.hypot(n.vx, n.vy);
        if (speed > 260) {
          n.vx = (n.vx / speed) * 260;
          n.vy = (n.vy / speed) * 260;
        }

        const margin = 30;
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -margin) n.x = w + margin;
        else if (n.x > w + margin) n.x = -margin;
        if (n.y < -margin) n.y = h + margin;
        else if (n.y > h + margin) n.y = -margin;

        if (n.gateway) n.phase = (n.phase + dt / 3.4) % 1;
        n.glow = Math.max(0, n.glow - dt * 1.6);
      }

      // Sinyal dalgaları: cephe bir düğümün üzerinden geçtiği anda onu tetikler.
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        const prev = ripple.r;
        ripple.r += 460 * dt;
        const strength = 1 - ripple.r / ripple.max;
        for (let j = 0; j < nodes.length; j++) {
          const n = nodes[j];
          const dx = n.x - ripple.x;
          const dy = n.y - ripple.y;
          const d = Math.hypot(dx, dy);
          if (d < prev || d >= ripple.r) continue;
          n.glow = 1;
          if (n.gateway) {
            n.phase = 0; // ağ geçidi dalgaya kendi halkasıyla yanıt verir
          } else if (d > 0.001) {
            n.vx += (dx / d) * 150 * strength;
            n.vy += (dy / d) * 150 * strength;
            if (packets.length < 44 && Math.random() < 0.55) {
              const to = pickNeighbour(j, -1, maxDist);
              if (to >= 0) packets.push({ from: j, to, t: 0, speed: 1.4 + Math.random(), hops: 0 });
            }
          }
        }
        if (ripple.r > ripple.max) ripples.splice(i, 1);
      }

      // Ağın kendi trafiği
      spawnTimer -= dt;
      if (spawnTimer <= 0 && packets.length < 26) {
        spawnTimer = 0.16 + Math.random() * 0.22;
        const from = Math.floor(Math.random() * nodes.length);
        const to = pickNeighbour(from, -1, maxDist);
        if (to >= 0) packets.push({ from, to, t: 0, speed: 0.9 + Math.random() * 0.9, hops: 0 });
      }

      // İmlece bağlı düğümler ona veri gönderir.
      pointerSpawnTimer -= dt;
      if (pointer.active && pointerSpawnTimer <= 0) {
        pointerSpawnTimer = 0.09 + Math.random() * 0.08;
        const near: number[] = [];
        for (let j = 0; j < nodes.length; j++) {
          const d = Math.hypot(nodes[j].x - pointer.x, nodes[j].y - pointer.y);
          if (d < POINTER_RADIUS * 0.85 && d > 24) near.push(j);
        }
        if (near.length > 0 && packets.length < 44) {
          const from = near[Math.floor(Math.random() * near.length)];
          packets.push({ from, to: TO_POINTER, t: 0, speed: 1.8 + Math.random(), hops: 0 });
        }
      }

      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed * dt;
        if (p.to === TO_POINTER) {
          if (!pointer.active) packets.splice(i, 1);
          else if (p.t >= 1) {
            pointer.glow = 1;
            packets.splice(i, 1);
          }
          continue;
        }
        const a = nodes[p.from];
        const b = nodes[p.to];
        if (Math.hypot(a.x - b.x, a.y - b.y) > maxDist * 1.25) {
          packets.splice(i, 1);
          continue;
        }
        if (p.t >= 1) {
          if (b.gateway) b.glow = Math.max(b.glow, 0.6);
          const next = b.gateway || p.hops >= 4 ? -1 : pickNeighbour(p.to, p.from, maxDist);
          if (next >= 0) {
            p.from = p.to;
            p.to = next;
            p.t = 0;
            p.hops++;
          } else {
            packets.splice(i, 1);
          }
        }
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const maxDist = linkDist();

      // Çizim konumu = fiziksel konum + derinliğe bağlı paralaks kayması.
      const px: number[] = [];
      const py: number[] = [];
      for (let i = 0; i < nodes.length; i++) {
        px[i] = nodes[i].x - parallax.x * PARALLAX * nodes[i].depth;
        py[i] = nodes[i].y - parallax.y * PARALLAX * nodes[i].depth;
      }

      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(px[i] - px[j], py[i] - py[j]);
          if (d > maxDist) continue;
          const boost = 1 + 1.6 * Math.max(nodes[i].glow, nodes[j].glow);
          const alpha = Math.min(0.9, (1 - d / maxDist) * palette.linkAlpha * boost);
          ctx!.strokeStyle = `rgba(${palette.link},${alpha})`;
          ctx!.beginPath();
          ctx!.moveTo(px[i], py[i]);
          ctx!.lineTo(px[j], py[j]);
          ctx!.stroke();
        }
      }

      if (pointer.active) {
        // İmlecin çevresindeki ışıma
        const halo = ctx!.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 120);
        halo.addColorStop(0, `rgba(${palette.gateway},${0.16 + pointer.glow * 0.1})`);
        halo.addColorStop(1, `rgba(${palette.gateway},0)`);
        ctx!.fillStyle = halo;
        ctx!.beginPath();
        ctx!.arc(pointer.x, pointer.y, 120, 0, Math.PI * 2);
        ctx!.fill();

        // İmleç ağa bir verici gibi bağlanır.
        for (let i = 0; i < nodes.length; i++) {
          const d = Math.hypot(px[i] - pointer.x, py[i] - pointer.y);
          if (d > POINTER_RADIUS) continue;
          ctx!.strokeStyle = `rgba(${palette.gateway},${(1 - d / POINTER_RADIUS) * 0.6})`;
          ctx!.beginPath();
          ctx!.moveTo(px[i], py[i]);
          ctx!.lineTo(pointer.x, pointer.y);
          ctx!.stroke();
        }

        ctx!.strokeStyle = `rgba(${palette.gateway},${(1 - pointer.phase) * 0.55})`;
        ctx!.lineWidth = 1.2;
        ctx!.beginPath();
        ctx!.arc(pointer.x, pointer.y, 8 + pointer.phase * 48, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.fillStyle = `rgba(${palette.gateway},1)`;
        ctx!.beginPath();
        ctx!.arc(pointer.x, pointer.y, 3 + pointer.glow * 1.5, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (const ripple of ripples) {
        const fade = 1 - ripple.r / ripple.max;
        ctx!.lineWidth = 1.6;
        ctx!.strokeStyle = `rgba(${palette.gateway},${fade * 0.7})`;
        ctx!.beginPath();
        ctx!.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
        ctx!.stroke();
        if (ripple.r > 26) {
          ctx!.lineWidth = 1;
          ctx!.strokeStyle = `rgba(${palette.link},${fade * 0.45})`;
          ctx!.beginPath();
          ctx!.arc(ripple.x, ripple.y, ripple.r - 26, 0, Math.PI * 2);
          ctx!.stroke();
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n.gateway) {
          for (const offset of [0, 0.5]) {
            const p = (n.phase + offset) % 1;
            ctx!.strokeStyle = `rgba(${palette.gateway},${(1 - p) * 0.5})`;
            ctx!.lineWidth = 1.2;
            ctx!.beginPath();
            ctx!.arc(px[i], py[i], 8 + p * 150, 0, Math.PI * 2);
            ctx!.stroke();
          }
          ctx!.fillStyle = `rgba(${palette.gateway},${0.18 + n.glow * 0.25})`;
          ctx!.beginPath();
          ctx!.arc(px[i], py[i], 11 + n.glow * 7, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.fillStyle = `rgba(${palette.gateway},1)`;
        } else {
          if (n.glow > 0.02) {
            ctx!.fillStyle = `rgba(${palette.gateway},${n.glow * 0.3})`;
            ctx!.beginPath();
            ctx!.arc(px[i], py[i], n.r + 9 * n.glow, 0, Math.PI * 2);
            ctx!.fill();
          }
          ctx!.fillStyle = `rgba(${palette.node},${Math.min(1, 0.4 + 0.5 * n.depth + n.glow)})`;
        }
        ctx!.beginPath();
        ctx!.arc(px[i], py[i], n.r * (1 + n.glow * 0.9), 0, Math.PI * 2);
        ctx!.fill();
      }

      for (const p of packets) {
        const toX = p.to === TO_POINTER ? pointer.x : px[p.to];
        const toY = p.to === TO_POINTER ? pointer.y : py[p.to];
        const x = px[p.from] + (toX - px[p.from]) * p.t;
        const y = py[p.from] + (toY - py[p.from]) * p.t;
        ctx!.fillStyle = `rgba(${palette.gateway},0.22)`;
        ctx!.beginPath();
        ctx!.arc(x, y, 5.5, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = `rgba(${palette.packet},1)`;
        ctx!.beginPath();
        ctx!.arc(x, y, 1.9, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      update(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (reduceMotion || raf || !inView || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    /** Olayın sahne içindeki konumu; sahnenin dışındaysa null. */
    function locate(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return x >= 0 && y >= 0 && x <= rect.width && y <= rect.height ? { x, y } : null;
    }

    function onPointerMove(e: PointerEvent) {
      const at = locate(e);
      if (!at) {
        pointer.active = false;
        return;
      }
      const dt = (e.timeStamp - pointer.lastT) / 1000;
      if (pointer.active && dt > 0 && dt < 0.1) {
        // Ani sıçramalar sahneyi dağıtmasın diye hız yumuşatılır.
        pointer.vx += ((at.x - pointer.x) / dt - pointer.vx) * 0.35;
        pointer.vy += ((at.y - pointer.y) / dt - pointer.vy) * 0.35;
      }
      pointer.x = at.x;
      pointer.y = at.y;
      pointer.lastT = e.timeStamp;
      pointer.active = true;
    }

    function onPointerDown(e: PointerEvent) {
      if (reduceMotion) return;
      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest("a, button, input, textarea, select, summary")) return;
      const at = locate(e);
      if (!at) return;
      ripples.push({ x: at.x, y: at.y, r: 0, max: Math.min(680, Math.max(380, Math.max(w, h) * 0.6)) });
      if (ripples.length > 6) ripples.shift();
      pointer.glow = 1;
      setHint(false);
    }

    /** Dokunmatik ekranda parmak kalkınca imleç etkisi sahnede asılı kalmasın. */
    function onPointerEnd(e: PointerEvent) {
      if (e.pointerType !== "mouse") pointer.active = false;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    const onVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    viewObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      palette = document.documentElement.dataset.theme === "light" ? LIGHT : DARK;
      if (!raf) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerEnd, { passive: true });
    window.addEventListener("pointercancel", onPointerEnd, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} aria-hidden className={className} />
      {/* İlk tıklamada kaybolan ipucu; yalnızca fareli ekranlarda gösterilir. */}
      <p
        aria-hidden
        className={cn(
          "pointer-events-none absolute right-6 bottom-8 z-10 hidden items-center gap-2 rounded-md border border-line bg-glass px-3 py-1.5 text-xs text-muted backdrop-blur transition-opacity duration-700 motion-reduce:hidden md:inline-flex",
          !hint && "opacity-0",
        )}
      >
        <MousePointerClick className="size-3.5 text-cyan" />
        Tıklayın, sinyal gönderin
      </p>
    </>
  );
}
