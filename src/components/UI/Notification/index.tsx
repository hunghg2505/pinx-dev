/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
import React from 'react';

import Image from 'next/image';

interface NotificationProps {
  type: 'success' | 'warning' | 'error',
  message: string,
  customImage?: string,
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  customImage,
}) => {
  const recderImage = () => {
    switch (type) {
      case 'success':
        return <Image src='/static/icons/success_noti.svg' alt='' width='0' height='0' className={'w-[46px] h-[46px]'} />;
      case 'error':
        return <Image src='/static/icons/error_noti.svg' alt='' width='0' height='0' className={'w-[46px] h-[46px}'} />;
    }
  }

  const renderMessage = () => {
    switch (type) {
      case 'success':
        return (
          <div className="ml-3">
            <div className='text-[20px] font-[700]'>Success</div>
            <div className='text-[14px] font-[500]'>{message}</div>
          </div>
        );
      case 'error':
        return (
          <div className="ml-3">
            <div className='text-[20px] font-[700]'>Error</div>
            <div className='text-[14px] font-[500] text-[--neutral-4]'>{message}</div>
          </div>
        )
    }
  }

  return (
    <div className="flex items-center w-full max-w-xs">
      {recderImage()}
      {renderMessage()}
    </div>
  )
};

export default Notification;
