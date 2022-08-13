import Link from 'next/link';
import React from 'react';

const About = () => {
  return (
    <div className='absolute top-1/2 md:left-1/2 -translate-y-1/2 md:-translate-x-1/2 mx-4 text-lg xl:text-xl max-w-xl leading-7 xl:leading-8'>
      <p className='mb-4 opacity-70'>
        Studio Conflux is a Berlin sound design, composition, music production
        and mixing studio, run by Tim Roth, Philipp Hülsenbeck and Jon Eirik
        Boska.
      </p>
      <p className='mb-4 opacity-70'>
        Clients include Adidas, Converse, Rimowa, Tom Ford, Acqua Di Parma,
        Siematic, 032c, GQ Germany and *Wallpaper Magazine.
      </p>
      <div className='mb-4'>
        <p className='opacity-70'>philipp@studioconflux.com</p>
        <span className='opacity-70'>Instagram: </span>
        <a
          className='opacity-70 hover:opacity-100'
          href='https://www.instagram.com/studioconflux/'
          target='_blank'
          rel='noopener nofollow noreferrer'
        >
          @studioconflux
        </a>
      </div>
      <span className='opacity-70 hover:opacity-100'>
        <Link
          href='/imprint'
          target='_blank'
          rel='noopener nofollow noreferrer'
        >
          Imprint
        </Link>
      </span>
    </div>
  );
};

export default About;
