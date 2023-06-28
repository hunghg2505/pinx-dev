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

interface IProps {
  onResendOtp: () => void;
  onSubmit: (otp: string) => void;
  phoneNumber?: string;
}

const convertSecond = (secs: number) => {
  const secondsText = secs < 10 ? '0' + Math.ceil(secs).toString() : Math.ceil(secs).toString();

  return secondsText;
};

const OtpVerification = (props: IProps) => {
  const { t } = useTranslation('auth');
  const [form] = Form.useForm();
  const [otp, setOtp] = useState<string>('');
  const [otpRunning, setOtpRunning] = useState<boolean>(false);
  const [otpCount, setOtpCount] = useState<number>(120);
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

  const onChange = (e: any) => {
    if (e.target.value.length === 6) {
      setOtp(e.target.value);
      form.submit();
    }
  };

  const onSubmit = () => {
    props.onSubmit(otp);
    onClearOtp();
  };

  const onResendOtp = () => {
    if (isResendAvailable) {
      props.onResendOtp();
      startOtpTimer();
      setOtpCount(120);
      setIsOtpExpired(false);
      setResendCount(15);
      setIsResendAvailable(false);
      startResendTimer();
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
    <div className='mobile:mt-20 laptop:m-0 laptop:min-w-[450px]'>
      <div className='mt-[46px]'>
        <Text type='body-24-bold'>{t('comfirm_phone_number')}</Text>
        <Text type='body-18-regular' color='neutral-4'>
          {t('input_otp_from')}{' '}
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
          : `${t('otp_expire_after')} ${convertSecond(otpCount)}s`}
      </Text>

      <Form className='space-y-6' form={form} onFinish={onSubmit}>
        <FormItem
          name='otp'
          rules={[
            {
              max: 6,
              message: 'Max characters is 6!',
            },
          ]}
        >
          <LabelInput
            type='tel'
            placeholder={t('otp_code')}
            name='otp'
            labelContent={t('otp_code')}
            onChange={onChange}
          />
        </FormItem>
      </Form>

      <div className='mt-6 flex items-center justify-between'>
        <Text type='body-12-regular' color='neutral-4'>
          {t('not_recieve_otp')}
        </Text>
        <RoundButton
          className='flex min-w-[120px] items-center justify-center px-4'
          disabled={!isResendAvailable}
          onClick={onResendOtp}
        >
          <Image
            src={
              isResendAvailable ? '/static/icons/resend.svg' : '/static/icons/resend_disabled.svg'
            }
            alt=''
            width='0'
            height='0'
            className={'mr-2 h-[15px] w-[15px]'}
          />
          <Text type='body-12-regular' color={isResendAvailable ? 'primary-2' : 'neutral-5'}>
            {isResendAvailable ? t('resend_otp') : `00:${convertSecond(resendCount)}`}
          </Text>
        </RoundButton>
      </div>
    </div>
  );
};

export default OtpVerification;
