import React, { useState } from 'react';

import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { USERTYPE } from '@utils/constant';
import PopupComponent from '@utils/PopupComponent';

import PopupReview from '../Popup/PopupReview';
import { useStockReviews } from '../service';
import ReviewItem from '../StockDetail/ReviewItem';

const StockRating = () => {
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [openPopup, setOpenPopup] = useState(false);
  const { userId, isLogin, statusUser } = useUserType();
  const router = useRouter();
  const { stockCode }: any = router.query;

  const { reviews, refreshStockReviews } = useStockReviews(stockCode);
  const myReview = reviews?.data.list.find((item) => item.customerId === userId);

  const handleBack = () => {
    router.back();
  };

  const handleClickBtnReview = () => {
    if (isLogin) {
      if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
        toast(() => (
          <Notification
            type='error'
            message='Your account has been pending to close. You cannot perform this action'
          />
        ));
      } else if (statusUser === USERTYPE.VSD) {
        setOpenPopup(true);
      } else {
        PopupComponent.openEKYC();
      }
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };

  return (
    <>
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
            <ReviewItem
              isMyReview={item.customerId === userId}
              data={item}
              key={index}
              isLatestReview={index === 0}
              onEditReviewSuccess={refreshStockReviews}
            />
          ))}
        </div>

        <div
          onClick={handleClickBtnReview}
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
        star={myReview?.rateValue || 0}
        onReviewSuccess={() => {
          refreshStockReviews();
          setOpenPopup(false);
        }}
        stockCode={stockCode}
        message={myReview?.message}
      />
    </>
  );
};

export default StockRating;
