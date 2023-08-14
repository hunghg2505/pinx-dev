import React, { memo } from 'react';

import { useTranslation } from 'next-i18next';

interface ChartIframeProps {
  stockCode: string;
  refPrice?: number;
  color: string;
  forceUpdate?: any;
}

const ChartIframe = ({ stockCode, refPrice, color }: ChartIframeProps) => {
  const { i18n } = useTranslation();

  return (
    <iframe
      src={`https://price.pinetree.vn/chart-index/stock-chart?code=${stockCode}&lang=${i18n.language}&ref=${refPrice}&color=${color}`}
      frameBorder='0'
      className='h-[350px] w-full'
      key={Date.now()}
    ></iframe>
  );
};

export default memo(ChartIframe);
