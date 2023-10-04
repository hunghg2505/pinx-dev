import React, { memo } from 'react';

import { useTranslation } from 'next-i18next';

const getMarketCodeChart = (marketCode: string) => {
  if (marketCode === '10') {
    return 'VNINDEX';
  }

  if (marketCode === '02') {
    return 'HNXINDEX';
  }

  if (marketCode === '03') {
    return 'UPCOMINDEX';
  }

  if (marketCode === '11') {
    return 'VN30';
  }

  return '';
};

interface IMarketChartIframeProps {
  mc: string;
  oIndex: number;
  forceUpdate?: any;
}

const MarketChartIframe = ({ mc, oIndex }: IMarketChartIframeProps) => {
  const { i18n } = useTranslation();

  return (
    <iframe
      src={`https://price.pinetree.vn/chart-index/stock-chart?code=${getMarketCodeChart(
        mc,
      )}&type=INDEX&ref=${oIndex}&lang=${i18n.language}`}
      className='h-[350px] w-full rounded-[8px]'
      key={Math.random()}
      loading='lazy'
    ></iframe>
  );
};

export default memo(MarketChartIframe);
