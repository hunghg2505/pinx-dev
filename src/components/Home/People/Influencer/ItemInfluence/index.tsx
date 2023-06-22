import { IKOL, requestFollowUser, requestUnFollowUser } from '@components/Home/service';
import Text from '@components/UI/Text';
import ToastUnAuth from '@components/UI/ToastUnAuth';
import { getAccessToken } from '@store/auth';
import { useRequest } from 'ahooks';
import Image from 'next/image';

interface IProps {
  data: IKOL;
  refresh: () => void;
}
const ItemInfluence = (props: IProps) => {
  const { data, refresh } = props;
  const isFollow = data?.isFollowed;
  const isLogin = !!getAccessToken();
  const useFollowUser = useRequest(
    () => {
      return requestFollowUser(data.id);
    },
    {
      manual: true,
      onSuccess: () => {
        refresh();
        console.log('thanh cong');
      },
    },
  );
  const useUnFollow = useRequest(
    () => {
      return requestUnFollowUser(data?.id);
    },
    {
      manual: true,
      onSuccess: () => {
        refresh();
        console.log('thanh cong');
      },
    },
  );
  const onFollow = () => {
    if (!isLogin) {
      ToastUnAuth();
    } else {
      if (isFollow) {
        useUnFollow.run();
      } else {
        useFollowUser.run();
      }
    }
  };
  return (
    <div className='mr-[16px]'>
      <div className="relative mr-[10px] h-[252px] w-[100%] rounded-[15px] before:absolute before:bottom-[0] before:left-[0] before:z-10 before:h-full before:w-full before:rounded-[15px] before:bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.0001)_59.32%,_rgba(0,_0,_0,_0.868253)_91.04%)] before:content-['']">
        <div className='absolute bottom-[19px] left-[15px] z-10 pr-[10px]'>
          <div className='flex items-center'>
            <Text type='body-16-bold' color='cbwhite'>
              {data?.displayName}
            </Text>
            {/* <Image
              src='/static/icons/iconStarFollow.svg'
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='w-[16px]'
            /> */}
          </div>

          <Text type='body-14-regular' color='cbwhite' className='mt-[6px]'>
            {data.position}
          </Text>
        </div>
        <div
          className='absolute right-[13px] top-[13px] z-10 flex h-[24px] w-[32px] cursor-pointer flex-row items-center justify-center rounded-[100px] bg-[#589DC0]'
          onClick={onFollow}
        >
          <Image
            src={isFollow ? '/static/icons/iconTickFollow.svg' : '/static/icons/iconPlus.svg'}
            alt=''
            width='0'
            height='0'
            className='w-[10px]'
          />
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
    </div>
  );
};
export default ItemInfluence;
