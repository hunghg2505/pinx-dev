import React from 'react';

import Text from '../Text';

const AlphabetToColor = {
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
const renderColor = (str: string) => {
  switch (str) {
    case 'A': {
      return AlphabetToColor.A;
    }
    case 'B': {
      return AlphabetToColor.B;
    }
    case 'C': {
      return AlphabetToColor.C;
    }
    case 'D': {
      return AlphabetToColor.D;
    }
    case 'E': {
      return AlphabetToColor.E;
    }
    case 'F': {
      return AlphabetToColor.F;
    }
    case 'G': {
      return AlphabetToColor.G;
    }

    case 'I': {
      return AlphabetToColor.I;
    }
    case 'J': {
      return AlphabetToColor.J;
    }
    case 'K': {
      return AlphabetToColor.K;
    }
    case 'L': {
      return AlphabetToColor.L;
    }
    case 'M': {
      return AlphabetToColor.M;
    }
    case 'N': {
      return AlphabetToColor.N;
    }
    case 'O': {
      return AlphabetToColor.O;
    }
    case 'P': {
      return AlphabetToColor.P;
    }
    case 'Q': {
      return AlphabetToColor.Q;
    }
    case 'R': {
      return AlphabetToColor.R;
    }
    case 'S': {
      return AlphabetToColor.S;
    }
    case 'T': {
      return AlphabetToColor.T;
    }
    case 'U': {
      return AlphabetToColor.U;
    }
    case 'V': {
      return AlphabetToColor.V;
    }
    case 'W': {
      return AlphabetToColor.W;
    }
    case 'X': {
      return AlphabetToColor.X;
    }
    case 'Y': {
      return AlphabetToColor.Y;
    }
    case 'Z': {
      return AlphabetToColor.Z;
    }
    default: {
      return AlphabetToColor.Z;
    }
  }
};
interface IProps {
  name: string;
}
const AvatarDefault = (props: IProps) => {
  const { name } = props;
  return (
    <div
      className='mr-2 flex items-center justify-center rounded-full object-contain mobile:h-[44px] mobile:w-[44px] desktop:h-[56px] desktop:w-[56px]'
      style={{ backgroundColor: renderColor(name) }}
    >
      <Text type='body-24-regular' color='cbwhite'>
        {name}
      </Text>
    </div>
  );
};
export default AvatarDefault;
