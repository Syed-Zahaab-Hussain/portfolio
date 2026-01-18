import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#050505",
          color: "white",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inter, Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "80px",
          width: "100%",
        }}
      >
        <div style={{ color: "#a78bfa", fontSize: 34, marginBottom: 24 }}>
          Full Stack Developer
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, textAlign: "center" }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            color: "#cbd5e1",
            fontSize: 30,
            lineHeight: 1.4,
            marginTop: 32,
            maxWidth: 900,
            textAlign: "center",
          }}
        >
          React, Next.js, Node.js, TypeScript, and scalable web applications.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
