import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 84,
          background: "linear-gradient(135deg, #f43f5e, #8b5cf6)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: 40,
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
          boxShadow: "0 10px 25px rgba(244, 63, 94, 0.5)",
        }}
      >
        SP
      </div>
    ),
    {
      ...size,
    }
  );
}
