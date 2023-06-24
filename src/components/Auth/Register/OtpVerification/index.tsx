import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import Notification from '@components/UI/Notification';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useUserRegisterInfo } from '@hooks/useUserRegisterInfo';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';

import { useRegisterOtp, useResendRegisterOtp } from './service';
import OtpVerification from '../../OtpVerification';

const Register = () => {
  const { userRegisterInfo } = useUserRegisterInfo();
  const { setUserLoginInfo } = useUserLoginInfo();
  const router = useRouter();
  const { onLogin, onLogout } = useAuth();

  const requestRegisterOtp = useRegisterOtp({
    onSuccess: (res: any) => {
      setUserLoginInfo(res?.data);
      if (res?.data.token) {
        onLogin({
          token: res?.data.token,
          refreshToken: res?.refresh_token,
          expiredTime: res?.expired_time || 0,
        });
      }
      router.push(ROUTE_PATH.REGISTER_COMPANY);
    },
    onError: (e) => {
      toast(() => <Notification type='error' message={e.error} />);
    },
  });

  const onSubmit = (value: string) => {
    requestRegisterOtp.run({ otp: value });
  };
  const requestResendRegisterOtp = useResendRegisterOtp({
    onSuccess: (res: any) => {
      console.log('xxx res', res);
    },
    onError: (e: any) => {
      console.log(e?.errors?.[0] || e?.message, 'error');
    },
  });

  const onResendOtp = () => {
    requestResendRegisterOtp.run();
  };

  useEffect(() => {
    if (!userRegisterInfo.phoneNumber) {
      router.push(ROUTE_PATH.HOME);
      onLogout();
    }
  }, []);

  return (
    <OtpVerification
      onSubmit={onSubmit}
      onResendOtp={onResendOtp}
      phoneNumber={userRegisterInfo.phoneNumber}
    />
  );
};

export default Register;
