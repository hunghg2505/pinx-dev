/* eslint-disable unicorn/no-useless-spread */
import React, { useRef } from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { IStock } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';

import styles from '../../index.module.scss';
import ProductItem from '../ProductItem';

const PRODUCT_SLIDE_LIMIT = 5;

interface IStockProductsProps {
  stockDetail?: {
    data?: IStock;
  };
}

const StockProducts = ({ stockDetail }: IStockProductsProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const refSlide = useRef<any>(null);
  const { isMobile } = useResponsive();

  if (!stockDetail?.data?.products || !stockDetail?.data?.products.length) {
    return <></>;
  }

  return (
    <div className='box-shadow card-style'>
      <div className='mb-[16px]'>
        <Text type='body-20-semibold'>{t('brand_awareness')}</Text>
      </div>

      {isMobile || stockDetail?.data?.products.length <= PRODUCT_SLIDE_LIMIT ? (
        <div
          className={classNames(
            'flex items-center gap-x-[14px] overflow-x-auto',
            styles.noScrollbar,
          )}
        >
          {stockDetail?.data?.products.map((item, index) => (
            <ProductItem className='!mr-0 min-w-[112px]' key={index} data={item} />
          ))}
        </div>
      ) : (
        <div className='relative'>
          {stockDetail?.data?.products.length > PRODUCT_SLIDE_LIMIT && (
            <div
              onClick={() => {
                refSlide?.current?.splide.go('-1');
              }}
              className='absolute left-0 top-1/2 z-10 flex h-[40px] w-[40px] -translate-x-1/4 -translate-y-full transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
            >
              <img
                src='/static/icons/iconGrayPrev.svg'
                alt='Icon prev'
                className='h-[16px] w-[7px] object-contain'
              />
            </div>
          )}

          <div className='overflow-hidden'>
            <Splide
              options={{
                perPage: 1,
                pagination: false,
                arrows: false,
                gap: 10,
              }}
              ref={refSlide}
            >
              {stockDetail?.data?.products.map((item) => (
                <SplideSlide key={item.name}>
                  <ProductItem className='!mr-[14px]' data={item} />
                </SplideSlide>
              ))}
            </Splide>
          </div>

          {stockDetail?.data?.products.length > PRODUCT_SLIDE_LIMIT && (
            <div
              onClick={() => {
                refSlide?.current?.splide.go('+1');
              }}
              className='absolute right-0 top-1/2 z-10 flex h-[40px] w-[40px] -translate-y-full translate-x-1/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
            >
              <img
                src='/static/icons/iconGrayNext.svg'
                alt='Icon next'
                className='h-[16px] w-[7px] object-contain'
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockProducts;
