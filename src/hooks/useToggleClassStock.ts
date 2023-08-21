import { useEffect, useState } from 'react';

const useToggleClassStock = (
  isIncrease: boolean,
  isDecrease: boolean,
  isEqual: boolean,
  data: any,
) => {
  const [className, setClassName] = useState('');

  useEffect(() => {
    let cln = '';
    if (isIncrease) {
      cln = 'isIncrease';
    }

    if (isDecrease) {
      cln = 'isDecrease';
    }

    if (isEqual) {
      cln = 'isEqual';
    }

    setClassName(cln);

    const timerId = setTimeout(() => {
      setClassName('');
    }, 500);

    return () => {
      clearTimeout(timerId);
      setClassName('');
    };
  }, [isIncrease, isDecrease, isEqual, data]);

  return className;
};

export const useToggleClassStock2 = (
  isChange: boolean,
  lastPrice: number,
  ceilPrice: number,
  floorPrice: number,
  refPrice: number,
) => {
  const [className, setClassName] = useState('');

  useEffect(() => {
    let cln = '';
    if (lastPrice !== 0 && isChange) {
      switch (lastPrice) {
        case ceilPrice: {
          cln = 'purpleColor';

          break;
        }
        case floorPrice: {
          cln = 'blueColor';

          break;
        }
        case refPrice: {
          cln = 'orangeColor';

          break;
        }
        default: {
          cln = lastPrice < refPrice ? 'redColor' : 'greenColor';
        }
      }

      setClassName(cln);
    }

    const timerId = setTimeout(() => {
      setClassName('');
    }, 500);

    return () => {
      clearTimeout(timerId);
      setClassName('');
    };
  }, [isChange, lastPrice, ceilPrice, floorPrice, refPrice]);

  return className;
};

export default useToggleClassStock;
