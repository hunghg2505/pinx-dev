import React from 'react';

import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

export enum NotfoundMessage {
  USER_NOT_LOGIN = '1',
  USER_NOT_SHARE_WATCH_LIST = '2',
  OTHER_USER_NOT_SHARE_WATCH_LIST = '3',
  EMPTY_STOCK = '4',
}

const NotFound = ({ type }: { type?: NotfoundMessage }) => {
  const { t } = useTranslation('profile');

  return (
    <div className='border-pr justify-center rounded-[12px] border border-dashed border-primary_light_blue bg-[#F0F7FC] p-[20px]'>
      <img
        src='/static/icons/Lotus-blue.svg'
        alt=''
        className='mx-auto mb-[10px] h-[24px] w-[24px] object-cover'
      />
      <Text type='body-14-regular' color='primary-5' className='text-center galaxy-max:text-[12px]'>
        {type === NotfoundMessage.USER_NOT_LOGIN && t('watchlist_notfound_1')}
        {type === NotfoundMessage.USER_NOT_SHARE_WATCH_LIST && t('watchlist_notfound_2')}
        {type === NotfoundMessage.OTHER_USER_NOT_SHARE_WATCH_LIST && t('watchlist_notfound_3')}
        {type === NotfoundMessage.EMPTY_STOCK && t('watchlist_notfound_4')}
      </Text>
    </div>
  );
};
export default NotFound;
