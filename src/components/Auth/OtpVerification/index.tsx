// import { useTranslation } from 'next-i18next';
import { useState, useCallback, useEffect } from 'react';

import classNames from 'classnames';
import Image from 'next/image';
import Form from 'rc-field-form';

import { RoundButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import { StyledInput } from '@components/UI/Input';
import Text from '@components/UI/Text';

import 'rc-picker/assets/index.css';


interface IProps {
  onSubmit: (otp: string) => void;
}

interface Itime {
  m: string;
  s: string;
}

const secondsToTime = (secs: number) => {
  const divisor_for_minutes = secs % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);
  const minutesText =
    minutes < 10
      ? '0' + Math.floor(divisor_for_minutes / 60).toString()
      : Math.floor(divisor_for_minutes / 60).toString();

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);
  const secondsText =
    seconds < 10
      ? '0' + Math.ceil(divisor_for_seconds).toString()
      : Math.ceil(divisor_for_seconds).toString();

  const obj = {
    m: minutesText,
    s: secondsText,
  };
  return obj;
};

const OtpVerification = (props: IProps) => {
  // const { t } = useTranslation('common');
  const [form] = Form.useForm();
  const [otp, setOtp] = useState<string>('');
  const [otpRunning, setOtpRunning] = useState<boolean>(false);
  const [otpCount, setOtpCount] = useState<number>(120);
  const [otpTime, setOtpTime] = useState<Itime>();
  const [isOtpExpired, setIsOtpExpired] = useState<boolean>(false);

  const [resendRunning, setResendRunning] = useState<boolean>(false);
  const [resendCount, setResendCount] = useState<number>(60);
  const [resendTime, setResendTime] = useState<Itime>();
  const [isResendAvailable, setIsResendAvailable] = useState<boolean>(false);

  const onChange = useCallback(
    (e: any) => {
      if (e.target.value.length === 6) {
        setOtp(e.target.value);
        form.submit();
      }
    },
    [form],
  );

  const onSubmit = () => {
    console.log('xxx submit OTP');
    props.onSubmit(otp);
  }

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
    setOtpTime(secondsToTime(otpCount));
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
    setResendTime(secondsToTime(resendCount));
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
    }
  }, [otpCounter, resendCounter]);

  useEffect(() => {
    startOtpTimer();
    startResendTimer();
  }, []);

  return (
    <>
      <div className='mx-auto flex flex-col  items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-lg bg-white dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
          <div className='mt-[56px]'>
            <Text type='body-24-bold'>Confirm phone number</Text>
            <Text type='body-18-regular' color='neutral-4'>Enter OTP sent to <span className='text-[--neutral-1] font-[700]'>0987****321</span></Text>
          </div>

          <Text type='body-14-bold' className={classNames('mt-12 mb-3 text-center', {
            'text-[--semantic-1]': isOtpExpired,
          })}>
            {isOtpExpired
              ? 'The OTP is expired'
              : `The OTP will be expired in ${otpTime?.m}:${otpTime?.s} min`}
          </Text>

          <Form className='space-y-6' form={form} onFinish={onSubmit}>
            <FormItem
              name='otp'
              rules={[
                {
                  max: 6,
                  message: 'Max characters is 6!'
                }
              ]}
            >
              <StyledInput
                type='number'
                placeholder='OTP'
                onChange={onChange}
              />
            </FormItem>
          </Form>

          <div className='flex justify-between mt-6 items-center'>
            <Text type='body-12-regular' color='neutral-4'>Cannot retrieve code via SMS?</Text>
            <RoundButton className='flex px-4 justify-center items-center min-w-[120px]' disabled={!isResendAvailable}>
              <Image
                src={isResendAvailable ? '/static/icons/resend.svg' : '/static/icons/resend_disabled.svg'}
                alt=''
                width='0'
                height='0'
                className={'mr-2 h-[15px] w-[15px]'}
              />
              <Text type='body-12-regular' color={isResendAvailable ? 'primary-2' : 'neutral-5'}>
                {isResendAvailable
                  ? 'Resend SMS'
                  : `${resendTime?.m}:${resendTime?.s} mins`}
              </Text>
            </RoundButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
