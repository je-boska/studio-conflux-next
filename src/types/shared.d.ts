import { BlockContentProps } from '@sanity/block-content-to-react';

export type ProjectType = {
  _id: number;
  title: string;
  body: BlockContentProps;
  slug: string;
  videoUrl: string;
  poster: string;
};

export type CurrentProjectType = {
  title: string;
  slug: string;
};
