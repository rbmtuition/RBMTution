import { ImageResponse } from "next/og";

export const alt = "RBM Tuition — home tuition in Delhi NCR";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "linear-gradient(135deg, #061530 0%, #0a1f44 60%, #12306b 100%)",
        padding: "72px",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 78,
            height: 78,
            borderRadius: 20,
            background: "#0a1f44",
            border: "2px solid rgba(212,160,23,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#d4a017",
            fontSize: 38,
            fontWeight: 700,
          }}
        >
          R
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 24,
          }}
        >
          <span style={{ fontSize: 34, fontWeight: 700 }}>RBM Tuition</span>
          <span
            style={{
              fontSize: 17,
              color: "#93b5ef",
              letterSpacing: 4,
              marginTop: 6,
            }}
          >
            DELHI NCR · HOME &amp; ONLINE
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 66,
            fontWeight: 700,
            lineHeight: 1.12,
            maxWidth: 1000,
          }}
        >
          Home Tuition in Delhi NCR, built around your child.
        </span>
        <span
          style={{
            marginTop: 26,
            fontSize: 25,
            color: "#dce8fb",
          }}
        >
          Verified tutors · Nursery to Class 12 · JEE, NEET &amp; CUET · Free
          demo
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.16)",
          paddingTop: 26,
          fontSize: 22,
          color: "#bfd4f7",
        }}
      >
        <span>rbmtuition.com</span>
        <span>+91 92203 88165</span>
      </div>
    </div>,
    { ...size },
  );
}
