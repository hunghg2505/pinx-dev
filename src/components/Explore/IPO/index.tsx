import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

import { IStockIPO } from '../service';

const IPO = ({ data }: { data: IStockIPO }) => {
  const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  const url = `${imageCompanyUrl}${
    data?.stockCode?.length === 3 || data?.stockCode[0] !== 'C'
      ? data?.stockCode
      : data?.stockCode?.slice(1, 4)
  }.png`;
  return (
    <CustomLink href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}>
      <div className='relative  h-[60px] rounded-[15px] bg-[#F7F6F8] pl-[8px] pr-[20px]'>
        <div className='relative z-10 flex h-full items-center justify-between'>
          <div className='flex w-[calc(100%_-_57px)] items-center'>
            <div className='mr-[10px] flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full bg-[#ffffff] object-contain'>
              <img src={url} alt='' width='0' height='0' sizes='100vw' className='block' />
            </div>
            <div className='w-full flex-1'>
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
              <Text type='body-12-regular' className='line-clamp-2 max-w-[98%]' color='neutral-3'>
                {data?.companyName}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </CustomLink>
  );
};
export default IPO;
