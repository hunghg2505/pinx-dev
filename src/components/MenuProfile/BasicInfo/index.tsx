import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import AvatarDefault from '@components/UI/AvatarDefault';
import CustomImage from '@components/UI/CustomImage';
import { useLogin } from '@store/auth/hydrateAuth';
import { isUrlValid } from '@utils/common';
import { USER_STATUS_PENDING, USER_STATUS_VERIFIED } from 'src/constant';
import { PROFILE_V2 } from 'src/constant/route';

const BasicInfo = ({
  avatar,
  userName,
  status,
  close,
  isKol,
  isFeatureProfile,
  userId,
}: {
  avatar: string;
  userName: string;
  status: string;
  close: () => void;
  isKol?: boolean;
  isFeatureProfile?: boolean;
  userId: number;
}) => {
  const { t } = useTranslation();
  const { isLogin } = useLogin();
  const router = useRouter();
  return (
    <div
      className=' mb-[16px] px-[16px]'
      onClick={() => {
        router.push({
          pathname: PROFILE_V2(userName, userId),
          query: {
            from_profile_menu: 1,
          },
        });
        close();
      }}
    >
      <div className='flex items-center rounded-[12px] bg-[#F7F6F8] p-[12px]'>
        {isUrlValid(avatar) ? (
          <CustomImage
            src={avatar}
            alt=''
            width={52}
            height={52}
            className='h-[52px] w-[52px] min-w-[52px] rounded-[50%] object-cover galaxy-max:flex-none'
          />
        ) : (
          <div className='h-[52px] w-[52px] min-w-[52px] galaxy-max:flex-none'>
            <AvatarDefault name={userName[0]} />
          </div>
        )}
        <div className='ml-[12px] mr-auto flex-col justify-center overflow-hidden'>
          <div className='flex items-center'>
            <h4 className='truncate text-[20px] font-[500] galaxy-max:text-[16px]'>
              {userName ?? 'No name'}
            </h4>

            {isKol && (
              <img
                src='/static/icons/iconTickKolV2.svg'
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
