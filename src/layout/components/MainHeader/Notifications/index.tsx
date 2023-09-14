/* eslint-disable unicorn/no-useless-spread */
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { useMount } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Dropdown from 'rc-dropdown';
import Menu from 'rc-menu';
import Tabs, { TabPane } from 'rc-tabs';

import { WhiteButton } from '@components/UI/Button';
import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { getAccessToken } from '@store/auth';
import { openProfileAtom } from '@store/profile/profile';
import { notificationMobileAtom } from '@store/sidebarMobile/notificationMobile';
import { useSidebarMobile } from '@store/sidebarMobile/sidebarMobile';

import styles from './index.module.scss';

const mockData = [
  {
    id: 1,
    type: 'comment',
    content: 'Clark Kent has commented on your post',
    time: '31m',
    isRead: true,
  },
  {
    id: 2,
    type: 'reaction',
    content: 'Clark Kent & 200 people liked your post',
    time: '2 months',
    isRead: true,
  },
  {
    id: 3,
    type: 'subscribe',
    content: '[Potential Stocks] has a new subscriber',
    time: '1 year',
    isRead: false,
  },
  {
    id: 4,
    type: 'mention',
    content: 'Robbin Klevar has commented on your post',
    time: '3s',
    isRead: false,
  }
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NotificationItem = ({ notification, onCloseNotiDropdown }: { notification: any, onCloseNotiDropdown?: () => void }) => {
  const index = mockData.indexOf(notification);
  const calcNotificationSymbol = () => {
    switch (notification.type) {
      case 'comment': {
        return `/static/icons/notification_comment${notification.isRead ? '_disabled' : ''}.svg`;
      }
      case 'reaction': {
        return `/static/icons/notification_reaction${notification.isRead ? '_disabled' : ''}.svg`;
      }
      case 'subscribe': {
        return `/static/icons/notification_subscribe${notification.isRead ? '_disabled' : ''}.svg`;
      }
      case 'mention': {
        return `/static/icons/notification_mention${notification.isRead ? '_disabled' : ''}.svg`;
      }
    }
  };

  const calcNotificationTitle = () => {
    switch (notification.type) {
      case 'comment': {
        return 'New comment';
      }
      case 'reaction': {
        return 'Reaction';
      }
      case 'subscribe': {
        return 'New subscriber';
      }
      case 'mention': {
        return 'New mention';
      }
    }
  };

  const onReadNoti = () => {
    onCloseNotiDropdown && onCloseNotiDropdown();
  };

  return (
    <div className='flex justify-between p-[12px] border-solid border-b-[1px] border-[#EBEBEB] bg-[white] hover:bg-[#EBEBEB]'>
      <div className='flex gap-[10px] items-center'>
        <img
          src={calcNotificationSymbol()}
          alt=''
          className='h-[36px] w-[36px]'
        />
        <div className='flex flex-col w-[80%]'>
          <Text className='cursor-pointer' onClick={onReadNoti}>{calcNotificationTitle()}</Text>
          <Text>{notification.content}</Text>
        </div>
      </div>

      <div className='flex flex-col justify-around min-w-[60px]'>
        <Text type='body-12-medium' color='neutral-5' className='text-right'>{notification.time}</Text>
        <div className='flex justify-end'
        >
          <img
            src='/static/icons/black_close_icon.svg'
            alt=''
            className='h-[12px] w-[12px] cursor-pointer'
            onClick={() => mockData.splice(index, 1)}
          />
        </div>
      </div>
    </div >
  );
};

const NotificationTabs = ({ onCloseNotiDropdown }: { onCloseNotiDropdown?: () => void }) => {
  const { t } = useTranslation('common');
  const defaultActiveTab = 'userNoti';

  return (
    <Tabs defaultActiveKey={defaultActiveTab} className={styles.tabLogin}>
      <TabPane tab='Other' key='userNoti'>
        {mockData.map((item) => (
          <NotificationItem notification={item} key={item.id} onCloseNotiDropdown={onCloseNotiDropdown} />
        ))}
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
      <div className='flex justify-between'>
        <Text type='body-20-semibold'>{t('notification')}</Text>
        <img
          src='/static/icons/black_close_icon.svg'
          alt=''
          className='h-[21px] w-[21px]'
          onClick={() => setOpenNotification(false)}
        />
      </div>

      <WhiteButton onClick={() => { }} className='w-full flex justify-center mt-4 shadow-[0px_1px_2px_0px_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08);]'>
        <img
          src='/static/icons/blue_check_mark.svg'
          alt=''
          className='h-[20px] w-[20px] mr-3'
        />
        {t('mark_all_as_read')}
      </WhiteButton>

      <div className='mt-4'>
        <NotificationTabs />
      </div>

      <WhiteButton onClick={() => console.log('xxx read all')} className='w-full flex justify-center mt-4 shadow-[0px_1px_2px_0px_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08);]'>
        <img
          src='/static/icons/blue_check_mark.svg'
          alt=''
          className='h-[20px] w-[20px] mr-3'
        />
        {t('mark_all_as_read')}
      </WhiteButton>

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

  const notiMobileRef = useRef<any>(null);

  const onDropdownVisibleChange = (visible: boolean) => {
    setdropdownVisible(visible);
  };

  const onCloseNotiDropdown = () => {
    setdropdownVisible(false);
  };

  const goToNotification = () => {
    notiMobileRef.current.onVisible && notiMobileRef.current.onVisible();
  };

  const NotificationOverlay = () => (
    <Menu multiple className='w-[375px] rounded-e-lg border-none bg-white py-[20px]'>
      <div className='flex justify-between mb-[20px] px-5'>
        <Text type='body-20-semibold'>
          {t('notification')}
        </Text>
        <div className='flex items-center cursor-pointer' onClick={() => { }}>
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

      <NotificationTabs onCloseNotiDropdown={onCloseNotiDropdown} />
    </Menu>

  );

  const NotificationBadge = () => {
    return (
      <>
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
          <div className='items-center mobile:hidden tablet:flex'>
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
      <NotificationsMobile ref={notiMobileRef} />
    </>
  );
};

export default Notifications;
