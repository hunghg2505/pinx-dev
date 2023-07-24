import React, { useEffect, useState } from 'react';

import Dialog from 'rc-dialog';
import Form from 'rc-field-form';
import { toast } from 'react-hot-toast';

import Rating from '@components/Stock/Rating';
import { useReviewStock } from '@components/Stock/service';
import FormItem from '@components/UI/FormItem';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';

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
    <Dialog
      visible={visible}
      bodyStyle={{ backgroundColor: '#F0F7FC', borderRadius: '12px' }}
      onClose={() => {
        onClose();
      }}
    >
      <div className='fixed left-2/4 top-2/4 z-20 mx-[auto] my-[0] -translate-x-1/2 -translate-y-1/2 transform rounded-[8px] bg-[#F0F7FC] p-[24px] mobile:w-[calc(100%_-_32px)] tablet:w-[500px]'>
        <img
          src='/static/icons/iconClose.svg'
          alt='Close icon'
          onClick={onClose}
          className='ml-auto h-[21px] w-[21px] cursor-pointer object-contain'
        />

        <Form form={form} onFinish={onSubmit}>
          <Text type='body-20-bold' className='mt-[30px] text-[#0D0D0D]'>
            What do you think about HPG?
          </Text>

          {/* star */}
          <div className='border-b border-solid border-b-[var(--neutral-7)] py-[16px]'>
            <Rating star={currentStar} onChange={(star) => setCurrentStar(star)} />
          </div>

          <FormItem name='message'>
            <textarea
              placeholder='Enter your review'
              className='mb-[8px] mt-[16px] h-[230px] w-full resize-none rounded-[4px] border border-solid border-[#A6B0C3] p-[12px] text-[16px] text-[#808A9D] outline-none'
            />
          </FormItem>

          <button
            type='submit'
            className='ml-auto flex h-[48px] min-w-[96px] rounded-full bg-[linear-gradient(247.96deg,#1D6CAB_14.41%,#589DC0_85.59%)]'
          >
            <img
              src='/static/icons/iconWhiteSend.svg'
              alt='Icon send'
              className='m-auto block h-[24px] w-[24px] object-contain'
            />
          </button>
        </Form>
      </div>
    </Dialog>
  );
};

export default PopupReview;
