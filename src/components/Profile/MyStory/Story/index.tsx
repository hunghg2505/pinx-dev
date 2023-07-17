import React, { useContext } from 'react';

import { profileUserContext } from '@components/Profile';

import User from './User';

const Story = ({ closeStory }: { closeStory: () => void }) => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <article className='min-[375px] w-screen max-w-[min(calc(100vw-32px),375px)] overflow-hidden rounded-[12px] text-white'>
      <header className='relative h-[375px] '>
        <img src={profileUser?.avatar} alt='story picture' className='relative h-auto' />
        <div className='absolute z-10 flex h-full w-full bg-gradient-to-t  from-neutral_black to-[transparent] px-[20px] pb-[12px] pt-[20px] '>
          <div className='mb-[16px] mt-auto w-full text-center '>
            <button className='absolute right-[20px] top-[20px]' onClick={closeStory}>
              <svg
                width='21'
                height='21'
                viewBox='0 0 21 21'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M18.26 18.26L2.73828 2.73828'
                  stroke='white'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                />
                <path
                  d='M2.73828 18.26L18.26 2.73828'
                  stroke='white'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                />
              </svg>
            </button>
            <User />
          </div>
        </div>
      </header>
      <main className=' bg-neutral_black px-[16px] pb-[20px] pt-[40px]'>
        <p className='mb-[16px] h-[268px] w-full overflow-auto text-[12px]'>
          {profileUser?.caption}
        </p>
      </main>
    </article>
  );
};
export default Story;
