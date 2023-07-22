import { useMemo } from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Menu from 'rc-menu';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { useAuth } from '@store/auth/useAuth';
import { popupStatusAtom } from '@store/popup/popup';
import { openProfileAtom } from '@store/profile/profile';
import { ROUTE_PATH } from '@utils/common';

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
  const router = useRouter();
  const { isLogin } = useAuth();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [, setProfileOpen] = useAtom(openProfileAtom);
  const MENUS = useMemo(() => {
    return [
      {
        id: 1,
        path: ROUTE_PATH.HOME,
        icon: <IconHome />,
        iconActive: <IconHomeActive />,
        label: 'Home',
        action: () => {
          // document.body.style.overflow = 'scroll';
          // setProfileOpen(false);
        },
      },
      {
        id: 2,
        path: ROUTE_PATH.EXPLORE,
        icon: <IconExplore />,
        iconActive: <IconExploreActive />,
        label: 'Explore',
        action: () => {
          // document.body.style.overflow = 'scroll';
          // setProfileOpen(false);
        },
      },
      {
        id: 3,
        path: ROUTE_PATH.GIFTCASH,
        icon: <IconGiftCash />,
        iconActive: <IconGiftCashActive />,
        label: 'GiftCash',
        action: () => {
          // document.body.style.overflow = 'scroll';
          // setProfileOpen(false);
        },
      },
      {
        id: 4,
        path: isLogin ? ROUTE_PATH.WATCHLIST : '',
        icon: <IconWatchList />,
        iconActive: <IconWatchListACtive />,
        label: 'WatchList',
        action: () => {
          !isLogin && setPopupStatus({ ...popupStatus, popupAccessLinmit: true });
          // document.body.style.overflow = 'scroll';
          // setProfileOpen(false);
        },
      },
      {
        id: 5,
        path: isLogin ? ROUTE_PATH.ASSET : '',
        icon: <IconAssets />,
        iconActive: <IconAssetsActive />,
        label: 'Assets',
        action: () => {
          !isLogin && setPopupStatus({ ...popupStatus, popupAccessLinmit: true });
          // document.body.style.overflow = 'scroll';
          // setProfileOpen(false);
        },
      },
      {
        id: 6,
        path: ROUTE_PATH.SETTING,
        icon: <IconSetting />,
        iconActive: <IconSettingActive />,
        label: 'Settings',
        action: () => {
          document.body.style.overflow = 'scroll';
          setProfileOpen(false);
        },
      },
    ];
  }, [isLogin]);
  const items = useMemo(() => {
    return MENUS.map((menu) => {
      const checkPathExist = router.pathname === menu.path;
      const icon = checkPathExist ? menu.iconActive : menu.icon;

      return {
        className: `flex items-center flex-row-reverse justify-end py-[16px] px-[10px] ${
          checkPathExist && 'active'
        }`,
        key: `${menu.id}`,
        itemIcon: icon,
        label: (
          <CustomLink href={menu?.path} className='ml-[10px]' action={menu?.action}>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MENUS]);
  return (
    <>
      <div className='px-[10px]'>
        <Menu items={items} />
        <div className='pt-[25px] [border-top:1px_solid_#ECECEC]'>
          <Text type='body-12-regular' className='text-[#78909C]'>
            Copyright 2023. Công ty CP Chứng Khoán <span className='text-[#1F6EAC]'>Pinetree</span>
          </Text>
          <Text type='body-12-regular' className='mt-[8px] text-[#78909C]'>
            GPKD: <span className='text-[#474D57]'>0101294902</span>
            <span className='block'>16:14 04/07/2023</span>
          </Text>
          <div className='mt-[20px] flex gap-x-[10px]'>
            <Link href='https://www.facebook.com/chungkhoanpinetree'>
              <img
                src='/static/social/facebook.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='h-[32px] w-[32px]'
              />
            </Link>
            <Link href='https://zalo.me/895810815009263150'>
              <img
                src='/static/social/zalo.png'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='h-[32px] w-[32px]'
              />
            </Link>
            <Link href='https://www.youtube.com/@ChungKhoanPinetree'>
              <img
                src='/static/social/youtube.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='h-[32px] w-[32px]'
              />
            </Link>
            <Link href='https://www.tiktok.com/@pinetree_official'>
              <img
                src='/static/social/tik_tok.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='h-[32px] w-[32px]'
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default SideBar;
