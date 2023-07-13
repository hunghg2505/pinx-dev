import { useRequest } from 'ahooks';
import classNames from 'classnames';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { IThemeDetail } from '@components/Themes/service';
import Text from '@components/UI/Text';

const LandingPageDetailThemes = ({
  data,
  refresh,
}: {
  data: IThemeDetail;
  refresh: () => void;
}) => {
  const code = data?.code;
  const useSubcribe = useRequest(
    () => {
      return privateRequest(
        requestPist.post,
        API_PATH.PRIVATE_FOLLOW_THEME + `?themeCodes=${code}`,
      );
    },
    {
      manual: true,
      onSuccess: () => {
        refresh && refresh();
      },
      onError: () => {},
    },
  );
  const useUnSubcribe = useRequest(
    () => {
      return privateRequest(
        requestPist.put,
        API_PATH.PRIVATE_UNFOLLOW_THEME + `?themeCodes=${code}`,
      );
    },
    {
      manual: true,
      onSuccess: () => {
        refresh && refresh();
      },
      onError: () => {},
    },
  );
  const onSubscribe = () => {
    if (data?.isSubsribed) {
      useUnSubcribe.run();
    } else {
      useSubcribe.run();
    }
  };
  return (
    <div className='relative flex h-[467px] flex-col justify-end rounded-[16px]'>
      <div className='ml-[16px] flex h-[29px] w-[29px] content-center items-center justify-center rounded-full bg-[#000000] opacity-50 desktop:hidden'>
        <img
          src='/static/icons/icon_back_white.svg'
          alt=''
          width='0'
          height='0'
          className='h-[15px]cursor-pointer w-[9px]'
        />
      </div>
      <img
        src={data?.bgImage}
        alt=''
        className='absolute left-0 top-0 h-full w-full rounded-[16px] object-cover'
      />
      <div className='relative z-10 mt-[-25px] rounded-b-[16px] rounded-br-[16px] bg-gradient-to-t from-[#000000] px-[16px] pb-[16px]'>
        <Text type='body-20-semibold' color='neutral-9' className='mb-[8px]'>
          {data?.name}
        </Text>
        <Text type='body-14-regular' color='neutral-9' className='mb-[8px]'>
          {data?.description}
        </Text>
        <div className='flex items-center justify-between'>
          <div className='flex'>
            <div className='mr-[43px] mobile-max:mr-[20px]'>
              <Text
                className='bg-gradient-to-r from-[#8ADEF6] to-[#59C0E9] bg-clip-text text-transparent'
                type='body-20-medium'
              >
                {data?.stockList?.length}
              </Text>
              <Text
                className='bg-gradient-to-r from-[#8ADEF6] to-[#59C0E9] bg-clip-text text-transparent'
                type='body-12-medium'
              >
                Symbols
              </Text>
            </div>
            <div>
              <Text
                className='bg-gradient-to-r from-[#8ADEF6] to-[#59C0E9] bg-clip-text text-transparent'
                type='body-20-medium'
              >
                {data?.totalSubscribe}
              </Text>
              <Text
                className='bg-gradient-to-r from-[#8ADEF6] to-[#59C0E9] bg-clip-text text-transparent'
                type='body-12-medium'
              >
                Subscribed
              </Text>
            </div>
          </div>

          <div
            className={classNames(
              'flex cursor-pointer items-center rounded-[1000px]  px-[16px] py-[8px]',
              {
                'bg-[#A6B0C3]': data?.isSubsribed,
                'bg-gradient-to-r from-[#589DC0] to-[#1D6CAB]': !data?.isSubsribed,
              },
            )}
            onClick={onSubscribe}
          >
            <div className='mr-[8px]'>
              <img
                src='/static/icons/heartRing.svg'
                alt=''
                width='0'
                height='0'
                className='w-[18px] cursor-pointer'
              />
            </div>
            <Text type='body-14-medium' color='neutral-9'>
              {data?.isSubsribed ? 'Subscribed' : 'Subscribe'}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPageDetailThemes;
