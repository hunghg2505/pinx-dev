import Image from 'next/image';

import Text from '@components/UI/Text';

import NewsFeed from '../NewsFeed';

const PostDetail = () => {
  return (
    <>
      <div className='header relative border-b border-solid border-black'>
        <Text type='body-16-bold' color='primary-5' className='py-[17px] text-center'>
          Post detail
        </Text>
        <Image
          src='/static/icons/iconBack.svg'
          alt=''
          width='0'
          height='0'
          className='absolute left-[16px] top-2/4 w-[18px] -translate-y-1/2 transform'
        />
      </div>
      <NewsFeed />
      <div className='unAuth flex flex-row items-center border-b border-t border-solid border-[#E6E6E6] px-[16px] py-[10px]'>
        <button className='h-[28px] w-[83px] rounded-[4px] bg-[#1F6EAC]'>
          <Text type='body-14-semibold' color='cbwhite'>
            Sign up
          </Text>
        </button>
        <Text type='body-14-regular' color='primary-5' className='mx-[8px]'>
          or
        </Text>
        <button className='h-[28px] w-[83px] rounded-[4px] bg-[#EAF4FB]'>
          <Text type='body-14-semibold' color='primary-2'>
            Log in
          </Text>
        </button>
        <Text type='body-14-regular' color='primary-5' className='ml-[7px]'>
          to join the discussion
        </Text>
      </div>
      {/* <Comment /> */}
      <div className='comment p-[16px]'>
        <div className='flex flex-row'>
          <Image
            src='/static/icons/avatar.svg'
            alt=''
            width='0'
            height='0'
            className='mr-[12px] w-[36px] rounded-full'
          />
          <div className='content'>
            <div className='rounded-[12px] bg-[#F6FAFD] px-[16px] py-[12px] [box-shadow:0px_1px_2px_rgba(0,_0,_0,_0.12)]'>
              <div className='mb-[12px] flex w-full flex-row items-center justify-between border-b border-solid border-[#E6E6E6] pb-[12px]'>
                <Text type='body-14-bold' color='neutral-1'>
                  Robbin Klevar
                </Text>
                <Text type='body-12-medium' color='neutral-5'>
                  2 days
                </Text>
              </div>
              <Text type='body-14-medium' color='primary-5'>
                Per conubia nostra, per inceptos no more himenaeos.
              </Text>
            </div>
            <div className='action mt-[11px] flex'>
              <div className='like mr-[50px] flex'>
                <Image
                  src='/static/icons/iconUnLike.svg'
                  alt=''
                  width='0'
                  height='0'
                  className='mr-[10px] w-[20px]'
                />
                <Text type='body-12-medium' color='primary-5'>
                  31
                </Text>
              </div>
              <div className='like flex'>
                <Image
                  src='/static/icons/iconComment.svg'
                  alt=''
                  width='0'
                  height='0'
                  className='mr-[10px] w-[18px]'
                />
                <Text type='body-12-medium' color='primary-5'>
                  Reply
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetail;
