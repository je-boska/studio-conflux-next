import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React from 'react';
import { getProjectPaths, getSingleProject } from '../../queries/projects';
import BlockContent from '@sanity/block-content-to-react';
import { ProjectType } from '../../types/shared';

export default function Project({
  project: { title, body, videoUrl, poster },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className='p-8'>
      <h1>{title}</h1>
      {body ? <BlockContent blocks={body} /> : null}
      <video src={videoUrl} poster={poster} />
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const project: ProjectType = await getSingleProject(
    context!.params!.slug as string
  );
  return {
    props: { project },
  };
}

export async function getStaticPaths() {
  const paths = await getProjectPaths();

  return { paths, fallback: 'blocking' };
}
