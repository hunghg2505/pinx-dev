import { useMemo } from 'react';

import classNames from 'classnames';
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
        className: 'flex flex-row-reverse justify-end py-[16px] px-[10px]',
        key: `${menu.id}`,
        itemIcon: icon,
        label: (
          <CustomLink href={menu.path} className={classNames('ml-[20px]')}>
            <Text type='body-14-regular'>{menu.label}</Text>
          </CustomLink>
        ),
      };
    });
  }, [MENUS]);
  return (
    <>
      <Menu defaultSelectedKeys={['1']} items={items} />
    </>
  );
};
export default SideBar;
