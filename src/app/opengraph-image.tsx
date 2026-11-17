import { ImageResponse } from "next/og";

export const alt = "LoraLabs — Akademik Vizyon, İleri Teknoloji";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Bağlantı paylaşıldığında görünen önizleme görseli. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#f8fafc",
          background:
            "radial-gradient(circle at 85% 15%, rgba(61,131,255,0.45), transparent 50%), radial-gradient(circle at 10% 100%, rgba(124,58,237,0.4), transparent 50%), #020617",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 100 100" fill="none">
            <path
              d="M20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50M35 50C35 41.7157 41.7157 35 50 35C58.2843 35 65 41.7157 65 50"
              stroke="#3b9bf6"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <rect x="45" y="45" width="10" height="35" rx="5" fill="#22d3ee" />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 700 }}>LoraLabs</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#7fb0ff" }}>
            TEKNOLOJİ AR-GE MERKEZİ
          </div>
          <div style={{ marginTop: 20, fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>
            Akademik Vizyon,
          </div>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05, color: "#22d3ee" }}>
            İleri Teknoloji
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#94a3b8" }}>
          Yapay Zekâ · Tıbbi Bilişim · IoT & LoRaWAN · Otonom Sistemler
        </div>
      </div>
    ),
    size,
  );
}
