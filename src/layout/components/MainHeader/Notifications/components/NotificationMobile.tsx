/* eslint-disable unicorn/no-useless-spread */
import { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react';

import { useMount } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Dropdown from 'rc-dropdown';
import { isAndroid, isChrome, isIOS, isSafari } from 'react-device-detect';

import CustomImage from '@components/UI/CustomImage';
import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';
import { notificationAtom } from '@store/notification/notification';
import { openProfileAtom } from '@store/profile/profile';
import { notificationMobileAtom } from '@store/sidebarMobile/notificationMobile';
import { useSidebarMobile } from '@store/sidebarMobile/sidebarMobile';

import NotificationTabs from './NotificationTabs';
import styles from '../index.module.scss';
import { useDeleteAllNotification, useReadAllNotification } from '../service';

const NotificationsMobile = (_: any, ref?: any) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [openNotification, setOpenNotification] = useAtom(notificationMobileAtom);
  const [notiStore] = useAtom(notificationAtom);
  const [, setOpenProfileMenu] = useAtom(openProfileAtom);
  const [, setIsShowNavigate] = useSidebarMobile();
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
    notiStore.notiCount > 0 && requestReadAllNotification.run();
  };

  const deleteAllNoti = () => {
    isHaveNotiList && requestDeleteAllNotification.run();
  };

  return (
    <Fade
      visible={openNotification}
      className={classNames(
        'fixed left-[100%] top-0 z-[9999] h-[100vh] w-full overflow-y-auto bg-[#F8FAFD] px-4 pt-[12px] [transition:0.3s] laptop:hidden',
        {
          '!left-0': openNotification,
          'pb-[100px]': isChrome && isIOS,
          'pb-[50px]': isChrome && isAndroid,
          'pb-[80px]': isSafari,
        },
      )}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img
            src='/static/icons/back_icon.svg'
            alt=''
            className='h-[21px] w-[21px] cursor-pointer'
            onClick={() => setOpenNotification(false)}
          />
          <Text type='body-20-semibold'>{t('notification')}</Text>
        </div>
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
      <div className='my-4'>
        <NotificationTabs />
      </div>
    </Fade>
  );
};

export default forwardRef(NotificationsMobile);
