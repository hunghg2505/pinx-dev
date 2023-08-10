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
import { Logout } from '@utils/dataLayer';

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
  hoverEffect?: boolean;
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
        hideDivider: true,
        hoverEffect: true,
      },
      {
        title: t('change_password'),
        path: ROUTE_PATH.SETTING_CHANGE_PASSWORD,
        hidden: !isLogin,
        hideDivider: true,
        hoverEffect: true,
      },
      {
        title: t('change_username'),
        path: ROUTE_PATH.SETTING_CHANGE_USERNAME,
        isNew: true,
        hidden: !isLogin,
        hideDivider: !isMobile,
        hoverEffect: true,
      },
    ];
  }, [currentLang, isMobile, isLogin, t]);
  const onHandleLogout = () => {
    const date = new Date();
    onLogout();
    Logout(date);
  };
  const PINEX_HELP: any = useMemo(() => {
    return [
      {
        title: `${t('version')} 2.1.1`,
        hideArrow: true,
        hideDivider: true,
        disableClick: true,
      },
      {
        title: t('disclosure'),
        action: () => window.open(TERM_AND_CONDITION_LINK),
        linkStyle: false,
        hideDivider: true,
        hideArrow: !isMobile,
        hoverEffect: true,
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
        linkStyle: false,
        hideDivider: true,
        hideArrow: !isMobile,
        hoverEffect: true,
      },
      {
        title: t('log_out'),
        action: () => onHandleLogout(),
        linkStyle: !isMobile,
        hideDivider: !isMobile,
        hideArrow: !isMobile,
        hidden: isMobile || !isLogin,
        hoverEffect: true,
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
    <div className='desktop:p-0'>
      <PopupLanguage visible={popupLanguageVisible} onToggle={onTogglePopupLanguage} />
      <PopupHotline visible={popupHotlineVisible} onToggle={onTogglePopupHotline} />

      <div className='box-shadow card-style relative text-left first-letter:w-full laptop:py-[20px]'>
        {/* <img
          src='/static/icons/back_icon.svg'
          alt=''
          width='0'
          height='0'
          className='ml-[8px] mt-[18px] h-[28px] w-[28px] cursor-pointer laptop:absolute laptop:left-[10px] laptop:top-[3px] laptop:hidden'
          onClick={onBack}
        /> */}
        <div className='laptop:px-[22px] '>
          <Text
            type='body-24-semibold'
            className='mb-1 mobile:pt-6 laptop-max:ml-4 tablet:!text-[28px] tablet:!font-bold laptop:pt-0 laptop:text-left'
          >
            {t('settings')}
          </Text>
          <div className='ml-[-24px] mt-5 w-[calc(100%+48px)] border-b-[1px] border-solid border-[#EEF5F9] mobile:hidden laptop:block' />
        </div>

        {SETTINGS.map((item: any, index: number) => (
          <div
            className={classNames('rounded-lg   laptop:px-[22px]', {
              'hover:bg-neutral_08': item.hoverEffect,
            })}
            key={index}
          >
            {renderListItem(item, index)}
          </div>
        ))}

        <div className='laptop:px-[22px]'>
          {isLogin && (
            <div className='ml-[-24px] mt-[20px] w-[calc(100%+48px)] border-b-[1px] border-solid border-[#EEF5F9] mobile:hidden laptop:block' />
          )}
          {isLogin && (
            <>
              <Text
                type='body-20-semibold'
                className='mt-[20px] laptop-max:ml-4 tablet:!text-[16px]'
              >
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
        </div>
        <div className='laptop:px-[22px]'>
          <Text type='body-20-semibold' className='mt-[20px] laptop-max:ml-4 tablet:!text-[16px]'>
            PineX
          </Text>
        </div>

        {PINEX_HELP.map((item: any, index: number) => (
          <div
            className={classNames('rounded-lg  laptop:px-[22px]', {
              'hover:bg-neutral_08': item.hoverEffect,
            })}
            key={index}
          >
            {' '}
            {renderListItem(item, index)}
          </div>
        ))}

        {isLogin && (
          <div className='px-4 laptop:hidden'>
            <NegativeMainButton
              onClick={onHandleLogout}
              className='my-14 flex h-[40px] w-full items-center justify-center'
            >
              <Text type='body-14-semibold'>{t('log_out')}</Text>
            </NegativeMainButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;
