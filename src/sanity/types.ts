import type { PortableTextBlock } from "@portabletext/react";

export type Project = {
  _id: string;
  title: string;
  body: PortableTextBlock[];
  slug: string;
  videoUrl: string;
  poster: string;
};
