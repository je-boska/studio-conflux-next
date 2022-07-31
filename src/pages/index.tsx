import type { InferGetStaticPropsType } from 'next';
import { getProjects } from '../queries/projects';
import Link from 'next/link';
import { ProjectType } from '../types/shared';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const variants = {
    hidden: { opacity: 1, x: '-100%', y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 1, x: '-100%', y: 0 },
  };

  return (
    <Layout>
      <motion.div
        variants={variants} // Pass the variant object into Framer Motion
        initial='hidden' // Set the initial state to variants.hidden
        animate='enter' // Animated state to variants.enter
        exit='exit' // Exit state (used later) to variants.exit
        transition={{ type: 'linear' }} // Set the transition to linear
      >
        {projects.map(({ _id, slug, title, videoUrl, poster }) => (
          <div key={_id}>
            <Link href={`/projects/${slug}`} scroll={false}>
              <h1 className='cursor-pointer'>{title}</h1>
            </Link>
            <video src={videoUrl} poster={poster} />
          </div>
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
