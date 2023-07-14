import React from 'react';

import Image from 'next/image';

const Story = ({ content, pic, star }: { content: string; pic: string; star?: boolean }) => {
  return (
    <article className='max-[375px] w-full overflow-hidden rounded-[12px] text-white'>
      <header className='relative h-[375px]'>
        <Image src={pic} alt='story picture' fill className='relative h-auto' />
        <div className='absolute z-10 flex h-full w-full bg-gradient-to-t  from-neutral_black to-[transparent] px-[20px] pb-[12px] pt-[20px] '>
          <div className='mb-[16px] mt-auto w-full text-center '>
            <div className='flex justify-center '>
              <h3 className='font-600 mb-[4px] text-[24px]'>Anthony Starr</h3>
              {star && (
                <Image
                  src='/static/icons/iconStarFollow.svg'
                  width={16}
                  height={16}
                  alt='star'
                  className='h-[16px] w-[16px]'
                />
              )}
            </div>
            <p className='text-[14px]'>Entrepreneur, founder at ABC</p>
          </div>
        </div>
      </header>
      <main className=' bg-neutral_black px-[16px] pb-[20px] pt-[40px]'>
        <p className='mb-[16px] h-[268px] w-full overflow-auto text-[12px]'>{content}</p>
      </main>
    </article>
  );
};
export default Story;
