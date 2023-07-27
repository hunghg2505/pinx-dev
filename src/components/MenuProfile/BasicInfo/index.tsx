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
}: {
  avatar: string;
  userName: string;
  status: string;
  close: () => void;
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
            className='h-[52px] w-[52px] rounded-[50%]'
          />
        ) : (
          <div className='h-[52px] w-[52px] '>
            <AvatarDefault name={userName[0]} />
          </div>
        )}
        <div className='ml-[12px] mr-auto flex-col justify-center'>
          <h4 className='text-[20px] font-[500]'>{userName ?? 'No name'}</h4>
          {status && (
            <span
              className={classNames('text-[#EAA100]', {
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
