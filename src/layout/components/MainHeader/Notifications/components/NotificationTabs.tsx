/* eslint-disable unicorn/no-useless-spread */
import { forwardRef, useState } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import CustomImage from '@components/UI/CustomImage';
import Text from '@components/UI/Text';
import { notificationAtom } from '@store/notification/notification';
import { POST_DETAIL, PROFILE_V2 } from 'src/constant/route';

import styles from '../index.module.scss';
import {
  useDeleteNotification,
  useGetNotificationList,
  useGetPinetreeNotificationList,
  useReadNotification,
  useReadPinetreeNotification,
} from '../service';

const EmptyNotification = () => {
  const { t } = useTranslation('common');

  return (
    <div className='bg-[white] p-[12px]'>
      <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-[#CCCCCC] bg-[#F7F6F8] py-[28px]'>
        <Text type='body-16-semibold'>{t('no_recent_notification')}</Text>
        <Text type='body-12-regular' className='mt-3 text-center text-[#999999]'>
          {t('no_recent_notification_desc')}
        </Text>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NotificationItem = ({
  notification,
  onCloseNotiDropdown,
}: {
  notification: any;
  onCloseNotiDropdown?: () => void;
}) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const requestReadNotification = useReadNotification({});
  const [notiStore] = useAtom(notificationAtom);
  const requestReadPinetreeNotification = useReadPinetreeNotification({});
  const requestDeleteNotification = useDeleteNotification({
    onSuccess: () => {
      notiStore.refreshNotiData && notiStore.refreshNotiData();
      notiStore.refreshPinetreeNotiData && notiStore.refreshPinetreeNotiData();
    },
  });
  const resourceData: any = JSON.parse(notification.resource);
  const disabledNoti = resourceData.actionType === 'PINETREE_MKT' && !resourceData.url_notification;

  const onReadNoti = () => {
    if (!notification.readStatus) {
      if (notification.type === 'PINETREE_MKT') {
        requestReadPinetreeNotification.run(notification.id);
      } else {
        requestReadNotification.run(notification.transactionId);
      }
      setTimeout(() => {
        notiStore.refreshNotiCount && notiStore.refreshNotiCount();
      }, 300);
      onCloseNotiDropdown && onCloseNotiDropdown();
    }
    if (!disabledNoti) {
      const contentId = resourceData?.passProps?.item?.id;
      if (resourceData.notificationType === 'NEW_FOLLOWER') {
        router.push(PROFILE_V2(resourceData?.passProps?.item?.display_name, contentId));
      } else if (resourceData.actionType === 'PINETREE_MKT') {
        resourceData.url_notification && window.open(resourceData.url_notification, '_blank');
      } else {
        const id = resourceData?.passProps?.item?.slug;
        if (id === '%%SLUG%%') {
          router.push(POST_DETAIL(contentId));
        } else if (id === router.asPath.slice(1)) {
          router.reload();
        } else {
          router.push(`/${id}`);
        }
      }
    }
  };

  const onDeleteNoti = () => {
    requestDeleteNotification.run(notification.id);
    setTimeout(() => {
      notiStore.refreshNotiCount && notiStore.refreshNotiCount();
    }, 300);
  };

  return (
    <div className='flex items-center gap-[10px] border-b-[1px] border-solid border-[#EBEBEB] bg-[white] p-[12px] hover:bg-[#F7F6F8]'>
      <CustomImage
        src={notification.readStatus ? notification.iconRead : notification.icon}
        alt='noti_icon'
        width='0'
        height='0'
        sizes='100vw'
        className={classNames('h-[50px] w-[50px] cursor-pointer', {
          '!cursor-auto': disabledNoti,
        })}
        onClick={onReadNoti}
      />

      <div className='flex w-full flex-col gap-[8px]'>
        <div className='flex items-center justify-between'>
          <Text
            onClick={onReadNoti}
            className={classNames('cursor-pointer text-[#394251]', {
              'text-[#999]': notification.readStatus,
              '!cursor-auto': disabledNoti,
            })}
          >
            {notification.caption}
          </Text>
          <Text type='body-12-medium' color='neutral-5' className='text-right'>
            {notification.time && dayjs(notification.time)?.locale(i18n.language)?.fromNow()}
          </Text>
        </div>
        <div className='flex items-end justify-between'>
          <div
            onClick={onReadNoti}
            className={classNames(
              'cursor-pointer overflow-hidden text-ellipsis text-[#0D0D0D] mobile:max-w-[60vw] laptop:max-w-[250px]',
              {
                'text-[#999]': notification.readStatus,
                '!cursor-auto': disabledNoti,
              },
            )}
            dangerouslySetInnerHTML={{
              __html: notification.readStatus ? notification.messageRead : notification.message,
            }}
          />
          <CustomImage
            src='/static/icons/black_close_icon.svg'
            alt='noti_close'
            width='0'
            height='0'
            sizes='100vw'
            className='z-[999] h-[16px] w-[16px] cursor-pointer'
            onClick={onDeleteNoti}
          />
        </div>
      </div>
    </div>
  );
};

const NotificationTabs = ({ onCloseNotiDropdown }: { onCloseNotiDropdown?: () => void }) => {
  const { t } = useTranslation('common');
  const defaultActiveTab = 'userNoti';
  const [, setNotiStore] = useAtom(notificationAtom);
  const [curTab, setCurTab] = useState<string>(defaultActiveTab);
  const { data: userNoti, refresh: refreshNotiData } = useGetNotificationList({
    onSuccess: (res: any) => {
      setNotiStore((prev) => {
        return {
          ...prev,
          refreshNotiData,
          userNoti: res?.data,
        };
      });
    },
  });
  const { data: pinetreeNoti, refresh: refreshPinetreeNotiData } = useGetPinetreeNotificationList({
    onSuccess: (res: any) => {
      setNotiStore((prev) => {
        return {
          ...prev,
          refreshPinetreeNotiData,
          pinetreeNoti: res?.data,
        };
      });
    },
  });

  const handleChangeTab = (tabKey: string) => {
    setCurTab(tabKey);
  };

  return (
    <Tabs activeKey={curTab} className={styles.tabLogin} onChange={handleChangeTab}>
      <TabPane tab={t('latest')} key='userNoti'>
        {userNoti?.data?.length > 0 ? (
          <div className={styles.notiList}>
            {userNoti?.data?.map((item: any) => (
              <NotificationItem
                notification={item}
                key={item.id}
                onCloseNotiDropdown={onCloseNotiDropdown}
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
