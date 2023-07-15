import React from 'react';

import Image from 'next/image';

import AvatarDefault from '@components/UI/AvatarDefault';
import { useAuth } from '@store/auth/useAuth';

const BasicInfo = ({
  avatar,
  userName,
  status,
}: {
  avatar: string;
  userName: string;
  status: string;
}) => {
  const { isLogin } = useAuth();
  return (
    <div className=' mb-[16px] px-[16px]'>
      <div className='flex items-center rounded-[12px] bg-[#F7F6F8] p-[12px]'>
        {avatar ? (
          <Image
            src={avatar}
            alt='avatar'
            width={52}
            height={52}
            className='h-[52px] w-[52px] rounded-[50%]'
          />
        ) : (
          <div className='h-[52px] w-[52px]'>
            <AvatarDefault name={userName[0]} />
          </div>
        )}
        <div className='ml-[12px] mr-auto flex-col justify-center'>
          <h4 className='text-[20px] font-[500]'>{userName ?? 'No name'}</h4>
          <span className='text-[#E6A70A]'>{status}</span>
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
