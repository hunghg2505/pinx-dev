import React from 'react';

import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';

import styles from './index.module.scss';

interface IPopupHoldingRatioProps {
  visible: boolean;
  onClose: () => void;
}

const PopupHoldingRatio = ({ visible, onClose }: IPopupHoldingRatioProps) => {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      closeIcon={
        <img
          src='/static/icons/iconClose.svg'
          alt='Close icon'
          className='h-[21px] w-[21px] object-contain'
        />
      }
      className={styles.popup}
    >
      <div className='border-b border-solid border-[#EBEBEB] pb-[12px] pl-[20px]'>
        <Text type='body-20-semibold'>Holding ratio</Text>
      </div>

      <div className='max-h-[60vh] overflow-y-auto px-[12px]'></div>
    </Modal>
  );
};

export default PopupHoldingRatio;
