import { useEffect } from 'react';

import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import Notification from '@components/UI/Notification';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { ROUTE_PATH } from '@utils/common';

import { useAgreeContract, useResendLoginOtp } from './service';
import OtpVerification from '../../OtpVerification';

const Register = () => {
  const { userLoginInfo } = useUserLoginInfo();
  const router = useRouter();

  const requestAgreeContract = useAgreeContract({
    onSuccess: (res: any) => {
      router.push(ROUTE_PATH.HOME);
      console.log('xxx res', res);
      // if (res?.data.token) {
      //   onLogin({
      //     token: res?.data.token,
      //     refreshToken: res?.refresh_token,
      //     expiredTime: res?.expired_time || 0,
      //   });
      //   switch (res?.data.nextStep) {
      //     case 'OTP':
      //       router.push(ROUTE_PATH.REGISTER_OTP_VERIFICATION);
      //   }
      // }
    },
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const onSubmit = (value: string) => {
    const payload = {
      cif: userLoginInfo.cif || '',
      type: '1',
      value,
      authType: '1',
    };
    requestAgreeContract.run(payload);
  };
  const requestResendLoginOtp = useResendLoginOtp({
    onSuccess: (res: any) => {
      console.log('xxx res', res);
    },
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e.error} />);
    },
  });

  const onResendOtp = () => {
    requestResendLoginOtp.run();
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
