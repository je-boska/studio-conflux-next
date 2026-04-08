"use client";

import { useRef } from "react";
import { PortableText } from "@portabletext/react";
import { PlayIcon } from "./PlayIcon";
import type { Project } from "@/sanity";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleCardClick(project: Project) {
    const video = videoRef.current;
    if (video) {
      video.src = project.videoUrl;
      video.load();
      video.play().catch(() => {});
    }
    dialogRef.current?.showModal();
  }

  function handleClose() {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    dialogRef.current?.close();
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
        {projects.map((project) => (
          <button
            key={project._id}
            onClick={() => handleCardClick(project)}
            className="group text-left cursor-pointer flex flex-col"
            aria-label={`Play video: ${project.title}`}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={project.poster}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <PlayIcon />
            </div>
            <h2 className="text-[22px] tracking-wide mt-3">
              {project.title}
            </h2>
            <div className="text-[16px] opacity-60 mt-1 leading-relaxed">
              <PortableText value={project.body} />
            </div>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/80 bg-transparent p-0 m-auto max-w-5xl w-full"
        onClick={(e) => {
          if (e.target === dialogRef.current) handleClose();
        }}
        onClose={handleClose}
      >
        <div className="relative w-full aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full"
            controls
            playsInline
            preload="none"
          />
        </div>
      </dialog>
    </>
  );
}
