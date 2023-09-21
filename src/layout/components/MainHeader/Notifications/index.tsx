/* eslint-disable no-console */
/* eslint-disable unicorn/no-useless-spread */
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { useMount } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Dropdown from 'rc-dropdown';
import Tabs, { TabPane } from 'rc-tabs';

import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { getAccessToken } from '@store/auth';
import { openProfileAtom } from '@store/profile/profile';
import { notificationMobileAtom } from '@store/sidebarMobile/notificationMobile';
import { useSidebarMobile } from '@store/sidebarMobile/sidebarMobile';
import { ROUTE_PATH } from '@utils/common';

import styles from './index.module.scss';
import { useDeleteNotification, useGetNotificationCount, useGetNotificationList, useReadNotification } from './service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NotificationItem = ({
  notification,
  onCloseNotiDropdown,
  refreshNotiCount,
  refreshNotiData
}: {
  notification: any,
  onCloseNotiDropdown?: () => void,
  refreshNotiCount?: () => void,
  refreshNotiData?: () => void,
}) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const requestReadNotification = useReadNotification({
    onSuccess: () => {
      console.log('xxx requestReadNotification 123');
    }
  });
  const requestDeleteNotification = useDeleteNotification({
    onSuccess: () => {
      refreshNotiData && refreshNotiData();
      console.log('xxx requestDeleteNotification 123');
    }
  });

  const onReadNoti = () => {
    requestReadNotification.run(notification.id);
    const resourceData: any = JSON.parse(notification.resource);
    const postId = resourceData?.passProps?.item?.id;
    router.push(ROUTE_PATH.POST_DETAIL(postId));
    setTimeout(() => {
      refreshNotiCount && refreshNotiCount();
    }, 300);
    onCloseNotiDropdown && onCloseNotiDropdown();
  };

  const onDeleteNoti = () => {
    requestDeleteNotification.run(notification.id);
  };

  return (
    <div className='flex justify-between p-[12px] border-solid border-b-[1px] border-[#EBEBEB] bg-[white] hover:bg-[#EBEBEB]'>
      <div className='flex gap-[10px] items-center laptop:max-w-[270px] mobile:max-w-[60vw]'>
        <img
          src={notification.readStatus ? notification.iconRead : notification.icon}
          alt=''
          className='h-[50px] w-[50px]'
        />
        <div className='flex flex-col w-[80%]'>
          <Text className='cursor-pointer text-[#394251]' onClick={onReadNoti}>{notification.caption}</Text>
          <div
            className='text-[#0D0D0D]'
            dangerouslySetInnerHTML={{ __html: notification.readStatus ? notification.messageRead : notification.message }}
          />
        </div>
      </div>

      <div className='flex flex-col justify-around min-w-[80px]'>
        <Text type='body-12-medium' color='neutral-5' className='text-right'>{notification.time && dayjs(notification.time)?.locale(i18n.language)?.fromNow()}</Text>
        <div className='flex justify-end'
        >
          <img
            src='/static/icons/black_close_icon.svg'
            alt=''
            className='h-[12px] w-[12px] cursor-pointer'
            onClick={onDeleteNoti}
          />
        </div>
      </div>
    </div >
  );
};

const NotificationTabs = ({
  onCloseNotiDropdown,
  refreshNotiCount
}: {
  onCloseNotiDropdown?: () => void,
  refreshNotiCount?: () => void
}) => {
  const { t } = useTranslation('common');
  const defaultActiveTab = 'userNoti';
  const { data: notiData, refresh: refreshNotiData } = useGetNotificationList({});

  return (
    <Tabs defaultActiveKey={defaultActiveTab} className={styles.tabLogin}>
      <TabPane tab='Other' key='userNoti'>
        <div className={styles.notiList}>
          {notiData?.data.map((item: any) => (
            <NotificationItem
              notification={item}
              key={item.id}
              onCloseNotiDropdown={onCloseNotiDropdown}
              refreshNotiCount={refreshNotiCount}
              refreshNotiData={refreshNotiData}
            />
          ))}
        </div>
      </TabPane>
      <TabPane tab='Pinetree' key='pinetreeNoti'>
        <div className='bg-[white] p-[12px]'>
          <div className='flex flex-col justify-center items-center border border-dashed rounded-xl py-[28px] border-[#CCCCCC] bg-[#F7F6F8]'>
            <Text type='body-20-semibold'>{t('no_recent_notification')}</Text>
            <Text type='body-14-regular' className='text-[#999999] mt-3'>{t('no_recent_notification_desc')}</Text>
          </div>
        </div>
      </TabPane>
    </Tabs>
  );
};

const NotificationsMobile = forwardRef((_, ref) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [openNotification, setOpenNotification] = useAtom(notificationMobileAtom);
  const [, setOpenProfileMenu] = useAtom(openProfileAtom);
  const [, setIsShowNavigate] = useSidebarMobile();

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
        <div className='flex items-center cursor-pointer' onClick={() => console.log('xxx read all')}>
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
        <NotificationTabs />
      </div>

    </Fade>
  );
});

const Notifications = () => {
  const { t } = useTranslation('common');
  const isLogin = !!getAccessToken();
  const { isMobile } = useResponsive();
  const [dropdownVisible, setdropdownVisible] = useState(false);
  const { notiCount, refreshNotiCount } = useGetNotificationCount();
  const requestReadNotification = useReadNotification({
    onSuccess: () => {
      console.log('xxx requestReadNotification 234');
    }
  });

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

  const NotificationOverlay = () => (
    <div className='w-[375px] rounded-lg border-none bg-white py-[20px] shadow-md'>
      <div className='flex justify-between mb-[20px] px-5' >
        <Text type='body-20-semibold'>
          {t('notification')}
        </Text>
        <div className='flex items-center cursor-pointer' onClick={() => console.log('xxx read all')}>
          <img
            src='/static/icons/blue_check_mark.svg'
            alt=''
            className='h-[20px] w-[20px] mr-3'
          />
          <Text type='body-14-semibold' color='primary-2'>
            {t('mark_all_as_read')}
          </Text>
        </div>
      </div >

      <NotificationTabs onCloseNotiDropdown={onCloseNotiDropdown} refreshNotiCount={refreshNotiCount} />
    </div >
  );

  const NotificationBadge = () => {
    return (
      <>
        {isMobile ? (
          <div className='ta flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#F8F8F8] relative'>
            <img
              src='/static/icons/iconBell.svg'
              alt='Icon notification'
              className='h-[23px] w-[23px]'
              onClick={goToNotification}
            />
            <div className='absolute bg-[#FF3B3B] rounded-full top-0 right-[-5px]'>
              <Text className='text-[10px] font-[700] text-white px-1'>{notiCount}</Text>
            </div>
          </div>
        ) : (
          <div className='items-center mobile:hidden tablet:flex relative'>
            <Dropdown
              trigger={['click']}
              animation='slide-up'
              overlay={<NotificationOverlay />}
              placement='bottomRight'
              onVisibleChange={onDropdownVisibleChange}
              visible={dropdownVisible}
            >
              <div className='ta flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#F8F8F8]'>
                <img
                  src='/static/icons/iconBell.svg'
                  alt='Icon notification'
                  className='h-[23px] w-[23px]'
                />
              </div>
            </Dropdown>
            <div className='absolute bg-[#FF3B3B] rounded-full top-0 right-[-5px]' onClick={() => requestReadNotification.run('db4e7eb1-560a-4003-933d-a2793a422b9d')}>
              <Text className='text-[10px] font-[700] text-white px-1'>{notiCount}</Text>
            </div>
          </div>
        )}
      </>
    );
  };

  if (!isLogin) {
    return null;
  }

  return (
    <>
      <NotificationBadge />
      {isMobile && (<NotificationsMobile ref={notiMobileRef} />)}
    </>
  );
};

export default Notifications;
