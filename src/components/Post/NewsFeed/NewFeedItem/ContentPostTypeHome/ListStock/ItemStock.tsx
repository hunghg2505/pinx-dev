// import Link from 'next/link';

import Text from '@components/UI/Text';
// import { ROUTE_PATH } from '@utils/common';

const ItemStock = ({ data }: { data: string }) => {
  const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  const url = `${imageCompanyUrl}${
    data?.length === 3 || data?.[0] !== 'C' ? data : data?.slice(1, 4)
  }.png`;

  return (
    // <Link href={ROUTE_PATH.STOCK_DETAIL(data)}>
    <div className='mr-[6px]'>
      <div className='flex h-[32px] flex-row items-center justify-between rounded-[1000px] border-[1px] border-solid border-[rgba(88,157,192,0.24)] bg-[#1F6EAC] pl-[4px] pr-[6px] backdrop-blur-[2px] backdrop-filter'>
        {url && (
          <div className='mr-[6px] rounded-full bg-[#ffffff] shadow-[0_2px_4px_rgba(0,0,0,0.10)]'>
            <img
              src={url}
              alt=''
              className='block h-[24px] w-[24px] rounded-full border-2 border-solid border-white object-contain'
            />
          </div>
        )}

        <Text type='body-12-medium' color='neutral-9'>
          {data}
        </Text>
      </div>
    </div>
    // </Link>
  );
};
export default ItemStock;
