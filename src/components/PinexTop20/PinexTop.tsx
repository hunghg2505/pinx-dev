import classNames from 'classnames';
// import Link from 'next/link';

import Text from '@components/UI/Text';
import { imageStock } from '@utils/common';

interface Iprops {
  number: number;
  changePrice?: boolean;
  data: any;
}
const PinexTop = (props: Iprops) => {
  const { number, changePrice = false, data } = props;

  return (
    // <Link href={ROUTE_PATH.STOCK_DETAIL(data?.stockCode)}>
    <div
      className={classNames(
        'flex items-center justify-between rounded-[15px] px-[16px] py-[10px]',
        {
          'bg-[#B6E3F8]': number === 1,
          'bg-[#C7EAFD]': number === 2,
          'bg-[#E0F4FF]': number === 3,
          'bg-[#F7F6F8]': number > 3,
        },
      )}
    >
      <div className='flex items-center'>
        <div
          className={classNames(
            'mr-[16px] flex h-[24px] w-[24px] flex-row items-center justify-center rounded-full',
          )}
        >
          <Text type='body-14-medium' className={classNames('h-[15x] text-[#0D0D0D]')}>
            {number}
          </Text>
        </div>
        <img
          src={imageStock(data?.stockCode)}
          className='mr-[10px] h-[36px] w-[36px] rounded-full bg-[#ffffff] object-contain'
          alt=''
        />
        <div>
          <div className='flex'>
            <Text type='body-16-semibold' color='neutral-1' className='mr-[4px]'>
              {data?.stockCode}
            </Text>
            <div className='flex h-[20px] w-[57px] flex-row items-center justify-center rounded-[4px] border-[1px] border-solid border-[#E6E6E6] bg-[#FFF]'>
              <Text type='body-12-regular' color='neutral-4'>
                {data?.stockExchange}
              </Text>
            </div>
          </div>
          <Text
            type='body-12-regular'
            color='neutral-3'
            className='line-clamp-2 mobile-max:max-w-[120px]'
          >
            {data?.name}
          </Text>
        </div>
      </div>
      {changePrice ? (
        <div className='flex items-center'>
          <Text type='body-16-regular' color='semantic-2-1'>
            {new Intl.NumberFormat().format(data?.percentChange)}%
          </Text>
          <img
            src='/static/icons/explore/iconChange.svg'
            alt=''
            className='ml-[4px] h-[16px] w-[16px]'
          />
        </div>
      ) : (
        <Text type='body-16-regular' color='neutral-1'>
          {new Intl.NumberFormat().format(
            data?.profit || data?.revenue || data?.marketCapital || data?.price,
          )}
        </Text>
      )}
    </div>
    // </Link>
  );
};
export default PinexTop;
