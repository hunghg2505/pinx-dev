import React from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';

import { StockEventPost } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { getMonthName } from '@utils/common';

interface ICalendarItemProps {
  data: StockEventPost;
}

const CalendarItem = ({ data }: ICalendarItemProps) => {
  const active = dayjs().isBefore(data.publishTime);

  const handleOpenPdfFile = () => {
    window.open(data.fileUrl, '_blank');
  };

  return (
    <div
      onClick={handleOpenPdfFile}
      className='flex cursor-pointer items-center rounded-[8px] bg-[#F7F6F8] p-[8px]'
    >
      <div className='flex h-[73px] w-[68px] flex-col rounded-[8px] shadow-[0px_1px_2px_0px_#0000001F]'>
        <div
          className={classNames(
            'flex h-[21px] items-center justify-center rounded-tl-[8px] rounded-tr-[8px]',
            {
              'bg-[#FF5757]': active,
              'bg-[#0D0D0D]': !active,
            },
          )}
        >
          <Text type='body-12-medium' color='cbwhite'>
            {getMonthName(dayjs(data.publishTime).get('month') + 1)}
          </Text>
        </div>

        <div className='flex-1 rounded-bl-[8px] rounded-br-[8px] bg-white text-center'>
          <Text type='body-24-bold' color='primary-5'>
            {dayjs(data.publishTime).get('D') < 10
              ? `0${dayjs(data.publishTime).get('D')}`
              : dayjs(data.publishTime).get('D')}
          </Text>
          <Text type='body-14-medium' className='text-[#999999]'>
            {dayjs(data.publishTime).get('y')}
          </Text>
        </div>
      </div>

      <div className='ml-[16px] flex-1'>
        <Text type='body-16-semibold' className='!leading-[21px] text-[#0D0D0D]'>
          {data.note}
        </Text>

        <Text type='body-12-regular' className='mt-[4px] text-[#474D57]'>
          {data.tagStocks.join(', ')}
        </Text>
      </div>
    </div>
  );
};

export default CalendarItem;
