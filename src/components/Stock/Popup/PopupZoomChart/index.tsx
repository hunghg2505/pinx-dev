import React, { useState } from 'react';

import ChartIframe from '@components/Stock/StockDetail/ChartIframe';
import Modal from '@components/UI/Modal/Modal';

interface IPopupZoomChartProps {
  visible: boolean;
  onClose: () => void;
  closeIcon?: JSX.Element | null;
  stockCode: string;
  refPrice?: number;
  color: string;
}

const PopupZoomChart = ({ visible, onClose, stockCode, refPrice, color }: IPopupZoomChartProps) => {
  const [value, setValue] = useState(1);

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
        <ChartIframe stockCode={stockCode} forceUpdate={value} refPrice={refPrice} color={color} />
      </div>
    </Modal>
  );
};

export default PopupZoomChart;
