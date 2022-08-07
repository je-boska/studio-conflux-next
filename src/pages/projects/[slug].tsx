import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React from 'react';
import { getProjectPaths, getSingleProject } from '../../queries/projects';
import BlockContent from '@sanity/block-content-to-react';
import { ProjectType } from '../../types/shared';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function Project({
  project: { title, body, videoUrl, poster },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className='text-white'>
        <Link href='/' scroll={false}>
          <h1 className='cursor-pointer'>Home</h1>
        </Link>
        <h1>{title}</h1>
        {body ? <BlockContent blocks={body} /> : null}
        <video src={videoUrl} poster={poster} />
      </div>
    </Layout>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const project: ProjectType = await getSingleProject(
    context!.params!.slug as string
  );
  return {
    props: { project },
    revalidate: 60 * 60,
  };
}

export async function getStaticPaths() {
  const paths = await getProjectPaths();

  return { paths, fallback: 'blocking' };
}
