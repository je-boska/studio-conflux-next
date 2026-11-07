import type { PortableTextBlock } from "@portabletext/react";

export type Project = {
  _id: string;
  title: string;
  body: PortableTextBlock[];
  slug: string;
  videoUrl: string;
  poster: string;
  /** Higher-res poster for tiles larger than one grid cell (getProjects only). */
  posterLarge?: string;
  /** Poster hotspot from Sanity (0–1), used as object-position when cropping. */
  hotspot?: { x: number; y: number } | null;
  /** Tagged in the Studio to render as a tall (two-row) tile. */
  portrait?: boolean;
};
