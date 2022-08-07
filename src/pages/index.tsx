import type { InferGetStaticPropsType } from 'next';
import Layout from '../components/Layout';
import Project from '../components/Project';
import { getProjects } from '../queries/projects';
import { CurrentProjectType, ProjectType } from '../types/shared';
import { useState } from 'react';
import Link from 'next/link';
import Hero from '../components/Hero';

const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [currentProject, setCurrentProject] =
    useState<CurrentProjectType | null>({
      title: '',
      slug: '',
    });

  return (
    <Layout>
      <Hero />
      <h2 className='w-full fixed text-center uppercase text-2xl md:text-5xl tracking-[0.7rem] top-1/2 -translate-y-1/2 z-10'>
        <Link href={`projects/${currentProject?.slug}`} scroll={false}>
          <span className='cursor-pointer'>{currentProject?.title}</span>
        </Link>
      </h2>

      {projects.map((project) => (
        <Project
          key={project._id}
          project={project}
          setCurrentProject={setCurrentProject}
        />
      ))}
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
