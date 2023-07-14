/* eslint-disable import/named */
import React, { useMemo, useState } from 'react';

import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import type { SwitchChangeEventHandler } from 'rc-switch';
import Switch from 'rc-switch';
import { toast } from 'react-hot-toast';

import { NegativeMainButton } from '@components/UI/Button';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
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
}

const Setting = () => {
  const router = useRouter();
  const [currentLang] = useAtom(localeAtom);
  const [visible, setVisible] = useState(false);
  const { onLogout, isLogin } = useAuth();
  const { data: settingsData, loading } = useGetSettings();

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
      },
      {
        title: 'Disclosure',
        action: () => window.open(TERM_AND_CONDITION_LINK),
      },
      {
        title: 'Guidance',
        action: () => window.open(TERM_AND_CONDITION_LINK),
      },
      {
        title: 'Hotline',
        action: () => window.open(PHONE_CONTACT_SUPPORT, '_self'),
      },
    ];
  }, []);

  const renderListItem = (item: ISettingItem, index: number) => {
    return !item.hidden && (
      <div
        onClick={() => {
          if (item.action) {
            item.action();
          } else {
            router.push(item.path || '');
          }
        }}
        key={index}
        className='flex items-center px-4 pb-4 pt-3 justify-between border-solid border-b-[1px] border-[--neutral-7] cursor-pointer'
      >
        <div className='flex items-center'>
          <Text type='body-12-regular'>
            {item.title}
          </Text>
          {item.isNew && (
            <img
              src='/static/images/tag_new.png'
              alt=''
              width='0'
              height='0'
              sizes='50vw'
              className='h-[20px] w-[38px] ml-2'
            />
          )}

        </div>

        <div className='flex items-center'>
          {item.value && (<Text type='body-12-regular'>{item.value}</Text>)}
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

      <div className='mobile:mt-20'>
        <Text type='body-20-bold' className='mt-6 ml-4 mb-1'>Settings</Text>
        {
          SETTINGS.map((item: any, index: number) => (
            renderListItem(item, index)
          ))
        }

        {isLogin && (
          <>
            <Text type='body-20-bold' className='mt-6 ml-4 mb-1'>Social</Text>
            <div
              className='flex items-center px-4 pb-4 pt-3 justify-between border-solid border-b-[1px] border-[--neutral-7] cursor-pointer'
            >
              <Text type='body-12-regular'>
                Share watchinglist
              </Text>

              <Switch defaultChecked={settingsData?.data?.share_watchlist === '1'} onChange={onChangeShareWatchlist} />
            </div>
          </>
        )}


        <Text type='body-20-bold' className='mt-6 ml-4 mb-1'>PineX</Text>
        {
          PINEX_HELP.map((item: any, index: number) => (
            renderListItem(item, index)
          ))
        }

        {isLogin && (
          <div className='px-4'>
            <NegativeMainButton onClick={() => onLogout()} className='w-[calc(100%-32px)] fixed bottom-9'>Log out</NegativeMainButton>
          </div>
        )}

      </div>
    </>
  );
};

export default Setting;
