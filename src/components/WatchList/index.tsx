import React from 'react';

import { useRouter } from 'next/router';

import { Button } from '@components/UI/Button';
import Text from '@components/UI/Text';

import ItemInterest from './ItemInterest';
// import ItemStock from './ItemStock';

const WatchList = () => {
  // const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const router = useRouter();
  const onGoBack = () => {
    router.back();
  };
  return (
    <>
      <img
        src='/static/icons/back_icon.svg'
        alt=''
        className='mb-[16px] w-[28px] cursor-pointer'
        onClick={onGoBack}
      />
      <div className='flex items-center justify-between'>
        <Text type='body-20-bold' color='neutral-1'>
          Your watchlist
        </Text>
        <Button className='flex items-center'>
          <img
            src='/static/icons/explore/iconEdit.svg'
            alt=''
            className='mr-[4px] h-[13px] w-[13px]'
          />
          <Text type='body-14-semibold' color='primary-2'>
            Edit list
          </Text>
        </Button>
      </div>
      <div className='mt-[16px] flex flex-col gap-y-[16px]'>
        {/* <ItemStock /> */}
        {/* <ItemStock /> */}
      </div>
      <Text type='body-20-bold' className='mb-[16px] mt-[32px] text-[#0D0D0D]'>
        You may interest
      </Text>
      <div>
        <ItemInterest />
      </div>
    </>
  );
};
export default WatchList;
