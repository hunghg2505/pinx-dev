import React from 'react';

import { useTranslation } from 'next-i18next';

interface NotificationProps {
  type: 'success' | 'warning' | 'error';
  message: string;
  customImage?: string;
}

const Notification: React.FC<NotificationProps> = ({ type, message }) => {
  const { t } = useTranslation('common');
  const renderImage = () => {
    switch (type) {
      case 'success': {
        return (
          <img
            src='/static/icons/success_noti.svg'
            alt=''
            width='0'
            height='0'
            className={'h-[46px] w-[46px]'}
          />
        );
      }
      case 'error': {
        return (
          <img
            src='/static/icons/error_noti.svg'
            alt=''
            width='0'
            height='0'
            className={'h-[46px} w-[46px]'}
          />
        );
      }
    }
  };

  const renderMessage = () => {
    switch (type) {
      case 'success': {
        return (
          <div className='ml-3'>
            <div className='text-[16px] font-[400]'>{t('success')}</div>
            <div className='text-[14px] font-[400]'>{message}</div>
          </div>
        );
      }
      case 'error': {
        return (
          <div className='ml-3'>
            <div className='text-[16px] font-[400]'>{t('error')}</div>
            <div className='text-[14px] font-[400] text-[--neutral-4]'>{message}</div>
          </div>
        );
      }
    }
  };

  return (
    <div className='flex w-full max-w-xs items-center'>
      {renderImage()}
      {renderMessage()}
    </div>
  );
};

export default Notification;
