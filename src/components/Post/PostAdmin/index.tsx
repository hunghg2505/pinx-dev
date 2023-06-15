import Image from 'next/image';

import Text from '@components/UI/Text';

import ListStock from './ListStock';

const PostAdmin = () => {
  return (
    <div className='newsfeed mt-[10px] bg-[#ffffff] px-[16px] py-[24px]'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center'>
          <Image
            src='/static/icons/avatar.svg'
            alt='avatar'
            className='mr-2 w-[44px] rounded-full'
            width={36}
            height={36}
          />
          <div>
            <Text type='body-14-semibold' color='neutral-1'>
              Some usser name
            </Text>
            <Text type='body-12-regular' color='neutral-4' className='mt-[2px]'>
              HH:MM
            </Text>
          </div>
        </div>
        <div className='flex'>
          <button className='mr-[5px] flex h-[36px] w-[89px] flex-row items-center justify-center rounded bg-[#1F6EAC]'>
            <Image
              src='/static/icons/iconPlus.svg'
              alt=''
              width='0'
              height='0'
              className='mr-[4px] w-[8px]'
            />
            <Text type='body-14-semibold' color='neutral-9'>
              Follow
            </Text>
          </button>
          <Image
            src='/static/icons/iconDot.svg'
            alt=''
            width='0'
            height='0'
            className='w-[33px] cursor-pointer'
          />
        </div>
      </div>
      <div className='desc mb-[15px] mt-[18px]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec $HPG, nisl in lacinia
        vehicula, nisi augue tincidunt neque, pellentesque mattis tortor ante eu nisl. #IronicTrend
      </div>
      <div className='mb-[16px] flex gap-x-[6px]'>
        <div className='inline-block rounded-[4px] border-[1px] border-solid border-[#B1D5F1] px-[12px] py-[4px]'>
          <Text type='body-12-medium' color='primary-2'>
            $HPG
          </Text>
        </div>
        <div className='inline-block rounded-[4px] border-[1px] border-solid border-[#B1D5F1] px-[12px] py-[4px]'>
          <Text type='body-12-medium' color='primary-2'>
            $HPG
          </Text>
        </div>
        <div className='inline-block rounded-[4px] border-[1px] border-solid border-[#B1D5F1] px-[12px] py-[4px]'>
          <Text type='body-12-medium' color='primary-2'>
            $HPG
          </Text>
        </div>
      </div>
      <div className='theme relative'>
        <Image
          src='/static/images/image_post.jpg'
          alt=''
          width={343}
          height={168}
          className='rounded-bl-none rounded-br-none rounded-tl-[8px] rounded-tr-[8px]'
        />
        <div className='absolute bottom-[8px] left-0 w-full pl-[8px]'>
          <ListStock />
        </div>
      </div>
      <div className='flex h-[62px] items-center justify-between rounded-bl-[8px] rounded-br-[8px] rounded-tl-none rounded-tr-none border-[1px] border-solid border-[#EAF4FB] bg-[#F3F2F6] px-[12px] py-[5px]'>
        <Text>Title to webpage article</Text>
        <Image src='/static/icons/iconLink.svg' alt='' width='0' height='0' className='w-[21px]' />
      </div>
      <div className='action mt-[15px] flex flex-row items-center justify-between'>
        <div className='like flex flex-row items-center justify-center'>
          <Image
            src='/static/icons/iconLike.svg'
            alt=''
            width='0'
            height='0'
            className='mr-[8px] h-[14px] w-[18px]'
          />
          <Text type='body-12-medium' color='primary-1'>
            31 Likes
          </Text>
        </div>
        <div className='comment flex flex-row items-center justify-center'>
          <Image
            src='/static/icons/iconComment.svg'
            alt=''
            width={14}
            height={14}
            className='mr-[9px] w-[14px]'
          />
          <Text type='body-12-medium' color='primary-5'>
            200 Comments
          </Text>
        </div>
        <div className='report flex flex-row items-center justify-center'>
          <Image
            src='/static/icons/iconShare.svg'
            alt=''
            width={13}
            height={14}
            className='mr-[10px] w-[13px]'
          />
          <Text type='body-12-medium' color='primary-5'>
            32 Shares
          </Text>
        </div>
      </div>
    </div>
  );
};
export default PostAdmin;
