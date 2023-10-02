import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { ITopWatchingStock } from '@components/Explore/service';
import Text from '@components/UI/Text';
import { searchSeoAtom } from '@store/searchSeo/searchSeo';
import { ROUTE_PATH, getStockUrl, imageStock } from '@utils/common';

const CompanyItem = ({
  data,
  isSearchSeo = false,
  onTrackingEventViewStockInfo,
}: {
  data: ITopWatchingStock;
  isSearchSeo?: boolean;
  onTrackingEventViewStockInfo?: (stockCode: string) => void;
}) => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [, setSearchSeo] = useAtom(searchSeoAtom);
  const code = getStockUrl(data);
  return (
    <div
      onClick={() => {
        router.push(ROUTE_PATH.STOCK_DETAIL(code));
        setSearchSeo(false);
        onTrackingEventViewStockInfo && onTrackingEventViewStockInfo(data?.stockCode);
      }}
      className='flex cursor-pointer items-center rounded-[15px] bg-[#F7F6F8] py-[10px] pl-[8px] pr-[20px]'
    >
      <div className='mr-[10px] flex h-[36px] w-[36px] min-w-[36px] items-center justify-center overflow-hidden rounded-full bg-[#ffffff] galaxy-max:h-[32px] galaxy-max:w-[32px] galaxy-max:flex-none'>
        <Image
          width='0'
          height='0'
          sizes='100vw'
          src={imageStock(data?.stockCode)}
          alt=''
          className='block'
        />
      </div>
      <div className='w-full'>
        <div className='flex items-center'>
          <Text type='body-16-semibold' className='galaxy-max:text-[14px]' color='neutral-1'>
            {data?.stockCode}
          </Text>
          <Text
            type='body-12-regular'
            className='ml-[4px] flex h-[20px] w-[57px]  items-center justify-center rounded-[4px] border-[1px] border-solid border-[#E6E6E6] bg-[#ffffff] text-[#808080] galaxy-max:w-[50px] galaxy-max:text-[10px]'
          >
            {data?.stockExchange}
          </Text>
        </div>
        <Text
          type='body-12-regular'
          className='line-clamp-2 max-w-[90%] galaxy-max:text-[10px]'
          color='neutral-3'
        >
          {i18n.language === 'en' && isSearchSeo ? data?.nameEn : data?.name}
        </Text>
      </div>
    </div>
  );
};
export default CompanyItem;
