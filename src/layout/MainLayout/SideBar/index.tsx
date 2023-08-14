import { useMemo } from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Menu from 'rc-menu';
import StickyBox from 'react-sticky-box';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { useAuth } from '@store/auth/useAuth';
import { popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH } from '@utils/common';
import { PINETREE_LINK } from '@utils/constant';
import { NavigateSection } from '@utils/dataLayer';

import {
  IconAssets,
  IconAssetsActive,
  IconExplore,
  IconExploreActive,
  IconGiftCash,
  IconGiftCashActive,
  IconHome,
  IconHomeActive,
  IconSetting,
  IconSettingActive,
  IconWatchList,
  IconWatchListACtive,
} from './icon';

const SideBar = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { isLogin } = useAuth();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);

  const MENUS = [
    {
      id: 1,
      path: ROUTE_PATH.HOME,
      icon: <IconHome />,
      iconActive: <IconHomeActive />,
      label: t('home'),
    },
    {
      id: 2,
      path: ROUTE_PATH.EXPLORE,
      icon: <IconExplore />,
      iconActive: <IconExploreActive />,
      label: t('explore'),
    },
    {
      id: 3,
      path: ROUTE_PATH.GIFTCASH,
      icon: <IconGiftCash />,
      iconActive: <IconGiftCashActive />,
      label: t('gift_cash'),
    },
    {
      id: 4,
      path: ROUTE_PATH.WATCHLIST,
      icon: <IconWatchList />,
      iconActive: <IconWatchListACtive />,
      label: t('wtach_list'),
      action: () => {
        setPopupStatus({ ...popupStatus, popupAccessLinmit: true });
      },
    },
    {
      id: 5,
      path: ROUTE_PATH.ASSET,
      icon: <IconAssets />,
      iconActive: <IconAssetsActive />,
      label: t('assets'),
      action: () => {
        setPopupStatus({ ...popupStatus, popupAccessLinmit: true });
      },
    },
    {
      id: 6,
      path: ROUTE_PATH.SETTING,
      icon: <IconSetting />,
      iconActive: <IconSettingActive />,
      label: t('settings'),
    },
  ];

  const items = useMemo(() => {
    return MENUS.map((menu) => {
      let checkPathExist =
        menu.path === '/'
          ? router.pathname === menu.path
          : router.pathname.includes(menu.path?.split('?')[0]);

      let icon = checkPathExist ? menu.iconActive : menu.icon;

      if (router.pathname === ROUTE_PATH.PROFILE_VERIFICATION) {
        icon = menu.icon;
        checkPathExist = false;
      }

      if (menu?.action && !isLogin) {
        return {
          className: ` mb-[12px] ${checkPathExist && 'active'}`,
          key: `${menu.id}`,
          label: (
            <div
              className='flex cursor-pointer items-center gap-[10px] px-[8px] py-[5px]'
              onClick={menu?.action}
            >
              {icon}
              <Text
                type='body-16-semibold'
                color='neutral-3'
                className={classNames({ '!text-[var(--primary-2)]': checkPathExist })}
              >
                {menu.label}
              </Text>
            </div>
          ),
        };
      }

      return {
        className: ` mb-[12px] ${checkPathExist && 'active'}`,
        key: `${menu.id}`,
        label: (
          <CustomLink
            href={menu?.path}
            className='flex items-center gap-[10px] px-[8px] py-[5px] '
            onClick={() => NavigateSection(menu.label)}
          >
            {icon}
            <Text
              type='body-16-semibold'
              color='neutral-3'
              className={classNames({ '!text-[var(--primary-2)]': checkPathExist })}
            >
              {menu.label}
            </Text>
          </CustomLink>
        ),
      };
    });
  }, [MENUS, isLogin]);

  return (
    <StickyBox offsetTop={110} offsetBottom={20}>
      <div>
        <Menu items={items} className='sidebar-list' />
        <img
          src='/static/images/sidebar_banner.png'
          alt=''
          sizes='100vw'
          className='mt-[16px] w-full laptop-max:px-[10px]'
        />

        <div className='px-[10px] pt-[16px]'>
          {/* <a href={PINETREE_LINK} target='_blank' rel='noreferrer'>
            <img
              src='/static/images/pinetree_logo.png'
              alt=''
              sizes='100vw'
              className='mb-[20px] h-[55px] w-[140px]'
            />
          </a> */}
          <a href={PINETREE_LINK} target='_blank' rel='noopener noreferrer'>
            <Text type='body-12-regular' className='text-[#78909C]'>
              Copyright 2023. Công ty CP Chứng Khoán{' '}
              <span className='text-[#1F6EAC]'>Pinetree</span>
            </Text>
          </a>
          <Text type='body-12-regular' className='mt-[8px] text-[#78909C]'>
            GPKD: <span className='text-[#474D57]'>0101294902</span>
            <span className='block'>16:14 04/07/2023</span>
          </Text>
          <div className='mt-[20px] flex gap-x-[10px]'>
            <CustomLink href='https://www.facebook.com/chungkhoanpinetree'>
              <img
                src='/static/social/facebook.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='h-[32px] w-[32px]'
              />
            </CustomLink>
            <CustomLink href='https://zalo.me/895810815009263150'>
              <img
                src='/static/social/zalo.png'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='h-[32px] w-[32px]'
              />
            </CustomLink>
            <CustomLink href='https://www.youtube.com/@ChungKhoanPinetree'>
              <img
                src='/static/social/youtube.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='h-[32px] w-[32px]'
              />
            </CustomLink>
            <CustomLink href='https://www.tiktok.com/@pinetree_official'>
              <img
                src='/static/social/tik_tok.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='h-[32px] w-[32px]'
              />
            </CustomLink>
          </div>
        </div>
      </div>
    </StickyBox>
  );
};
export default SideBar;
