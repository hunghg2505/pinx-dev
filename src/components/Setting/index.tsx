/* eslint-disable import/named */
import React, { useMemo, useState } from 'react';

import classNames from 'classnames';
// import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { SwitchChangeEventHandler } from 'rc-switch';
import Switch from 'rc-switch';
import { toast } from 'react-hot-toast';

import { NegativeMainButton } from '@components/UI/Button';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { useAuth } from '@store/auth/useAuth';
import { getLocaleCookie } from '@store/locale';
// import { openProfileAtom } from '@store/profile/profile';
import { ROUTE_PATH } from '@utils/common';
import { PHONE_CONTACT_SUPPORT, TERM_AND_CONDITION_LINK } from '@utils/constant';

import PopupHotline from './PopupHotline';
import PopupLanguage from './PopupLanguage';
import { useGetSettings, useUpdateSetting } from './service';

interface ISettingItem {
  title: string;
  value?: string;
  path?: string;
  isNew?: boolean;
  action?: () => void;
  hideArrow?: boolean;
  hidden?: boolean;
  linkStyle?: boolean;
  hideDivider?: boolean;
  disableClick?: boolean;
}

const Setting = () => {
  const { t } = useTranslation('setting');
  const router = useRouter();
  const currentLang = getLocaleCookie() || 'en';
  const [popupLanguageVisible, setPopupLanguageVisible] = useState(false);
  const [popupHotlineVisible, setPopupHotlineVisible] = useState(false);
  const { onLogout, isLogin } = useAuth();
  const { data: settingsData, loading } = useGetSettings();
  const { isMobile } = useResponsive();
  const { isDesktop } = useResponsive();
  // const [, setOpenProfileMenu] = useAtom(openProfileAtom);
  // const fromProfileMenu = router.query.from_profile_menu;

  const requestUpdateSetting = useUpdateSetting({
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const SETTINGS = useMemo(() => {
    return [
      {
        title: t('language'),
        value: currentLang === 'vi' ? ' Tiếng Việt' : 'English',
        action: () => onTogglePopupLanguage(),
        hideDivider: !isMobile && !isLogin,
      },
      {
        title: t('change_password'),
        path: ROUTE_PATH.SETTING_CHANGE_PASSWORD,
        hidden: !isLogin,
      },
      {
        title: t('change_username'),
        path: ROUTE_PATH.SETTING_CHANGE_USERNAME,
        isNew: true,
        hidden: !isLogin,
        hideDivider: !isMobile,
      },
    ];
  }, [currentLang, isMobile, isLogin, t]);

  const PINEX_HELP = useMemo(() => {
    return [
      {
        title: `${t('version')} 2.1.1`,
        hideArrow: true,
        hideDivider: !isMobile,
        disableClick: true,
      },
      {
        title: t('disclosure'),
        action: () => window.open(TERM_AND_CONDITION_LINK),
        linkStyle: !isMobile,
        hideDivider: !isMobile,
        hideArrow: !isMobile,
      },
      // {
      //   title: 'Guidance',
      //   action: () => window.open(TERM_AND_CONDITION_LINK),
      //   linkStyle: !isMobile,
      //   hideDivider: !isMobile,
      //   hideArrow: !isMobile,
      // },
      {
        title: t('hotline'),
        action: () => {
          if (isDesktop) {
            onTogglePopupHotline();
          } else {
            window.open(PHONE_CONTACT_SUPPORT, '_self');
          }
        },
        linkStyle: !isMobile,
        hideDivider: !isMobile,
        hideArrow: !isMobile,
      },
      {
        title: t('log_out'),
        action: () => onLogout(),
        linkStyle: !isMobile,
        hideDivider: !isMobile,
        hideArrow: !isMobile,
        hidden: isMobile || !isLogin,
      },
    ];
  }, [isMobile, isLogin]);

  const renderListItem = (item: ISettingItem, index: number) => {
    return (
      !item.hidden && (
        <div
          onClick={() => {
            if (!item.disableClick) {
              if (item.action) {
                item.action();
              } else {
                router.push(item.path || '');
              }
            }
          }}
          key={index}
          className={classNames(
            ' flex cursor-pointer items-center justify-between border-b-[1px] border-solid border-[--neutral-7] py-[14px] laptop-max:px-4',
            {
              'border-none': item.hideDivider,
              'cursor-auto': item.disableClick,
            },
          )}
        >
          <div className='flex items-center'>
            <Text type='body-14-regular' color={item.linkStyle ? 'primary-2' : 'cbblack'}>
              {item.title}
            </Text>
            {item.isNew && (
              <div className='ml-[10px] rounded-[4px] bg-[#D87737] px-[6px] py-[3px] text-white'>
                {t('new')}
              </div>
            )}
          </div>

          <div className='flex items-center'>
            {item.value && <Text type='body-12-regular'>{item.value}</Text>}
            {!item.hideArrow && (
              <img
                src='/static/icons/icon_arrow_right.svg'
                alt=''
                width='0'
                height='0'
                sizes='100vw'
                className='h-[20px] w-[20px]'
              />
            )}
          </div>
        </div>
      )
    );
  };

  const onChangeShareWatchlist: SwitchChangeEventHandler = (value) => {
    requestUpdateSetting.run('share_watchlist', value ? '1' : '0');
  };

  const onTogglePopupLanguage = () => {
    setPopupLanguageVisible(!popupLanguageVisible);
  };

  const onTogglePopupHotline = () => {
    setPopupHotlineVisible(!popupHotlineVisible);
  };

  // const onBack = () => {
  //   if (fromProfileMenu) {
  //     setOpenProfileMenu(true);
  //   }
  //   router.back();
  // };

  if (loading) {
    return <></>;
  }
  return (
    <>
      <PopupLanguage visible={popupLanguageVisible} onToggle={onTogglePopupLanguage} />
      <PopupHotline visible={popupHotlineVisible} onToggle={onTogglePopupHotline} />

      <div className='relative rounded-[8px] bg-white text-left first-letter:w-full mobile-max:mt-[24px] laptop:px-[22px] laptop:py-[20px]'>
        {/* <img
          src='/static/icons/back_icon.svg'
          alt=''
          width='0'
          height='0'
          className='ml-[8px] mt-[18px] h-[28px] w-[28px] cursor-pointer laptop:absolute laptop:left-[10px] laptop:top-[3px] laptop:hidden'
          onClick={onBack}
        /> */}
        <Text className='mb-1 text-[20px] font-[700] mobile:pt-6 laptop-max:ml-4 laptop:pt-0 laptop:text-left laptop:text-[28px]'>
          {t('settings')}
        </Text>
        <div className='ml-[-24px] mt-5 w-[calc(100%+48px)] border-b-[1px] border-solid border-[#EEF5F9] mobile:hidden laptop:block' />
        {SETTINGS.map((item: any, index: number) => renderListItem(item, index))}

        {isLogin && (
          <div className='ml-[-24px] mt-[20px] w-[calc(100%+48px)] border-b-[1px] border-solid border-[#EEF5F9] mobile:hidden laptop:block' />
        )}
        {isLogin && (
          <>
            <Text type='body-20-semibold' className='mt-[20px] laptop-max:ml-4 tablet:!text-[16px]'>
              {t('social')}
            </Text>

            <div className='flex cursor-pointer items-center justify-between border-b-[1px] border-solid border-[--neutral-7] py-[14px] laptop-max:px-4 laptop:border-none'>
              <Text type='body-14-regular'>{t('share_watchinglist')}</Text>

              <Switch
                defaultChecked={settingsData?.data?.share_watchlist === '1'}
                onChange={onChangeShareWatchlist}
              />
            </div>
          </>
        )}

        <div className='ml-[-24px] mt-[20px] w-[calc(100%+48px)] border-b-[1px] border-solid border-[#EEF5F9] mobile:hidden laptop:block' />

        <Text type='body-20-semibold' className='mt-[20px] laptop-max:ml-4 tablet:!text-[16px]'>
          PineX
        </Text>

        {PINEX_HELP.map((item: any, index: number) => renderListItem(item, index))}

        {isLogin && (
          <div className='px-4 laptop:hidden'>
            <NegativeMainButton
              onClick={() => onLogout()}
              className='my-14 flex h-[40px] w-full items-center justify-center'
            >
              <Text type='body-14-semibold'>{t('log_out')}</Text>
            </NegativeMainButton>
          </div>
        )}
      </div>
    </>
  );
};

export default Setting;
