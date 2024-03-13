import { fileURLToPath } from "url";
import { withSentryConfig } from "@sentry/nextjs";
import _jiti from "jiti";

const jiti = _jiti(fileURLToPath(import.meta.url));

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
jiti("./src/env");
jiti("@niceai/auth/env");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@niceai/api",
    "@niceai/trpc",
    "@niceai/auth",
    "@niceai/db",
    "@niceai/ui",
    "@niceai/validators",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

const plugins = [];

if (process.env.SENTRY_AUTH_TOKEN) {
  plugins.push((config) =>
    withSentryConfig(
      config,
      {
        silent: true,
        org: "niceai",
        project: "niceai",
        dryRun: process.env.NODE_ENV === "development",
      },
      {
        // For all available options, see:
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,
        // Transpiles SDK to be compatible with IE11 (increases bundle size)
        transpileClientSDK: true,
        // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
        // tunnelRoute: "/monitoring",
        // Hides source maps from generated client bundles
        hideSourceMaps: true,
        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,
        // Enables automatic instrumentation of Vercel Cron Monitors.
        // See the following for more information:
        // https://docs.sentry.io/product/crons/
        // https://vercel.com/docs/cron-jobs
        automaticVercelMonitors: true,
      },
    ),
  );
}

export default plugins.reduce((acc, next) => next(acc), nextConfig);
