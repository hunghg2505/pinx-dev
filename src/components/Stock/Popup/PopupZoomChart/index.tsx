import React, { useEffect, useState } from 'react';

import ChartIframe from '@components/Stock/StockDetail/ChartIframe';
import Modal from '@components/UI/Modal/Modal';

interface IPopupZoomChartProps {
  visible: boolean;
  onClose: () => void;
  closeIcon?: JSX.Element | null;
  stockCode: string;
  refPrice?: number;
}

const PopupZoomChart = ({ visible, onClose, stockCode, refPrice }: IPopupZoomChartProps) => {
  const [value, setValue] = useState(1);

  useEffect(() => {
    if (visible) {
      document.body.classList.add('overflow-y-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-y-hidden');
    };
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onClose={() => {
        onClose();
        setValue((prev) => prev + 1);
      }}
      className='max-w-[90vw]'
    >
      <div className='mt-[28px]'>
        <ChartIframe stockCode={stockCode} forceUpdate={value} refPrice={refPrice} />
      </div>
    </Modal>
  );
};

export default PopupZoomChart;
