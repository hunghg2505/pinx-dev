import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';

import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

const IconLink = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30' fill='none'>
    <rect width='30' height='30' rx='15' fill='white' fillOpacity='0.45' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9.55556 9.55556V20.4444H20.4444V15H22V20.4444C22 21.3039 21.3039 22 20.4444 22H9.55556C8.69611 22 8 21.3039 8 20.4444V9.55556C8 8.69611 8.69611 8 9.55556 8H15V9.55556H9.55556ZM16.5564 9.55556V8H22.0009V13.4444H20.4453V10.6561L12.7998 18.3017L11.6992 17.2011L19.3448 9.55556H16.5564Z'
      fill='white'
    />
  </svg>
);
dayjs.extend(relativeTime);
const NewsItem = ({ data }: { data: any }) => {
  const router = useRouter();
  const onGoToDetail = () => {
    router.push(ROUTE_PATH.POST_DETAIL(data?.id));
  };
  const url = data?.post?.url;
  const onRedirect = () => {
    router.push({
      pathname: '/redirecting',
      query: { url },
    });
  };
  return (
    <>
      <div className='flex'>
        <div className='mr-[16px] w-[calc(100%_-_73px)] cursor-pointer' onClick={onGoToDetail}>
          <div className='flex items-center'>
            <img
              src={data?.post?.vendorInfo?.logo}
              alt=''
              className='mr-[8px] h-[24px] w-[24px] rounded-full object-contain'
            />
            <Text type='body-12-regular' color='primary-5' className='mr-[8px]'>
              {data?.post?.vendorInfo?.name}
            </Text>
            <Text type='body-12-regular' color='neutral-gray'>
              {data?.timeString && dayjs(data?.timeString)?.fromNow()}
            </Text>
          </div>
          <Text type='body-14-semibold' color='cbblack'>
            {data?.post?.title}
          </Text>
        </div>
        <div className='relative cursor-pointer' onClick={onRedirect}>
          <img
            src={data?.post?.thumbImageUrl}
            alt=''
            className='h-[73px] w-[73px] rounded-[12px]'
          />
          <div className='absolute left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 transform'>
            <IconLink />
          </div>
        </div>
      </div>
    </>
  );
};
export default NewsItem;
