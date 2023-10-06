import React, { useContext } from 'react';

import { profileUserContext } from '@components/ProfileEdit';

const Name = () => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <div className='mb-[12px] flex items-center'>
      <h1 className=' line-[700] text-[22px] font-[700] text-neutral_black'>{profileUser?.name}</h1>

      {profileUser?.isKol && (
        <img
          src='/static/icons/iconTickKolV2.svg'
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='ml-[8px] h-[18px] w-[18px] object-contain'
        />
      )}

      {profileUser?.isFeatureProfile && (
        <img
          src='/static/icons/iconKol.svg'
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='ml-[2px] h-[24px] w-[24px] object-contain'
        />
      )}
    </div>
  );
};
export default Name;
