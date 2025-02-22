import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  distDir: "out", // Carpeta donde se guardará el build
  images: { unoptimized: true }, // Deshabilita optimización de imágenes (Next.js usa una CDN propia)
};

export default nextConfig;
