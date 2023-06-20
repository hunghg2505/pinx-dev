import Image from 'next/image';

import Text from '@components/UI/Text';

const PostBuy = () => {
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
      <Text type='body-14-regular' color='neutral-1' className='my-[16px]'>
        Username invested in $VPG
      </Text>
      <div className='relative h-[185px] w-[343px] rounded-[15px] bg-[linear-gradient(247.96deg,_#66CD90_14.41%,_#58A1C0_85.59%)]'>
        <Image
          src='/static/images/postSell.png'
          alt=''
          width='0'
          height='0'
          sizes='100vw'
          className='absolute right-0 top-0'
        />
        <div className='absolute bottom-[19px] left-[19px] h-[132px] w-[120px] rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] backdrop-blur-[3.4px] backdrop-filter'>
          <div className='absolute -top-[14px] left-2/4 flex h-[28px] w-[67px] -translate-x-1/2 transform flex-row items-center rounded-[100px] bg-[#F3F2F6] px-[4px]'>
            <Image
              src='/static/icons/logoStock.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='mr-[6px] w-[20px]'
            />
            <Text type='body-12-medium' color='primary-5'>
              $VPG
            </Text>
          </div>
          <div className='mt-[27.5px] flex flex-col items-center justify-center'>
            <Image
              src='/static/icons/iconPostBuy.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='mb-[10px] w-[20px]'
            />
            <div className='flex w-[97px] justify-center rounded-[4px] bg-[#F3F2F6] px-[13.5px] py-[4px] [box-shadow:0px_1px_2px_rgba(0,_0,_0,_0.12)]'>
              <Text type='body-12-medium' color='primary-5'>
                Buy
              </Text>
            </div>
            <Text type='body-12-medium' color='neutral-9' className='mb-[2px] mt-[10px]'>
              Transaction date
            </Text>
            <Text type='body-12-medium' color='neutral-7'>
              13/06/2023
            </Text>
          </div>
        </div>
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
export default PostBuy;
