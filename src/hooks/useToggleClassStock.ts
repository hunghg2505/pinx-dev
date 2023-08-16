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

export default useToggleClassStock;
