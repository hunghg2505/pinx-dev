import React from 'react';

const UserPostingFake = () => {
  return (
    <>
      <div className='rounded-[8px] bg-[#FFFFFF] p-[20px] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)] mobile:hidden tablet:mb-[20px] tablet:block desktop:h-[174px]'>
        <div className='flex items-center'>
          <img
            src={'/static/images/img-blur.png'}
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='mr-[10px] h-[56px] w-[56px] cursor-pointer rounded-full object-cover'
          />
        </div>
        <div className='mt-[5px] pl-[61px]'>
          <textarea
            placeholder='What is in your mind?'
            className='w-full rounded-[5px] bg-[#EFF2F5] pl-[10px] pt-[10px] focus:outline-none desktop:h-[70px]'
          />
        </div>
      </div>
    </>
  );
};

export default UserPostingFake;
