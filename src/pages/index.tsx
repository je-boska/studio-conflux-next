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
        <div className='fixed top-0 left-0'>
          <h1 className='cursor-pointer'>{currentTitle}</h1>
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
  };
}
