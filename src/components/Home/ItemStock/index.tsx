import React from 'react';

import clx from 'classnames';
import Image from 'next/image';

import Text from '@components/UI/Text';

const ItemStock = () => {
  // socket.on('connect', function () {
  //   console.log('check 2', socket.connected);
  // });
  // console.log('check 1', socket.connected);

  return (
    <div className='mr-[10px] w-[121px]'>
      <div className='mb-[20px] flex flex-col items-center justify-center rounded-[15px] bg-[#FDFDFD] p-[14px] [box-shadow:0px_4px_20px_rgba(0,_0,_0,_0.07)]'>
        <Image src='/static/icons/iconFpt.svg' alt='' width={44} height={44} className='w-[44px]' />
        <Text type='body-14-bold' color='primary-5' className='mt-1'>
          Vinamilk
        </Text>
        <Text className='mt-[2px]' type='body-12-regular' color='neutral-4'>
          NH TPCP BIDV
        </Text>
        <Text type='body-14-bold' color='semantic-2-1' className='mt-2'>
          12,345
        </Text>
        <div
          className={clx('mt-[6px] rounded-[11.5px] px-[14px] py-1', {
            'bg-[#FFF4D0]': false,
            'bg-[#E3F6E2]': true,
          })}
        >
          <Text type='body-12-medium' color='semantic-2-1'>
            +2.0 / 0.2%
          </Text>
        </div>
      </div>
    </div>
  );
};
export default ItemStock;
