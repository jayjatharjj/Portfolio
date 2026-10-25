import type { NextConfig } from "next";

// The site is served from https://<user>.github.io/<repo>/ on GitHub Pages,
// so CI sets NEXT_PUBLIC_BASE_PATH=/<repo>. Locally it stays empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
