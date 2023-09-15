import React, { ReactElement } from 'react';

const Figure = ({ children }: { children: ReactElement }) => {
  return (
    <div className='tablet:pt-[0px]'>
      <div className='relative mb-[65px] w-full pt-[52%] galaxy-max:mb-[40px] tablet:mb-0'>
        {children}
      </div>
    </div>
  );
};
export default Figure;
