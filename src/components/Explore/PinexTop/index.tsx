import { useRouter } from 'next/router';

// import { TabsEnum } from '@components/UI/Tabs';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

interface Iprops {
  label: string;
  value: string;
}
const newObject: any = {
  Profit: 'https://static.pinetree.com.vn/upload/images/pist/theme/top20_profit.png',
  Revenue: 'https://static.pinetree.com.vn/upload/images/pist/theme/top20_revenue.png',
  MarketCapitalization:
    'https://static.pinetree.com.vn/upload/images/pist/theme/top20_market_capitalization.png',
  Price: 'https://static.pinetree.com.vn/upload/images/pist/theme/top20_price.png',
  ChangeInPrice1Y:
    'https://static.pinetree.com.vn/upload/images/pist/theme/top20_change_in_price_1Y.png',
};
const PinexTop = (props: Iprops) => {
  const { label, value } = props;
  const router = useRouter();
  const onHandleClick = () => {
    router.push({
      pathname: ROUTE_PATH.PINEX_TOP_20,
      query: { type: value },
    });
  };
  return (
    <div className='mr-[16px] w-[156px] cursor-pointer' onClick={onHandleClick}>
      <div className='relative flex h-[252px] flex-col justify-end rounded-[12px] bg-[#ffffff] '>
        <img
          src={newObject[value]}
          alt=''
          className='absolute left-0 top-0 h-full w-full rounded-[12px]'
        />
        <div className='absolute bottom-0 left-0 h-full w-full rounded-bl-[12px] rounded-br-[12px] rounded-tl-none rounded-tr-none bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0)_0%,_rgba(0,_0,_0,_0)_61.25%,_rgba(0,_0,_0,_0.8)_100%)]'></div>
        <div className='relative z-10 p-[12px]'>
          <Text type='body-14-semibold' color='neutral-9' className='mb-[6px]'>
            {label}
          </Text>
        </div>
      </div>
    </div>
  );
};
export default PinexTop;
