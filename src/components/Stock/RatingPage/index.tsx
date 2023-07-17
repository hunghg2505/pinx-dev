import React, { useState } from 'react';

import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

import PopupReview from '../Popup/PopupReview';
import { useStockReviews } from '../service';
import ReviewItem from '../StockDetail/ReviewItem';

const StockRating = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const router = useRouter();
  const { stockCode }: any = router.query;

  const { reviews } = useStockReviews(stockCode);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className='flex items-start'>
      <div className='rounded-[8px] mobile:w-[375px] tablet:mr-[15px] tablet:w-[calc(100%_-_265px)] desktop:mr-[24px] desktop:w-[749px] desktop:bg-[#FFF] desktop:[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
        <div className='relative flex h-[46px] items-center justify-center tablet:h-[72px] tablet:border-b tablet:border-solid tablet:border-[#EEF5F9]'>
          <div className='absolute left-[16px] top-1/2 flex -translate-y-1/2 items-center justify-between tablet:left-[24px]'>
            <div
              className='cursor-pointer items-center py-[12px] pl-[8px] pr-[16px]'
              onClick={handleBack}
            >
              <img
                src='/static/icons/icon_back_header.svg'
                alt=''
                className='h-[14px] w-[7px] object-contain tablet:hidden'
              />

              <img
                src='/static/icons/iconBack.svg'
                alt=''
                className='hidden h-[19px] w-[19px] object-contain tablet:block'
              />
            </div>
          </div>

          <Text type='body-20-bold' color='primary-5' className='hidden tablet:block'>
            Rating
          </Text>
        </div>

        <div className='px-[16px] tablet:px-[24px]'>
          <Text type='body-20-semibold' className='tablet:hidden'>
            Rating
          </Text>
          <Text type='body-14-regular' className='my-[16px]'>
            Rating of stocks by PineX users
          </Text>

          <div className='mb-[32px] flex flex-col gap-y-[16px]'>
            {reviews?.data.list.map((item, index) => (
              <ReviewItem data={item} key={index} isLatestReview={index === 0} />
            ))}
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
      </div>

      <PopupReview
        visible={openPopup}
        onClose={() => {
          setOpenPopup(false);
        }}
      />
    </div>
  );
};

export default StockRating;
