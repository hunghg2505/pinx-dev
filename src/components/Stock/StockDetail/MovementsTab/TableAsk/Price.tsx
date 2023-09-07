import React, { ReactNode, memo, useMemo } from 'react';

import useToggleClassStock from '@hooks/useToggleClassStock';

interface IPriceProps {
  children: ReactNode;
  className?: string;
  currentVal: string;
  preVal: string;
  refPrice?: number;
  price: string;
  dependencies?: any;
}

const Price = ({
  children,
  className: classNameProp,
  currentVal,
  preVal,
  refPrice = 0,
  price,
  dependencies,
}: IPriceProps) => {
  const classNamePriceChange = useToggleClassStock(
    currentVal !== preVal && +price > refPrice,
    currentVal !== preVal && +price < refPrice,
    currentVal !== preVal && +price === refPrice,
    dependencies,
  );

  const className = useMemo(() => {
    return [classNameProp, classNamePriceChange].join(' ').trimEnd();
  }, [classNamePriceChange]);

  return <div className={className}>{children}</div>;
};

export default memo(Price);
