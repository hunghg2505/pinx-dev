import React from 'react';

import 'rc-dialog/assets/index.css';

import Dialog from 'rc-dialog';
import Form from 'rc-field-form';

import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';

import Reason from './Reason';

interface IProps {
  children: any;
  closeIcon?: boolean;
}
const ModalReport = (props: IProps) => {
  const { children, closeIcon } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const onVisible = () => {
    setVisible(!visible);
  };
  const renderCloseIcon = (): React.ReactNode => {
    if (closeIcon) {
      return closeIcon;
    }
    return <>x</>;
  };
  const onFinish = () => {
    const value = form.getFieldsValue();
    console.log('🚀 ~ file: index.tsx:25 ~ onFinish ~ value:', value);
  };
  const options = [
    {
      label: 'Ngôn ngữ không phù hợp',
      value: '1',
    },
    {
      label: 'Spam',
      value: '2',
    },
    {
      label: 'Ngôn ngữ gây kích động / bạo lực',
      value: '3',
    },
    {
      label: 'Khác',
      value: '4',
    },
  ];
  return (
    <>
      <span onClick={onVisible} className='cursor-pointer'>
        {children}
      </span>
      <Dialog visible={visible} onClose={onVisible} closeIcon={renderCloseIcon()} closable={false}>
        <div>
          <Text type='body-20-bold' color='neutral-1' className='mb-[12px] text-center'>
            Report
          </Text>
          <Text type='body-12-medium' color='neutral-3' className='mb-[16px] text-center'>
            Tell us the reason why you want to report this section so we can help you better
          </Text>
          <Form form={form} onFinish={onFinish}>
            <FormItem
              name='reason'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập lý do',
                },
              ]}
            >
              <Reason options={options} />
            </FormItem>
            <FormItem
              shouldUpdate={(prevValues: any, curValues: any) =>
                prevValues.reason !== curValues.reason
              }
            >
              {() => {
                const reason = form.getFieldValue('reason');
                if (reason === '4') {
                  return (
                    <FormItem name='text'>
                      <Input
                        placeholder='Tell us your reason...'
                        className='h-[34px] w-full pl-[5px]'
                      />
                    </FormItem>
                  );
                }
              }}
            </FormItem>
            <div className='flex w-full gap-x-[13px] border-t border-solid border-[#1F6EAC] pt-[16px]'>
              <div
                onClick={onVisible}
                className='flex h-[49px] w-full items-center justify-center rounded-[8px] border-[1px] border-solid border-[#B1D5F1] bg-[#EAF4FB]'
              >
                <Text type='body-16-bold' color='primary-2'>
                  Cancel
                </Text>
              </div>
              <button className='h-[49px] w-full rounded-[8px] bg-[#1F6EAC]' type='submit'>
                <Text type='body-16-bold' color='cbwhite'>
                  Send
                </Text>
              </button>
            </div>
          </Form>
        </div>
      </Dialog>
    </>
  );
};
export default ModalReport;
