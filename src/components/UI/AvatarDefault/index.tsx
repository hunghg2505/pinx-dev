import React from 'react';

import Text from '../Text';

const AlphabetToColor: any = {
  A: '#290ea3',
  B: '#c6f46e',
  C: '#ac82c1',
  D: '#16e9c2',
  E: '#c15c0b',
  F: '#911371',
  G: '#9987bd',
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
  name: string;
}
const AvatarDefault = (props: IProps) => {
  const { name } = props;
  return (
    <div
      className='mr-2 flex h-full w-full items-center justify-center rounded-full object-contain'
      style={{ backgroundColor: AlphabetToColor[name] }}
    >
      <Text type='body-24-regular' color='cbwhite'>
        {name}
      </Text>
    </div>
  );
};
export default AvatarDefault;
