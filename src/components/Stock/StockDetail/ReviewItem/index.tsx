import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

import PopupReview from '@components/Stock/Popup/PopupReview';
import Rating from '@components/Stock/Rating';
import { IReview } from '@components/Stock/type';
import Text from '@components/UI/Text';

const MSG_LINE_HEIGHT = 21;
const MSG_MAX_LINE = 2;
const MSG_MAX_HEIGHT = MSG_MAX_LINE * MSG_LINE_HEIGHT;

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
  const { t } = useTranslation(['stock', 'common']);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(false);
  const [openPopupReview, setOpenPopupReview] = useState(false);

  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const messageReviewHeight = messageRef.current?.clientHeight || 0;
    messageReviewHeight && setShowSeeMore(messageReviewHeight > MSG_MAX_HEIGHT);
  }, [data]);

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

        <div
          style={{ lineHeight: `${MSG_LINE_HEIGHT}px`, maxHeight: `${MSG_MAX_HEIGHT}px` }}
          className={classNames('mt-[12px] overflow-hidden', {
            '!max-h-max': isSeeMore,
          })}
        >
          <div ref={messageRef} className='leading-[inherit]'>
            <Text
              type='body-14-regular'
              className='whitespace-pre-line leading-[inherit] text-[#0D0D0D]'
            >
              {data.message}
            </Text>
          </div>
        </div>

        {showSeeMore && (
          <Text
            onClick={() => setIsSeeMore((prev) => !prev)}
            type='body-14-semibold'
            color='primary-2'
            className='mt-[12px] inline-block cursor-pointer'
          >
            {isSeeMore ? t('common:see_less') : t('common:see_more') + '...'}
          </Text>
        )}

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
