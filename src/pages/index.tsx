import type { InferGetStaticPropsType } from 'next';
import Layout from '../components/Layout';
import Project from '../components/Project';
import { getProjects } from '../queries/projects';
import { ProjectType } from '../types/shared';
import { homePageVariant } from '../utils/transitions';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [currentTitle, setCurrentTitle] = useState<string | null | undefined>(
    null
  );

  return (
    <Layout>
      <motion.div
        variants={homePageVariant}
        initial='hidden'
        animate='enter'
        exit='exit'
        transition={{ type: 'linear' }}
        className='relative'
      >
        <div className='fixed w-full text-center top-1/2 -translate-y-1/2 z-10'>
          <h1 className='text-white uppercase text-2xl md:text-5xl xl:text-5xl tracking-[0.7rem]'>
            {currentTitle}
          </h1>
        </div>
        {projects.map((project) => (
          <Project
            key={project._id}
            project={project}
            setCurrentTitle={setCurrentTitle}
          />
        ))}
      </motion.div>
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const projects: ProjectType[] = await getProjects();
  return {
    props: { projects: projects },
    revalidate: 60 * 60,
  };
}
