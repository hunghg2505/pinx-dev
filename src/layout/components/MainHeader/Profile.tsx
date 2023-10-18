/* eslint-disable unicorn/no-useless-spread */
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

import { useMount } from 'ahooks';
import classNames from 'classnames';
import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';

import Back from '@components/MenuProfile/Back';
import BasicInfo from '@components/MenuProfile/BasicInfo';
import Follow from '@components/MenuProfile/Follow';
import Options from '@components/MenuProfile/Options';
import AvatarDefault from '@components/UI/AvatarDefault';
import { MainButton } from '@components/UI/Button';
import CustomImage from '@components/UI/CustomImage';
import CustomLink from '@components/UI/CustomLink';
import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';
import { useRouteSetting } from '@hooks/useRouteSetting';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useLogin } from '@store/auth/hydrateAuth';
import { openProfileAtom } from '@store/profile/profile';
import { useSidebarMobile } from '@store/sidebarMobile/sidebarMobile';
import { StockSocketLocation, stockSocketAtom } from '@store/stockStocket';
import {
  ROUTE_PATH,
  calcUserStatusText,
  checkUserType,
  formatStringToNumber,
  isUrlValid,
} from '@utils/common';
import { USERTYPE, USER_STATUS_PENDING, USER_STATUS_VERIFIED, DEEP_LINK } from 'src/constant';
import {
  downloadPineXAppTracking,
  registerTracking,
  viewWatchListTracking,
} from 'src/mixpanel/mixpanel';

const handleRedirect = (url: string) => {
  downloadPineXAppTracking('CTA in App', 'MenuProfileMobile');
  window.open(url, '_blank');
};

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

  return (
    <Fade
      visible={openProfileMenu}
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
    </Fade>
  );
});

const Profile = () => {
  const { t } = useTranslation('common');
  const { isLogin } = useLogin();
  const { userLoginInfo } = useUserLoginInfo();
  const watchList = useAtomValue(stockSocketAtom);

  const menuMobileRef = useRef<any>(null);

  const goToMyProfile = () => {
    menuMobileRef.current.onVisible && menuMobileRef.current.onVisible();
  };

  // tracking event view watch list
  const handleTracking = () => {
    const listStockCodes =
      watchList.find((item) => item.location === StockSocketLocation.WATCH_LIST_COMPONENT_LAYOUT)
        ?.stocks || [];

    viewWatchListTracking(
      'Personal Watchlist',
      'Personal Watchlist',
      listStockCodes,
      listStockCodes.length,
      'Dropdown menu profile',
    );
  };

  const ProfileOverlay = () => (
    <Menu multiple className='w-[360px] rounded-e-lg border-none bg-white'>
      <MenuItem>
        <CustomLink
          onClick={() => globalThis?.sessionStorage?.removeItem('scrollPosition')}
          href={ROUTE_PATH.PROFILE_V2(userLoginInfo?.displayName, userLoginInfo?.id)}
          className='block w-full'
        >
          <div className='flex w-full items-center gap-[24px] p-4'>
            {isUrlValid(userLoginInfo?.avatar) ? (
              <CustomImage
                width='0'
                height='0'
                sizes='100vw'
                src={userLoginInfo?.avatar || ''}
                alt=''
                className='h-[72px] w-[72px] min-w-[72px] cursor-pointer rounded-full  border border-solid border-[#ebebeb] object-cover'
              />
            ) : (
              <div className='h-[72px] w-[72px]  min-w-[72px] cursor-pointer rounded-full object-cover'>
                <AvatarDefault className='!m-0' name={userLoginInfo?.displayName} />
              </div>
            )}
            <div className='flex flex-1 flex-col gap-[6px] overflow-hidden'>
              <div className='flex items-center'>
                <Text type='body-16-semibold' className='truncate'>
                  {userLoginInfo?.displayName}
                </Text>

                {userLoginInfo?.isKol && (
                  <img
                    src='/static/icons/iconTickKolV2.svg'
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='ml-[8px] h-[16px] w-[16px] object-contain'
                  />
                )}

                {userLoginInfo?.isFeatureProfile && (
                  <img
                    src='/static/icons/iconKol.svg'
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='ml-[2px] h-[20px] w-[20px] object-contain'
                  />
                )}
              </div>

              <div className='mb-[4px] flex items-center justify-between gap-[10px]'>
                <div className='flex gap-[4px]'>
                  <Text type='body-12-semibold'>
                    {formatStringToNumber(userLoginInfo?.totalFollower) || 0}
                  </Text>
                  <Text type='body-12-regular' className='text-[#474D57]'>
                    {t('follower')}
                  </Text>
                </div>

                <Text type='body-14-regular' className='text-[#808A9D]'>
                  •
                </Text>

                <div className='flex gap-[4px]'>
                  <Text type='body-12-semibold'>
                    {formatStringToNumber(userLoginInfo?.totalFollowing) || 0}
                  </Text>
                  <Text type='body-12-regular' className='text-[#474D57]'>
                    {t('following')}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </CustomLink>
      </MenuItem>

      <hr className='border-neutral_07' />

      {checkUserType(userLoginInfo?.custStat, userLoginInfo?.acntStat) === USERTYPE.NEW && (
        <MenuItem>
          <div className='m-[16px] flex w-full cursor-default flex-col items-center gap-[12px] rounded-xl bg-[#D8EBFC] px-[20px] py-[12px]'>
            <Image
              src='/static/images/book_list.png'
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='mr-[7px] h-[103px] w-[164px]'
            />
            <div className='flex flex-col items-center gap-[20px] rounded-xl bg-[rgba(255,255,255,0.55)] p-[12px]'>
              <Text type='body-16-semibold'>{t('upgrade_account')}</Text>
              <div className='justify-center gap-x-[12px] mobile:hidden tablet:flex'>
                <Image
                  sizes='100vw'
                  src='/static/images/googleplay.png'
                  alt='Download google play'
                  width={180}
                  height={52}
                  className='h-[30px] w-[106.5px] cursor-pointer object-contain'
                  onClick={() => handleRedirect(DEEP_LINK.SIGNUP)}
                />

                <Image
                  sizes='100vw'
                  src='/static/images/appstore.png'
                  alt='Download app store'
                  width={180}
                  height={52}
                  className='h-[30px] w-[106.5px] cursor-pointer object-contain'
                  onClick={() => handleRedirect(DEEP_LINK.SIGNUP)}
                />
              </div>
            </div>
          </div>
        </MenuItem>
      )}

      <MenuItem>
        <CustomLink
          href={ROUTE_PATH.PROFILE_VERIFICATION_V2(userLoginInfo?.displayName, userLoginInfo?.id)}
          className='flex items-center justify-between px-[20px] py-4'
        >
          <div className='flex items-center'>
            <img
              src='/static/icons/icon_profile.svg'
              className='mr-[10px] h-[16px] w-[15px]'
              alt='Profile Verification'
            />
            <span>{t('profile_verification')}</span>
          </div>
          <Text
            type='body-12-regular'
            className={classNames('text-[#EAA100]', {
              '!text-[#128F63]':
                calcUserStatusText(userLoginInfo.acntStat || '') === USER_STATUS_VERIFIED,
              '!text-[#F1BA09]':
                calcUserStatusText(userLoginInfo.acntStat || '') === USER_STATUS_PENDING,
            })}
          >
            {t(`${calcUserStatusText(userLoginInfo.acntStat || '')}`)}
          </Text>
        </CustomLink>
      </MenuItem>

      <hr className='border-neutral_07' />

      <MenuItem>
        <CustomLink
          href={ROUTE_PATH.WATCHLIST}
          onClick={handleTracking}
          className='flex items-center px-[20px] py-4'
        >
          <img
            src='/static/icons/iconTV.svg'
            className='mr-[10px] h-[14px] w-[15px] object-contain'
            alt='Watchlist and theme'
          />
          <span>{t('watchlist_and_theme')}</span>
        </CustomLink>
      </MenuItem>
    </Menu>
  );

  const ProfileInfo = () => {
    return (
      <>
        <div className='items-center mobile:hidden tablet:flex'>
          <Dropdown
            trigger={['hover']}
            animation='slide-up'
            overlay={<ProfileOverlay />}
            placement='bottomRight'
          >
            <div className='relative h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full object-cover'>
              <CustomImage
                width='0'
                height='0'
                sizes='100vw'
                src={userLoginInfo?.avatar ?? '/static/images/guest_avatar.png'}
                alt=''
                className='h-full w-full overflow-hidden rounded-full border border-solid border-[#ebebeb] object-cover '
              />
            </div>
          </Dropdown>
        </div>

        <CustomImage
          width='0'
          height='0'
          sizes='100vw'
          src={userLoginInfo?.avatar ?? '/static/images/guest_avatar.png'}
          alt=''
          className='h-[40px] w-[40px] cursor-pointer rounded-full border border-solid border-[#ebebeb] object-cover mobile:block tablet:hidden'
          onClick={goToMyProfile}
        />
      </>
    );
  };

  if (!isLogin) {
    return (
      <div className='flex items-center'>
        <CustomLink
          href={ROUTE_PATH.LOGIN}
          className='flex h-[40px] items-center justify-center rounded-[4px] border border-[--primary-6] bg-[#EAF4FB] mobile:w-[90px] desktop:w-[122px]'
        >
          <Text type='body-14-bold' color='primary-2'>
            {t('log_in')}
          </Text>
        </CustomLink>

        <CustomLink
          className='ml-[12px] hidden h-[40px] items-center justify-center rounded-[4px] bg-[linear-gradient(230.86deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)] mobile:w-[90px] tablet:flex desktop:w-[122px]'
          href={`${ROUTE_PATH.LOGIN}?type=register`}
          onClick={() => registerTracking(new Date(), 'Header', 'CTA')}
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
      <ProfileInfo />
      <MenuProfileMobile ref={menuMobileRef} />
    </>
  );
};

export default Profile;
