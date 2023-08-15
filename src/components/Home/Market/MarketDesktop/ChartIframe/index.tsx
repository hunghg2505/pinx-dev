import React, { memo } from 'react';

import { useTranslation } from 'next-i18next';

import { getMarketCodeChart } from '..';

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
    ></iframe>
  );
};

export default memo(MarketChartIframe);
