import React from 'react';

import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import {
  ISuggestionPeople,
  requestFollowUser,
  // requestUnFollowUser,
} from '@components/Home/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import CustomImage from '@components/UI/CustomImage';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { ROUTE_PATH, formatStringToNumber, isUrlValid } from '@utils/common';

interface IProps {
  data: ISuggestionPeople;
  refreshList?: () => void;
  refresh?: () => void;
}
// const IconFollowBlue = () => (
//   <svg width='10' height='10' viewBox='0 0 14 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
//     <path
//       d='M1 5L4.99529 9L13 1'
//       stroke='#FFFFFF'
//       strokeWidth='1.5'
//       strokeLinecap='round'
//       strokeLinejoin='round'
//     />
//   </svg>
// );
const ItemPeople = (props: IProps) => {
  const { t } = useTranslation();
  const { data, refreshList, refresh } = props;
  const router = useRouter();
  // const [isFollow, setIsFollow] = React.useState(false);
  const { run: getUserProfile } = useProfileInitial();

  const useFollowUser = useRequest(
    () => {
      return requestFollowUser(data.id);
    },
    {
      manual: true,
      onSuccess: () => {
        getUserProfile();
        refreshList && refreshList();
        refresh && refresh();
        // setIsFollow(true);
      },
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.error} />);
      },
    },
  );
  // const useUnFollowUser = useRequest(
  //   () => {
  //     return requestUnFollowUser(data.id);
  //   },
  //   {
  //     manual: true,
  //     onSuccess: () => {
  //       setIsFollow(false);
  //       refresh && refresh();
  //       // refreshList();
  //     },
  //     onError: (e: any) => {
  //       toast(() => <Notification type='error' message={e?.error} />);
  //     },
  //   },
  // );
  const onFollow = () => {
    // if (isFollow) {
    //   useUnFollowUser.run();
    // } else {
    //   useFollowUser.run();
    // }
    useFollowUser.run();
  };
  return (
    <>
      <div className='mr-[16px] flex flex-col items-center rounded-[15px] border-[1px] border-solid border-[#F4F4F4] bg-[rgba(255,_255,_255,_0.704436)] px-[9px] pb-[10px] pt-[14px] backdrop-blur-[8.15485px] backdrop-filter [box-shadow:0px_5px_8px_rgba(88,_157,_192,_0.0948973)] galaxy-max:mr-[12px]'>
        <div
          onClick={() => router.push(ROUTE_PATH.PROFILE_DETAIL(data?.customerId))}
          className='flex flex-col items-center justify-center'
        >
          {isUrlValid(data?.avatar) ? (
            <CustomImage
              src={data?.avatar}
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='mb-[12px] h-[36px] w-[36px] rounded-full object-cover'
            />
          ) : (
            <div className='mb-[12px] h-[36px] w-[36px] rounded-full object-cover'>
              <AvatarDefault nameClassName='text-[14px]' name={data?.displayName} />
            </div>
          )}
          <div className='relative mb-[3px] flex min-h-[20px] items-center'>
            <Text
              type='body-12-semibold'
              color='neutral-3'
              className='relative line-clamp-1 inline-block overflow-ellipsis whitespace-nowrap text-center !leading-4 mobile:max-w-[70px]'
            >
              {data?.displayName}
            </Text>
            {data?.isFeatureProfile && (
              <img
                src='/static/icons/iconKol.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='ml-[4px] h-[20px] w-[20px]'
              />
            )}
            {data?.isKol && (
              <img
                src='/static/icons/iconTick.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='ml-[4px] h-[16px] w-[16px]'
              />
            )}
          </div>
          <Text type='body-12-medium' className='mb-[9px] text-center' color='neutral-4'>
            <p>{formatStringToNumber(data?.numberFollowers) || 0}</p>
            <p>{t('followers')}</p>
          </Text>
        </div>
        <div
          className='flex h-[24px] w-[33px] cursor-pointer items-center justify-center rounded-[16px] bg-[#589DC0]'
          onClick={onFollow}
        >
          {/* {isFollow ? (
            <IconFollowBlue />
          ) : (
            <img
              src='/static/icons/iconPlus.svg'
              alt=''
              width='0'
              height='0'
              className='w-[10px]'
            />
          )} */}
          <img
            loading='lazy'
            src='/static/icons/iconPlus.svg'
            alt=''
            width='0'
            height='0'
            className='w-[10px]'
          />
        </div>
      </div>
    </>
  );
};
export default ItemPeople;
