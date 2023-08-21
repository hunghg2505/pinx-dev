import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';
import { IProfit, useGetTopPrice } from '../service';

const Price = () => {
  const { t } = useTranslation('explore');
  const { price, loading } = useGetTopPrice();
  const maxPrice = price && Math.max(...price.map((item: IProfit) => item.price));

  return (
    <div className=''>
      <Text type='body-14-regular' className='galaxy-max:mb-2' color='cbblack'>
        {t('top_20_tab.price_desc')}
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        {t('top_20_tab.price_unit')}
      </Text>
      <div className='mt-[16px] flex flex-col gap-y-[16px]'>
        {loading ? (
          <Skeleton
            height={68}
            rows={10}
            wrapClassName='!gap-y-[16px]'
            className='!w-full !rounded-[15px]'
          />
        ) : (
          price?.map((price: IProfit, index: number) => {
            return (
              <PinexTop
                percent={((price.price || 0) / maxPrice) * 100}
                number={index + 1}
                key={`profit-${index}`}
                data={price}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
export default Price;
