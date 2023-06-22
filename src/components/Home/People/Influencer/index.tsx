import Image from 'next/image';

import { IKOL, requestFollowUser } from '@components/Home/service';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';
import ToastUnAuth from '@components/UI/ToastUnAuth';
import { useRequest } from 'ahooks';

interface IProps {
  data: IKOL;
}
const Influencer = (props: IProps) => {
  const { data } = props;
  const isLogin = !!getAccessToken();
  const useFollowUser = useRequest(
    () => {
      return requestFollowUser(data.id);
    },
    {
      manual: true,
    },
  );
  const onFollow = () => {
    if (!isLogin) {
      ToastUnAuth();
    } else {
      useFollowUser.run();
    }
  };
  return (
    <>
      <div className="relative h-[252px] w-[100%] rounded-[15px] before:absolute before:bottom-[0] before:left-[0] before:z-10 before:h-full before:w-full before:rounded-[15px] before:bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.0001)_59.32%,_rgba(0,_0,_0,_0.868253)_91.04%)] before:content-['']">
        <div className='absolute bottom-[19px] left-[15px] z-10 pr-[10px]'>
          <Text type='body-16-bold' color='cbwhite'>
            {data?.displayName}
          </Text>
          <Text type='body-14-regular' color='cbwhite' className='mt-[6px]'>
            {data.position}
          </Text>
        </div>
        <div
          className='absolute right-[13px] top-[13px] z-10 flex h-[36px] w-[89px] cursor-pointer flex-row items-center justify-center rounded-[8px] bg-[rgba(14,_29,_37,_0.5)]'
          onClick={onFollow}
        >
          <Image
            src='/static/icons/iconPlus.svg'
            alt=''
            width='0'
            height='0'
            className='mr-[5px] w-[8px]'
          />
          <Text type='body-14-semibold' color='neutral-9'>
            Follow
          </Text>
        </div>
        <Image
          src={data.avatar}
          alt=''
          width='0'
          height='0'
          sizes='100vw'
          className='absolute left-0 top-0 h-full w-full rounded-[15px] object-cover'
        />
      </div>
    </>
  );
};
export default Influencer;
