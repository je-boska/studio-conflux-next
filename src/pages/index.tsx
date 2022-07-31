import type { InferGetStaticPropsType } from 'next';
import { getProjects } from '../queries/projects';
import Link from 'next/link';
import { ProjectType } from '../types/shared';

const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className='p-8'>
      {projects.map(({ _id, slug, title, videoUrl, poster }) => (
        <div key={_id}>
          <Link href={`/projects/${slug}`}>
            <h1 className='cursor-pointer'>{title}</h1>
          </Link>
          <video src={videoUrl} poster={poster} />
        </div>
      ))}
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const projects: ProjectType[] = await getProjects();
  return {
    props: { projects: projects },
  };
}
