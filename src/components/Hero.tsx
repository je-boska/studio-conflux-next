import React from 'react';
import HeroFilter from './HeroFilter';

export default function Hero() {
  return (
    <div className='relative h-screen text-white'>
      <p className='absolute left-4 top-4 text-2xl'>?</p>
      <p className='absolute right-4 top-4 text-2xl'>P</p>
      <HeroFilter />
      <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center'>
        <h1 className='hero-heading mb-4 xl:mb-6 font-title text-3xl md:text-6xl xl:text-8xl leading-tight md:leading-tight xl:leading-tight'>
          Studio Conflux
        </h1>
        <h2 className='text-base md:text-xl tracking-wider md:tracking-widest xl:tracking-[0.4rem] opacity-40'>
          Sound Design, Composition & Music Production
        </h2>
      </div>
    </div>
  );
}
