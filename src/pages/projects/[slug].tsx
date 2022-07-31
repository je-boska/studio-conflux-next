import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React from 'react';
import { getProjectPaths, getSingleProject } from '../../queries/projects';

export default function Project({
  project: { title, videoUrl, poster },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className='p-8'>
      <h1 className='cursor-pointer'>{title}</h1>
      <video src={videoUrl} poster={poster} />
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const project: Project = await getSingleProject(
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
