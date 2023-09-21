import React, { ReactNode, memo, useMemo } from 'react';

import { useToggleClassStock2 } from '@hooks/useToggleClassStock';

interface PriceWrapperProps {
  children: ReactNode;
  isChange: boolean;
  lastPrice: number;
  ceilPrice: number;
  floorPrice: number;
  refPrice: number;
  className?: string;
}

const PriceWrapper = ({
  children,
  isChange,
  lastPrice,
  ceilPrice,
  floorPrice,
  refPrice,
  className: classNameProp,
}: PriceWrapperProps) => {
  const classNamePriceChange = useToggleClassStock2(
    isChange,
    lastPrice,
    ceilPrice,
    floorPrice,
    refPrice,
  );

  const className = useMemo(() => {
    return [classNameProp, classNamePriceChange].join(' ').trimEnd();
  }, [classNamePriceChange]);

  return <div className={className}>{children}</div>;
};

export default memo(PriceWrapper);
