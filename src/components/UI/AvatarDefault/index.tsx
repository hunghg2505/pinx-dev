import React, { useMemo } from 'react';

import classNames from 'classnames';

import { toNonAccentVietnamese } from '@utils/common';

import Text from '../Text';

const AlphabetToColor: any = {
  A: '#290ea3',
  B: '#c6f46e',
  C: '#ac82c1',
  D: '#16e9c2',
  E: '#c15c0b',
  F: '#911371',
  G: '#9987bd',
  H: '#00A261',
  I: '#f26e0f',
  J: '#716e40',
  K: '#db4da2',
  L: '#cf58db',
  M: '#3e9833',
  N: '#59b63d',
  O: '#22788f',
  P: '#5887e2',
  Q: '#e1a1b9',
  R: '#9b2a3d',
  S: '#bb3466',
  T: '#ca9809',
  U: '#80cf09',
  V: '#f0256a',
  W: '#036869',
  X: '#49e2aa',
  Y: '#cbcf13',
  Z: '#54af78',
};
interface IProps {
  name?: string;
  nameClassName?: string;
  className?: string;
}
const AvatarDefault = (props: IProps) => {
  const { name, nameClassName, className } = props;

  const nameFormat = useMemo(() => {
    let firstCharName = 'Z';

    // eslint-disable-next-line unicorn/prefer-number-properties
    if (name && isNaN(+name.slice(0, 1))) {
      firstCharName = toNonAccentVietnamese(name.slice(0, 1)).toUpperCase();
    }

    return firstCharName;
  }, [name]);

  return (
    <div
      className={classNames(
        'mr-2 flex h-full w-full items-center justify-center rounded-full object-contain',
        className,
      )}
      style={{ backgroundColor: AlphabetToColor[nameFormat] }}
    >
      <Text type='body-24-regular' color='cbwhite' className={classNames(nameClassName)}>
        {nameFormat}
      </Text>
    </div>
  );
};
export default AvatarDefault;
