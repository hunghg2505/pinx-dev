// import Link from 'next/link';

import Text from '@components/UI/Text';
// import { ROUTE_PATH } from '@utils/common';

import { ITopWatchingStock } from '../service';

interface Iprops {
  percen: number;
  data: ITopWatchingStock;
  mention?: boolean;
}
const WatchingStock = (props: Iprops) => {
  const { percen, data, mention = false } = props;
  const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  const url = `${imageCompanyUrl}${
    data?.stockCode?.length === 3 || data?.stockCode[0] !== 'C'
      ? data?.stockCode
      : data?.stockCode?.slice(1, 4)
  }.png`;
  return (
    // <Link href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}>
    <div className='relative h-[60px] rounded-[15px] bg-[#F7F6F8] pl-[8px] pr-[20px]'>
      <div
        className='absolute left-0 top-0 z-[2] h-full rounded-[15px] bg-[#D7EEFF]'
        style={{ width: `${percen}%` }}
      ></div>
      <div className='relative z-10 flex h-full items-center justify-between'>
        <div className='flex w-[calc(100%_-_57px)] items-center'>
          <img
            src={url}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='mr-[10px] h-[36px] w-[36px] rounded-full bg-[#ffffff] object-contain'
          />
          <div className='w-full'>
            <div className='flex items-center'>
              <Text type='body-16-semibold' color='neutral-1'>
                {data?.stockCode}
              </Text>
              <Text
                type='body-12-regular'
                className='ml-[4px] flex h-[20px] w-[57px]  items-center justify-center rounded-[4px] border-[1px] border-solid border-[#E6E6E6] bg-[#ffffff] text-[#808080]'
              >
                {data?.stockExchange}
              </Text>
            </div>
            <Text type='body-12-regular' className='line-clamp-2 max-w-[90%]' color='neutral-3'>
              {data?.companyName || data?.name}
            </Text>
          </div>
        </div>
        <div className='flex items-center'>
          <Text type='body-16-regular' color='neutral-1'>
            {data?.totalCount}
          </Text>
          {mention ? (
            <img
              src='/static/icons/explore/iconMention.svg'
              alt=''
              className='ml-[6px] h-[18px] w-[18px]'
            />
          ) : (
            <img
              src='/static/icons/explore/iconcHeart.svg'
              alt=''
              className='ml-[6px] h-[24px] w-[24px]'
            />
          )}
        </div>
      </div>
    </div>
    // </Link>
  );
};
export default WatchingStock;
