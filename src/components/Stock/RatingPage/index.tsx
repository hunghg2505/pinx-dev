import React, { useState } from 'react';

import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

import PopupReview from '../Popup/PopupReview';
import ReviewItem from '../StockDetail/ReviewItem';

const StockRating = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className='mx-auto px-[16px] mobile:w-[375px]'>
        <div className='inline-block cursor-pointer items-center p-[16px]' onClick={handleBack}>
          <img
            src='/static/icons/icon_back_header.svg'
            alt=''
            className='h-[14px] w-[7px] object-contain'
          />
        </div>

        <Text type='body-20-semibold'>Rating</Text>
        <Text type='body-14-regular' className='my-[16px]'>
          Rating of stocks by PineX users
        </Text>

        <div className='mb-[32px] flex flex-col gap-y-[16px]'>
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
        </div>

        <div
          onClick={() => setOpenPopup(true)}
          className='fixed bottom-[32px] right-[16px] inline-flex h-[44px] cursor-pointer items-center rounded-full bg-[linear-gradient(247.96deg,#1D6CAB_14.41%,#589DC0_85.59%)] px-[16px] shadow-[0px_4px_13px_0px_#589DC04D]'
        >
          <div className='flex h-[24px] w-[24px] items-center justify-center object-contain'>
            <img
              src='/static/icons/iconPen.svg'
              alt='Icon pen'
              className='h-[16px] w-[16px] object-contain'
            />
          </div>

          <Text type='body-14-semibold' color='cbwhite' className='ml-[8px]'>
            Review
          </Text>
        </div>
      </div>

      <PopupReview
        visible={openPopup}
        onClose={() => {
          setOpenPopup(false);
        }}
      />
    </>
  );
};

export default StockRating;
