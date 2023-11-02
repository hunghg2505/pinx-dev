import { useMount } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { IconCloseMenu } from '@components/UI/Icon/IconCloseMenu';
import { useRouteSetting } from '@hooks/useRouteSetting';
import { openProfileAtom } from '@store/profile/profile';
import { useSidebarMobile } from '@store/sidebarMobile/sidebarMobile';

const SideBar = dynamic(() => import('@layout/MainLayout/SideBar'));

const MenuMobile = () => {
  const [isShowNavigate, setIsShowNavigate] = useSidebarMobile();
  const router = useRouter();
  const [, setOpenProfileMenu] = useAtom(openProfileAtom);
  const { isRouteSetting } = useRouteSetting();

  useMount(() => {
    router.events.on('routeChangeStart', () => {
      // @ts-ignore
      setIsShowNavigate(false);
    });
  });

  const onShowNavigate = () => {
    // @ts-ignore
    setIsShowNavigate(!isShowNavigate);

    setOpenProfileMenu(false);
  };

  return (
    <>
      <span className='flex cursor-pointer items-center desktop:hidden' onClick={onShowNavigate}>
        {isShowNavigate ? (
          <IconCloseMenu />
        ) : (
          <img
            src='/static/icons/icon-bar-mobile.svg'
            alt='Icon bar'
            className='h-[32px] w-[32px] object-contain'
          />
        )}
      </span>
      <div
        className={classNames(
          'overflow-overlay fixed left-[-100%] z-[9999] w-full bg-[#fff] pb-[30px] pt-[12px] [transition:0.3s] desktop:hidden ',
          {
            'left-[0]': isShowNavigate,
            'top-[55px]': isRouteSetting,
            'h-[calc(100vh-56px)]': isRouteSetting,
            'top-[115px]': !isRouteSetting,
            'h-[calc(100vh-115px)]': !isRouteSetting,
          },
        )}
      >
        <div className='mt-[12px]'>
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default MenuMobile;
