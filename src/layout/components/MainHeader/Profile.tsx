/* eslint-disable unicorn/no-useless-spread */
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

import { useMount } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import lazyLoadHydrate from '@components/LazyComp/LazyComp';
import Back from '@components/MenuProfile/Back';
import BasicInfo from '@components/MenuProfile/BasicInfo';
import Follow from '@components/MenuProfile/Follow';
import Options from '@components/MenuProfile/Options';
import { MainButton } from '@components/UI/Button';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { useRouteSetting } from '@hooks/useRouteSetting';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { handleRedirect } from '@layout/components/MainHeader/Comp/utils';
import { useLogin } from '@store/auth/hydrateAuth';
import { openProfileAtom } from '@store/profile/profile';
import { useSidebarMobile } from '@store/sidebarMobile/sidebarMobile';
import { calcUserStatusText, checkUserType } from '@utils/common';
import { DEEP_LINK, USERTYPE } from 'src/constant';
import { LOGIN } from 'src/constant/route';
import { registerTracking } from 'src/mixpanel/mixpanel';

const ProfileInfo = lazyLoadHydrate(() => import('@layout/components/MainHeader/Comp/ProfileInfo'));

const MenuProfileMobile = forwardRef((_, ref) => {
  const { t } = useTranslation('common');
  const { userLoginInfo } = useUserLoginInfo();
  const [openProfileMenu, setOpenProfileMenu] = useAtom(openProfileAtom);
  const router = useRouter();
  const [, setIsShowNavigate] = useSidebarMobile();
  const { isRouteSetting } = useRouteSetting();

  useMount(() => {
    router.events.on('routeChangeStart', () => {
      setOpenProfileMenu(false);
    });
  });

  useEffect(() => {
    setOpenProfileMenu(false);
  }, [router.pathname]);

  const onVisible = useCallback(() => {
    setOpenProfileMenu(!openProfileMenu);
    // @ts-ignore
    setIsShowNavigate(false);
  }, [openProfileMenu]);

  useImperativeHandle(ref, () => ({ onVisible }));

  if (!openProfileMenu) {
    return <></>;
  }

  return (
    <div
      className={classNames(
        'fixed  left-[100%] z-[9999] w-full overflow-y-auto overflow-x-hidden bg-[white] pb-[100px] pt-[12px]  [transition:0.3s] tablet:hidden',
        {
          'top-[55px]': isRouteSetting,
          'h-[calc(100vh-56px)]': isRouteSetting,
          'top-[115px]': !isRouteSetting,
          'h-[calc(100vh-115px)]': !isRouteSetting,
          '!left-0': openProfileMenu,
        },
      )}
    >
      <Back
        close={() => {
          setOpenProfileMenu(!openProfileMenu);
        }}
      />
      <BasicInfo
        userName={userLoginInfo?.displayName || 'Anonymous User'}
        avatar={userLoginInfo?.avatar || ''}
        status={calcUserStatusText(userLoginInfo.acntStat || '')}
        close={close}
        isKol={userLoginInfo?.isKol}
        isFeatureProfile={userLoginInfo?.isFeatureProfile}
        userId={Number(userLoginInfo?.id)}
      />
      <Follow
        follower={userLoginInfo?.totalFollower || 0}
        following={userLoginInfo?.totalFollowing || 0}
        close={close}
      />

      {checkUserType(userLoginInfo?.custStat, userLoginInfo?.acntStat) === USERTYPE.NEW && (
        <div className='my-[20px] px-[16px]'>
          <div className='width-full rounded-[12px] bg-primary_bgblue_2 p-[12px] text-center'>
            <Image
              sizes='100vw'
              src={'/static/images/shopinext-update_account.png'}
              height={150}
              width={150}
              alt={t('upgrade_account')}
              className='mx-auto mb-[12px] h-[150px] w-[150px] object-contain'
            />
            <MainButton className='px-12' onClick={() => handleRedirect(DEEP_LINK.SIGNUP)}>
              {t('upgrade_account')}
            </MainButton>
          </div>
        </div>
      )}

      <Options />
    </div>
  );
});

const Profile = () => {
  const { t } = useTranslation('common');
  const { isLogin } = useLogin();

  const menuMobileRef = useRef<any>(null);

  if (!isLogin) {
    return (
      <div className='flex items-center'>
        <CustomLink
          href={LOGIN}
          className='flex h-[40px] items-center justify-center rounded-[4px] border border-[--primary-6] bg-[#EAF4FB] mobile:w-[90px] desktop:w-[122px]'
        >
          <Text type='body-14-bold' color='primary-2'>
            {t('log_in')}
          </Text>
        </CustomLink>

        <CustomLink
          className='ml-[12px] hidden h-[40px] items-center justify-center rounded-[4px] bg-[linear-gradient(230.86deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)] mobile:w-[90px] tablet:flex desktop:w-[122px]'
          href={`${LOGIN}?type=register`}
          onClick={() => registerTracking(new Date().toISOString(), 'Header', 'CTA')}
        >
          <Text type='body-14-bold' color='cbwhite'>
            {t('sign_up')}
          </Text>
        </CustomLink>
      </div>
    );
  }

  return (
    <>
      <ProfileInfo menuMobileRef={menuMobileRef} />
      <MenuProfileMobile ref={menuMobileRef} />
    </>
  );
};

export default Profile;
