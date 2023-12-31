import { useEffect } from 'react';

import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import Notification from '@components/UI/Notification';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useUserRegisterInfo } from '@hooks/useUserRegisterInfo';
import { deleteRegisterCookies, getRegisterToken } from '@store/auth';
import { useAuth } from '@store/auth/useAuth';
import { popupStatusAtom } from '@store/popup/popup';
import { checkUserType } from '@utils/common';
import { LOGIN, REGISTER_COMPANY } from 'src/constant/route';
import {
  confirmPhoneNumberTracking,
  loginTracking,
  mixpanelIdentifyUser,
  resendSMSTracking,
} from 'src/mixpanel/mixpanel';

import { useRegisterOtp, useResendRegisterOtp } from './service';
import OtpVerification from '../../OtpVerification';

interface IProps {
  isModal?: boolean;
}

const Register = (props: IProps) => {
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { userRegisterInfo } = useUserRegisterInfo();
  const { setUserLoginInfo, setIsReadTerms, setUserType } = useUserLoginInfo();
  const router = useRouter();
  const { onLogin } = useAuth();

  const requestRegisterOtp = useRegisterOtp({
    onSuccess: (res: any) => {
      const resData = res?.data;
      setUserLoginInfo(resData);
      if (resData?.token) {
        onLogin({
          token: resData.token,
          refreshToken: res?.refresh_token,
          expiredTime: res?.expired_time || 0,
        });
      }
      if (props.isModal) {
        setPopupStatus({
          ...popupStatus,
          popupRegisterOtp: false,
        });
      }
      router.push(REGISTER_COMPANY);
      setUserType(checkUserType(resData?.custStat, resData?.acntStat));
      setIsReadTerms(true);
      deleteRegisterCookies();
      mixpanelIdentifyUser(resData.cif);
      loginTracking('Login', resData.cif, 'Not Verified', resData.username, new Date(), '');
      confirmPhoneNumberTracking(
        'Success',
        '',
        '',
        'Verified',
        new Date(),
        resData.email,
        resData.cif,
        resData.phone,
        resData.username,
      );
    },
    onError: (e) => {
      toast(() => <Notification type='error' message={e?.error} />);
      confirmPhoneNumberTracking(
        'Failed',
        e.errorCode,
        e.error,
        'Not Verified',
        new Date(),
        '',
        '',
        '',
        '',
      );
    },
  });

  const onSubmit = (value: string) => {
    requestRegisterOtp.run({ otp: value });
  };

  const requestResendRegisterOtp = useResendRegisterOtp({
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const onResendOtp = () => {
    requestResendRegisterOtp.run();
    resendSMSTracking();
  };

  useEffect(() => {
    if (!userRegisterInfo.phoneNumber || !getRegisterToken()) {
      deleteRegisterCookies();
      router.push(LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OtpVerification
      onSubmit={onSubmit}
      onResendOtp={onResendOtp}
      phoneNumber={userRegisterInfo.phoneNumber}
      isModal={props.isModal}
    />
  );
};

export default Register;
