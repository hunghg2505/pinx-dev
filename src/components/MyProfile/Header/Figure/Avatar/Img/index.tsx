import React from 'react';

const Img = ({ avatar }: { avatar: string }) => {
  return (
    <img
      src={avatar}
      alt='background cover'
      width={113}
      height={113}
      className='h-[113px] w-[113px] rounded-full bg-white object-cover p-[5px] tablet:h-[100px] tablet:w-[100px] xdesktop:h-[120px] xdesktop:w-[120px]'
    />
  );
};
export default Img;
