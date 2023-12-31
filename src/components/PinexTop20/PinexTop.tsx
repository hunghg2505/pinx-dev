import classNames from 'classnames';
import Image from 'next/image';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { formatStringToNumber, getStockUrl, imageStock } from '@utils/common';
import { STOCK_DETAIL } from 'src/constant/route';

interface Iprops {
  number: number;
  changePrice?: boolean;
  data: any;
  percent: number;
  onTrackingViewTickerInfo?: () => void;
}
const PinexTop = (props: Iprops) => {
  const { number, changePrice = false, data, percent, onTrackingViewTickerInfo } = props;

  const code = getStockUrl(data);
  return (
    <CustomLink
      onClick={() => {
        onTrackingViewTickerInfo && onTrackingViewTickerInfo();
      }}
      href={STOCK_DETAIL(code)}
    >
      <div className='relative rounded-[15px] bg-[#F7F6F8]'>
        <div
          className='absolute h-full rounded-[15px] bg-[#D7EEFF]'
          style={{ width: `${percent}%` }}
        ></div>

        <div className='relative flex  items-center justify-between px-[16px] py-[10px]'>
          <div className='flex items-center'>
            <div
              className={classNames(
                'mr-[16px] flex h-[24px] w-[24px] flex-row items-center justify-center rounded-full galaxy-max:mr-[4px]',
              )}
            >
              <Text type='body-14-medium' className={classNames('h-[15x] text-[#0D0D0D]')}>
                {number}
              </Text>
            </div>

            <div className='mr-[10px] flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full bg-[#ffffff] object-contain'>
              <Image
                width='0'
                height='0'
                sizes='100vw'
                src={imageStock(data?.stockCode)}
                className='block'
                alt=''
              />
            </div>
            <div>
              <div className='flex'>
                <Text
                  type='body-16-semibold'
                  color='neutral-1'
                  className='mr-[4px] galaxy-max:text-[14px]'
                >
                  {data?.stockCode}
                </Text>
                <div className='flex h-[20px] w-[57px] flex-row items-center justify-center rounded-[4px] border-[1px] border-solid border-[#E6E6E6] bg-[#FFF]'>
                  <Text type='body-12-regular' className='text-[12px]' color='neutral-4'>
                    {data?.stockExchange}
                  </Text>
                </div>
              </div>
              <Text
                type='body-12-regular'
                color='neutral-3'
                className='mb-3 line-clamp-2 mobile-max:max-w-[120px]'
              >
                {data?.name}
              </Text>
              {changePrice ? (
                <div className='hidden items-center galaxy-max:flex'>
                  <Text type='body-16-regular' color='semantic-2-1'>
                    {formatStringToNumber(data?.percentChange) || 0}%
                  </Text>
                  <img
                    src='/static/icons/explore/iconChange.svg'
                    alt=''
                    className='ml-[4px] h-[16px] w-[16px]'
                  />
                </div>
              ) : (
                <Text type='body-16-regular' className='hidden galaxy-max:block' color='neutral-1'>
                  {formatStringToNumber(
                    data?.profit || data?.revenue || data?.marketCapital || data?.price,
                  ) || 0}
                </Text>
              )}
            </div>
          </div>
          {changePrice ? (
            <div className='flex items-center galaxy-max:hidden'>
              <Text type='body-16-regular' color='semantic-2-1'>
                {formatStringToNumber(data?.percentChange) || 0}%
              </Text>
              <img
                src='/static/icons/explore/iconChange.svg'
                alt=''
                className='ml-[4px] h-[16px] w-[16px]'
              />
            </div>
          ) : (
            <Text type='body-16-regular' className='galaxy-max:hidden' color='neutral-1'>
              {formatStringToNumber(
                data?.profit || data?.revenue || data?.marketCapital || data?.price,
              ) || 0}
            </Text>
          )}
        </div>
      </div>
    </CustomLink>
  );
};
export default PinexTop;
