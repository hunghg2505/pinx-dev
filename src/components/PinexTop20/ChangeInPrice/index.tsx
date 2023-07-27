import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';
import { IProfit, useGetTopChangePrice } from '../service';

const ChangeInPrice = () => {
  const { t } = useTranslation('explore');
  const { changePriceInY } = useGetTopChangePrice();
  return (
    <div className=''>
      <Text type='body-14-regular' color='cbblack'>
        {t('top_20_tab.change_in_price_1y_desc')}
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        {t('top_20_tab.change_in_price_1y_unit')}
      </Text>
      <div className='mt-[16px] flex flex-col gap-y-[16px]'>
        {changePriceInY?.map((changePriceInY: IProfit, index: number) => {
          return (
            <PinexTop
              number={index + 1}
              key={`profit-${index}`}
              data={changePriceInY}
              changePrice
            />
          );
        })}
      </div>
    </div>
  );
};
export default ChangeInPrice;
