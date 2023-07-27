import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';
import { IProfit, useGetTopProfit } from '../service';

const Profit = () => {
  const { t } = useTranslation('explore');
  const { profit } = useGetTopProfit();
  return (
    <div className=''>
      <Text type='body-14-regular' color='cbblack'>
        {t('top_20_tab.profit_desc')}
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        {t('top_20_tab.profit_unit')}
      </Text>
      <div className='mt-[16px] flex flex-col gap-y-[16px]'>
        {profit?.map((profit: IProfit, index: number) => {
          return <PinexTop number={index + 1} key={`profit-${index}`} data={profit} />;
        })}
      </div>
    </div>
  );
};
export default Profit;
