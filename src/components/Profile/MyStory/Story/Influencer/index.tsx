import React, { useContext } from 'react';

import { profileUserContext } from '@components/Profile';

import User from './User';
import CloseIcon from '../CloseIcon';

const Influencer = ({ closeStory }: { closeStory: () => void }) => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <article className='min-[375px] w-screen max-w-[min(calc(100vw-32px),375px)] overflow-hidden rounded-[12px] text-white'>
      <header className='relative h-[375px] '>
        <img
          src={profileUser?.avatar}
          alt='story picture'
          className='relative  h-full w-full object-cover'
        />
        <div className='absolute left-0 top-0 z-10 flex h-full  w-full bg-gradient-to-t from-neutral_black to-[transparent] px-[20px] pb-[12px] pt-[20px]'>
          <div className='mb-[16px] mt-auto w-full text-center '>
            <button className='absolute right-[20px] top-[20px] stroke-white' onClick={closeStory}>
              <CloseIcon />
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
export default Influencer;
