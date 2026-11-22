import { ImageResponse } from "next/og";

export const alt =
  "RBM Web Solutions — websites that turn visitors into enquiries";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function WebSolutionsOpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(circle at 90% 0%, rgba(20,184,166,0.28), transparent 42%), linear-gradient(135deg, #061530 0%, #0a1f44 62%, #12306b 100%)",
        padding: "68px",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 20,
            background: "#0a1f44",
            border: "2px solid rgba(45,212,191,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#2dd4bf",
            fontSize: 34,
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
          <span style={{ fontSize: 34, fontWeight: 700 }}>
            RBM Web Solutions
          </span>
          <span
            style={{
              fontSize: 16,
              color: "#99f6e4",
              letterSpacing: 4,
              marginTop: 7,
            }}
          >
            BY RBM TUITION · DELHI NCR
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 1050,
          }}
        >
          Websites that turn visitors into enquiries.
        </span>
        <span
          style={{
            marginTop: 24,
            fontSize: 25,
            color: "#dce8fb",
          }}
        >
          Coaching centres · Schools · Local businesses · Startups
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.16)",
          paddingTop: 24,
          fontSize: 22,
          color: "#bfd4f7",
        }}
      >
        <span>rbmtuition.com/web-solutions</span>
        <span>Fixed packages from ₹9,999</span>
      </div>
    </div>,
    { ...size },
  );
}
