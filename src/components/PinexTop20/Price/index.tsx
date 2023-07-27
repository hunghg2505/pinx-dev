import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';
import { IProfit, useGetTopPrice } from '../service';

const Price = () => {
  const { t } = useTranslation('explore');
  const { price } = useGetTopPrice();
  return (
    <div className=''>
      <Text type='body-14-regular' color='cbblack'>
        {t('top_20_tab.price_desc')}
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        {t('top_20_tab.price_unit')}
      </Text>
      <div className='mt-[16px] flex flex-col gap-y-[16px]'>
        {price?.map((price: IProfit, index: number) => {
          return <PinexTop number={index + 1} key={`profit-${index}`} data={price} />;
        })}
      </div>
    </div>
  );
};
export default Price;
