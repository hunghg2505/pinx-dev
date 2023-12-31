import { useMemo } from 'react';

import classNames from 'classnames';
import { useAtom, useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Menu from 'rc-menu';
// import StickyBox from 'react-sticky-box';

import { ProfileTabKey } from '@components/MyProfile/TabsContent/Desktop/type';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useLogin } from '@store/auth/hydrateAuth';
import { popupStatusAtom } from '@store/popup/popup';
import { usePostHomePage } from '@store/postHomePage/postHomePage';
import { StockSocketLocation, stockSocketAtom } from '@store/stockStocket';
import { PINETREE_LINK, BANNER_URL } from 'src/constant';
import {
  ASSETS_V2,
  EXPLORE,
  GIFTCASH,
  HOME,
  PROFILE_PATH,
  PROFILE_V2,
  SETTING,
  WATCHLIST,
} from 'src/constant/route';
import {
  navigateSectionTracking,
  viewAssetTracking,
  viewWatchListTracking,
} from 'src/mixpanel/mixpanel';

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

const StickyBox = dynamic(() => import('react-sticky-box'));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MenuItem = ({ children, href, ...props }: any) => <div {...props}>{children}</div>;

const SideBar = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { profileSlug }: any = router.query;
  const { isLogin } = useLogin();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const watchList = useAtomValue(stockSocketAtom);
  const { userLoginInfo } = useUserLoginInfo();
  const userId = useMemo(() => {
    return profileSlug?.split('-')?.pop();
  }, [profileSlug]);

  const { initialHomePostData } = usePostHomePage();
  const MENUS = [
    {
      id: 1,
      path: HOME,
      icon: <IconHome />,
      iconActive: <IconHomeActive />,
      label: t('home'),
    },
    {
      id: 2,
      path: EXPLORE,
      icon: <IconExplore />,
      iconActive: <IconExploreActive />,
      label: t('explore'),
    },
    {
      id: 3,
      path: GIFTCASH,
      icon: <IconGiftCash />,
      iconActive: <IconGiftCashActive />,
      label: t('gift_cash'),
    },
    {
      id: 4,
      path: WATCHLIST,
      icon: <IconWatchList />,
      iconActive: <IconWatchListACtive />,
      label: t('wtach_list'),
      action: () => {
        setPopupStatus({ ...popupStatus, popupAccessLinmit: true });
      },
    },
    {
      id: 5,
      path: ASSETS_V2(userLoginInfo?.displayName, userLoginInfo?.id, ProfileTabKey.ASSETS),
      icon: <IconAssets />,
      iconActive: <IconAssetsActive />,
      label: t('assets'),
      action: () => {
        setPopupStatus({ ...popupStatus, popupAccessLinmit: true });
      },
    },
    {
      id: 6,
      path: SETTING,
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

      if (router.pathname === '/[profileSlug]/profile-verification') {
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
                element='h3'
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

      const ComponentLink =
        router.pathname === PROFILE_PATH &&
        Number(userId) === Number(userLoginInfo?.id) &&
        menu.path === ASSETS_V2(userLoginInfo?.displayName, userLoginInfo?.id, ProfileTabKey.ASSETS)
          ? MenuItem
          : CustomLink;

      return {
        className: ` mb-[12px] ${checkPathExist && 'active'}`,
        key: `${menu.id}`,
        label: (
          <ComponentLink
            href={menu?.path}
            className='flex items-center gap-[10px] px-[8px] py-[5px] '
            onClick={() => {
              if (menu.path === HOME) {
                globalThis?.sessionStorage.removeItem('scrollPosition');
                initialHomePostData();
              }
              if (menu.path === EXPLORE) {
                globalThis?.sessionStorage.removeItem('scrollPosition');
              }

              // tracking navigate section
              navigateSectionTracking(menu.label);

              // tracking event view watch list
              if (menu.path === WATCHLIST) {
                const listStockCodes =
                  watchList.find(
                    (item) => item.location === StockSocketLocation.WATCH_LIST_COMPONENT_LAYOUT,
                  )?.stocks || [];

                viewWatchListTracking(
                  'Personal Watchlist',
                  'Personal Watchlist',
                  listStockCodes,
                  listStockCodes.length,
                  'Left sidebar layout',
                );
              }

              // tracking event view assets
              if (
                menu.path ===
                ASSETS_V2(userLoginInfo?.displayName, userLoginInfo?.id, ProfileTabKey.ASSETS)
              ) {
                viewAssetTracking('Tab assets sidebar layout', 'Asset Overview');

                if (
                  router.pathname === PROFILE_PATH &&
                  Number(userId) === Number(userLoginInfo?.id)
                ) {
                  const newPath = PROFILE_V2(userLoginInfo?.displayName, userLoginInfo?.id);

                  router.replace({
                    pathname: newPath,
                    query: {
                      tab: ProfileTabKey.ASSETS,
                    },
                  });
                }
              }
            }}
          >
            {icon}
            <Text
              element='h3'
              type='body-16-semibold'
              color='neutral-3'
              className={classNames({ '!text-[var(--primary-2)]': checkPathExist })}
            >
              {menu.label}
            </Text>
          </ComponentLink>
        ),
      };
    });
  }, [MENUS, isLogin]);

  return (
    <StickyBox offsetTop={110} offsetBottom={20}>
      <>
        <Menu items={items} className='sidebar-list' />
        <a href={PINETREE_LINK} target='_blank' rel='noreferrer'>
          <Image
            src={BANNER_URL}
            alt=''
            width={218}
            height={400}
            className='mt-[16px] h-[400px] w-[218px] object-contain laptop-max:px-[10px]'
          />
        </a>

        <div className='px-[10px] pt-[16px]'>
          {/* <a href={PINETREE_LINK} target='_blank' rel='noreferrer'>
            <img
              src='/static/images/pinetree_logo.png'
              alt=''
              sizes='100px'
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
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.facebook.com/chungkhoanpinetree'
            >
              <Image
                src='/static/social/facebook.svg'
                alt=''
                width={0}
                height={0}
                sizes='100px'
                className='h-[32px] w-[32px]'
              />
            </a>
            <a target='_blank' rel='noopener noreferrer' href='https://zalo.me/895810815009263150'>
              <Image
                src='/static/social/zalo.png'
                alt=''
                width={0}
                height={0}
                sizes='100px'
                className='h-[32px] w-[32px]'
              />
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.youtube.com/@ChungKhoanPinetree'
            >
              <Image
                src='/static/social/youtube.svg'
                alt=''
                width={0}
                height={0}
                sizes='100px'
                className='h-[32px] w-[32px]'
              />
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.tiktok.com/@pinetree_official'
            >
              <Image
                src='/static/social/tik_tok.svg'
                alt=''
                width={0}
                height={0}
                sizes='100px'
                className='h-[32px] w-[32px]'
              />
            </a>
          </div>
        </div>
      </>
    </StickyBox>
  );
};
export default SideBar;
