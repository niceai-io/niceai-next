import _jiti from "jiti";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const jiti = _jiti(fileURLToPath(import.meta.url));
jiti("./src/env");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  cleanDistDir: true,
  pageExtensions: ["tsx", "ts", "md", "mdx"],
};

export default config;
