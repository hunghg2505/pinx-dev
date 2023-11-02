/* eslint-disable unicorn/no-useless-spread */
import { useEffect } from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import Dropdown from 'rc-dropdown';

import CustomImage from '@components/UI/CustomImage';
import Text from '@components/UI/Text';
import { notificationAtom } from '@store/notification/notification';

import NotificationTabs from './NotificationTabs';
import styles from '../index.module.scss';
import { useDeleteAllNotification, useReadAllNotification } from '../service';

const NotificationOverlay = ({ onCloseNotiDropdown }: { onCloseNotiDropdown: () => void }) => {
  const { t } = useTranslation('common');
  const [notiStore, setNotiStore] = useAtom(notificationAtom);
  const isHaveNotiList =
    (notiStore?.userNoti && notiStore?.userNoti?.length > 0) ||
    (notiStore?.pinetreeNoti && notiStore?.pinetreeNoti?.length > 0);
  const requestReadAllNotification = useReadAllNotification({
    onSuccess: () => {
      onUpdateNotification();
    },
  });
  const requestDeleteAllNotification = useDeleteAllNotification({
    onSuccess: () => {
      onUpdateNotification();
    },
  });

  const onUpdateNotification = () => {
    notiStore.refreshNotiCount && notiStore.refreshNotiCount();
    notiStore.refreshNotiData && notiStore.refreshNotiData();
    notiStore.refreshPinetreeNotiData && notiStore.refreshPinetreeNotiData();
  };

  const readAllNoti = () => {
    notiStore.notiCount > 0 && requestReadAllNotification.run();
  };

  const deleteAllNoti = () => {
    isHaveNotiList && requestDeleteAllNotification.run();
  };

  useEffect(() => {
    setNotiStore((prev) => ({
      ...prev,
      defaultNotiTab: 'userNoti'
    }));
  }, []);

  return (
    <div className='w-[375px] rounded-lg border-none bg-white py-[20px] shadow-[0px_9px_28px_8px_rgba(0,_0,_0,_0.05),_0px_6px_16px_0px_rgba(0,_0,_0,_0.08),_0px_3px_6px_-4px_rgba(0,_0,_0,_0.12)]'>
      <div className='mb-[20px] flex justify-between px-5'>
        <Text type='body-20-semibold'>{t('notification')}</Text>
        <Dropdown
          trigger={['click']}
          animation='slide-up'
          overlay={
            <div className='flex w-[320px] flex-col rounded-md bg-white p-3 shadow-[0px_9px_28px_8px_rgba(0,0,0,0.05),0px_6px_16px_0px_rgba(0,0,0,0.08),0px_3px_6px_-4px_rgba(0,0,0,0.12)]'>
              <div
                className={classNames(
                  'flex cursor-pointer items-center rounded-md p-4 hover:bg-[#F7F6F8]',
                  {
                    'cursor-pointer': notiStore.notiCount > 0,
                  },
                )}
                onClick={readAllNoti}
              >
                {notiStore.notiCount > 0 ? (
                  <CustomImage
                    src='/static/icons/blue_check_mark.svg'
                    alt='check_mark'
                    width='0'
                    height='0'
                    sizes='100px'
                    className='mr-3 h-[20px] w-[20px]'
                  />
                ) : (
                  <CustomImage
                    src='/static/icons/gray_check_mark.svg'
                    alt='check_mark'
                    width='0'
                    height='0'
                    sizes='100px'
                    className='mr-3 h-[20px] w-[20px]'
                  />
                )}
                <Text
                  type='body-14-semibold'
                  color={notiStore.notiCount > 0 ? 'primary-2' : 'neutral-5'}
                >
                  {t('mark_all_as_read')}
                </Text>
              </div>
              <div
                className={classNames(
                  'flex cursor-pointer items-center rounded-md p-4 hover:bg-[#F7F6F8]',
                  {
                    'cursor-pointer': isHaveNotiList,
                  },
                )}
                onClick={deleteAllNoti}
              >
                {isHaveNotiList ? (
                  <CustomImage
                    src='/static/icons/icon_delete_red.svg'
                    alt='delete'
                    width='0'
                    height='0'
                    sizes='100px'
                    className='mr-3 h-[20px] w-[20px]'
                  />
                ) : (
                  <CustomImage
                    src='/static/icons/iconDelete.svg'
                    alt='delete'
                    width='0'
                    height='0'
                    sizes='100px'
                    className='mr-3 h-[20px] w-[20px]'
                  />
                )}
                <Text
                  type='body-14-semibold'
                  className={isHaveNotiList ? 'text-[#DA314F]' : 'text-[--neutral-5]'}
                >
                  {t('delete_all')}
                </Text>
              </div>
            </div>
          }
          overlayClassName={styles.customDropdown}
        >
          <CustomImage
            src='/static/icons/icon_more_options.svg'
            alt='more_options'
            width='0'
            height='0'
            sizes='100px'
            className='h-[32px] w-[32px] cursor-pointer rounded-full p-[4px] hover:bg-[#F7F6F8]'
          />
        </Dropdown>
      </div>

      <NotificationTabs onCloseNotiDropdown={onCloseNotiDropdown} />
    </div>
  );
};

export default NotificationOverlay;
