import React, { ChangeEvent, useEffect, useState } from 'react';

import { useUnmount } from 'ahooks';
import classNames from 'classnames';

import styles from './index.module.scss';

interface RangeSliderProps {
  className?: string;
  onChange?: (value: number) => void;
  maxRange?: number;
  stepChange?: number;
}

const RangeSlider = ({ className, onChange, maxRange = 100, stepChange = 5 }: RangeSliderProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    onChange && onChange(value);
  }, [value]);

  const handleChangeRangeSlider = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    const progress = (value / maxRange) * 100;
    setValue(progress);
  };

  const handleDecrease = () => {
    const newValue = value - stepChange < 0 ? 0 : value - stepChange;
    setValue(newValue);
  };

  const handleIncrease = () => {
    const newValue = value + stepChange > maxRange ? maxRange : value + stepChange;
    setValue(newValue);
  };

  useUnmount(() => {
    setValue(0);
  });

  return (
    <div className={classNames(styles.range, className)}>
      <div className={styles.button} onClick={handleDecrease}>
        <img src='/static/icons/iconMinusBlack.svg' alt='Icon minus' className='h-[4px] w-[15px]' />
      </div>

      <input
        type='range'
        min='0'
        max={maxRange}
        value={value}
        id='range'
        className={styles.input}
        onInput={handleChangeRangeSlider}
        style={{
          background: `linear-gradient(to right, #1876f2 ${(value / maxRange) * 100}%, #ced0d4 ${
            (value / maxRange) * 100
          }%)`,
        }}
      />

      <button className={styles.button} onClick={handleIncrease}>
        <img src='/static/icons/iconPlusBlack.svg' alt='Icon plus' className='h-[15px] w-[15px]' />
      </button>
    </div>
  );
};

export default RangeSlider;
