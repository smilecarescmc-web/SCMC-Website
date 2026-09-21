import { ImageResponse } from "next/og";

export const alt = "Smile Care Medical Center — Ras Al Khaimah";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#F7F6F2",
          color: "#17372E",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 999,
            left: -160,
            top: -180,
            background: "rgba(174, 215, 197, 0.52)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 480,
            height: 480,
            borderRadius: 999,
            right: -140,
            bottom: -170,
            background: "rgba(201, 222, 235, 0.58)",
          }}
        />

        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "72px 82px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 19,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#44665B",
            }}
          >
            RAS AL KHAIMAH · UAE · SINCE 2007
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
            <div
              style={{
                fontSize: 59,
                lineHeight: 1,
                letterSpacing: "-0.045em",
                fontWeight: 700,
              }}
            >
              Smile Care
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 31,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                fontWeight: 400,
              }}
            >
              Medical Center
            </div>
            <div
              style={{
                marginTop: 26,
                fontSize: 18,
                color: "#526F66",
              }}
            >
              Premier Dental & Aesthetic Clinic · MOHAP License No. 5080
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 24,
              fontSize: 15,
              color: "#526F66",
            }}
          >
            <span>+971 7 228 2080</span>
            <span>•</span>
            <span>+971 54 321 7712</span>
            <span>•</span>
            <span>Al Nakheel, Ras Al Khaimah</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}