import React from 'react';

import { useTranslation } from 'next-i18next';

import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';

import styles from './index.module.scss';

interface IPopupConfirmReviewProps {
  visible: boolean;
  onClose: () => void;
  closeIcon?: JSX.Element | null;
  onOpenPopupReview: () => void;
}

const PopupConfirmReview = ({
  visible,
  onClose,
  closeIcon = undefined,
  onOpenPopupReview,
}: IPopupConfirmReviewProps) => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <Modal
      visible={visible}
      className={styles.modalConfirmReview}
      onClose={onClose}
      closable={Boolean(closeIcon)}
      closeIcon={closeIcon}
    >
      <div className='fixed left-2/4 top-2/4 z-20 mx-[auto] my-[0] -translate-x-1/2 -translate-y-1/2 transform rounded-[8px] bg-[#fff] p-[24px] mobile:w-[calc(100%_-_32px)] tablet:w-[500px]'>
        <Text type='body-20-bold' className='mt-[16px] text-center'>
          {t('popup_confirm_review.title')}
        </Text>

        <img
          src='/static/images/thank_you.png'
          alt='Thank you image'
          className='mx-auto h-[190px] w-[287px] object-contain'
        />

        <div className='mb-[4px] py-[15px]' onClick={onClose}>
          <Text type='body-14-regular' className='cursor-pointer text-center text-[#808A9D]'>
            {t('popup_confirm_review.do_it_later')}
          </Text>
        </div>

        <button
          onClick={onOpenPopupReview}
          className='h-[48px] w-full rounded-[8px] border border-solid border-[#B1D5F1] bg-[#EEF5F9]'
        >
          <Text type='body-16-bold' color='primary-2'>
            {t('popup_confirm_review.write_a_review')}
          </Text>
        </button>
      </div>
    </Modal>
  );
};

export default PopupConfirmReview;
