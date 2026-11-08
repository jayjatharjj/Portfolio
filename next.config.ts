import type { NextConfig } from "next";

// The site is served from the root of its custom domain, so the base path is empty.
// Serving from https://<user>.github.io/<repo>/ instead would need NEXT_PUBLIC_BASE_PATH=/<repo>.
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
