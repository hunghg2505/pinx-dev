/* eslint-disable unicorn/no-useless-spread */
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

import NotificationTabs from './NotificationTabs';
import { useReadAllNotification } from '../service';

const NotificationOverlay = ({
  onCloseNotiDropdown,
  refreshNotiCount
}: {
  onCloseNotiDropdown: () => void,
  refreshNotiCount: () => void,
}) => {
  const { t } = useTranslation('common');
  const requestReadAllNotification = useReadAllNotification({});

  const readAllNoti = () => {
    requestReadAllNotification.run();
  };

  return (
    <div className='w-[375px] rounded-lg border-none bg-white py-[20px] shadow-[0px_9px_28px_8px_rgba(0,_0,_0,_0.05),_0px_6px_16px_0px_rgba(0,_0,_0,_0.08),_0px_3px_6px_-4px_rgba(0,_0,_0,_0.12)]'>
      <div className='flex justify-between mb-[20px] px-5' >
        <Text type='body-20-semibold'>
          {t('notification')}
        </Text>
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
      </div >

      <NotificationTabs onCloseNotiDropdown={onCloseNotiDropdown} refreshNotiCount={refreshNotiCount} />
    </div >
  );
};


export default NotificationOverlay;

