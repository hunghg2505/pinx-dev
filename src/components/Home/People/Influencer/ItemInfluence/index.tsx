import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import { IKOL, requestFollowUser, requestUnFollowUser } from '@components/Home/service';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH } from '@utils/common';

interface IProps {
  data: IKOL;
  refresh: () => void;
}
const ItemInfluence = (props: IProps) => {
  const router = useRouter();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
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
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };
  const isFeatureProfile = data?.isFeatureProfile;
  const isKol = data?.isKol;
  return (
    <div className='w-[161px] cursor-pointer mobile-max:w-full tablet:w-[161px]'>
      <div className='relative h-[252px] w-[100%] rounded-[15px]'>
        <div
          onClick={() => router.push(ROUTE_PATH.PROFILE_DETAIL(data?.id))}
          className='relative left-0 top-0 z-10 h-full w-full'
        >
          <div className='absolute bottom-[20px] left-[12px] right-[12px] z-10'>
            <div className='flex items-center'>
              <Text
                type='body-16-bold'
                color='cbwhite'
                className='overflow-hidden text-ellipsis whitespace-nowrap'
              >
                {data?.displayName}
              </Text>
              {isFeatureProfile && (
                <img
                  src='/static/icons/iconKol.svg'
                  alt=''
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='h-[20px] w-[20px]'
                />
              )}
              {isKol && (
                <img
                  src='/static/icons/iconTick.svg'
                  alt=''
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='h-[20px] w-[20px]'
                />
              )}
            </div>

            <Text type='body-14-regular' color='cbwhite' className='mt-[6px]'>
              {data.position}
            </Text>
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
          <div className='bg pointer-events-none absolute bottom-0 left-0 h-full w-full rounded-[15px] bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.0001)_59.32%,_rgba(0,_0,_0,_0.868253)_91.04%)]'></div>
        </div>
        <div
          className='absolute right-[13px] top-[13px] z-20 flex h-[24px] w-[32px] cursor-pointer flex-row items-center justify-center rounded-[100px] bg-[#589DC0]'
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
      </div>
    </div>
  );
};
export default ItemInfluence;
