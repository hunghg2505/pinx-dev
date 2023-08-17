import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import AvatarDefault from '@components/UI/AvatarDefault';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';
import { USER_STATUS_PENDING, USER_STATUS_VERIFIED } from '@utils/constant';

const BasicInfo = ({
  avatar,
  userName,
  status,
  close,
  isKol,
  isFeatureProfile,
}: {
  avatar: string;
  userName: string;
  status: string;
  close: () => void;
  isKol?: boolean;
  isFeatureProfile?: boolean;
}) => {
  const { t } = useTranslation();
  const { isLogin } = useAuth();
  const router = useRouter();
  return (
    <div
      className=' mb-[16px] px-[16px]'
      onClick={() => {
        router.push({
          pathname: ROUTE_PATH.MY_PROFILE,
          query: {
            from_profile_menu: 1,
          },
        });
        close();
      }}
    >
      <div className='flex items-center rounded-[12px] bg-[#F7F6F8] p-[12px]'>
        {avatar ? (
          <img
            src={avatar}
            alt='avatar'
            width={52}
            height={52}
            className='h-[52px] w-[52px] rounded-[50%] galaxy-max:flex-none galaxy-max:object-cover min-w-[52px]'
          />
        ) : (
          <div className='h-[52px] w-[52px] galaxy-max:flex-none min-w-[52px]'>
            <AvatarDefault name={userName[0]} />
          </div>
        )}
        <div className='ml-[12px] mr-auto flex-col justify-center overflow-hidden'>
          <div className='flex items-center'>
            <h4 className='text-[20px] font-[500] galaxy-max:text-[16px] truncate'>
              {userName ?? 'No name'}
            </h4>

            {isKol && (
              <img
                src='/static/icons/iconTick.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='ml-[8px] h-[16px] w-[16px] object-contain'
              />
            )}

            {isFeatureProfile && (
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
          {status && (
            <span
              className={classNames('text-[#EAA100] galaxy-max:text-[12px]', {
                '!text-[#128F63]': status === USER_STATUS_VERIFIED,
                '!text-[#F1BA09]': status === USER_STATUS_PENDING,
              })}
            >
              {t(status)}
            </span>
          )}
        </div>
        {isLogin && (
          <img
            src='/static/icons/chevron-right.svg'
            alt=''
            width='0'
            height='0'
            className='h-[28px] w-[28px]'
          />
        )}
      </div>
    </div>
  );
};
export default BasicInfo;
