/* eslint-disable unicorn/no-useless-spread */
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { useMount } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';


import CustomImage from '@components/UI/CustomImage';
import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';
import { notificationAtom } from '@store/notification/notification';
import { openProfileAtom } from '@store/profile/profile';
import { notificationMobileAtom } from '@store/sidebarMobile/notificationMobile';
import { useSidebarMobile } from '@store/sidebarMobile/sidebarMobile';

import NotificationTabs from './NotificationTabs';
import { useReadAllNotification } from '../service';


const NotificationsMobile = ({ refreshNotiCount }: { refreshNotiCount?: () => void }, ref?: any) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [hideReadAllButton, setHideReadAllButton] = useState(false);
  const [openNotification, setOpenNotification] = useAtom(notificationMobileAtom);
  const [notiStore] = useAtom(notificationAtom);
  const [, setOpenProfileMenu] = useAtom(openProfileAtom);
  const [, setIsShowNavigate] = useSidebarMobile();
  const requestReadAllNotification = useReadAllNotification({
    onSuccess: () => {
      refreshNotiCount && refreshNotiCount();
      refreshNotiData();
    }
  });

  const notiTabsRef = useRef<any>(null);

  const refreshNotiData = () => {
    notiTabsRef.current.refreshNotiData && notiTabsRef.current.refreshNotiData();
  };

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
        'fixed left-[100%] z-[9999] w-full bg-[#F8FAFD] pt-[12px] pb-[20px] [transition:0.3s] laptop:hidden overflow-y-auto top-0 h-[100vh] px-4',
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
        {!hideReadAllButton && (
          <div
            className='flex items-center cursor-pointer'
            onClick={() => {
              if (notiStore.notiCount > 0) {
                readAllNoti();
              }
            }}
          >
            {notiStore.notiCount > 0 ? (
              <CustomImage
                src='/static/icons/blue_check_mark.svg'
                alt='check_mark'
                width='0'
                height='0'
                sizes='100vw'
                className='h-[20px] w-[20px] mr-3'
              />
            ) : (
              <CustomImage
                src='/static/icons/gray_check_mark.svg'
                alt='check_mark'
                width='0'
                height='0'
                sizes='100vw'
                className='h-[20px] w-[20px] mr-3'
              />
            )}
            <Text type='body-14-semibold' color={notiStore.notiCount > 0 ? 'primary-2' : 'neutral-5'}>
              {t('mark_all_as_read')}
            </Text>
          </div>
        )}

      </div>
      <div className='my-4'>
        <NotificationTabs
          ref={notiTabsRef}
          refreshNotiCount={refreshNotiCount}
          setHideReadAllButton={setHideReadAllButton}
        />
      </div>
    </Fade>
  );
};

export default forwardRef(NotificationsMobile);
