import React from 'react';

import { useAtom } from 'jotai';
import { toast } from 'react-hot-toast';

import { ITheme } from '@components/Home/service';
import { popupStatusAtom } from '@store/popup/popup';

import { MainButton } from '../Button';
import Text from '../Text';

interface IProps {
  theme: ITheme;
  isUnsubscribe?: boolean;
  toastId?: string
}

const NotificationSubsribeTheme = (props: IProps) => {
  const { isUnsubscribe, theme, toastId } = props;
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);

  const onShare = () => {
    setPopupStatus({ ...popupStatus, popupSubsribeTheme: true });
    toast.dismiss(toastId);
  };

  return (
    <div className='flex w-full max-w-sm items-center'>
      <img
        src='/static/icons/speaker.svg'
        alt='Icon speaker'
        className='h-[40px] w-[40px] object-contain'
      />

      <Text type='body-14-regular' color='primary-5' className='ml-[12px]'>
        Tell people the reason you {isUnsubscribe ? 'unsubscribed' : 'subscribed'} for {theme.name}
      </Text>

      <MainButton
        onClick={onShare}
        className='px-[20px] ml-3'
      >
        Share
      </MainButton>
    </div>
  );
};
export default NotificationSubsribeTheme;
