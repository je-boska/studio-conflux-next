import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProjectType } from '../types/shared';
import Link from 'next/link';

export default function Project({ project }: { project: ProjectType }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end center', 'center start'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const { slug, title, videoUrl, poster } = project;

  return (
    <div className='relative h-screen' style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        style={{ rotateX, scale, opacity }}
        className='h-1/2 flex justify-center align-middle'
      >
        <div>
          <Link href={`/projects/${slug}`} scroll={false}>
            <h1 className='cursor-pointer'>{title}</h1>
          </Link>
          <video src={videoUrl} poster={poster} className='h-full' />
        </div>
      </motion.div>
    </div>
  );
}
