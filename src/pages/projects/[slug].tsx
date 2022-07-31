import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React from 'react';
import { getProjectPaths, getSingleProject } from '../../queries/projects';
import BlockContent from '@sanity/block-content-to-react';
import { ProjectType } from '../../types/shared';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Project({
  project: { title, body, videoUrl, poster },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const variants = {
    hidden: { opacity: 1, x: '100%', y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 1, x: '100%', y: 0 },
  };

  return (
    <Layout>
      <motion.div
        variants={variants} // Pass the variant object into Framer Motion
        initial='hidden' // Set the initial state to variants.hidden
        animate='enter' // Animated state to variants.enter
        exit='exit' // Exit state (used later) to variants.exit
        transition={{ type: 'linear' }} // Set the transition to linear
        className='p-8'
      >
        <Link href='/' scroll={false}>
          <h1 className='cursor-pointer'>Home</h1>
        </Link>
        <h1>{title}</h1>
        {body ? <BlockContent blocks={body} /> : null}
        <video src={videoUrl} poster={poster} />
      </motion.div>
    </Layout>
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
