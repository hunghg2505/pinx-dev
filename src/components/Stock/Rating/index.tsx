import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

const MAX_RATING = 5;

interface IRatingProps {
  star?: number;
  disabled?: boolean;
  onChange?: (currentStar: number) => void;
  className?: string;
  wrapClassName?: string;
}

const Rating = ({ star = 0, disabled, onChange, className, wrapClassName }: IRatingProps) => {
  const [rating, setRating] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const ratingElements = [];
    for (let i = 1; i <= MAX_RATING; i++) {
      ratingElements.push(
        <img
          src={`${i <= star ? '/static/icons/iconStarActive.svg' : '/static/icons/iconStar.svg'}`}
          alt='Icon star'
          className={classNames('h-[22px] w-[22px] object-contain', className, {
            'cursor-pointer': !disabled,
          })}
          onClick={() => onChange && onChange(i)}
        />,
      );
    }

    setRating(ratingElements);
  }, [className, disabled, onChange, star]);

  return (
    <div className={classNames('flex items-center gap-x-[12px] ', wrapClassName)}>
      {rating.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};

export default Rating;
