'use client';

import { useRef } from 'react';

export function Header() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleOpen() {
    dialogRef.current?.showModal();
  }

  function handleClose() {
    dialogRef.current?.close();
  }

  return (
    <header className='flex justify-center px-2 py-6 sm:px-6 lg:px-8'>
      <button
        onClick={handleOpen}
        className='font-title text-lg sm:text-3xl md:text-4xl tracking-[20px] opacity-80 hover:opacity-100 transition-opacity cursor-pointer'
        aria-label='About Studio Conflux'
      >
        STUDIO CONFLUX
      </button>

      <dialog
        ref={dialogRef}
        className='backdrop:bg-black/80 bg-background text-foreground p-0 m-auto max-w-xl w-full rounded-none'
        onClick={(e) => {
          if (e.target === dialogRef.current) handleClose();
        }}
        onClose={handleClose}
      >
        <div className='p-8 font-body text-lg leading-7 xl:leading-8'>
          <p className='mb-4 opacity-90'>
            Studio Conflux is a Berlin sound design, composition, music
            production and mixing studio, run by Tim Roth, Philipp Hülsenbeck
            and Jon Eirik Boska.
          </p>
          <p className='mb-4 opacity-90'>
            Clients include Adidas, Converse, Rimowa, Tom Ford, Acqua Di Parma,
            Siematic, 032c, GQ Germany and Wallpaper Magazine.
          </p>
          <div className='mb-4'>
            <p className='opacity-90'>philipp@studioconflux.com</p>
            <span className='opacity-90'>Instagram: </span>
            <a
              className='opacity-90 hover:opacity-100 transition-opacity'
              href='https://www.instagram.com/studioconflux/'
              target='_blank'
              rel='noopener noreferrer'
            >
              @studioconflux
            </a>
          </div>
          <a
            href='/imprint'
            className='opacity-90 hover:opacity-100 transition-opacity'
          >
            Imprint
          </a>
        </div>
      </dialog>
    </header>
  );
}
