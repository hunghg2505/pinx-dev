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
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { settingAtom } from '@store/setting/setting';
import { ROUTE_PATH } from '@utils/common';
import { REG_USERNAME } from '@utils/reg';


const customInputClassName = 'w-full py-2 border-solid border-b-[1px] border-[--neutral-7] outline-none bg-white';
const disabledInputClassname = 'text-[--neutral-5]';
const errorInputClassname = '!border-[#DA314F] !bg-[#FDF8ED]';

const Setting = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { userLoginInfo } = useUserLoginInfo();
  const [settingValues, setSettingValues] = useAtom(settingAtom);

  const onSubmit = (values: any) => {
    console.log('xxx values', values);
    setSettingValues({ ...settingValues, newUsername: values.newUsername });
    onSendOtp();
  };

  const requestSendOtp = useSendLoginOtp({
    onSuccess: () => {
      router.push(ROUTE_PATH.SETTING_CHANGE_USERNAME_VERIFICATION);
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
        <Text type='body-20-bold' className='mt-6 ml-4 mb-1'>Change Username</Text>
        <Form className='mt-10 space-y-7 px-4' form={form} onFinish={onSubmit}>
          <div>
            <Text type='body-12-semibold' className='text-[#808A9D]'>Current Username</Text>
            <FormItem className='mt-2' name='username'>
              <Input
                disabled
                value={userLoginInfo?.username}
                className={classNames(customInputClassName, disabledInputClassname)}
              />
            </FormItem>
          </div>

          <div>
            <Text type='body-12-semibold'>New Username</Text>
            <FormItem
              className='mt-2'
              name='newUsername'
              rules={[
                {
                  required: true,
                  message: 'New username empty'
                },
                {
                  pattern: REG_USERNAME,
                  message: 'Please check username format'
                }
              ]}>
              {(field: any) => (
                <Input
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
              name='confirmNewUsername'
              rules={[
                ({ getFieldValue }: { getFieldValue: any }) => ({
                  validator(_: any, value: any) {
                    if (getFieldValue('newUsername') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Confirm new Username and new Username do not match'));
                  },
                }),
              ]}>
              {(field: any) => (
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  className={classNames(customInputClassName, {
                    [errorInputClassname]: field.hasError
                  })}
                />
              )}
            </FormItem>
          </div>

          <Text type='body-14-regular'>*Username must be at least 6 characters and contain at least one alphabetic character do not include special characters.</Text>
          <div>
            <MainButton type='submit' className='w-[calc(100%-32px)] fixed bottom-9'>Next</MainButton>
          </div>
        </Form>

      </div >
    </>
  );
};

export default Setting;
