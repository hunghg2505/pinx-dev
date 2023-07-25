/* eslint-disable import/named */
import React from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';
import { toast } from 'react-hot-toast';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Notification from '@components/UI/Notification';
import { useSendLoginOtp } from '@components/UI/Popup/PopupLoginTerms/service';
import Text from '@components/UI/Text';
import { openProfileAtom } from '@store/profile/profile';
import { settingAtom } from '@store/setting/setting';
import { ROUTE_PATH, encryptPassword } from '@utils/common';
import { REG_PASSWORD } from '@utils/reg';

const customInputClassName =
  'w-full py-2 border-solid border-b-[1px] border-[--neutral-7] !text-neutral_black outline-none bg-white';
const errorInputClassname = '!border-[#DA314F] !bg-[#FDF8ED]';

const ChangePassword = () => {
  const { t } = useTranslation('setting');
  const router = useRouter();
  const [form] = Form.useForm();
  const [settingValues, setSettingValues] = useAtom(settingAtom);
  const [, setOpenProfileMenu] = useAtom(openProfileAtom);
  const fromProfileMenu = router.query.from_profile_menu;

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

  const onBack = () => {
    if (fromProfileMenu) {
      setOpenProfileMenu(true);
    }
    router.back();
  };

  return (
    <div className='relative w-full rounded-[8px] bg-white text-left mobile-max:mt-[24px] laptop:px-[22px] laptop:py-[20px]'>
      <img
        src='/static/icons/back_icon.svg'
        alt=''
        width='0'
        height='0'
        className='ml-[8px] mt-[18px] h-[28px] w-[28px] cursor-pointer laptop:absolute laptop:left-[10px] laptop:top-[3px]'
        onClick={onBack}
      />

      <Text
        type='body-20-bold'
        className='mb-1 mt-6 laptop-max:ml-4 laptop:mt-0 laptop:text-center'
      >
        {t('change_password')}
      </Text>
      <div className='ml-[-24px] mt-[20px] w-[calc(100%+48px)] border-b-[1px] border-solid border-[#EEF5F9] laptop-max:hidden' />
      <Form
        className='mt-10 space-y-7 laptop-max:px-4 laptop:mb-24 laptop:mt-[20px]'
        form={form}
        onFinish={onSubmit}
      >
        <div>
          <Text type='body-14-semibold' color='primary-5'>
            {t('current_password')}
          </Text>
          <FormItem
            className='mt-2'
            name='curPassword'
            rules={[
              {
                required: true,
                message: t('please_enter_old_password'),
              },
            ]}
          >
            {(field: any) => (
              <Input
                type='password'
                onChange={field.onChange}
                value={field.value}
                className={classNames(customInputClassName, {
                  [errorInputClassname]: field.hasError,
                })}
              />
            )}
          </FormItem>
        </div>

        <div>
          <Text type='body-14-semibold' color='primary-5'>
            {t('new_password')}
          </Text>
          <FormItem
            className='mt-2'
            name='newPassword'
            rules={[
              {
                required: true,
                message: t('please_enter_new_password'),
              },
              {
                pattern: REG_PASSWORD,
                message: t('new_password_rule'),
              },
              ({ getFieldValue }: { getFieldValue: any }) => ({
                validator(_: any, value: any) {
                  if (getFieldValue('curPassword') === value) {
                    return Promise.reject(new Error(t('new_password_error_1')));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            {(field: any) => (
              <Input
                type='password'
                onChange={field.onChange}
                value={field.value}
                className={classNames(customInputClassName, {
                  [errorInputClassname]: field.hasError,
                })}
              />
            )}
          </FormItem>
        </div>

        <div>
          <Text type='body-14-semibold' color='primary-5'>
            {t('confirm_new_password')}
          </Text>
          <FormItem
            className='mt-2'
            name='confirmNewPassword'
            rules={[
              ({ getFieldValue }: { getFieldValue: any }) => ({
                validator(_: any, value: any) {
                  if (getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('confirm_new_password_error_1')));
                },
              }),
            ]}
          >
            {(field: any) => (
              <Input
                type='password'
                onChange={field.onChange}
                value={field.value}
                className={classNames(customInputClassName, {
                  [errorInputClassname]: field.hasError,
                })}
              />
            )}
          </FormItem>
        </div>

        <MainButton
          type='submit'
          className='fixed bottom-9 w-[calc(100%-32px)] laptop:absolute laptop:bottom-[-56px] laptop:m-auto laptop:w-1/2 laptop:translate-x-1/2'
        >
          {t('next')}
        </MainButton>
      </Form>
    </div>
  );
};

export default ChangePassword;
