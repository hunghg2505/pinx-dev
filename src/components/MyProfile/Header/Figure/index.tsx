import React, { ReactElement } from 'react';

const Figure = ({ children }: { children: ReactElement }) => {
  return (
    <div className='tablet:pt-[0px]'>
      <div className='relative mb-[72px] w-full pt-[41%] tablet:mb-0 tablet:pt-[280px]'>
        {children}
      </div>
    </div>
  );
};
export default Figure;
