import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "#0B4A3A",
          color: "#F7F2E8",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "-0.05em",
        }}
      >
        SC
      </div>
    ),
    size
  );
}