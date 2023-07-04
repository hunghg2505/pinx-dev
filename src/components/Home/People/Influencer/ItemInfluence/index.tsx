import { useRequest } from 'ahooks';
import { toast } from 'react-hot-toast';

import { IKOL, requestFollowUser, requestUnFollowUser } from '@components/Home/service';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import PopupComponent from '@utils/PopupComponent';

interface IProps {
  data: IKOL;
  refresh: () => void;
}
const ItemInfluence = (props: IProps) => {
  const { isLogin } = useUserType();
  const { data, refresh } = props;
  const isFollow = data?.isFollowed;
  const useFollowUser = useRequest(
    () => {
      return requestFollowUser(data.id);
    },
    {
      manual: true,
      onSuccess: () => {
        refresh();
      },
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.error} />);
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
      },
    },
  );
  const onFollow = () => {
    if (isLogin) {
      if (isFollow) {
        useUnFollow.run();
      } else {
        useFollowUser.run();
      }
    } else {
      PopupComponent.open();
    }
  };
  return (
    <div className='mr-[16px] mobile:w-[161px] tablet:w-[161px]'>
      <div className="relative h-[252px] w-[100%] rounded-[15px] before:absolute before:bottom-[0] before:left-[0] before:z-10 before:h-full before:w-full before:rounded-[15px] before:bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.0001)_59.32%,_rgba(0,_0,_0,_0.868253)_91.04%)] before:content-['']">
        <div className='absolute bottom-[20px] left-[12px] right-[12px] z-10'>
          <div className='flex items-center'>
            <Text
              type='body-16-bold'
              color='cbwhite'
              className='overflow-hidden text-ellipsis whitespace-nowrap'
            >
              {data?.displayName}
            </Text>

            <img
              src='/static/icons/iconKol.svg'
              alt=''
              width={16}
              height={16}
              sizes='100vw'
              className='ml-[2px] w-[16px]'
            />
          </div>

          <Text type='body-14-regular' color='cbwhite' className='mt-[6px]'>
            {data.position}
          </Text>
        </div>
        <div
          className='absolute right-[13px] top-[13px] z-10 flex h-[24px] w-[32px] cursor-pointer flex-row items-center justify-center rounded-[100px] bg-[#589DC0]'
          onClick={onFollow}
        >
          <img
            src={isFollow ? '/static/icons/iconTickFollow.svg' : '/static/icons/iconPlus.svg'}
            alt=''
            width='0'
            height='0'
            className='w-[10px]'
          />
        </div>
        {data.avatar && (
          <img
            src={data.avatar}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='absolute left-0 top-0 h-full w-full rounded-[15px] object-cover'
          />
        )}
      </div>
    </div>
  );
};
export default ItemInfluence;
