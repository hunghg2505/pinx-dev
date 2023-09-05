import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';
import { IProfit, useGetTopChangePrice } from '../service';

interface IChangeInPriceProps {
  onTrackingViewTickerInfo?: (stockCode: string, location: string) => void;
}

const ChangeInPrice = ({ onTrackingViewTickerInfo }: IChangeInPriceProps) => {
  const { t } = useTranslation('explore');
  const { changePriceInY, loading } = useGetTopChangePrice();
  const maxChangePriceInY =
    changePriceInY && Math.max(...changePriceInY.map((item: IProfit) => item.percentChange));

  return (
    <div className=''>
      <Text type='body-14-regular' className='galaxy-max:mb-2' color='cbblack'>
        {t('top_20_tab.change_in_price_1y_desc')}
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        {t('top_20_tab.change_in_price_1y_unit')}
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
          changePriceInY?.map((changePriceInY: IProfit, index: number) => {
            return (
              <PinexTop
                percent={((changePriceInY.percentChange || 0) / maxChangePriceInY) * 100}
                number={index + 1}
                key={`profit-${index}`}
                data={changePriceInY}
                changePrice
                onTrackingViewTickerInfo={() => {
                  onTrackingViewTickerInfo &&
                    onTrackingViewTickerInfo(changePriceInY?.stockCode, 'Change in price 1Y tab');
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
export default ChangeInPrice;
