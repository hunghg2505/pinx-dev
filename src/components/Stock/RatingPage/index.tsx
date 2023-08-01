import React, { useState } from 'react';

import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { USERTYPE } from '@utils/constant';

import PopupReview from '../Popup/PopupReview';
import { useStockReviews } from '../service';
import ReviewItem from '../StockDetail/ReviewItem';

const StockRating = () => {
  const { t } = useTranslation(['stock', 'common']);
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
        toast(() => <Notification type='error' message={t('message_account_pending_to_close')} />);
      } else if (statusUser === USERTYPE.VSD) {
        setOpenPopup(true);
      } else {
        // PopupComponent.openEKYC();
        setPopupStatus({
          ...popupStatus,
          popupEkyc: true,
        });
      }
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };

  return (
    <div className='box-shadow card-style bg-white'>
      <div className='relative mb-[12px] flex h-[44px] items-center justify-center tablet:mb-0 tablet:h-[48px]'>
        <div className='absolute left-0 top-1/2 flex -translate-y-1/2 items-center justify-between'>
          <div className='cursor-pointer items-center pr-[16px]' onClick={handleBack}>
            <img
              src='/static/icons/back_icon.svg'
              alt=''
              className='h-[28px] w-[28px] object-contain'
            />
          </div>
        </div>

        <Text type='body-20-bold' color='primary-5' className='hidden tablet:block'>
          {t('rating.title')}
        </Text>
      </div>

      <div>
        <Text type='body-20-semibold' className='tablet:hidden'>
          {t('rating.title')}
        </Text>
        <Text type='body-14-regular' className='my-[16px]'>
          {t('rating_page.description')}
        </Text>

        <div className='flex flex-col gap-y-[16px]'>
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
          className='fixed bottom-[32px] right-[16px] z-50 inline-flex h-[44px] cursor-pointer items-center rounded-full bg-[linear-gradient(247.96deg,#1D6CAB_14.41%,#589DC0_85.59%)] px-[16px] shadow-[0px_4px_13px_0px_#589DC04D]'
        >
          <div className='flex h-[24px] w-[24px] items-center justify-center object-contain'>
            <img
              src='/static/icons/iconPen.svg'
              alt='Icon pen'
              className='h-[16px] w-[16px] object-contain'
            />
          </div>

          <Text type='body-14-semibold' color='cbwhite' className='ml-[8px]'>
            {t('rating_page.review')}
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
    </div>
  );
};

export default StockRating;
