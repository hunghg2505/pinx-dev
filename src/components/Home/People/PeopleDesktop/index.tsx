import React from 'react';

import { useRequest } from 'ahooks';
import Image from 'next/image';

import { ISuggestionPeople, requestFollowUser, useSuggestPeople } from '@components/Home/service';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';

const PeopleDesktop = () => {
  const { suggestionPeople, refreshList, getSuggestFriend } = useSuggestPeople();
  const isLogin = !!getAccessToken();
  React.useEffect(() => {
    if (isLogin) {
      getSuggestFriend();
    }
  }, []);
  const useFollowUser = useRequest(
    (id: number) => {
      return requestFollowUser(id);
    },
    {
      manual: true,
      onSuccess: () => {
        refreshList();
      },
      onError: () => {},
    },
  );
  const onFollow = (id: number) => {
    useFollowUser.run(id);
  };
  return (
    <>
      {suggestionPeople?.slice(0, 3)?.map((item: ISuggestionPeople, index: number) => {
        const image = item?.avatar?.includes('http');
        return (
          <div
            className='item mb-[26px] flex items-center justify-between pb-[10px] [border-bottom:1px_solid_#ECECEC] last:border-none '
            key={index}
          >
            <div className='flex'>
              <Image
                src={
                  image
                    ? item?.avatar
                    : 'https://static.pinetree.com.vn/upload/images/pist/profile/Tran_Doan_Tien.jpg'
                }
                alt=''
                width='0'
                height='0'
                sizes='100vw'
                className='mr-[10px] w-[48px] rounded-full'
              />
              <div>
                <div className='flex items-center'>
                  <Text type='body-14-semibold' color='cbblack'>
                    {item.displayName}
                  </Text>
                  {item.isKol && (
                    <Image
                      src='/static/icons/iconStarFollow.svg'
                      alt=''
                      width={0}
                      height={0}
                      className='ml-[6px] w-[16px]'
                    />
                  )}
                </div>
                <Text type='body-12-regular' className='mt-[4px] text-[#666666]'>
                  {item.numberFollowers} Followers
                </Text>
              </div>
            </div>
            <div
              className='cursor-pointer rounded-[5px] bg-[#F0F7FC] p-[6px]'
              onClick={() => onFollow(item.id)}
            >
              <Image
                src='/static/icons/iconAdd.svg'
                alt=''
                width={0}
                height={0}
                className='w-[24px]'
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
export default PeopleDesktop;
