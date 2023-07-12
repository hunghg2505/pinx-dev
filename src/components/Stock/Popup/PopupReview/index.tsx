import React from 'react';

import 'rc-dialog/assets/index.css';
import Dialog from 'rc-dialog';

import Text from '@components/UI/Text';

interface IPopupReviewProps {
  visible: boolean;
  onClose: () => void;
  closeIcon?: JSX.Element | null;
}

const PopupReview = ({ visible, onClose, closeIcon = undefined }: IPopupReviewProps) => {
  return (
    <Dialog
      visible={visible}
      bodyStyle={{ backgroundColor: '#F0F7FC', borderRadius: '12px' }}
      onClose={onClose}
      closable={Boolean(closeIcon)}
      closeIcon={closeIcon}
    >
      <Text type='body-20-bold' className='mt-[30px] text-[#0D0D0D]'>
        What do you think about HPG?
      </Text>

      {/* star */}
      <div className='border-b-solid my-[16x] border-b border-b-[var(--neutral-7)]'></div>

      <textarea
        placeholder='Enter your review'
        className='mb-[8px] mt-[16px] h-[230px] w-full resize-none rounded-[4px] border border-solid border-[#A6B0C3] p-[12px] text-[16px] text-[#808A9D] outline-none'
      />

      <button className='ml-auto flex h-[48px] min-w-[96px] rounded-full bg-[linear-gradient(247.96deg,#1D6CAB_14.41%,#589DC0_85.59%)]'>
        <img
          src='/static/icons/iconWhiteSend.svg'
          alt='Icon send'
          className='m-auto block h-[24px] w-[24px] object-contain'
        />
      </button>
    </Dialog>
  );
};

export default PopupReview;
