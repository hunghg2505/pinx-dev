import React from 'react';

import 'rc-dialog/assets/index.css';
import Dialog from 'rc-dialog';

import Text from '@components/UI/Text';

interface IPopupConfirmReviewProps {
  visible: boolean;
  onClose: () => void;
  closeIcon?: JSX.Element | null;
}

const PopupConfirmReview = ({
  visible,
  onClose,
  closeIcon = undefined,
}: IPopupConfirmReviewProps) => {
  return (
    <Dialog visible={visible} onClose={onClose} closable={Boolean(closeIcon)} closeIcon={closeIcon}>
      <Text type='body-20-bold' className='mt-[16px] text-center'>
        Would you like to leave some thinking on this company?
      </Text>

      <img
        src='/static/images/thank_you.png'
        alt='Thank you image'
        className='h-[190px] w-[287px] object-contain'
      />

      <div className='mb-[4px] py-[15px]' onClick={onClose}>
        <Text type='body-14-regular' className='cursor-pointer text-center text-[#808A9D]'>
          I’ll do it later
        </Text>
      </div>

      <button className='h-[48px] w-full rounded-[8px] border border-solid border-[#B1D5F1] bg-[#EEF5F9]'>
        <Text type='body-16-bold' color='primary-2'>
          Write a review
        </Text>
      </button>
    </Dialog>
  );
};

export default PopupConfirmReview;
