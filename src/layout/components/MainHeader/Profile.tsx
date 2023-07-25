/* eslint-disable unicorn/no-useless-spread */
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';

import Back from '@components/MenuProfile/Back';
import BasicInfo from '@components/MenuProfile/BasicInfo';
import Follow from '@components/MenuProfile/Follow';
import Options from '@components/MenuProfile/Options';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getAccessToken } from '@store/auth';
import { openProfileAtom } from '@store/profile/profile';
import { ROUTE_PATH, calcUserStatusText, isUserVerified } from '@utils/common';

const MenuProfileMobile = forwardRef((_, ref) => {
  const { userLoginInfo } = useUserLoginInfo();
  const [openProfileMenu, setOpenProfileMenu] = useAtom(openProfileAtom);
  const router = useRouter();

  useEffect(() => {
    setOpenProfileMenu(false);
  }, [router.pathname]);

  const onVisible = useCallback(() => {
    setOpenProfileMenu(!openProfileMenu);
  }, [openProfileMenu]);

  useImperativeHandle(ref, () => ({ onVisible }));

  return (
    <div
      className={
        'absolute left-[-100%] top-[0] z-[9999] h-[calc(100vh-115px)] w-full bg-[white]  [transition:0.3s] tablet:hidden'
      }
      style={{
        left: openProfileMenu ? 0 : '-100%',
      }}
    >
      <Back
        close={() => {
          setOpenProfileMenu(!openProfileMenu);
        }}
      />
      <BasicInfo
        userName={userLoginInfo?.displayName || 'Anonymous User'}
        avatar={userLoginInfo?.avatar || '/static/images/guest_avatar.png'}
        status={calcUserStatusText(userLoginInfo.acntStat || '')}
        close={close}
      />

      <Follow
        follower={userLoginInfo?.totalFollower || 0}
        following={userLoginInfo?.totalFollowing || 0}
        close={close}
      />

      <Options />
    </div>
  );
});

const Profile = () => {
  const { t } = useTranslation('common');
  const isLogin = !!getAccessToken();
  const { userLoginInfo } = useUserLoginInfo();

  const menuMobileRef = useRef<any>(null);

  const goToMyProfile = () => {
    menuMobileRef.current.onVisible && menuMobileRef.current.onVisible();
  };

  const ProfileOverlay = () => (
    <Menu multiple className='w-[360px] rounded-e-lg border-none bg-white'>
      <MenuItem>
        <div className='flex w-full items-center gap-[24px] p-4'>
          <CustomLink href={ROUTE_PATH.MY_PROFILE} className='max-w-[72px] '>
            <img
              src={userLoginInfo?.avatar || '/static/images/guest_avatar.png'}
              alt=''
              className='h-[72px] w-[72px] cursor-pointer rounded-full object-cover'
            />
          </CustomLink>

          <div className=' flex-1'>
            <Text type='body-16-semibold'>{userLoginInfo?.displayName}</Text>

            <div className='my-[6px] text-[12px] text-[#474D57]'>
              {t('joined_since')}
              <span className='text-[12px] font-[600] text-neutral_black'> {dayjs(userLoginInfo?.openDate).format('YYYY')}</span>
            </div>

            <div className='flex justify-between gap-[10px]'>
              <div>
                <Text type='body-12-regular' className='mb-[4px] text-[#474D57]'>
                  {t('post')}
                </Text>
                <Text type='body-12-semibold'>0</Text>
              </div>

              <div>
                <Text type='body-12-regular' className='mb-[4px] text-[#474D57]'>
                  {t('follower')}
                </Text>
                <Text type='body-12-semibold'>{userLoginInfo?.totalFollower}</Text>
              </div>

              <div>
                <Text type='body-12-regular' className='mb-[4px] text-[#474D57]'>
                  {t('following')}
                </Text>
                <Text type='body-12-semibold'>{userLoginInfo?.totalFollowing}</Text>
              </div>
            </div>
          </div>
        </div>
      </MenuItem>

      <hr className='border-neutral_07' />

      <MenuItem>
        <hr className='border-neutral_07' />
        <CustomLink
          href={ROUTE_PATH.PROFILE_VERIFICATION}
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
              'text-green': isUserVerified(userLoginInfo.acntStat),
            })}
          >
            {calcUserStatusText(userLoginInfo.acntStat || '')}
          </Text>
        </CustomLink>
      </MenuItem>

      <hr className='border-neutral_07' />

      <MenuItem>
        <Link href='/watchlist' className='flex items-center px-[20px] py-4'>
          <img
            src='/static/icons/iconTV.svg'
            className='mr-[10px] h-[14px] w-[15px] object-contain'
            alt='Watchlist and theme'
          />
          <span>{t('watchlist_and_theme')}</span>
        </Link>
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
            <div className='relative h-[36px] w-[36px] cursor-pointer overflow-hidden rounded-full object-cover tablet:h-[44px] tablet:w-[44px] '>
              <img
                src={userLoginInfo?.avatar ?? '/static/images/guest_avatar.png'}
                alt=''
                className='h-full w-full overflow-hidden rounded-full object-cover '
              />

              <img
                src='/static/icons/arrow_down.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='absolute bottom-[-1px] right-0 h-[20px] w-[20px] rounded-full bg-[#EFF2F5] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.25),0px_3px_6px_-4px_rgba(0,0,0,0.5)]'
              />
            </div>
          </Dropdown>
        </div>

        <img
          src={userLoginInfo?.avatar ?? '/static/images/guest_avatar.png'}
          alt=''
          className='h-[36px] w-[36px] cursor-pointer rounded-full mobile:block tablet:hidden tablet:h-[44px] tablet:w-[44px]'
          onClick={goToMyProfile}
        />
      </>
    );
  };

  if (!isLogin) {
    return (
      <div className='flex items-center gap-[12px]'>
        <CustomLink
          href={ROUTE_PATH.LOGIN}
          className='flex h-[44px] items-center justify-center rounded-[4px] border border-[--primary-6] bg-[#EAF4FB] mobile:w-[90px] desktop:w-[122px]'
        >
          <Text type='body-14-bold' color='primary-2'>
            {t('log_in')}
          </Text>
        </CustomLink>

        <CustomLink
          className='  hidden h-[44px] items-center justify-center rounded-[4px] bg-[linear-gradient(230.86deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)] mobile:w-[90px] tablet:flex desktop:w-[122px]'
          href={`${ROUTE_PATH.LOGIN}?type=register`}
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
