import React from 'react';

import 'rc-dialog/assets/index.css';
import Dialog from 'rc-dialog';
import Form from 'rc-field-form';

import Rating from '@components/Stock/Rating';
import FormItem from '@components/UI/FormItem';
import Text from '@components/UI/Text';

interface IPopupReviewProps {
  visible: boolean;
  onClose: () => void;
}

const PopupReview = ({ visible, onClose }: IPopupReviewProps) => {
  const [form] = Form.useForm();
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Dialog
      visible={visible}
      bodyStyle={{ backgroundColor: '#F0F7FC', borderRadius: '12px' }}
      onClose={onClose}
      closeIcon={
        <img
          src='/static/icons/iconClose.svg'
          alt='Close icon'
          className='h-[21px] w-[21px] object-contain'
        />
      }
    >
      <Form form={form} onFinish={onSubmit}>
        <Text type='body-20-bold' className='mt-[30px] text-[#0D0D0D]'>
          What do you think about HPG?
        </Text>

        {/* star */}
        <div className='border-b border-solid border-b-[var(--neutral-7)] py-[16px]'>
          <Rating />
        </div>

        <FormItem name='content'>
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
    </Dialog>
  );
};

export default PopupReview;
