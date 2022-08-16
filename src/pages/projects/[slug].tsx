import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { getProjectPaths, getSingleProject } from '../../queries/projects';
import BlockContent from '@sanity/block-content-to-react';
import { ProjectType } from '../../types/shared';
import Layout from '../../components/Layout';
import Link from 'next/link';
import PlayButton from '../../components/PlayButton';

export default function Project({
  project: { title, body, videoUrl, poster },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isPlaying, setIsPlaying] = useState(true);
  const video = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    isPlaying ? video.current?.play() : video.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (video.current?.paused) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }, []);

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
        <div className='group'>
          <video
            ref={video}
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
            className='video absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 max-h-[60vh] cursor-pointer'
            src={videoUrl}
            poster={poster}
            autoPlay
          />
          <PlayButton
            className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:opacity-0 md:group-hover:opacity-100 transition-opacity'
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </div>
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
