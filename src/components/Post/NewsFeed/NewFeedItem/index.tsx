import Image from 'next/image';

import Text from '@components/UI/Text';

import ModalReport from '../ModalReport';

interface IProps {
  onNavigate?: () => void;
}
const NewFeedItem = (props: IProps) => {
  const { onNavigate } = props;
  const onComment = () => {
    onNavigate && onNavigate();
  };

  return (
    <div className='newsfeed mt-[10px] cursor-pointer border-b border-t border-solid border-[#D8EBFC] px-[16px] py-[24px]'>
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
      <div className='theme'>
        <Image src='/static/images/theme.jpg' alt='' width={326} height={185} />
      </div>
      <div className='action mt-[15px] flex flex-row items-center justify-between'>
        <div className='like flex cursor-pointer flex-row items-center justify-center'>
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
        <div
          className='comment flex cursor-pointer flex-row items-center justify-center'
          onClick={onComment}
        >
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
            <ModalReport>32 Shares</ModalReport>
          </Text>
        </div>
      </div>
    </div>
  );
};
export default NewFeedItem;
