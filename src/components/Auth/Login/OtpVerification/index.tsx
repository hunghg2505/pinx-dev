import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import Notification from '@components/UI/Notification';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { ROUTE_PATH } from '@utils/common';

import { useLoginOtp, useResendLoginOtp, useConfirmContract } from './service';
import OtpVerification from '../../OtpVerification';

const Register = () => {
  const { userLoginInfo, setIsReadTerms } = useUserLoginInfo();
  const router = useRouter();
  const [otp, setOtp] = useState<string>();

  const requestConfirmContract = useConfirmContract({
    onSuccess: () => {
      router.push(ROUTE_PATH.HOME);
      setIsReadTerms(true);
    },
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const requestLoginOtp = useLoginOtp({
    onSuccess: () => {
      const payload = {
        cif: userLoginInfo.cif || '',
        token: otp || '',
        authType: '1',
      };
      requestConfirmContract.run(payload);
    },
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const onSubmit = (value: string) => {
    setOtp(value);
    const payload = {
      cif: userLoginInfo.cif || '',
      type: '1',
      value,
    };
    requestLoginOtp.run(payload);
  };

  const requestResendLoginOtp = useResendLoginOtp({
    onSuccess: (res: any) => {
      console.log('xxx res', res);
    },
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const onResendOtp = () => {
    const payload = {
      authType: '1',
      positionNo: '',
      trdType: '1',
    };
    requestResendLoginOtp.run(payload);
  };

  useEffect(() => {
    if (!userLoginInfo.phone) {
      router.push(ROUTE_PATH.HOME);
    }
  }, []);

  return (
    <OtpVerification
      onSubmit={onSubmit}
      onResendOtp={onResendOtp}
      phoneNumber={userLoginInfo.phone}
    />
  );
};

export default Register;
