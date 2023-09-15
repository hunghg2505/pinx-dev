import React, { ReactElement } from 'react';

const Avatar = ({ children }: { children: ReactElement }) => {
  return (
    <div className='absolute bottom-[0%] left-[16px] z-10 translate-y-[calc(50%)] tablet:left-[10px] tablet:translate-y-[calc(100%-18px)]  tablet:p-[0px] xdesktop:left-[32px]'>
      {children}
    </div>
  );
};
export default Avatar;
