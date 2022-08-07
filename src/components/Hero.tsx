import React from 'react';

export default function Hero() {
  return (
    <div className='relative h-screen text-white'>
      <p className='absolute left-8 top-8 text-2xl'>?</p>
      <p className='absolute right-8 top-8 text-2xl'>P</p>
      <h1 className='absolute w-full text-center top-1/2 -translate-y-1/2 font-title text-2xl xl:text-5xl'>
        Studio Conflux
      </h1>
    </div>
  );
}
