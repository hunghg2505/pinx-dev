import { useState, useCallback, useEffect } from 'react';

import { useDebounceFn } from 'ahooks';
import classNames from 'classnames';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import { RoundButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import LabelInput from '@components/UI/LabelInput';
import Text from '@components/UI/Text';
import { normalizeNumber } from '@utils/normalize';

interface IProps {
  onResendOtp: () => void;
  onSubmit: (otp: string) => void;
  phoneNumber?: string;
  isModal?: boolean;
  otpTime?: number;
  settingLayout?: boolean;
}

const convertSecond = (secs: number) => {
  const secondsText = secs < 10 ? '0' + Math.ceil(secs).toString() : Math.ceil(secs).toString();
  return secondsText;
};

const OtpVerification = (props: IProps) => {
  const { t } = useTranslation('common');
  const [form] = Form.useForm();
  const [otpRunning, setOtpRunning] = useState<boolean>(false);
  const [otpCount, setOtpCount] = useState<number>(props.otpTime ?? 120);
  const [isOtpExpired, setIsOtpExpired] = useState<boolean>(false);

  const [resendRunning, setResendRunning] = useState<boolean>(false);
  const [resendCount, setResendCount] = useState<number>(15);
  const [isResendAvailable, setIsResendAvailable] = useState<boolean>(false);

  const replacedPhoneNumber = () => {
    return props.phoneNumber && props.phoneNumber.slice(0, 3) + '****' + props.phoneNumber.slice(7);
  };

  const { run: onClearOtp } = useDebounceFn(
    () => {
      form.resetFields(['otp']);
    },
    {
      wait: 300,
    },
  );

  const onChange = (values: any) => {
    if (values.otp.length === 6) {
      props.onSubmit(values.otp);
      onClearOtp();
    }
  };

  const onResendOtp = () => {
    if (isResendAvailable) {
      props.onResendOtp();
      startOtpTimer();
      startResendTimer();
      resetTimer();
    }
  };

  // otp count down
  const startOtpTimer = () => {
    setOtpRunning(true);
  };

  const otpCounter = useCallback(() => {
    if (otpRunning) {
      setOtpCount((curState) => curState - 1);
    }
  }, [otpRunning]);

  useEffect(() => {
    if (otpCount === 0) {
      setOtpRunning(false);
      setIsOtpExpired(true);
    }
  }, [otpCount]);

  const resetTimer = () => {
    setOtpCount(props.otpTime ?? 120);
    setIsOtpExpired(false);
    setResendCount(15);
    setIsResendAvailable(false);
  };

  // resend count down
  const startResendTimer = () => {
    setResendRunning(true);
  };

  const resendCounter = useCallback(() => {
    if (resendRunning) {
      setResendCount((curState) => curState - 1);
    }
  }, [resendRunning]);

  useEffect(() => {
    if (resendCount === 0) {
      setResendRunning(false);
      setIsResendAvailable(true);
    }
  }, [resendCount]);

  useEffect(() => {
    const otpCounterInterval = setInterval(otpCounter, 1000);
    const resendCounterInterval = setInterval(resendCounter, 1000);

    return () => {
      clearInterval(otpCounterInterval);
      clearInterval(resendCounterInterval);
    };
  }, [otpCounter, resendCounter]);

  useEffect(() => {
    startOtpTimer();
    startResendTimer();
  }, []);

  return (
    <div
      className={classNames('mobile:mt-20 laptop:m-0 laptop:min-w-[450px]', {
        'mobile:!mt-5 laptop:min-w-max': props.isModal,
      })}
    >
      {props.settingLayout && (
        <>
          <Image
            src='/static/images/pinex_logo.png'
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='mx-auto h-[72px] w-[72px] mobile:hidden laptop:block'
          />
        </>
      )}
      <div className={`${props.isModal ? 'laptop:mt-[36px]' : 'mt-[46px]'}`}>
        <Text
          className={classNames('text-[24px] font-[700] galaxy-max:text-[20px]', {
            'laptop:text-center laptop:text-[28px]': props.settingLayout,
          })}
        >
          {t('confirm_phone_number')}
        </Text>
        <Text
          className={classNames('text-[18px] font-[400] galaxy-max:text-[16px]', {
            'laptop:text-center laptop:text-[16px]': props.settingLayout,
          })}
          color='neutral-4'
        >
          {t('enter_otp_send_to')}{' '}
          <span className='font-[700] text-[--neutral-1]'>{replacedPhoneNumber()}</span>
        </Text>
      </div>

      <Text
        type='body-14-bold'
        className={classNames('mb-3 mt-12 text-center', {
          'text-[--semantic-1]': isOtpExpired,
        })}
      >
        {isOtpExpired
          ? t('otp_is_expired')
          : `${t('otp_will_expire_in')} ${convertSecond(otpCount)}s`}
      </Text>

      <Form className='space-y-6' form={form} onValuesChange={onChange}>
        <FormItem
          normalize={(value: any, prevValue: any) => normalizeNumber(value, prevValue)}
          name='otp'
          rules={[
            {
              required: true,
              message: t('please_enter_OTP'),
            },
          ]}
          onC
        >
          <LabelInput
            type='tel'
            placeholder='SMS OTP'
            labelContent='SMS OTP'
            name='otp'
            maxLength={6}
          />
        </FormItem>
      </Form>

      <div className='mt-6 flex items-center justify-between'>
        <Text type='body-12-regular' color='neutral-4'>
          {t('cannot_retrieve_otp')}
        </Text>
        <RoundButton
          className='flex min-w-[120px] items-center justify-center px-4'
          disabled={!isResendAvailable}
          onClick={onResendOtp}
        >
          <img
            src={
              isResendAvailable ? '/static/icons/resend.svg' : '/static/icons/resend_disabled.svg'
            }
            alt=''
            width='0'
            height='0'
            className={'mr-2 h-[15px] w-[15px]'}
          />
          <Text type='body-12-regular' color={isResendAvailable ? 'primary-2' : 'neutral-5'}>
            {isResendAvailable ? t('resend_sms') : `00:${convertSecond(resendCount)}`}
          </Text>
        </RoundButton>
      </div>
    </div>
  );
};

export default OtpVerification;
