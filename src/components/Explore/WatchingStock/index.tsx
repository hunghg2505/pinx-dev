import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH, formatStringToNumber, getStockUrl, imageStock } from '@utils/common';

import { ITopWatchingStock } from '../service';

interface Iprops {
  percen: number;
  data: ITopWatchingStock;
  mention?: boolean;
  onTrackingViewTickerInfo?: () => void;
}
const WatchingStock = (props: Iprops) => {
  const { percen, data, mention = false, onTrackingViewTickerInfo } = props;
  const { i18n } = useTranslation();

  const nameStock = i18n.language === 'en' ? data?.nameEn : data?.name;
  const code = getStockUrl(data);
  return (
    <CustomLink
      onClick={() => onTrackingViewTickerInfo && onTrackingViewTickerInfo()}
      href={ROUTE_PATH.STOCK_DETAIL(code)}
    >
      <div className='relative h-[60px] rounded-[15px] bg-[#F7F6F8] pl-[8px] pr-[20px]'>
        <div
          className='absolute left-0 top-0 z-[2] h-full rounded-[15px] bg-[#D7EEFF]'
          style={{ width: `${percen}%` }}
        ></div>
        <div className='relative z-10 flex h-full items-center justify-between'>
          <div className='flex w-[calc(100%_-_57px)] items-center'>
            <div className='mr-[10px] flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full bg-[#ffffff] object-contain'>
              <Image
                width='0'
                height='0'
                sizes='100vw'
                src={imageStock(data?.stockCode)}
                alt=''
                className='block'
              />
            </div>
            <div className='w-full flex-1'>
              <div className='flex items-center'>
                <Text type='body-16-semibold' className='galaxy-max:text-[14px]' color='neutral-1'>
                  {data?.stockCode}
                </Text>
                <Text
                  type='body-12-regular'
                  className='ml-[4px] flex h-[20px] w-[57px]  items-center justify-center rounded-[4px] border-[1px] border-solid border-[#E6E6E6] bg-[#ffffff] text-[#808080]'
                >
                  {data?.stockExchange}
                </Text>
              </div>
              <Text
                type='body-12-regular'
                className='line-clamp-2 max-w-[90%]  galaxy-max:text-[10px]'
                color='neutral-3'
              >
                {data?.companyName || nameStock}
              </Text>
            </div>
          </div>
          <div className='flex items-center'>
            <Text type='body-16-regular' color='neutral-1'>
              {formatStringToNumber(data?.totalCount) || 0}
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
    </CustomLink>
  );
};
export default WatchingStock;
