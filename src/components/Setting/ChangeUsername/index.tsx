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
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { openProfileAtom } from '@store/profile/profile';
import { settingAtom } from '@store/setting/setting';
import { ROUTE_PATH } from '@utils/common';
import { REG_USERNAME } from '@utils/reg';

const customInputClassName =
  'w-full py-2 border-solid border-b-[1px] border-[--neutral-7] outline-none bg-white';
const disabledInputClassname = 'text-[--neutral-5]';
const errorInputClassname = '!border-[#DA314F] !bg-[#FDF8ED]';

const ChangeUsername = () => {
  const { t } = useTranslation('setting');
  const router = useRouter();
  const [form] = Form.useForm();
  const { userLoginInfo } = useUserLoginInfo();
  const [settingValues, setSettingValues] = useAtom(settingAtom);
  const [, setOpenProfileMenu] = useAtom(openProfileAtom);
  const fromProfileMenu = router.query.from_profile_menu;

  const onSubmit = (values: any) => {
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
      <Text type='body-20-bold' className='mb-1 laptop-max:ml-4 laptop-max:mt-6 laptop:text-center'>
        {t('change_username')}
      </Text>
      <div className='ml-[-24px] mt-[20px] w-[calc(100%+48px)] border-b-[1px] border-solid border-[#EEF5F9] laptop-max:hidden' />
      <Form
        className='mt-10 space-y-7 laptop-max:px-4 laptop:mb-24 laptop:mt-[20px]'
        form={form}
        onFinish={onSubmit}
      >
        <div>
          <Text type='body-14-semibold' className='text-[#808A9D]'>
            {t('current_username')}
          </Text>
          <FormItem className='mt-2' name='username'>
            <Input
              disabled
              value={userLoginInfo?.username}
              className={classNames(customInputClassName, disabledInputClassname)}
            />
          </FormItem>
        </div>

        <div>
          <Text type='body-14-semibold' color='primary-5'>
            {t('new_username')}
          </Text>
          <FormItem
            className='mt-2'
            name='newUsername'
            rules={[
              {
                required: true,
                message: t('new_username_empty'),
              },
              {
                pattern: REG_USERNAME,
                message: t('please_check_username_format'),
              },
              () => ({
                validator(_: any, value: any) {
                  if (userLoginInfo?.username === value) {
                    return Promise.reject(new Error(t('new_username_error_1')));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            {(field: any) => (
              <Input
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
            {t('retype_username')}
          </Text>
          <FormItem
            className='mt-2'
            name='confirmNewUsername'
            rules={[
              ({ getFieldValue }: { getFieldValue: any }) => ({
                validator(_: any, value: any) {
                  if (getFieldValue('newUsername') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('retype_username_error_1')));
                },
              }),
            ]}
          >
            {(field: any) => (
              <Input
                onChange={field.onChange}
                value={field.value}
                className={classNames(customInputClassName, {
                  [errorInputClassname]: field.hasError,
                })}
              />
            )}
          </FormItem>
        </div>

        <Text type='body-14-regular'>{t('change_username_rule')}</Text>

        <MainButton
          type='submit'
          className='fixed bottom-9 w-[calc(100%-32px)] laptop:absolute laptop:bottom-[-56px] laptop:m-auto laptop:w-1/2 laptop:translate-x-1/2'
          disabled={requestSendOtp.loading}
          loading={requestSendOtp.loading}
        >
          {t('next')}
        </MainButton>
      </Form>
    </div>
  );
};

export default ChangeUsername;
