import React, { Dispatch, SetStateAction } from 'react';
import cx from 'classnames';
import PlayIcon from '../icons/PlayIcon';
import PauseIcon from '../icons/PauseIcon';

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
        className={cx('opacity-70 md:transition-opacity', {
          'opacity-0 md:group-hover:opacity-70': isPlaying,
        })}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </span>
    </button>
  );
}
