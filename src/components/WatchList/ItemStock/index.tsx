import React from 'react';

import classNames from 'classnames';

// import { IWatchListItem } from '@components/Home/service';
import Text from '@components/UI/Text';

const ItemStock = () => {
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
    <>
      <div className='item flex h-[82px] items-center justify-between rounded-[12px] bg-[#F7F6F8] px-[12px]'>
        <div className='flex w-[65%] items-center'>
          <img
            src='/static/logo/logoPintree.png'
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='mr-[10px] h-[36px] w-[36px] rounded-full object-contain'
          />
          <div>
            <div className='flex items-center'>
              <Text type='body-16-semibold' color='cbblack'>
                {/* {data?.stockCode} */}VNM
              </Text>
              <Text
                type='body-10-regular'
                className='ml-[4px] rounded-[4px] border-[1px] border-solid border-[#DFDFDF] px-[3px] py-[5px] text-[#474D57]'
              >
                {/* {data?.stockExchange} */}HOSE
              </Text>
            </div>
            <Text type='body-12-regular' className='mt-[4px] line-clamp-2 text-[#666666]'>
              {/* {data?.shortName} */}CTCP Tập đoàn Đầu tư Địa ốc No Va
            </Text>
          </div>
        </div>
        <div className='text-right'>
          <Text
            type='body-16-medium'
            className={classNames('mt-[5px]', {
              // 'text-[#128F63]': isIncrease && !isHigh,
              // 'text-[#DB4444]': isDecrease && !isFloor,
              // 'text-[#08AADD]': isFloor,
              // 'text-[#B349C3]': isHigh,
              // 'text-[#E6A70A]  ': Math.ceil(data?.change) === 0,
            })}
          >
            {/* {data?.lastPrice?.toFixed(2)} */}43.95
          </Text>

          <Text
            type='body-12-regular'
            className={classNames('mt-[5px]', {
              // 'text-[#128F63]': isIncrease && !isHigh,
              // 'text-[#DB4444]': isDecrease && !isFloor,
              // 'text-[#08AADD]': isFloor,
              // 'text-[#B349C3]': isHigh,
              // 'text-[#E6A70A]  ': Math.ceil(data?.change) === 0,
            })}
          >
            {/* {unit}
            {data?.change} / {unit}
            {data?.changePc || data?.changePercent}% */}
            +0.45 / +1.02%
          </Text>
        </div>
      </div>
    </>
  );
};
export default ItemStock;
