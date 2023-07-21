import React from 'react';

import Text from '../Text';

interface INotificationShareActivityProps {
  title: string;
  onClickShare: () => void;
}

const NotificationShareActivity = ({ title, onClickShare }: INotificationShareActivityProps) => {
  return (
    <div className='flex w-full max-w-sm items-center'>
      <img
        src='/static/icons/speaker.svg'
        alt='Icon speaker'
        className='h-[40px] w-[40px] object-contain'
      />

      <Text type='body-14-regular' color='primary-5' className='ml-[12px]'>
        {title}
      </Text>

      <button
        onClick={onClickShare}
        className='ml-[8px] h-[36px] rounded-[8px] bg-[linear-gradient(247.96deg,#1D6CAB_14.41%,#589DC0_85.59%)] px-[29px]'
      >
        <Text type='body-14-bold' color='cbwhite'>
          Share
        </Text>
      </button>
    </div>
  );
};
export default NotificationShareActivity;
