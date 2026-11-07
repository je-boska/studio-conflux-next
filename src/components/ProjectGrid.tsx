'use client';

import { useRef, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { PlayIcon } from './PlayIcon';
import type { Project } from '@/sanity';

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  function handleCardClick(project: Project) {
    setActiveProject(project);
    const video = videoRef.current;
    if (video) {
      video.src = project.videoUrl;
      video.load();
      video.play().catch(() => {});
    }
    dialogRef.current?.showModal();
  }

  function handleClose() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.hasAttribute('data-closing')) return;
    videoRef.current?.pause();
    dialog.setAttribute('data-closing', '');
    setTimeout(() => {
      dialog.removeAttribute('data-closing');
      dialog.close();
    }, 300);
  }

  function handleCleanup() {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
  }

  return (
    <>
      {/*
        Each row is exactly one 16:9 cell tall (derived from the container
        width via cqw), so tiles can span 2x2 (featured) or 1x2 (portrait)
        and still line up. `dense` back-fills holes left by tall tiles.
      */}
      <div className='@container'>
        <div className='grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 auto-rows-[calc(100cqw*9/16)] md:auto-rows-[calc((100cqw-0.5rem)/2*9/16)] lg:auto-rows-[calc((100cqw-1rem)/3*9/16)]'>
          {projects.map((project, index) => {
            const featured = index === 0;
            const portrait = !featured && project.portrait;
            const large = featured || portrait;

            return (
              <button
                key={project._id}
                onClick={() => handleCardClick(project)}
                className={`group relative overflow-hidden text-left cursor-pointer ${
                  featured
                    ? 'md:col-span-2 md:row-span-2'
                    : portrait
                      ? 'md:row-span-2'
                      : ''
                }`}
                aria-label={`Play video: ${project.title}`}
              >
                <img
                  src={(large && project.posterLarge) || project.poster}
                  alt={project.title}
                  className='w-full h-full object-cover'
                  style={
                    project.hotspot
                      ? {
                          objectPosition: `${project.hotspot.x * 100}% ${project.hotspot.y * 100}%`,
                        }
                      : undefined
                  }
                />
                <PlayIcon />
                <h2
                  className={`font-subtitle absolute top-0 left-0 right-0 pt-2 text-white mix-blend-difference text-center leading-none uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    featured
                      ? 'text-base sm:text-lg md:pt-3 xl:text-2xl'
                      : 'text-sm sm:text-base xl:text-lg'
                  }`}
                >
                  {project.title}
                </h2>
                {featured && project.body?.length > 0 && (
                  <div className='hidden md:block absolute bottom-0 left-0 right-0 px-4 pb-3 text-white mix-blend-difference text-center text-base xl:text-lg leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                    <PortableText value={project.body} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className='backdrop:bg-black/80 bg-transparent p-0 m-auto max-w-5xl w-full scrollbar-none [&::-webkit-scrollbar]:hidden'
        onClick={(e) => {
          if (e.target === dialogRef.current) handleClose();
        }}
        onCancel={(e) => {
          e.preventDefault();
          handleClose();
        }}
        onClose={handleCleanup}
      >
        <div className='relative w-full aspect-video'>
          <video
            ref={videoRef}
            className='w-full h-full'
            controls
            playsInline
            preload='none'
          />
        </div>
        {activeProject && (
          <div className='px-2 md:px-0 pt-1 text-white'>
            <h2 className='font-subtitle opacity-80 text-xl sm:text-2xl leading-none uppercase'>
              {activeProject.title}
            </h2>
            <div className='text-lg opacity-80 leading-tight'>
              <PortableText value={activeProject.body} />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
