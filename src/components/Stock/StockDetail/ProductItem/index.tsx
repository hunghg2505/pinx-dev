import React from 'react';

import classNames from 'classnames';

import { IProduct } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { PRODUCT_COMPANY_IMAGE } from 'src/constant';

interface IProductItemProps {
  data: IProduct;
  className?: string;
}

const ProductItem = ({ data, className }: IProductItemProps) => {
  return (
    <div className={classNames('mr-[28px] !w-[112px]', className)}>
      <img
        src={PRODUCT_COMPANY_IMAGE(data.imageUrl)}
        alt={data.name}
        className='h-[112px] w-full rounded-[24px] border border-solid border-[#EBEBEB] object-cover'
      />

      <Text
        className='mt-[12px] line-clamp-2 h-[28px] text-ellipsis text-center'
        type='body-12-regular'
      >
        {data.name}
      </Text>
    </div>
  );
};

export default ProductItem;
