import type { InferGetStaticPropsType } from 'next';
import Layout from '../components/Layout';
import Project from '../components/Project';
import { getProjects } from '../queries/projects';
import { ProjectType } from '../types/shared';
import { homePageVariant } from '../utils/transitions';
import { motion } from 'framer-motion';

const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <motion.div
        variants={homePageVariant}
        initial='hidden'
        animate='enter'
        exit='exit'
        transition={{ type: 'linear' }}
      >
        {projects.map((project) => (
          <Project key={project._id} project={project} />
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
