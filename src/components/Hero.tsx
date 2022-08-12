import React from 'react';
import HeroFilter from './HeroFilter';

export default function Hero() {
  return (
    <div className='relative h-screen text-white'>
      <p className='absolute left-4 top-4 text-2xl'>?</p>
      <p className='absolute right-4 top-4 text-2xl'>P</p>
      <HeroFilter />
      <h1 className='hero-heading absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center font-title text-3xl md:text-5xl xl:text-8xl'>
        Studio Conflux
      </h1>
    </div>
  );
}
