import React from 'react';

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
  return (
    <Modal visible={visible} onClose={onClose} className='max-w-[90vw]'>
      <div className='mt-[28px]'>
        <ChartIframe stockCode={stockCode} refPrice={refPrice} color={color} />
      </div>
    </Modal>
  );
};

export default PopupZoomChart;
