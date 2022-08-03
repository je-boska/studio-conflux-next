import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ProjectType } from '../types/shared';

export default function Project({
  project,
  setCurrentTitle,
}: {
  project: ProjectType;
  setCurrentTitle: Dispatch<SetStateAction<string | null | undefined>>;
}) {
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const isInView = useInView(ref);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end center', 'center start'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const { title, videoUrl, poster } = project;

  useEffect(() => {
    if (isInView) {
      const currentTitle = ref.current?.getAttribute('data-title');
      setCurrentTitle(currentTitle);
    }
  }, [isInView, setCurrentTitle]);

  return (
    <div
      className='h-screen flex flex-col justify-center'
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        data-title={title}
        style={{ rotateX, scale, opacity }}
        className='h-1/2 flex justify-center align-middle'
      >
        <video src={videoUrl} poster={poster} className='h-full' />
      </motion.div>
    </div>
  );
}
