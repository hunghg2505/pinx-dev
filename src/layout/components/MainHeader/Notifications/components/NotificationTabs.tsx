/* eslint-disable no-console */
/* eslint-disable unicorn/no-useless-spread */
import { forwardRef, useImperativeHandle, useState } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import CustomImage from '@components/UI/CustomImage';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

import styles from '../index.module.scss';
import { useDeleteNotification, useGetNotificationList, useGetPinetreeNotificationList, useReadNotification } from '../service';

const EmptyNotification = () => {
  const { t } = useTranslation('common');

  return (
    <div className='bg-[white] p-[12px]'>
      <div className='flex flex-col justify-center items-center border border-dashed rounded-xl py-[28px] border-[#CCCCCC] bg-[#F7F6F8]'>
        <Text type='body-20-semibold'>{t('no_recent_notification')}</Text>
        <Text type='body-14-regular' className='text-[#999999] mt-3 text-center'>{t('no_recent_notification_desc')}</Text>
      </div>
    </div>
  );
};

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
  const requestReadNotification = useReadNotification({});
  const requestDeleteNotification = useDeleteNotification({
    onSuccess: () => {
      refreshNotiData && refreshNotiData();
    }
  });

  const onReadNoti = () => {
    requestReadNotification.run(notification.id);
    const resourceData: any = JSON.parse(notification.resource);
    const contentId = resourceData?.passProps?.item?.id;
    if (resourceData.notificationType === 'NEW_FOLLOWER') {
      router.push(ROUTE_PATH.PROFILE_DETAIL(contentId));
    }
    else if (resourceData.actionType === 'PINETREE_MKT') {
      window.open(resourceData.url_notification, '_blank');
    }
    else {
      router.push(ROUTE_PATH.POST_DETAIL(contentId));
    }
    setTimeout(() => {
      refreshNotiCount && refreshNotiCount();
    }, 300);
    onCloseNotiDropdown && onCloseNotiDropdown();
  };

  const onDeleteNoti = () => {
    requestDeleteNotification.run(notification.id);
    setTimeout(() => {
      refreshNotiCount && refreshNotiCount();
    }, 300);
  };

  return (
    <div className='flex items-center gap-[10px] p-[12px] border-solid border-b-[1px] border-[#EBEBEB] bg-[white] hover:bg-[#F7F6F8]'>
      <CustomImage
        src={notification.readStatus ? notification.iconRead : notification.icon}
        alt='noti_icon'
        width='0'
        height='0'
        sizes='100vw'
        className='h-[50px] w-[50px] cursor-pointer'
        onClick={onReadNoti}
      />

      <div className='flex flex-col gap-[8px] w-full'>
        <div className='flex justify-between items-center'>
          <Text
            onClick={onReadNoti}
            className={classNames('text-[#394251] cursor-pointer', {
              'text-[#999]': notification.readStatus
            })}
          >{notification.caption}</Text>
          <Text type='body-12-medium' color='neutral-5' className='text-right'>{notification.time && dayjs(notification.time)?.locale(i18n.language)?.fromNow()}</Text>
        </div>
        <div className='flex justify-between items-end'>
          <div
            onClick={onReadNoti}
            className={classNames('text-[#0D0D0D] overflow-hidden text-ellipsis mobile:max-w-[60vw] laptop:max-w-[250px] cursor-pointer', {
              'text-[#999]': notification.readStatus
            })}
            dangerouslySetInnerHTML={{ __html: notification.readStatus ? notification.messageRead : notification.message }}
          />
          {notification.type !== 'PINETREE_MKT' && (
            <CustomImage
              src='/static/icons/black_close_icon.svg'
              alt='noti_close'
              width='0'
              height='0'
              sizes='100vw'
              className='h-[16px] w-[16px] cursor-pointer z-[999]'
              onClick={onDeleteNoti}
            />
          )}
        </div>
      </div>
    </div >
  );
};

const NotificationTabs = ({
  onCloseNotiDropdown,
  refreshNotiCount,
  setHideReadAllButton,
}: {
  onCloseNotiDropdown?: () => void,
  refreshNotiCount?: () => void,
  setHideReadAllButton?: (value: boolean) => void,
}, ref?: any) => {
  const { t } = useTranslation('common');
  const defaultActiveTab = 'userNoti';
  const [curTab, setCurTab] = useState<string>(defaultActiveTab);
  const { data: userNoti, refresh: refreshNotiData } = useGetNotificationList({});
  const { data: pinetreeNoti } = useGetPinetreeNotificationList({});

  useImperativeHandle(ref, () => ({ refreshNotiData }));

  const handleChangeTab = (tabKey: string) => {
    setCurTab(tabKey);
    if (tabKey === 'userNoti') {
      setHideReadAllButton && setHideReadAllButton(false);
    } else {
      setHideReadAllButton && setHideReadAllButton(true);
    }
  };

  return (
    <Tabs activeKey={curTab} className={styles.tabLogin} onChange={handleChangeTab}>
      <TabPane tab={t('notice')} key='userNoti'>
        {userNoti?.data?.length > 0 ? (
          <div className={styles.notiList}>
            {userNoti?.data?.map((item: any) => (
              <NotificationItem
                notification={item}
                key={item.id}
                onCloseNotiDropdown={onCloseNotiDropdown}
                refreshNotiCount={refreshNotiCount}
                refreshNotiData={refreshNotiData}
              />
            ))}
          </div>
        ) : (
          <EmptyNotification />
        )}
      </TabPane>
      <TabPane tab='Pinetree' key='pinetreeNoti'>
        {pinetreeNoti?.data?.length > 0 ? (
          <div className={styles.notiList}>
            {pinetreeNoti?.data?.map((item: any) => (
              <NotificationItem
                notification={item}
                key={item.id}
                onCloseNotiDropdown={onCloseNotiDropdown}
                refreshNotiCount={refreshNotiCount}
              />
            ))}
          </div>
        ) : (
          <EmptyNotification />
        )}
      </TabPane>
    </Tabs>
  );
};

export default forwardRef(NotificationTabs);