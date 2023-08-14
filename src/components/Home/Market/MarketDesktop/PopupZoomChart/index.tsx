import React from 'react';

import Modal from '@components/UI/Modal/Modal';

import { ChartIframe } from '..';

interface IPopupZoomChartProps {
  visible: boolean;
  onClose: () => void;
  closeIcon?: JSX.Element | null;
  mc: string;
  oIndex: number;
}

const PopupZoomChart = ({ visible, onClose, mc, oIndex }: IPopupZoomChartProps) => {
  return (
    <Modal visible={visible} onClose={onClose} className='max-w-[90vw]'>
      <div className='mt-[28px]'>
        <ChartIframe mc={mc} oIndex={oIndex} />
      </div>
    </Modal>
  );
};

export default PopupZoomChart;
