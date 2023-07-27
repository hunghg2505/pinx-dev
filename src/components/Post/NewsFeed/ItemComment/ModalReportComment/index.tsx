import React from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
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

import Reason from './Reason';
import { TYPEREPORT, requestReportPost } from './service';

interface IProps {
  children: any;
  closeIcon?: boolean;
  postID: string;
  isReported?: boolean;
  refresh?: () => void;
  refreshCommentOfPOst?: () => void;
}
const ModalReportComment = (props: IProps) => {
  const { t } = useTranslation();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { children, postID, isReported, refresh, refreshCommentOfPOst } = props;
  const { statusUser, isLogin } = useUserType();
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const onVisible = () => {
    if (isReported && isLogin) {
      return;
    }

    if (isLogin) {
      if (statusUser === USERTYPE.VSD) {
        setVisible(!visible);
      } else if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
        toast(() => <Notification type='error' message={t('message_account_pending_to_close')} />);
      } else {
        setPopupStatus({ ...popupStatus, popupEkyc: true });
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
      onSuccess: () => {
        onVisible();
        refresh && refresh();
        refreshCommentOfPOst && refreshCommentOfPOst();
      },
      onError: (err: any) => {
        if (err?.error === 'VSD account is required') {
          toast(() => (
            <Notification type='error' message={t('message_account_pending_to_close')} />
          ));
        }
      },
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
      label: t('report_reason.bad_content'),
      value: TYPEREPORT.INAPPROPRIATE,
    },
    {
      label: t('report_reason.spam'),
      value: TYPEREPORT.SPAM,
    },
    {
      label: t('report_reason.violent_content'),
      value: TYPEREPORT.PROVOKE,
    },
    {
      label: t('report_reason.other'),
      value: TYPEREPORT.OTHER,
    },
  ];
  return (
    <>
      <Text
        onClick={onVisible}
        className={classNames('cursor-pointer', {
          'text-[#589DC0]': isReported && isLogin,
          'text-[#808080]': !isReported || !isLogin,
        })}
        type='body-14-regular'
      >
        {children}
      </Text>
      <Modal visible={visible} onClose={onVisible} closable={false}>
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
export default ModalReportComment;
