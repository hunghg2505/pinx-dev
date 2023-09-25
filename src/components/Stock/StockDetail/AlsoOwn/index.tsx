import React from 'react';

import { useTranslation } from 'next-i18next';

import AlsoOwnItem from '@components/Stock/AlsoOwnItem';
import { ITaggingInfo } from '@components/Stock/type';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';
import { AnalyzeTicker } from '@utils/dataLayer';
import { getMoreInfoTracking } from 'src/mixpanel/mixpanel';

const ALSO_ITEM_LIMIT = 2;

interface IStockAlsoOwnProps {
  taggingInfo?: {
    data?: ITaggingInfo;
  };
  stockCode: string;
}

const StockAlsoOwn = ({ taggingInfo, stockCode }: IStockAlsoOwnProps) => {
  const { t } = useTranslation(['stock', 'common']);

  // gtm
  const handleAnalyze = () => {
    AnalyzeTicker(stockCode, 'Stock also own', 'General');
  };

  if (!taggingInfo?.data?.subsidiaries || taggingInfo.data.subsidiaries.length === 0) {
    return <></>;
  }

  return (
    <div className='card-style box-shadow mb-[28px]'>
      <Text type='body-20-semibold' className='mb-[8px]'>
        {t('also_own')}
      </Text>

      <div className='flex flex-col gap-y-[12px]'>
        {taggingInfo?.data?.subsidiaries.slice(0, ALSO_ITEM_LIMIT).map((item, index) => (
          <AlsoOwnItem data={item} key={index} />
        ))}
      </div>

      {taggingInfo.data.subsidiaries.length > ALSO_ITEM_LIMIT && (
        <CustomLink href={ROUTE_PATH.STOCK_ALSO_OWN(stockCode)}>
          <button
            onClick={() => {
              handleAnalyze();
              getMoreInfoTracking('Stock detail screen', 'Company', 'Subsidiaries');
            }}
            className='mt-[8px] flex h-[46px] w-full items-center justify-center rounded-[8px] bg-[#EEF5F9]'
          >
            <Text type='body-14-bold' color='primary-2'>
              {t('common:see_more')}
            </Text>
          </button>
        </CustomLink>
      )}
    </div>
  );
};

export default StockAlsoOwn;
