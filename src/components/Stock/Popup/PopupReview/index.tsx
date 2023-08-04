import React, { useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';
import { toast } from 'react-hot-toast';

import Rating from '@components/Stock/Rating';
import { useReviewStock } from '@components/Stock/service';
import FormItem from '@components/UI/FormItem';
import Loading from '@components/UI/Loading';
import Modal from '@components/UI/Modal/Modal';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';

import styles from './index.module.scss';

interface IPopupReviewProps {
  visible: boolean;
  onClose: () => void;
  star: number;
  onReviewSuccess: () => void;
  stockCode: string;
  message?: string;
}

const PopupReview = ({
  visible,
  onClose,
  star,
  onReviewSuccess,
  stockCode,
  message: messageProp,
}: IPopupReviewProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const [currentStar, setCurrentStar] = useState(0);
  const [form] = Form.useForm();

  useEffect(() => {
    setCurrentStar(star);
  }, [star]);

  useEffect(() => {
    form.setFieldsValue({
      message: messageProp,
    });
  }, [messageProp]);

  const requestReviewStock = useReviewStock(stockCode, {
    onSuccess: onReviewSuccess,
    onError: (error) => {
      toast(() => <Notification type='error' message={error?.error} />);
    },
  });

  const onSubmit = ({ message }: { message: string }) => {
    requestReviewStock.run({
      rateValue: currentStar,
      message: message || messageProp,
    });
  };

  return (
    <Modal
      visible={visible}
      onClose={() => {
        onClose();
      }}
      className={styles.modalReview}
    >
      <Form form={form} onFinish={onSubmit}>
        <Text type='body-20-bold' className='mt-[30px] text-[#0D0D0D]'>
          {t('review_form.title', {
            stockCode,
          })}
        </Text>

        {/* star */}
        <div className='border-b border-solid border-b-[var(--neutral-7)] py-[16px]'>
          <Rating star={currentStar} onChange={(star) => setCurrentStar(star)} />
        </div>

        <FormItem name='message'>
          <textarea
            placeholder={t('review_form.placeholder')}
            className='mb-[8px] mt-[16px] h-[230px] w-full resize-none rounded-[4px] border border-solid border-[#A6B0C3] p-[12px] text-[16px] text-[#808A9D] outline-none'
          />
        </FormItem>

        <button
          type='submit'
          disabled={requestReviewStock.loading}
          className='ml-auto flex h-[48px] min-w-[96px] items-center justify-center rounded-full bg-[linear-gradient(247.96deg,#1D6CAB_14.41%,#589DC0_85.59%)]'
        >
          {requestReviewStock.loading ? (
            <Loading />
          ) : (
            <img
              src='/static/icons/iconWhiteSend.svg'
              alt='Icon send'
              className='m-auto block h-[24px] w-[24px] object-contain'
            />
          )}
        </button>
      </Form>
    </Modal>
  );
};

export default PopupReview;
