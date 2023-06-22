import { IWatchListItem } from '@components/Home/service';
import Text from '@components/UI/Text';
import Image from 'next/image';

const ItemStock = ({ data }: { data: IWatchListItem }) => {
  const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  const url = `${imageCompanyUrl}${
    data?.stockCode?.length === 3 || data?.stockCode[0] !== 'C'
      ? data?.stockCode
      : data?.stockCode?.slice(1, 4)
  }.png`;
  return (
    <>
      <div className='item mb-[26px] flex justify-between pb-[10px] [border-bottom:1px_solid_#ECECEC] last:border-none '>
        <div className='flex'>
          <Image
            src={url}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='mr-[10px] w-[48px] rounded-full object-contain'
          />
          <div>
            <div className='flex items-center'>
              <Text type='body-14-bold' color='cbblack'>
                {data.stockCode}
              </Text>
              <Text
                type='body-12-regular'
                className='ml-[4px] rounded-[4px] border-[1px] border-solid border-[#DFDFDF] px-[3px] py-[5px] text-[#474D57]'
              >
                {data.stockExchange}
              </Text>
            </div>
            <Text type='body-12-regular' className='mt-[4px] text-[#666666]'>
              {data.name}
            </Text>
          </div>
        </div>
        <div className='text-right'>
          <Text color='semantic-2-1' type='body-14-semibold'>
            43.95
          </Text>
          <Text color='semantic-2-1' type='body-12-medium' className='mt-[5px]'>
            +0.45 / +1.02%
          </Text>
        </div>
      </div>
    </>
  );
};
export default ItemStock;
