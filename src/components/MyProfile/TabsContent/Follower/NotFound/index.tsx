import React from 'react';

import Image from 'next/image';

const NotFound = () => {
  return (
    <div className='flex  w-full flex-wrap justify-center gap-[48px] rounded-[12px] bg-primary_bgblue_2 p-[24px] text-center'>
      <Image
        src={'/static/images/hand chat connect.png'}
        height={433}
        width={412}
        sizes='100vw'
        alt="Don't have any result"
        className=' mb-[12px] h-[330px] w-[full] object-contain tablet:h-[240px] tablet:w-[312px]'
      />
    </div>
  );
};
export default NotFound;
