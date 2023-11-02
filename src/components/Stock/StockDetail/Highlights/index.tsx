import React, { useMemo } from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { CompanyRelatedType, IHashtag, ITaggingInfo } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { STOCK_RELATED } from 'src/constant/route';
import { analyzeTickerTracking, viewStockListTracking } from 'src/mixpanel/mixpanel';

import styles from '../../index.module.scss';
import HighlighItem from '../HighlighItem';

const HIGHLIGH_ROW_LIMIT = 3;

interface IStockHighlightsProps {
  taggingInfo?: {
    data?: ITaggingInfo;
  };
  stockCode: string;
}

const StockHighlights = ({ taggingInfo, stockCode }: IStockHighlightsProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const router = useRouter();
  const { isMobile } = useResponsive();

  const { totalColumnHighligh } = useMemo(() => {
    const totalColumnHighligh = Math.ceil(
      (taggingInfo?.data?.highlights.length || 0) / HIGHLIGH_ROW_LIMIT,
    );

    return {
      totalColumnHighligh,
    };
  }, [taggingInfo]);

  const goToListCompanyPage = (type: CompanyRelatedType, hashtag: IHashtag) => {
    // gtm
    analyzeTickerTracking(stockCode, 'Stock highlights', 'General');

    // tracking view stock list
    viewStockListTracking(hashtag.tagName, 'Company related', 'Highligh tagging', 'Ticker info');

    router.push({
      pathname: STOCK_RELATED(stockCode, hashtag.id),
      query: {
        type,
      },
    });
  };

  if (!taggingInfo?.data?.highlights || !taggingInfo?.data?.highlights.length) {
    return <></>;
  }

  return (
    <div className='box-shadow card-style pb-[28px]'>
      <Text type='body-20-semibold' className='mb-[16px]'>
        {t('highlights')}
      </Text>

      {taggingInfo.data.highlights.length > 6 && isMobile ? (
        <div className={classNames('flex gap-x-[12px] overflow-x-auto', styles.noScrollbar)}>
          {Array.from({ length: totalColumnHighligh }, (_, index) => index).map((_, index) => (
            <div key={index} className='flex flex-col gap-y-[12px]'>
              {taggingInfo?.data?.highlights
                .slice(index * HIGHLIGH_ROW_LIMIT, HIGHLIGH_ROW_LIMIT * (index + 1))
                .map((highlight, highlighIndex) => (
                  <HighlighItem
                    onGoToCompaniesRelatedPage={goToListCompanyPage}
                    data={highlight}
                    key={highlighIndex}
                  />
                ))}
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-wrap gap-[12px]'>
          {taggingInfo?.data?.highlights.map((item, index) => (
            <HighlighItem
              onGoToCompaniesRelatedPage={goToListCompanyPage}
              data={item}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StockHighlights;
