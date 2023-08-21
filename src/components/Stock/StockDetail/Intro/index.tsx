import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { IStock } from '@components/Stock/type';
import Text from '@components/UI/Text';

const MAX_LINE = 4;
const LINE_HEIGHT = 21;
const MAX_HEIGHT = MAX_LINE * LINE_HEIGHT;

interface IIntroProps {
  stockDetail?: {
    data?: IStock;
  };
}

const Intro = ({ stockDetail }: IIntroProps) => {
  const { t } = useTranslation(['stock', 'common']);

  const [showSeeMore, setShowSeeMore] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(false);
  const introDescRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const introDescHeight = introDescRef.current?.clientHeight || 0;
    introDescHeight && setShowSeeMore(introDescHeight > MAX_HEIGHT);
  }, [stockDetail]);

  if (!stockDetail?.data?.introduction) {
    return <></>;
  }

  return (
    <div className='box-shadow card-style'>
      <Text type='body-20-semibold' className='mb-[16px]'>
        {t('intro')}
      </Text>

      <div>
        <div
          style={{ lineHeight: `${LINE_HEIGHT}px`, maxHeight: `${MAX_HEIGHT}px` }}
          className={classNames('overflow-hidden', {
            '!max-h-max': isSeeMore,
          })}
        >
          <div ref={introDescRef} className='leading-[inherit]'>
            <Text
              type='body-14-regular'
              className='whitespace-pre-line !leading-[inherit] galaxy-max:text-[12px]'
            >
              {stockDetail?.data?.introduction}
            </Text>
          </div>
        </div>

        {showSeeMore && (
          <button
            onClick={() => setIsSeeMore((prev) => !prev)}
            className='mt-[4px] h-[24px] min-w-[65px] rounded-full bg-[#EEF5F9] px-[12px]'
          >
            <Text type='body-12-semibold' className='galaxy-max:text-[10px]' color='primary-2'>
              {isSeeMore ? t('less') : t('more') + '...'}
            </Text>
          </button>
        )}
      </div>
    </div>
  );
};

export default Intro;
