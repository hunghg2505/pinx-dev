/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable indent */
import React, { useEffect } from 'react';

import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';
import { toast } from 'react-hot-toast';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import LabelInput from '@components/UI/LabelInput';
// import Text from '@components/UI/Text';
import Notification from '@components/UI/Notification';
import { useUserRegisterInfo } from '@hooks/useUserRegisterInfo';
import { deleteRegisterCookies } from '@store/auth';
import { useAuth } from '@store/auth/useAuth';
import { popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH } from '@utils/common';
import { TERM_AND_CONDITION_LINK } from '@utils/constant';
import { ENV } from '@utils/env';
import { normalizeNumber } from '@utils/normalize';
import { REG_EMAIL, REG_PASSWORD, REG_PHONE_NUMBER } from '@utils/reg';

import { useRegister } from './service';

declare const grecaptcha: any;

export interface IPropsWithReCapcha {
  onGetReCapcha: (recapchaToken?: string) => void;
}

interface IProps {
  isModal?: boolean;
}

const onGetReCapcha = async () => {
  return new Promise((resolve, reject) => {
    if (!grecaptcha?.ready) {
      reject(undefined);
    }

    grecaptcha.ready(async function () {
      const token = await grecaptcha.execute(ENV.RECAPTHCHA_SITE_KEY, {
        action: 'submit',
      });
      if (token) {
        resolve(token);
      }
      reject(undefined);
    });
  });
};

const Register = (props: IProps) => {
  const { t } = useTranslation('common');
  const { isModal } = props;
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const router = useRouter();
  const [form] = Form.useForm();
  const { onRegister } = useAuth();
  const { userRegisterInfo, setUserRegisterInfo } = useUserRegisterInfo();

  const onSubmit = (values: any) => {
    onGetReCapcha().then((recaptchaToken: any) => {
      const registerParams = {
        phoneNumber: values?.phoneNumber,
        password: values?.password,
        email: values?.email,
        recaptcha: recaptchaToken,
      };
      requestRegister.run(registerParams);
      setUserRegisterInfo(registerParams);
    });
  };

  const requestRegister = useRegister({
    onSuccess: (res: any) => {
      if (res?.data) {
        setUserRegisterInfo({
          ...userRegisterInfo,
          token: res?.data.token,
        });
        onRegister({
          token: res?.data.token,
          refreshToken: res?.refresh_token,
          expiredTime: res?.expired_time || 0,
        });
        switch (res?.data.nextStep) {
          case 'OTP': {
            if (isModal) {
              form.resetFields();
              setPopupStatus({
                ...popupStatus,
                popupAuth: false,
                popupRegisterOtp: true,
              });
            } else {
              router.push(ROUTE_PATH.REGISTER_OTP_VERIFICATION);
            }
            break;
          }
          case 'LOGIN_ID': {
            if (isModal) {
              setPopupStatus({
                ...popupStatus,
                popupAuth: false,
                popupRegisterUsername: true,
              });
            } else {
              router.push(ROUTE_PATH.REGISTER_USER_NAME);
            }
            break;
          }
        }
      }
    },
    onError(e) {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  useEffect(() => {
    deleteRegisterCookies();
  }, []);

  return (
    <>
      <Form
        className='mt-10 space-y-6 laptop:w-full'
        form={form}
        onFinish={onSubmit}
      >
        <FormItem
          name='phoneNumber'
          normalize={(value: any, prevValue: any) => normalizeNumber(value, prevValue)}
          rules={[
            {
              required: true,
              message: t('please_enter_phone_number'),
            },
            {
              pattern: REG_PHONE_NUMBER,
              message: t('please_enter_valid_phone_number'),
            },
          ]}
        >
          <LabelInput
            type='tel'
            placeholder={t('phone_number')}
            labelContent={t('phone_number')}
            name='phoneNumber'
            maxLength={10}
          />
        </FormItem>
        <FormItem
          name='email'
          rules={[
            {
              required: true,
              message: t('please_enter_email'),
            },
            {
              pattern: REG_EMAIL,
              message: t('please_enter_valid_email'),
            },
          ]}
        >
          <LabelInput placeholder='Email' labelContent='Email' name='email' />
        </FormItem>
        <FormItem
          name='password'
          rules={[
            {
              required: true,
              message: t('please_enter_password'),
            },
            {
              pattern: REG_PASSWORD,
              message: t('password_validate_error'),
            },
          ]}
        >
          <LabelInput
            placeholder={t('password')}
            labelContent={t('password')}
            type='password'
            name='password'
          />
        </FormItem>
        <FormItem
          name='confirmPassword'
          rules={[
            {
              required: true,
              message: t('please_retype_password'),
            },
            ({ getFieldValue }: { getFieldValue: any }) => ({
              validator(_: any, value: any) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('password_does_not_match')));
              },
            }),
          ]}
        >
          <LabelInput
            placeholder={t('confirm_password')}
            labelContent={t('confirm_password')}
            type='password'
            name='confirmPassword'
          />
        </FormItem>
        <div className='--neutral-1 text-[12px] font-[500] tablet:text-center'>
          {t('agree_to')}
          <span>
            <a
              href={TERM_AND_CONDITION_LINK}
              target='_blank'
              rel='noreferrer'
              className='!text-[--primary-2]'
            >
              &nbsp;{t('terms_and_conditions')}
            </a>
          </span>
        </div>
        <MainButton type='submit' className='w-full'>
          {t('continue')}
        </MainButton>
      </Form>
    </>
  );
};

export default Register;
