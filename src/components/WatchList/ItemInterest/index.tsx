import classNames from 'classnames';

// import { IWatchListItem } from '@components/Home/service';
import Text from '@components/UI/Text';

const IconHeart = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='72' height='54' viewBox='0 0 72 54' fill='none'>
    <g filter='url(#filter0_dd_2163_59509)'>
      <g filter='url(#filter1_d_2163_59509)'>
        <circle cx='36' cy='32' r='12' fill='white' />
      </g>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M28 32C28 27.5806 31.5806 24 36 24C40.4194 24 44 27.5806 44 32C44 36.4194 40.4194 40 36 40C31.5806 40 28 36.4194 28 32ZM36.4161 36.4677L39.9839 32.7839C41.0226 31.7129 40.9613 29.9387 39.8065 28.9516C38.7968 28.0903 37.2935 28.2452 36.3677 29.2L36.0032 29.5742L35.6387 29.2C34.7129 28.2452 33.2097 28.0903 32.2 28.9516C31.0419 29.9387 30.9806 31.7129 32.0161 32.7839L35.5806 36.4677C35.8129 36.7065 36.1871 36.7065 36.4161 36.4677Z'
        fill='#0D0D0D'
      />
    </g>
  </svg>
);
// interface IProps {
//   data?: IWatchListItem;
// }
const ItemInterest = () => {
  // const highest_price = data?.hp || data?.refPrice;
  // const lowest_price = data?.lp || data?.refPrice;
  // const isFloor = data?.lastPrice === data?.floorPrice;
  // const isHigh = data?.lastPrice === data?.ceilPrice;
  // const isDecrease = data?.lastPrice < highest_price;
  // const isIncrease = data?.lastPrice > lowest_price;
  // const unit = data?.cl === 'd' || data?.cl === 'f' || isDecrease ? '-' : '+';
  // const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  // const url = `${imageCompanyUrl}${
  //   data?.stockCode?.length === 3 || data?.stockCode[0] !== 'C'
  //     ? data?.stockCode
  //     : data?.stockCode?.slice(1, 4)
  // }.png`;
  return (
    <div className='mr-[16px] w-[112px]'>
      <div className='relative flex flex-col items-center justify-center rounded-[12px] bg-[#F9F9F9] px-[14px] pb-[12px] pt-[16px]'>
        <img
          src='/static/logo/logoPintree.png'
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='h-[40px] w-[40px] rounded-full object-contain'
        />
        <div>
          <IconHeart />
        </div>
        <Text
          type='barlow-16-medium'
          className={classNames('mt-[16px]', {
            // 'text-[#08AADD]': isFloor,
            // 'text-[#B349C3]': isHigh,
            // 'text-[#128F63]': isIncrease,
            // 'text-[#DB4444]': isDecrease,
            // 'text-[#E6A70A] ': Math.ceil(data?.change) === 0,
          })}
        >
          {/* {data?.lastPrice?.toFixed(2)} */}43.95
        </Text>
        <Text type='body-14-regular' color='primary-5' className={classNames('mt-[8px]')}>
          {/* {data.stockCode} */}VNM
        </Text>

        <div
          className={classNames('mt-[12px]', {
            // 'text-[#08AADD]': isFloor,
            // 'text-[#B349C3]': isHigh,
            // 'text-[#128F63]': isIncrease,
            // 'text-[#DB4444]': isDecrease,
            // 'text-[#E6A70A]  ': Math.ceil(data?.change) === 0,
          })}
        >
          <Text type='barlow-12-medium'>
            {/* {unit}
            {data?.change} / {unit}
            {data?.changePc || data?.changePercent}% */}
            +0.45 / +1.02%
          </Text>
        </div>
      </div>
    </div>
  );
};
export default ItemInterest;
