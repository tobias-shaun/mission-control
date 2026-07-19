import { fileURLToPath } from "url";
import { dirname } from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this project — a stray lockfile in the user's home
  // directory otherwise makes Next.js infer the wrong root for build tracing.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  // The design engine is a self-contained client experience; nothing to configure server-side.
};

export default nextConfig;
