import Head from 'next/head';
import { ReactNode } from 'react';

export default function Meta({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) {
  const metaTitle = `Studio Conflux | ${title}`;
  return (
    <Head>
      <title>{metaTitle}</title>
      <meta
        name='description'
        content='Sound Design, Composition & Music Production'
      />
      <meta
        name='keywords'
        content='Sound Design, Composition, Music Production, Advertising, Film, Scoring'
      />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      {children}
    </Head>
  );
}
