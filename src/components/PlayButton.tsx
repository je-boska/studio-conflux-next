import React, { Dispatch, SetStateAction } from 'react';
import cx from 'classnames';

export default function PlayButton({
  className,
  isPlaying,
  setIsPlaying,
}: {
  className: string;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button onClick={() => setIsPlaying(!isPlaying)} className={className}>
      <span
        className={cx('md:transition-opacity', {
          'opacity-0 md:group-hover:opacity-100': isPlaying,
        })}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </span>
    </button>
  );
}
