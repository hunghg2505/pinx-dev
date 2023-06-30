import { useMemo } from 'react';

import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Menu from 'rc-menu';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';

import { IconAssets, IconExplore, IconGiftCash, IconHomeActive, IconWatchList } from './icon';

const SideBar = () => {
  const router = useRouter();
  const MENUS = useMemo(() => {
    return [
      {
        id: 1,
        path: '/',
        icon: <IconHomeActive />,
        iconActive: <IconHomeActive />,
        label: 'Home',
      },
      {
        id: 2,
        path: '/new/home',
        icon: <IconExplore />,
        // iconActive: <div>456</div>,
        label: 'Explore',
      },
      {
        id: 3,
        path: '/new/home',
        icon: <IconGiftCash />,
        // iconActive: <div>456</div>,
        label: 'GiftCash',
      },
      {
        id: 4,
        path: '/new/home',
        icon: <IconWatchList />,
        // iconActive: <div>456</div>,
        label: 'WatchList',
      },
      {
        id: 5,
        path: '/new/home',
        icon: <IconAssets />,
        // iconActive: <div>456</div>,
        label: 'Assets',
      },
    ];
  }, []);
  const items = useMemo(() => {
    return MENUS.map((menu) => {
      const checkPathExist = router.pathname === menu.path || router.pathname?.includes(menu?.path);
      const icon = checkPathExist ? menu.iconActive : menu.icon;

      return {
        className: 'flex flex-row-reverse justify-end py-[16px] px-[10px] pointer-events-none',
        key: `${menu.id}`,
        itemIcon: icon,
        label: (
          <CustomLink href='javascript:void(0)' className={classNames(' ml-[20px]')}>
            <Text type='body-14-regular'>{menu.label}</Text>
          </CustomLink>
        ),
      };
    });
  }, [MENUS]);
  return (
    <>
      <div className='px-[10px]'>
        <Menu defaultSelectedKeys={['1']} items={items} />
        <div className='pt-[25px] [border-top:1px_solid_#ECECEC]'>
          <Text type='body-12-regular' className='text-[#78909C]'>
            Copyright 2023. Công ty CP Chứng Khoán <span className='text-[#1F6EAC]'>Pinetree</span>
          </Text>
          <Text type='body-12-regular' className='mt-[8px] text-[#78909C]'>
            GPKD: <span className='text-[#474D57]'>0101294902</span>
          </Text>
          <div className='mt-[20px] flex gap-x-[10px]'>
            <Link href='javascript:void(0)'>
              <img
                src='/static/social/facebook.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='h-[32px] w-[32px]'
              />
            </Link>
            <Link href='javascript:void(0)'>
              <img
                src='/static/social/zalo.png'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='h-[32px] w-[32px]'
              />
            </Link>
            <Link href='javascript:void(0)'>
              <img
                src='/static/social/youtube.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='h-[32px] w-[32px]'
              />
            </Link>
            <Link href='javascript:void(0)'>
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
