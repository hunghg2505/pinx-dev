/* eslint-disable import/named */
import React, { useMemo, useState } from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
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
}

const Setting = () => {
  const router = useRouter();
  const [currentLang] = useAtom(localeAtom);
  const [visible, setVisible] = useState(false);
  const { onLogout, isLogin } = useAuth();
  const { data: settingsData, loading } = useGetSettings();
  const { isMobile } = useResponsive();

  const requestUpdateSetting = useUpdateSetting({
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const SETTINGS = useMemo(() => {
    return [
      {
        title: 'Language',
        value: currentLang === 'vi' ? 'Tiếng Việt' : 'English',
        action: () => onTogglePopup(),
      },
      {
        title: 'Change password',
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
  }, [currentLang]);

  const PINEX_HELP = useMemo(() => {
    return [
      {
        title: 'Version 2.1.1',
        hideArrow: true,
        hideDivider: !isMobile,
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
    ];
  }, [isMobile]);

  const renderListItem = (item: ISettingItem, index: number) => {
    return (
      !item.hidden && (
        <div
          onClick={() => {
            if (item.action) {
              item.action();
            } else {
              router.push(item.path || '');
            }
          }}
          key={index}
          className={classNames(
            'flex cursor-pointer items-center justify-between border-b-[1px] border-solid border-[--neutral-7] px-4 pb-4 pt-3',
            {
              'border-none': item.hideDivider,
            },
          )}
        >
          <div className='flex items-center'>
            <Text type='body-12-regular' color={item.linkStyle ? 'primary-2' : 'cbblack'}>
              {item.title}
            </Text>
            {item.isNew && (
              <img
                src='/static/images/tag_new.png'
                alt=''
                width='0'
                height='0'
                sizes='50vw'
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
                sizes='50vw'
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
          Settings
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
            <NegativeMainButton
              onClick={() => onLogout()}
              className='fixed bottom-9 w-[calc(100%-32px)]'
            >
              Log out
            </NegativeMainButton>
          </div>
        )}
      </div>
    </>
  );
};

export default Setting;
