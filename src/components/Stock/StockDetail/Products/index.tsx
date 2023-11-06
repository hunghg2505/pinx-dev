/* eslint-disable unicorn/no-useless-spread */
import React from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { IStock } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import useSpildeOptions from '@hooks/useSplideOptions';

import styles from '../../index.module.scss';
import ProductItem from '../ProductItem';
import '@splidejs/react-splide/css';

const PRODUCT_SLIDE_LIMIT = 5;

interface IStockProductsProps {
  stockDetail?: {
    data?: IStock;
  };
}

const StockProducts = ({ stockDetail }: IStockProductsProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const { isMobile } = useResponsive();
  const { stockProductSplideOptions } = useSpildeOptions();

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
          <Splide options={stockProductSplideOptions} className={styles.stockProductSplide}>
            {stockDetail?.data?.products.map((item, index) => (
              <SplideSlide key={index}>
                <ProductItem className='!mr-[14px]' data={item} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      )}
    </div>
  );
};

export default StockProducts;
