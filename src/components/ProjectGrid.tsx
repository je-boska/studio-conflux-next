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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 items-start'>
        {projects.map((project) => (
          <button
            key={project._id}
            onClick={() => handleCardClick(project)}
            className='group text-left cursor-pointer flex flex-col'
            aria-label={`Play video: ${project.title}`}
          >
            <div className='relative aspect-video overflow-hidden'>
              <img
                src={project.poster}
                alt={project.title}
                className='w-full h-full object-cover'
              />
              <PlayIcon />
              <h2 className='font-subtitle absolute top-0 left-0 right-0 pt-2 text-white mix-blend-difference text-sm sm:text-base xl:text-lg text-center leading-none uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                {project.title}
              </h2>
            </div>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className='backdrop:bg-black/80 bg-transparent p-0 m-auto max-w-5xl w-full'
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
