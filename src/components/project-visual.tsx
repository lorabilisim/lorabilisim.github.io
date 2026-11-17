import type { ProjectVisual as VisualKind } from "@/lib/projects";
import { cn } from "@/lib/cn";

/**
 * Projeleri stok fotoğraf yerine anlatan, hareketli SVG çizimleri.
 * Renkler tema değişkenlerinden gelir; animasyon sınıfları globals.css'te tanımlı.
 */
export function ProjectVisual({ kind, className }: { kind: VisualKind; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative aspect-[400/260] overflow-hidden rounded-lg border border-line bg-surface",
        className,
      )}
    >
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_70%)]" />
      <svg viewBox="0 0 400 260" className="relative size-full" fill="none">
        {kind === "mediseg" && <MediSeg />}
        {kind === "hafiza" && <Hafiza />}
        {kind === "skylink" && <SkyLink />}
      </svg>
    </div>
  );
}

function MediSeg() {
  return (
    <>
      <defs>
        <radialGradient id="ms-slice" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="var(--fg)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--fg)" stopOpacity="0.03" />
        </radialGradient>
        <linearGradient id="ms-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.28" />
        </linearGradient>
        <clipPath id="ms-clip">
          <ellipse cx="200" cy="130" rx="92" ry="106" />
        </clipPath>
      </defs>

      {/* Kesit */}
      <ellipse cx="200" cy="130" rx="92" ry="106" fill="url(#ms-slice)" stroke="var(--fg)" strokeOpacity="0.3" />
      <ellipse cx="200" cy="130" rx="79" ry="93" stroke="var(--fg)" strokeOpacity="0.16" />
      <g stroke="var(--fg)" strokeOpacity="0.22" strokeLinecap="round">
        <path d="M200 40V220" />
        <path d="M166 62c-22 16-14 34-2 46s-22 30-8 52 20 22 14 40" />
        <path d="M234 62c22 16 14 34 2 46s22 30 8 52-20 22-14 40" />
        <path d="M140 104c14 2 20 12 34 10M260 152c-14-2-20 10-34 8M146 164c12-6 22 2 32-4" />
      </g>

      {/* Tarama çizgisi */}
      <g clipPath="url(#ms-clip)">
        <g className="anim-scan">
          <rect x="100" y="34" width="200" height="24" fill="url(#ms-scan)" />
          <rect x="100" y="57" width="200" height="1.5" fill="var(--cyan)" />
        </g>
      </g>

      {/* Segmentasyon sonucu */}
      <path
        d="M224 96c10-12 32-10 40 4s2 32-12 38-32-4-34-20c-1-8 1-16 6-22Z"
        fill="var(--accent)"
        fillOpacity="0.3"
      />
      <path
        className="anim-draw"
        pathLength={1}
        d="M224 96c10-12 32-10 40 4s2 32-12 38-32-4-34-20c-1-8 1-16 6-22Z"
        stroke="var(--cyan)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M264 106h44" stroke="var(--cyan)" strokeOpacity="0.7" strokeDasharray="2 3" />
      <g>
        <rect x="308" y="94" width="76" height="24" rx="6" fill="var(--bg)" stroke="var(--cyan)" strokeOpacity="0.5" />
        <circle className="anim-pulse" cx="319" cy="106" r="3" fill="var(--cyan)" />
        <text x="328" y="110" fontSize="9.5" fontWeight="600" fill="var(--fg)" letterSpacing="0.6">
          BÖLGE 01
        </text>
      </g>

      {/* Köşe işaretleri ve etiketler */}
      <g stroke="var(--link)" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 34V20h14M378 34V20h-14M22 226v14h14M378 226v14h-14" />
      </g>
      <text x="26" y="52" fontSize="9" fill="var(--muted)" letterSpacing="1">
        MR · AKSİYEL
      </text>
      <text x="26" y="222" fontSize="9" fill="var(--muted)" letterSpacing="1">
        SEGMENTASYON
      </text>
    </>
  );
}

function Hafiza() {
  const docs = [
    { x: 30, y: 58 },
    { x: 30, y: 112 },
    { x: 30, y: 166 },
  ];
  return (
    <>
      {/* Dokümanlar */}
      {docs.map((d, i) => (
        <g key={i}>
          <rect x={d.x} y={d.y} width="62" height="40" rx="6" fill="var(--bg)" stroke="var(--fg)" strokeOpacity="0.25" />
          <path
            d={`M${d.x + 10} ${d.y + 12}h28M${d.x + 10} ${d.y + 20}h42M${d.x + 10} ${d.y + 28}h34`}
            stroke="var(--fg)"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="anim-dash"
            d={`M${d.x + 62} ${d.y + 20}C140 ${d.y + 20} 130 130 170 130`}
            stroke="var(--primary)"
            strokeWidth="1.5"
            style={{ animationDelay: `${-i * 0.5}s` }}
          />
        </g>
      ))}

      {/* Model çekirdeği */}
      <circle className="anim-ring" cx="200" cy="130" r="56" stroke="var(--primary)" strokeWidth="1.2" />
      <circle
        className="anim-ring"
        cx="200"
        cy="130"
        r="56"
        stroke="var(--primary)"
        strokeWidth="1.2"
        style={{ animationDelay: "-1.5s" }}
      />
      <rect x="170" y="100" width="60" height="60" rx="16" fill="var(--bg)" stroke="var(--primary)" strokeWidth="1.5" />
      <rect x="180" y="110" width="40" height="40" rx="10" fill="var(--primary)" fillOpacity="0.18" />
      <text x="200" y="134.5" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--fg)" letterSpacing="1">
        SLM
      </text>
      <g stroke="var(--primary)" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round">
        <path d="M185 100v-8M200 100v-8M215 100v-8M185 168v-8M200 168v-8M215 168v-8" />
      </g>

      {/* Yanıt akışı */}
      <path className="anim-dash" d="M230 130h36" stroke="var(--cyan)" strokeWidth="1.5" />

      {/* Sohbet */}
      <g className="anim-bubble">
        <rect x="292" y="62" width="84" height="30" rx="10" fill="var(--primary)" />
        <path d="M304 73h46M304 81h30" stroke="#fff" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="anim-bubble" style={{ animationDelay: "1.1s" }}>
        <rect x="270" y="104" width="106" height="62" rx="10" fill="var(--bg)" stroke="var(--fg)" strokeOpacity="0.25" />
        <path
          d="M282 118h76M282 128h82M282 138h54"
          stroke="var(--fg)"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="282" y="148" width="46" height="11" rx="5.5" fill="var(--cyan)" fillOpacity="0.2" stroke="var(--cyan)" strokeOpacity="0.6" />
        <text x="305" y="156.2" textAnchor="middle" fontSize="7" fontWeight="600" fill="var(--fg)" letterSpacing="0.5">
          KAYNAK
        </text>
      </g>

      <text x="30" y="40" fontSize="9" fill="var(--muted)" letterSpacing="1">
        DOKÜMANLAR
      </text>
      <text x="200" y="196" textAnchor="middle" fontSize="9" fill="var(--muted)" letterSpacing="1">
        PRIVATE CLOUD
      </text>
      <text x="376" y="40" textAnchor="end" fontSize="9" fill="var(--muted)" letterSpacing="1">
        YANIT
      </text>
      <rect x="150" y="76" width="100" height="130" rx="18" stroke="var(--fg)" strokeOpacity="0.14" strokeDasharray="4 5" />
    </>
  );
}

function SkyLink() {
  return (
    <>
      {/* Arazi */}
      <path
        d="M0 214l46-34 34 20 52-52 44 40 38-26 50 44 44-30 44 26 48-18v76H0Z"
        fill="var(--fg)"
        fillOpacity="0.05"
      />
      <path
        d="M0 232l60-26 50 16 64-34 58 30 62-22 54 26 52-14v52H0Z"
        fill="var(--fg)"
        fillOpacity="0.07"
        stroke="var(--fg)"
        strokeOpacity="0.16"
      />

      {/* Sahadaki sensörler */}
      {[
        [78, 214],
        [148, 206],
        [214, 220],
      ].map(([x, y], i) => (
        <g key={i}>
          <path
            className="anim-dash"
            d={`M${x} ${y}L132 104`}
            stroke="var(--primary)"
            strokeOpacity="0.7"
            style={{ animationDelay: `${-i * 0.4}s` }}
          />
          <circle className="anim-pulse" cx={x} cy={y} r="4" fill="var(--primary)" style={{ animationDelay: `${i * 0.5}s` }} />
          <circle cx={x} cy={y} r="8" stroke="var(--primary)" strokeOpacity="0.35" />
        </g>
      ))}

      {/* Dron → ağ geçidi bağlantısı */}
      <path className="anim-dash" d="M150 92C210 60 268 70 318 104" stroke="var(--cyan)" strokeWidth="1.6" />
      <g>
        <rect x="196" y="46" width="66" height="20" rx="10" fill="var(--bg)" stroke="var(--cyan)" strokeOpacity="0.5" />
        <text x="229" y="59.5" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--fg)" letterSpacing="0.6">
          LoRaWAN
        </text>
      </g>

      {/* Ağ geçidi */}
      <g>
        <circle className="anim-ring" cx="322" cy="104" r="46" stroke="var(--cyan)" strokeWidth="1.2" />
        <circle
          className="anim-ring"
          cx="322"
          cy="104"
          r="46"
          stroke="var(--cyan)"
          strokeWidth="1.2"
          style={{ animationDelay: "-1.5s" }}
        />
        <path d="M322 104v96M306 200l16-62 16 62M311 180h22M314 162h16" stroke="var(--fg)" strokeOpacity="0.6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="322" cy="104" r="5" fill="var(--cyan)" />
      </g>

      {/* Dron */}
      <g className="anim-float">
        <path d="M108 86l24 10 24-10M108 86v-6M156 86v-6" stroke="var(--fg)" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" />
        <ellipse className="anim-pulse" cx="108" cy="78" rx="17" ry="2.6" fill="var(--fg)" fillOpacity="0.55" style={{ animationDuration: "0.35s" }} />
        <ellipse className="anim-pulse" cx="156" cy="78" rx="17" ry="2.6" fill="var(--fg)" fillOpacity="0.55" style={{ animationDuration: "0.35s", animationDelay: "0.15s" }} />
        <rect x="120" y="90" width="24" height="14" rx="5" fill="var(--bg)" stroke="var(--fg)" strokeOpacity="0.8" strokeWidth="1.6" />
        <circle cx="132" cy="97" r="3" fill="var(--cyan)" />
        <path d="M126 104l-4 8M138 104l4 8" stroke="var(--fg)" strokeOpacity="0.6" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* GSM yok etiketi */}
      <g>
        <rect x="22" y="22" width="78" height="22" rx="11" fill="var(--bg)" stroke="var(--fg)" strokeOpacity="0.25" />
        <path d="M34 37v-3M39 37v-6M44 37v-9" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" />
        <path d="M31 27l16 12" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" />
        <text x="54" y="36.5" fontSize="9" fontWeight="600" fill="var(--muted)" letterSpacing="0.6">
          GSM YOK
        </text>
      </g>
    </>
  );
}
