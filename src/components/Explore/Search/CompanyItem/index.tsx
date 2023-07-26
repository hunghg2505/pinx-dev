import Link from 'next/link';

import { ITopWatchingStock } from '@components/Explore/service';
import Text from '@components/UI/Text';
import { ROUTE_PATH, imageStock } from '@utils/common';

const CompanyItem = ({ data }: { data: ITopWatchingStock }) => {
  return (
    <Link href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}>
      <div className='flex items-center rounded-[15px] bg-[#F7F6F8] py-[10px] pl-[8px] pr-[20px]'>
        <img
          src={imageStock(data?.stockCode)}
          alt=''
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
            {data?.name}
          </Text>
        </div>
      </div>
    </Link>
  );
};
export default CompanyItem;
