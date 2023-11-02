import React from 'react';

import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import { ITheme } from '@components/Home/service';
import { popupStatusAtom } from '@store/popup/popup';
import { THEME } from 'src/constant/route';

import { MainButton } from '../Button';
import Text from '../Text';

interface IProps {
  theme: ITheme;
  isUnsubscribe?: boolean;
  toastId?: string;
}

const NotificationSubsribeTheme = (props: IProps) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { isUnsubscribe, theme, toastId } = props;
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);

  const onShare = () => {
    if (router.pathname.includes(THEME + '/')) {
      setPopupStatus({ ...popupStatus, popupSubsribeTheme: true });
    } else {
      setPopupStatus({ ...popupStatus, popupSubsribeThemeHome: true });
    }
    toast.dismiss(toastId);
  };

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
        {t('tell_people_the_reason_you')}{' '}
        {isUnsubscribe ? t('unsubscribe_lowercase') : t('subscribe_lowercase')} {t('for')}{' '}
        {theme?.name}
      </Text>

      <MainButton
        onClick={onShare}
        className='ml-3 whitespace-nowrap px-[20px] galaxy-max:ml-0 galaxy-max:px-[16px] galaxy-max:py-[10px] galaxy-max:text-[12px]'
      >
        {t('share')}
      </MainButton>
    </div>
  );
};
export default NotificationSubsribeTheme;
