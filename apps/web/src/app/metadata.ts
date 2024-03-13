import type { Metadata } from "next";

import { isProd } from "@niceai/core";

import meta from "~/config/meta";

const { title, description } = meta;

const metadata: Metadata = {
  title: {
    default: title,
    template: `%s · ${title}`,
  },
  manifest: !isProd ? undefined : "/manifest.json",
  description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  appleWebApp: {
    statusBarStyle: "black-translucent",
    title,
  },
};

export default metadata;
