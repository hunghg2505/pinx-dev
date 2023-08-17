import React from 'react';

import { useTranslation } from 'next-i18next';

import Text from '../Text';

interface INotificationFollowStockProps {
  title: string;
  onClickShare: () => void;
}

const NotificationFollowStock = ({ title, onClickShare }: INotificationFollowStockProps) => {
  const { t } = useTranslation();
  return (
    <div className='flex w-full max-w-sm items-center galaxy-max:flex-col galaxy-max:gap-[12px]'>
      <img
        src='/static/icons/speaker.svg'
        alt='Icon speaker'
        className='h-[40px] w-[40px] object-contain'
      />

      <Text
        type='body-14-regular'
        color='primary-5'
        className='ml-[12px] galaxy-max:ml-0 galaxy-max:text-[12px]'
      >
        {title}
      </Text>

      <button
        onClick={onClickShare}
        className='px-[16px]galaxy-max:ml-0 ml-[8px] h-[36px] rounded-[8px] bg-[linear-gradient(247.96deg,#1D6CAB_14.41%,#589DC0_85.59%)] galaxy-max:px-[16px] galaxy-max:py-[10px] galaxy-max:text-[12px]'
      >
        <Text type='body-14-bold' color='cbwhite' className='whitespace-nowrap'>
          {t('share')}
        </Text>
      </button>
    </div>
  );
};
export default NotificationFollowStock;
