/* eslint-disable unicorn/no-useless-spread */
import { useRef, useState } from 'react';

import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';

import CustomImage from '@components/UI/CustomImage';
import Text from '@components/UI/Text';
import { notificationAtom } from '@store/notification/notification';

import NotificationTabs from './NotificationTabs';
import { useReadAllNotification } from '../service';

const NotificationOverlay = ({
  onCloseNotiDropdown,
  refreshNotiCount,
}: {
  onCloseNotiDropdown: () => void,
  refreshNotiCount: () => void,
}) => {
  const { t } = useTranslation('common');
  const [notiStore] = useAtom(notificationAtom);
  const [hideReadAllButton, setHideReadAllButton] = useState(false);
  const requestReadAllNotification = useReadAllNotification({
    onSuccess: () => {
      refreshNotiCount();
      refreshNotiData();
    }
  });
  const notiTabsRef = useRef<any>(null);

  const refreshNotiData = () => {
    notiTabsRef.current.refreshNotiData && notiTabsRef.current.refreshNotiData();
  };

  const readAllNoti = () => {
    requestReadAllNotification.run();
  };

  return (
    <div className='w-[375px] rounded-lg border-none bg-white py-[20px] shadow-[0px_9px_28px_8px_rgba(0,_0,_0,_0.05),_0px_6px_16px_0px_rgba(0,_0,_0,_0.08),_0px_3px_6px_-4px_rgba(0,_0,_0,_0.12)]'>
      <div className='flex justify-between mb-[20px] px-5' >
        <Text type='body-20-semibold'>
          {t('notification')}
        </Text>
        {!hideReadAllButton && (
          <div className='flex items-center cursor-pointer' onClick={readAllNoti}>
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
      </div >

      <NotificationTabs
        ref={notiTabsRef}
        onCloseNotiDropdown={onCloseNotiDropdown}
        refreshNotiCount={refreshNotiCount}
        setHideReadAllButton={setHideReadAllButton}
      />
    </div >
  );
};


export default NotificationOverlay;

