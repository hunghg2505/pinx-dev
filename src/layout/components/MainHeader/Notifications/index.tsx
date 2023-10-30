/* eslint-disable unicorn/no-useless-spread */
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

import { useAtom } from 'jotai';
import Dropdown from 'rc-dropdown';

import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { getAccessToken } from '@store/auth';
import { notificationAtom } from '@store/notification/notification';

import NotificationMobile from './components/NotificationMobile';
import NotificationOverlay from './components/NotificationOverlay';
import styles from './index.module.scss';
import { useGetNotificationCount } from './service';

const NotiCount = forwardRef((_, ref: any) => {
  const [, setNotiStore] = useAtom(notificationAtom);
  const { notiCount, refreshNotiCount } = useGetNotificationCount({
    onSuccess: (res: any) => {
      setNotiStore((prev) => {
        return {
          ...prev,
          refreshNotiCount,
          notiCount: res.data,
        };
      });
    },
  });

  useImperativeHandle(ref, () => ({ refreshNotiCount, notiCount }));

  return notiCount > 0 ? (
    <div className='absolute right-[-5px] top-0 rounded-full bg-[#FF3B3B]'>
      <Text className='px-1 text-[10px] font-[700] text-white'>{notiCount}</Text>
    </div>
  ) : (
    <></>
  );
});

const Notifications = () => {
  const isLogin = !!getAccessToken();
  const { isMobile } = useResponsive();
  const [dropdownVisible, setdropdownVisible] = useState(false);
  const notiCountRef = useRef<any>(null);
  const notiMobileRef = useRef<any>(null);

  const onDropdownVisibleChange = (visible: boolean) => {
    setdropdownVisible(visible);
  };

  const onCloseNotiDropdown = useCallback(() => {
    setdropdownVisible(false);
  }, []);

  const goToNotification = () => {
    notiMobileRef.current.onVisible && notiMobileRef.current.onVisible();
  };

  const refreshNotiCount = () => {
    notiCountRef.current.refreshNotiCount && notiCountRef.current.refreshNotiCount();
  };

  const NotificationBadge = () => {
    return (
      <div className='relative'>
        {isMobile ? (
          <div className='ta flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#F8F8F8]'>
            <img
              src='/static/icons/iconBell.svg'
              alt='Icon notification'
              className='h-[23px] w-[23px]'
              onClick={goToNotification}
            />
          </div>
        ) : (
          <div className='relative items-center mobile:hidden tablet:flex'>
            <Dropdown
              trigger={['click']}
              animation='slide-up'
              overlay={<NotificationOverlay onCloseNotiDropdown={onCloseNotiDropdown} />}
              onVisibleChange={onDropdownVisibleChange}
              visible={dropdownVisible}
              overlayClassName={styles.customDropdown}
            >
              <div className='ta flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#F8F8F8]'>
                <img
                  src='/static/icons/iconBell.svg'
                  alt='Icon notification'
                  className='h-[23px] w-[23px]'
                />
              </div>
            </Dropdown>
          </div>
        )}
        <NotiCount ref={notiCountRef} />
      </div>
    );
  };

  if (!isLogin) {
    return null;
  }

  return (
    <>
      <NotificationBadge />
      {isMobile && <NotificationMobile ref={notiMobileRef} refreshNotiCount={refreshNotiCount} />}
    </>
  );
};

export default Notifications;
