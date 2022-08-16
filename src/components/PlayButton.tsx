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
        className={cx({
          'opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity':
            isPlaying,
        })}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </span>
    </button>
  );
}
