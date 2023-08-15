import React, { useEffect, useState } from 'react';

import Modal from '@components/UI/Modal/Modal';

import MarketChartIframe from '../ChartIframe';

interface IPopupZoomChartProps {
  visible: boolean;
  onClose: () => void;
  closeIcon?: JSX.Element | null;
  mc: string;
  oIndex: number;
}

const PopupZoomChart = ({ visible, onClose, mc, oIndex }: IPopupZoomChartProps) => {
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
        <MarketChartIframe mc={mc} forceUpdate={value} oIndex={oIndex} />
      </div>
    </Modal>
  );
};

export default PopupZoomChart;
