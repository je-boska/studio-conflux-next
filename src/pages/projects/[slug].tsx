import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React, { useRef, useState } from 'react';
import { getProjectPaths, getSingleProject } from '../../queries/projects';
import BlockContent from '@sanity/block-content-to-react';
import { ProjectType } from '../../types/shared';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function Project({
  project: { title, body, videoUrl, poster },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isPlaying, setIsPlaying] = useState(true);
  const video = useRef<HTMLVideoElement | null>(null);

  return (
    <Layout>
      <div className='absolute top-4 left-4 z-10'>
        <Link href='/' scroll={false}>
          <h3 className='cursor-pointer text-2xl'>←</h3>
        </Link>
      </div>
      <div className='relative h-screen overflow-hidden'>
        <div className='flex flex-col w-full items-center h-20 mt-4'>
          <h1 className='text-2xl uppercase tracking-[0.7rem]'>{title}</h1>
          <div className='opacity-70'>
            {body ? <BlockContent blocks={body} /> : null}
          </div>
        </div>
        <video
          ref={video}
          onClick={() => {
            isPlaying ? video.current?.pause() : video.current?.play();
            setIsPlaying(!isPlaying);
          }}
          className='video absolute top-1/2 -translate-y-1/2 w-full max-h-[60vh] cursor-pointer'
          src={videoUrl}
          poster={poster}
          autoPlay
        />
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
