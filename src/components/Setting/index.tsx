/* eslint-disable import/named */
import React, { useMemo, useState } from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
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
import { localeAtom } from '@store/locale/locale';
import { ROUTE_PATH } from '@utils/common';
import { PHONE_CONTACT_SUPPORT, TERM_AND_CONDITION_LINK } from '@utils/constant';

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
  const router = useRouter();
  const [currentLang] = useAtom(localeAtom);
  const [visible, setVisible] = useState(false);
  const { onLogout, isLogin } = useAuth();
  const { data: settingsData, loading } = useGetSettings();
  const { isMobile } = useResponsive();
  const { t } = useTranslation('setting');

  const requestUpdateSetting = useUpdateSetting({
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const SETTINGS = useMemo(() => {
    return [
      {
        title: 'Language',
        value: currentLang === 'vi' ? ' Tiếng Việt' : 'English',
        action: () => onTogglePopup(),
        hideDivider: !isMobile && !isLogin,
      },
      {
        title: t('change_password'),
        path: ROUTE_PATH.SETTING_CHANGE_PASSWORD,
        hidden: !isLogin,
      },
      {
        title: 'Change Username',
        path: ROUTE_PATH.SETTING_CHANGE_USERNAME,
        isNew: true,
        hidden: !isLogin,
      },
    ];
  }, [currentLang, isMobile, isLogin, t]);

  const PINEX_HELP = useMemo(() => {
    return [
      {
        title: 'Version 2.1.1',
        hideArrow: true,
        hideDivider: !isMobile,
        disableClick: true,
      },
      {
        title: 'Disclosure',
        action: () => window.open(TERM_AND_CONDITION_LINK),
        linkStyle: !isMobile,
        hideDivider: !isMobile,
        hideArrow: !isMobile,
      },
      {
        title: 'Guidance',
        action: () => window.open(TERM_AND_CONDITION_LINK),
        linkStyle: !isMobile,
        hideDivider: !isMobile,
        hideArrow: !isMobile,
      },
      {
        title: 'Hotline',
        action: () => window.open(PHONE_CONTACT_SUPPORT, '_self'),
        linkStyle: !isMobile,
        hideDivider: !isMobile,
        hideArrow: !isMobile,
      },
      {
        title: 'Log out',
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
            'flex cursor-pointer items-center justify-between border-b-[1px] border-solid border-[--neutral-7] px-4 pb-4 pt-3',
            {
              'border-none': item.hideDivider,
              'cursor-auto': item.disableClick,
            },
          )}
        >
          <div className='flex items-center'>
            <Text type='body-12-regular' color={item.linkStyle ? 'primary-2' : 'cbblack'}>
              {item.title}
            </Text>
            {item.isNew && (
              <img
                src='/static/icons/tag_new.svg'
                alt=''
                width='0'
                height='0'
                sizes='100vw'
                className='ml-2 h-[20px] w-[38px]'
              />
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

  const onTogglePopup = () => {
    setVisible(!visible);
  };

  if (loading) {
    return <></>;
  }
  return (
    <>
      <PopupLanguage visible={visible} onToggle={onTogglePopup} />

      <div>
        <Text type='body-20-bold' className='mb-1 ml-4 mobile:mt-6 laptop:mt-0'>
          {t('settings')}
        </Text>
        <div className='ml-[-24px] mt-5 w-[calc(100%+48px)] border-b-[1px] border-solid border-[#EEF5F9] mobile:hidden laptop:block' />
        {SETTINGS.map((item: any, index: number) => renderListItem(item, index))}

        {isLogin && (
          <>
            <Text type='body-20-bold' className='mb-1 ml-4 mt-6'>
              Social
            </Text>
            <div className='ml-[-24px] mt-5 w-[calc(100%+48px)] border-b-[1px] border-solid border-[#EEF5F9] mobile:hidden laptop:block' />

            <div className='flex cursor-pointer items-center justify-between border-b-[1px] border-solid border-[--neutral-7] px-4 pb-4 pt-3 laptop:border-none'>
              <Text type='body-12-regular'>Share watchinglist</Text>

              <Switch
                defaultChecked={settingsData?.data?.share_watchlist === '1'}
                onChange={onChangeShareWatchlist}
              />
            </div>
          </>
        )}

        <div className='ml-[-24px] mt-5 w-[calc(100%+48px)] border-b-[1px] border-solid border-[#EEF5F9] mobile:hidden laptop:block' />
        <Text type='body-20-bold' className='mb-1 ml-4 mt-6'>
          PineX
        </Text>

        {PINEX_HELP.map((item: any, index: number) => renderListItem(item, index))}

        {isLogin && (
          <div className='px-4 laptop:hidden'>
            <NegativeMainButton onClick={() => onLogout()} className='mt-14 w-full'>
              Log out
            </NegativeMainButton>
          </div>
        )}
      </div>
    </>
  );
};

export default Setting;
