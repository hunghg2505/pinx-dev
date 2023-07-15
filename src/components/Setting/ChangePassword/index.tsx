/* eslint-disable import/named */
import React from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import Form from 'rc-field-form';
import { toast } from 'react-hot-toast';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Notification from '@components/UI/Notification';
import { useSendLoginOtp } from '@components/UI/Popup/PopupLoginTerms/service';
import Text from '@components/UI/Text';
import { settingAtom } from '@store/setting/setting';
import { ROUTE_PATH, encryptPassword } from '@utils/common';
import { REG_PASSWORD } from '@utils/reg';

const customInputClassName = 'w-full py-2 border-solid border-b-[1px] border-[--neutral-7] outline-none bg-white';
const errorInputClassname = '!border-[#DA314F] !bg-[#FDF8ED]';

const Setting = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [settingValues, setSettingValues] = useAtom(settingAtom);
  const onSubmit = (values: any) => {
    const curPassword = encryptPassword(values.curPassword);
    const newPassword = encryptPassword(values.newPassword);
    setSettingValues({ ...settingValues, curPassword, newPassword });
    onSendOtp();
  };

  const requestSendOtp = useSendLoginOtp({
    onSuccess: () => {
      router.push(ROUTE_PATH.SETTING_CHANGE_PASSWORD_VERIFICATION);
    },
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const onSendOtp = () => {
    const payload = {
      authType: '1',
      trdType: '1',
    };
    requestSendOtp.run(payload);
  };

  return (
    <>
      <div className='mobile:mt-20'>
        <Text type='body-20-bold' className='mt-6 ml-4 mb-1'>Change password</Text>
        <Form className='mt-10 space-y-7 px-4' form={form} onFinish={onSubmit}>
          <div>
            <Text type='body-12-semibold'>Current password</Text>
            <FormItem
              className='mt-2'
              name='curPassword'
              rules={[
                {
                  required: true,
                  message: 'Please enter old password'
                },
              ]}>
              {(field: any) => (
                <Input
                  type='password'
                  onChange={field.onChange}
                  value={field.value}
                  className={classNames(customInputClassName, {
                    [errorInputClassname]: field.hasError
                  })}
                />
              )}
            </FormItem>
          </div>

          <div>
            <Text type='body-12-semibold'>New password</Text>
            <FormItem
              className='mt-2'
              name='newPassword'
              rules={[
                {
                  required: true,
                  message: 'Please enter new password'
                },
                {
                  pattern: REG_PASSWORD,
                  message: 'Please enter valid password',
                },
              ]}>
              {(field: any) => (
                <Input
                  type='password'
                  onChange={field.onChange}
                  value={field.value}
                  className={classNames(customInputClassName, {
                    [errorInputClassname]: field.hasError
                  })}
                />
              )}
            </FormItem>
          </div>

          <div>
            <Text type='body-12-semibold'>Re-type Username</Text>
            <FormItem
              className='mt-2'
              name='confirmNewPassword'
              rules={[
                ({ getFieldValue }: { getFieldValue: any }) => ({
                  validator(_: any, value: any) {
                    if (getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Confirm new password and new password not match'));
                  },
                }),
              ]}>
              {(field: any) => (
                <Input
                  type='password'
                  onChange={field.onChange}
                  value={field.value}
                  className={classNames(customInputClassName, {
                    [errorInputClassname]: field.hasError
                  })}
                />
              )}
            </FormItem>
          </div>

          <MainButton type='submit' className='w-[calc(100%-32px)] fixed bottom-9'>Next</MainButton>
        </Form>

      </div >
    </>
  );
};

export default Setting;
