import React from 'react';

import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';
import { toast } from 'react-hot-toast';

import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Modal from '@components/UI/Modal/Modal';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { USERTYPE } from '@utils/constant';
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
  const { t } = useTranslation('common');
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { children, postID, visible, onModalReportVisible, onReportSuccess } = props;
  const { statusUser, isLogin } = useUserType();
  const [form] = Form.useForm();
  const onVisible = () => {
    if (isLogin) {
      if (statusUser === USERTYPE.VSD) {
        onModalReportVisible(!visible);
      } else if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
        toast(() => (
          <Notification
            type='error'
            message='Your account has been pending to close. You cannot perform this action'
          />
        ));
      } else {
        PopupComponent.openEKYC();
      }
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };

  const onReport = useRequest(
    (payload: any) => {
      return requestReportPost(postID, payload);
    },
    {
      manual: true,
      onSuccess: onReportSuccess,
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
      <Modal
        rootClassName={RC_DIALOG_CLASS_NAME}
        visible={visible}
        onClose={onVisible}
        closable={false}
      >
        <Text type='body-20-bold' color='neutral-1' className='mb-[12px] text-center'>
          {t('report')}
        </Text>
        <Text
          type='body-12-medium'
          color='neutral-3'
          className='mb-[16px] text-center !leading-[16px]'
        >
          {t('report_modal_content')} <br />
          {t('welcome_text')}
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
                message: t('please_enter_reason'),
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
                      placeholder={`${t('tell_us_your_reason')}...`}
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
                {t('cancel')}
              </Text>
            </div>
            <button className='h-[49px] w-full rounded-[8px] bg-[#1F6EAC]' type='submit'>
              <Text type='body-16-bold' color='cbwhite'>
                {t('send')}
              </Text>
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default ModalReport;
