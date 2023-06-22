import React from 'react';

import 'rc-dialog/assets/index.css';

import { useRequest } from 'ahooks';
import Dialog from 'rc-dialog';
import Form from 'rc-field-form';

import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
import ToastUnAuth from '@components/UI/ToastUnAuth';
import { getAccessToken } from '@store/auth';

import Reason from './Reason';
import { TYPEREPORT, requestReportPost } from './service';

interface IProps {
  children: any;
  closeIcon?: boolean;
  postID: string;
}
const ModalReport = (props: IProps) => {
  const { children, closeIcon, postID } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const isLogin = !!getAccessToken();
  const onVisible = () => {
    setVisible(!visible);
  };

  const renderCloseIcon = (): React.ReactNode => {
    if (closeIcon) {
      return closeIcon;
    }
    return <>x</>;
  };
  const onReport = useRequest(
    (payload: any) => {
      return requestReportPost(postID, payload);
    },
    {
      manual: true,
      onSuccess: () => {
        console.log('thanh cong');
      },
      onError: () => {
        console.log('that bai');
      },
    },
  );
  const onFinish = () => {
    const value = form.getFieldsValue();
    if (isLogin) {
      onReport.run(value);
    } else {
      ToastUnAuth();
    }
  };
  const options = [
    {
      label: 'Ngôn ngữ không phù hợp',
      value: TYPEREPORT.INAPPROPRIATE,
    },
    {
      label: 'Spam',
      value: TYPEREPORT.SPAM,
    },
    {
      label: 'Ngôn ngữ gây kích động / bạo lực',
      value: TYPEREPORT.PROVOKE,
    },
    {
      label: 'Khác',
      value: TYPEREPORT.OTHER,
    },
  ];
  return (
    <>
      <span onClick={onVisible} className='cursor-pointer'>
        {children}
      </span>
      <Dialog visible={visible} onClose={onVisible} closeIcon={renderCloseIcon()} closable={false}>
        <Text type='body-20-bold' color='neutral-1' className='mb-[12px] text-center'>
          Report
        </Text>
        <Text type='body-12-medium' color='neutral-3' className='mb-[16px] text-center'>
          Tell us the reason why you want to report this section so we can help you better
        </Text>
        <Form form={form} onFinish={onFinish}>
          <FormItem
            name='reportType'
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
              prevValues.reportType !== curValues.reportType
            }
          >
            {() => {
              const reason = form.getFieldValue('reportType');
              if (reason === TYPEREPORT.OTHER) {
                return (
                  <FormItem name='message'>
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
              className='flex h-[49px] w-full cursor-pointer items-center justify-center rounded-[8px] border-[1px] border-solid border-[#B1D5F1] bg-[#EAF4FB]'
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
      </Dialog>
    </>
  );
};
export default ModalReport;
