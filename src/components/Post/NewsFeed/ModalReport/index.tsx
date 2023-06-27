import React from 'react';

import 'rc-dialog/assets/index.css';

import { useRequest } from 'ahooks';
import Dialog from 'rc-dialog';
import Form from 'rc-field-form';

import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
import { USERTYPE, useUserType } from '@hooks/useUserType';
import PopupComponent from '@utils/PopupComponent';
import { RC_DIALOG_CLASS_NAME } from 'src/constant';

import Reason from './Reason';
import { TYPEREPORT, requestReportPost } from './service';

interface IProps {
  children: any;
  closeIcon?: boolean;
  postID: string;
  visible: boolean;
  onModalReportVisible: (v: boolean) => void;
  onReportSuccess: () => void;
}
const ModalReport = (props: IProps) => {
  const { children, closeIcon, postID, visible, onModalReportVisible, onReportSuccess } = props;
  const { statusUser, isLogin } = useUserType();
  const [form] = Form.useForm();
  const onVisible = () => {
    if (isLogin) {
      if (statusUser === USERTYPE.VSD) {
        onModalReportVisible(!visible);
      } else {
        PopupComponent.openEKYC();
      }
    } else {
      PopupComponent.open();
    }
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
      onSuccess: onReportSuccess,
      onError: () => {},
    },
  );
  const onFinish = () => {
    const value = form.getFieldsValue();
    if (isLogin) {
      onReport.run(value);
    }
  };
  const options = [
    {
      label: 'Bad content',
      value: TYPEREPORT.INAPPROPRIATE,
    },
    {
      label: 'Spam',
      value: TYPEREPORT.SPAM,
    },
    {
      label: 'Violent content',
      value: TYPEREPORT.PROVOKE,
    },
    {
      label: 'Other',
      value: TYPEREPORT.OTHER,
    },
  ];
  return (
    <>
      <span onClick={onVisible} className='cursor-pointer'>
        {children}
      </span>
      <Dialog
        rootClassName={RC_DIALOG_CLASS_NAME}
        visible={visible}
        onClose={onVisible}
        closeIcon={renderCloseIcon()}
        closable={false}
      >
        <Text type='body-20-bold' color='neutral-1' className='mb-[12px] text-center'>
          Report
        </Text>
        <Text
          type='body-12-medium'
          color='neutral-3'
          className='mb-[16px] text-center !leading-[16px]'
        >
          Let us know your reason to report this post. <br />
          You are always welcome!
        </Text>
        <Form
          form={form}
          initialValues={{
            reportType: TYPEREPORT.INAPPROPRIATE,
          }}
          onFinish={onFinish}
        >
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
                  <FormItem
                    name='message'
                    className='mt-[10px] border-b border-solid border-[#1F6EAC]'
                  >
                    <Input
                      placeholder='Tell us your reason...'
                      className='h-[38px] w-full pl-[5px] outline-none'
                    />
                  </FormItem>
                );
              }
            }}
          </FormItem>
          <div className='flex w-full gap-x-[13px] pt-[16px]'>
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
