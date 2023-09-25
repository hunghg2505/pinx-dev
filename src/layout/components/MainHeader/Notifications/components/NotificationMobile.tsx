/* eslint-disable unicorn/no-useless-spread */
import { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react';

import { useMount } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';


import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';
import { openProfileAtom } from '@store/profile/profile';
import { notificationMobileAtom } from '@store/sidebarMobile/notificationMobile';
import { useSidebarMobile } from '@store/sidebarMobile/sidebarMobile';

import NotificationTabs from './NotificationTabs';
import { useReadAllNotification } from '../service';


const NotificationsMobile = ({ refreshNotiCount }: { refreshNotiCount?: () => void }, ref?: any) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [openNotification, setOpenNotification] = useAtom(notificationMobileAtom);
  const [, setOpenProfileMenu] = useAtom(openProfileAtom);
  const [, setIsShowNavigate] = useSidebarMobile();
  const requestReadAllNotification = useReadAllNotification({});

  useMount(() => {
    router.events.on('routeChangeStart', () => {
      setOpenNotification(false);
    });
  });

  useEffect(() => {
    setOpenNotification(false);
  }, [router.pathname]);

  const onVisible = useCallback(() => {
    setOpenNotification(!openNotification);
    // @ts-ignore
    setIsShowNavigate(false);
    setOpenProfileMenu(false);
  }, [openNotification]);

  useImperativeHandle(ref, () => ({ onVisible }));

  const readAllNoti = () => {
    requestReadAllNotification.run();
  };

  return (
    <Fade
      visible={openNotification}
      className={classNames(
        'fixed left-[100%] z-[9999] w-full bg-[#F8FAFD] pt-[12px] [transition:0.3s] laptop:hidden overflow-y-auto top-0 h-[100vh] px-4',
        {
          '!left-0': openNotification,
        },
      )}
    >
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <img
            src='/static/icons/back_icon.svg'
            alt=''
            className='h-[21px] w-[21px] cursor-pointer'
            onClick={() => setOpenNotification(false)}
          />
          <Text type='body-20-semibold'>{t('notification')}</Text>
        </div>
        <div className='flex items-center cursor-pointer' onClick={readAllNoti}>
          <img
            src='/static/icons/blue_check_mark.svg'
            alt=''
            className='h-[20px] w-[20px] mr-3'
          />
          <Text type='body-14-semibold' color='primary-2'>
            {t('mark_all_as_read')}
          </Text>
        </div>

      </div>
      <div className='mt-4'>
        <NotificationTabs refreshNotiCount={refreshNotiCount} />
      </div>
    </Fade>
  );
};

export default forwardRef(NotificationsMobile);
