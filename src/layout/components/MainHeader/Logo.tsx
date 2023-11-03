import { useMount } from 'ahooks';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';

import CustomLink from '@components/UI/CustomLink';
import { IconCloseMenu } from '@components/UI/Icon/IconCloseMenu';
import { openProfileAtom } from '@store/profile/profile';
import { useSidebarMobile } from '@store/sidebarMobile/sidebarMobile';
import { HOME } from 'src/constant/route';

const Logo = () => {
  const [isShowNavigate, setIsShowNavigate] = useSidebarMobile();
  const router = useRouter();
  const [, setOpenProfileMenu] = useAtom(openProfileAtom);

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
      <CustomLink
        onClick={() => globalThis?.sessionStorage.removeItem('scrollPosition')}
        href={HOME}
      >
        <div className='flex items-center'>
          <img
            src='/static/logo/logo.png'
            alt='Cộng đồng đầu tư chứng khoán PineX'
            className='hidden h-[40px] w-[40px] object-contain desktop:block desktop:h-[52px] desktop:w-[52px]'
          />

          <Image
            width={85}
            height={32}
            src='/static/logo/logo-website-pinetree.svg'
            alt='Logo pinetree'
            className='ml-[12px] hidden h-[32px] desktop:block'
          />
        </div>
      </CustomLink>

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
    </>
  );
};

export default Logo;
