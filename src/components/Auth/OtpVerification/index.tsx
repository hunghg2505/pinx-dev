import { useState, useCallback, useEffect } from 'react';

import { useDebounceFn } from 'ahooks';
import classNames from 'classnames';
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
}

const convertSecond = (secs: number) => {
  const secondsText = secs < 10 ? '0' + Math.ceil(secs).toString() : Math.ceil(secs).toString();
  return secondsText;
};

const OtpVerification = (props: IProps) => {
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
      className={`laptop:m-0 ${
        props.isModal ? 'mobile:mt-0' : 'mobile:mt-20 laptop:min-w-[450px]'
      }`}
    >
      <div className={`${props.isModal ? 'mt-[36px]' : 'mt-[46px]'}`}>
        <Text type='body-24-bold'>Confirm phone number</Text>
        <Text type='body-18-regular' color='neutral-4'>
          Enter OTP sent to{' '}
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
          ? 'The OTP is expired'
          : `The OTP will be expired in ${convertSecond(otpCount)}s`}
      </Text>

      <Form className='space-y-6' form={form} onValuesChange={onChange}>
        <FormItem
          normalize={(value: any, prevValue: any) => normalizeNumber(value, prevValue)}
          name='otp'
          rules={[
            {
              required: true,
              message: 'Please enter OTP',
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
          Cannot retrieve code via SMS?
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
            {isResendAvailable ? 'Resend SMS' : `00:${convertSecond(resendCount)}`}
          </Text>
        </RoundButton>
      </div>
    </div>
  );
};

export default OtpVerification;
