import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { CurrentProjectType, ProjectType } from '../types/shared';

export default function Project({
  first,
  project,
  setCurrentProject,
}: {
  first?: boolean;
  project: ProjectType;
  setCurrentProject: Dispatch<SetStateAction<CurrentProjectType | null>>;
}) {
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' });
  const { scrollYProgress: transformScrollProgress } = useScroll({
    target: ref,
    offset: ['end start', 'start end'],
  });
  const { scrollYProgress: opacityScrollProgress } = useScroll({
    target: ref,
    offset: ['center end', 'center center'],
  });
  const rotateX = useTransform(transformScrollProgress, [0, 1], [45, -45]);
  const scale = useTransform(transformScrollProgress, [0, 1], [1, 0.2]);
  const opacity = useTransform(opacityScrollProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (isInView) {
      const currentTitle = ref.current?.getAttribute('data-title')!;
      const currentSlug = ref.current?.getAttribute('data-slug')!;
      setCurrentProject({ title: currentTitle, slug: currentSlug });
    } else {
      setCurrentProject(null);
    }
  }, [isInView, setCurrentProject]);

  const { title, slug, videoUrl, poster } = project;

  return (
    <div
      id={first ? 'first-project' : undefined}
      className='w-full h-screen overflow-hidden flex flex-col justify-center perspective-800'
    >
      <motion.div
        ref={ref}
        data-title={title}
        data-slug={slug}
        style={{ rotateX, scale, opacity }}
        className='h-3/4 flex justify-center align-middle'
      >
        <video src={videoUrl} poster={poster ? poster : undefined} />
      </motion.div>
    </div>
  );
}
