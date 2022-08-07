import React from 'react';

export default function Hero() {
  return (
    <div className='relative h-screen text-white'>
      <p className='absolute left-4 top-4 text-2xl'>?</p>
      <p className='absolute right-4 top-4 text-2xl'>P</p>
      <h1 className='absolute w-full text-center top-1/2 -translate-y-1/2 font-title text-2xl md:text-3xl xl:text-5xl'>
        Studio Conflux
      </h1>
    </div>
  );
}
