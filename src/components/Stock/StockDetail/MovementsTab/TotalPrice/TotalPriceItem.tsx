import React, { ReactNode, memo } from 'react';

import classNames from 'classnames';

import useToggleClassStock from '@hooks/useToggleClassStock';

interface ITotalPriceItemProps {
  children: ReactNode;
  isChange: boolean;
  isLastPriceGTRefPrice: boolean;
  isRefPriceGTLastPrice: boolean;
  isEqual: boolean;
  dependencies?: any;
}

const TotalPriceItem = ({
  children,
  isChange,
  isLastPriceGTRefPrice,
  isRefPriceGTLastPrice,
  isEqual,
  dependencies,
}: ITotalPriceItemProps) => {
  const classNamePriceChange = useToggleClassStock(
    isChange && isLastPriceGTRefPrice,
    isChange && isRefPriceGTLastPrice,
    isChange && isEqual,
    dependencies,
  );

  return (
    <div
      className={classNames(
        classNamePriceChange,
        'mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]',
      )}
    >
      {children}
    </div>
  );
};

export default memo(TotalPriceItem);
