import glob from "fast-glob";
import path from "path";
import { fileURLToPath } from "url";

export const root = path.join(fileURLToPath(import.meta.url), "..");

export const files = glob.sync("**/*.{md,mdx}", {
  ignore: ["node_modules"],
  cwd: root,
});
