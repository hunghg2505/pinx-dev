import Image from 'next/image';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH, imageStock } from '@utils/common';

const ItemStock = ({
  data,
  onTrackingViewTicker,
}: {
  data: string;
  onTrackingViewTicker?: (stockCode: string) => void;
}) => {
  return (
    <CustomLink
      onClick={() => {
        onTrackingViewTicker && onTrackingViewTicker(data);
      }}
      href={ROUTE_PATH.STOCK_DETAIL(data)}
      className='mr-[6px] flex h-[32px] flex-row items-center justify-between rounded-[1000px] border-[1px] border-solid border-[rgba(88,157,192,0.24)] bg-[#1F6EAC] pl-[4px] pr-[6px] backdrop-blur-[2px] backdrop-filter'
    >
      <Image
        width='1'
        height='1'
        sizes='24px'
        src={imageStock(data)}
        alt=''
        className=' mr-[6px]  h-[24px] min-w-[24px] max-w-[24px]  overflow-hidden rounded-full border-2 border-solid border-white bg-[#ffffff] object-contain shadow-[0_2px_4px_rgba(0,0,0,0.10)]'
      />

      <Text type='body-12-medium' color='neutral-9'>
        {data}
      </Text>
    </CustomLink>
  );
};
export default ItemStock;
