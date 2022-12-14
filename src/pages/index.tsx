import type { InferGetStaticPropsType } from 'next';
import Layout from '../components/Layout';
import Project from '../components/Project';
import { getProjects } from '../queries/projects';
import { CurrentProjectType, ProjectType } from '../types/shared';
import { useState } from 'react';
import Link from 'next/link';
import Hero from '../components/Hero';
import Meta from '../components/Meta';

const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [currentProject, setCurrentProject] =
    useState<CurrentProjectType | null>({
      title: '',
      slug: '',
    });

  return (
    <Layout>
      <Meta title='Sound Design, Composition & Music Production' />
      <Hero />
      <h2 className='w-full fixed text-center uppercase text-2xl md:text-5xl tracking-[0.7rem] top-1/2 -translate-y-1/2 z-10'>
        <Link href={`projects/${currentProject?.slug}`}>
          <span className='cursor-pointer'>{currentProject?.title}</span>
        </Link>
      </h2>

      {projects.map((project, idx) => (
        <Project
          first={idx === 0}
          key={project._id}
          project={project}
          setCurrentProject={setCurrentProject}
          last={idx === projects.length - 1}
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
