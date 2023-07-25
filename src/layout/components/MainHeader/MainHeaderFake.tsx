import React from 'react';

const MainHeaderFake = () => {
  return (
    <>
      <div className='flex h-[56px] items-center border-b-[1px] border-solid border-[#EBEBEB] bg-white px-[10px] desktop:h-[84px] desktop:px-0'>
        <div className='mx-auto flex w-[100%]  max-w-[1355px] items-center justify-between'>
          <div className='h-[36px] w-[36px] rounded-[12px] bg-[#2b77b0] desktop:h-[52px] desktop:w-[52px]'></div>
          <div className='flex items-center gap-[10px]'>
            <div className='h-[36px] rounded-[4px] border border-[--primary-6] bg-[#EAF4FB] mobile:w-[90px] desktop:mr-[13px] desktop:w-[122px]'></div>
            <div className='h-[36px] rounded-[4px] bg-[linear-gradient(230.86deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)] mobile:hidden desktop:block desktop:w-[122px]'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeaderFake;
