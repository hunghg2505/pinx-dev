import { useRegisterOtp } from './service';
import OtpVerification from '../OtpVerification';

const Register = () => {
  const requestRegisterOtp = useRegisterOtp({
    onSuccess: (res: any) => {
      console.log('xxx res', res)
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
      console.log(e?.errors?.[0] || e?.message, 'error');
    },
  });

  const onSubmit = (value: string) => {
    requestRegisterOtp.run({ otp: value });
  };

  return (
    <OtpVerification onSubmit={onSubmit} />
  );
};

export default Register;
