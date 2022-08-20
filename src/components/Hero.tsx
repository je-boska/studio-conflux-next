import React, { useState } from 'react';
import About from './About';
import HeroFilter from './HeroFilter';

export default function Hero() {
  const [showAboutLink, setShowAboutLink] = useState<boolean>(false);
  const [showProjectsLink, setShowProjectsLink] = useState<boolean>(false);
  const [showAbout, setShowAbout] = useState<boolean>(false);

  return (
    <div className='relative h-screen text-white'>
      <p
        onClick={() => setShowAbout((showAbout) => !showAbout)}
        onMouseEnter={() => setShowAboutLink((showAboutLink) => !showAboutLink)}
        onMouseLeave={() => setShowAboutLink((showAboutLink) => !showAboutLink)}
        className='absolute left-4 md:left-6 top-4 md:top-6 text-2xl tracking-widest sm:tracking-[0.75rem] opacity-50 cursor-pointer'
      >
        {showAboutLink || showAbout
          ? showAbout
            ? 'STUDIO CONFLUX'
            : 'ABOUT'
          : '?'}
      </p>
      <p
        onClick={() => {
          const firstProject = document.querySelector('#first-project')!;
          console.log(firstProject.id);
          firstProject.scrollIntoView({ behavior: 'smooth' });
        }}
        onMouseEnter={() =>
          setShowProjectsLink((showProjectsLink) => !showProjectsLink)
        }
        onMouseLeave={() =>
          setShowProjectsLink((showProjectsLink) => !showProjectsLink)
        }
        className='absolute right-4 md:right-6 top-4 md:top-6 text-2xl tracking-widest sm:tracking-[0.75rem] opacity-50 cursor-pointer'
      >
        {showProjectsLink ? 'PROJECTS' : 'P'}
      </p>
      {showAbout ? (
        <About />
      ) : (
        <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center'>
          <HeroFilter />
          <h1 className='hero-heading mb-4 xl:mb-6 font-title text-3xl md:text-6xl xl:text-[5rem] leading-tight md:leading-tight xl:leading-tight'>
            Studio Conflux
          </h1>
          <h2 className='text-base md:text-xl tracking-wider md:tracking-widest xl:tracking-[0.4rem] opacity-40'>
            Sound Design, Composition & Music Production
          </h2>
        </div>
      )}
    </div>
  );
}
