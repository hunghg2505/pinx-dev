import { useRequest } from 'ahooks';
import Image from 'next/image';

import { ISuggestionPeople, requestFollowUser } from '@components/Home/service';
import Text from '@components/UI/Text';

interface IProps {
  data: ISuggestionPeople;
  refresh: () => void;
}
const ItemPeople = (props: IProps) => {
  const { data, refresh } = props;
  const image = data.avatar.includes('http');
  const useFollowUser = useRequest(
    () => {
      return requestFollowUser(data.id);
    },
    {
      manual: true,
      onSuccess: () => {
        console.log('thanh cong');
        refresh();
      },
      onError: () => {
        console.log('err');
      },
    },
  );
  const onFollow = () => {
    useFollowUser.run();
  };
  return (
    <>
      <div className='m-[6px] flex flex-col items-center rounded-[15px] border-[1px] border-solid border-[#F4F4F4] bg-[rgba(255,_255,_255,_0.704436)] px-[9px] pb-[10px] pt-[14px] backdrop-blur-[8.15485px] backdrop-filter [box-shadow:0px_5px_8px_rgba(88,_157,_192,_0.0948973)]'>
        <Image
          src={
            image
              ? data?.avatar
              : 'https://static.pinetree.com.vn/upload/images/pist/profile/Tran_Doan_Tien.jpg'
          }
          alt=''
          width='0'
          height='0'
          sizes='100vw'
          className='mb-[10px] h-[56px] w-[56px] rounded-full object-cover'
        />
        <Text
          type='body-14-semibold'
          color='cbblack'
          className='mb-[3px] h-[34px] text-center !leading-4'
        >
          {data?.displayName}
        </Text>
        <Text type='body-12-medium' className='mb-[9px]' color='neutral-4'>
          {data?.numberFollowers} follower
        </Text>
        <div
          className='flex h-[24px] w-[33px] items-center justify-center rounded-[16px] bg-[#589DC0]'
          onClick={onFollow}
        >
          <Image
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
