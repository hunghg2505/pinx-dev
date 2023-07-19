import { IStockTheme, IThemeDetail } from '@components/Themes/service';
import Text from '@components/UI/Text';

import ItemStock from './ItemStock';

const StockSymbols = ({ data }: { data: IThemeDetail }) => {
  return (
    <>
      <Text
        type='body-20-semibold'
        color='neutral-black'
        className='mb-[16px] mt-[26px] block desktop:hidden'
      >
        Stock symbols
      </Text>
      <div className='flex flex-col gap-y-[16px] desktop:mt-[26px]'>
        {data?.stockList?.map((item: IStockTheme, index: number) => (
          <ItemStock key={index} data={item} />
        ))}
      </div>
    </>
  );
};
export default StockSymbols;