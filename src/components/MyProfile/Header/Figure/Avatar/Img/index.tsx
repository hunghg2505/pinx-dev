import React from 'react';

import AvatarDefault from '@components/UI/AvatarDefault';
import { isUrlValid } from '@utils/common';

const Img = ({ avatar, displayName }: { avatar: string; displayName: string }) => {
  return isUrlValid(avatar) ? (
    <img
      src={avatar}
      alt=''
      width={113}
      height={113}
      className='h-[113px] w-[113px] rounded-full bg-white object-cover p-[5px] galaxy-max:h-[90px] galaxy-max:w-[90px] tablet:h-[100px] tablet:w-[100px] xdesktop:h-[120px] xdesktop:w-[120px]'
    />
  ) : (
    <div className='flex h-[113px] w-[113px] items-center justify-center overflow-hidden rounded-full bg-white object-cover p-[5px] galaxy-max:h-[90px] galaxy-max:w-[90px] tablet:h-[100px] tablet:w-[100px] xdesktop:h-[120px] xdesktop:w-[120px]'>
      <AvatarDefault className='!m-0' name={displayName} />
    </div>
  );
};
export default Img;
