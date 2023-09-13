import React from 'react';

import Image from 'next/image';

const NotFound = () => {
  return (
    <div className='width-[100%]  rounded-[12px] bg-primary_bgblue_2 p-[12px] text-center'>
      <Image
        sizes='100vw'
        src={'/static/images/hand chat connect.png'}
        height={433}
        width={412}
        alt="Don't have any result"
        className=' mb-[12px] h-[330px] w-[full] object-contain tablet:h-[240px] tablet:w-[312px]'
      />
    </div>
  );
};
export default NotFound;
