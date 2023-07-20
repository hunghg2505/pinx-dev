import React, { useState } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';

import PopupReview from '@components/Stock/Popup/PopupReview';
import Rating from '@components/Stock/Rating';
import { IReview } from '@components/Stock/type';
import Text from '@components/UI/Text';

interface IReviewItemProps {
  data: IReview;
  isLatestReview?: boolean;
  isMyReview?: boolean;
  onEditReviewSuccess?: () => void;
}

const ReviewItem = ({
  data,
  isLatestReview,
  isMyReview = false,
  onEditReviewSuccess,
}: IReviewItemProps) => {
  const [openPopupReview, setOpenPopupReview] = useState(false);

  return (
    <div>
      <PopupReview
        visible={openPopupReview}
        star={data.rateValue}
        message={data.message}
        onClose={() => {
          setOpenPopupReview(false);
        }}
        stockCode={data.stockCode}
        onReviewSuccess={() => {
          setOpenPopupReview(false);
          onEditReviewSuccess && onEditReviewSuccess();
        }}
      />

      <div className='mb-[4px] flex items-center'>
        <img
          src={data.customerInfo.avatar}
          alt='Reviewer avatar'
          className='h-[28px] w-[28px] rounded-full border border-[#EEF5F9] object-cover'
        />

        <Text type='body-14-semibold' className='ml-[12px] text-[#0D0D0D]'>
          {data.customerInfo.displayName}
        </Text>

        <Text type='body-12-regular' className='ml-auto text-[#999999]'>
          {isLatestReview ? 'LATEST REVIEW' : dayjs().format('DD/MM/YYYY')}
        </Text>
      </div>

      <div
        className={classNames('relative rounded-[12px] px-[16px] py-[12px]', {
          'bg-[#F7F6F8]': !isMyReview,
          'bg-[#F0F7FC]': isMyReview,
        })}
      >
        <div className='flex items-center justify-between'>
          <div className='px-[4px] py-[5px]'>
            <img
              src='/static/icons/iconQuotes.svg'
              alt='Icon quotes'
              className='h-[18px] w-[21px] object-contain'
            />
          </div>

          {/* star */}
          <Rating star={data.rateValue} disabled className='!h-[16px] !w-[16px]' />
        </div>

        <Text type='body-14-regular' className='mt-[12px] text-[#0D0D0D]'>
          {data.message}
        </Text>

        {isMyReview && (
          <button
            onClick={() => setOpenPopupReview(true)}
            className='absolute bottom-0 right-[8px] h-[28px] w-[52px] translate-y-1/3 cursor-pointer rounded-full bg-[rgba(255,255,255,0.50)] text-center shadow-[0px_1px_2px_0px_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08)]'
          >
            <img
              src='/static/icons/primaryPen.svg'
              alt='Icon pen'
              className='mx-auto h-[14px] w-[14px] object-contain'
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
