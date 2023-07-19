import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { useLoginOtp } from '@components/Auth/Login/OtpVerification/service';
import OtpVerification from '@components/Auth/OtpVerification';
import Notification from '@components/UI/Notification';
import { useSendLoginOtp } from '@components/UI/Popup/PopupLoginTerms/service';
import { useResponsive } from '@hooks/useResponsive';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import LoginHeader from '@layout/components/LoginHeader';
import { useAuth } from '@store/auth/useAuth';
import { settingAtom } from '@store/setting/setting';
import { ROUTE_PATH } from '@utils/common';

import { useChangeUsername } from './service';

const MainHeader = dynamic(() => import('@layout/components/MainHeader'), {
  ssr: false,
});

const ChangeUsernameVertification = () => {
  const { userLoginInfo } = useUserLoginInfo();
  const router = useRouter();
  const [settingValues] = useAtom(settingAtom);
  const { onLogout } = useAuth();
  const [otp, setOtp] = useState<string>();
  const { isMobile } = useResponsive();

  const onSubmit = (value: string) => {
    setOtp(value);
    const payload = {
      cif: userLoginInfo.cif || '',
      type: '1',
      value,
    };
    requestLoginOtp.run(payload);
  };

  const requestLoginOtp = useLoginOtp({
    onSuccess: () => {
      const payload = {
        authType: '1',
        cif: userLoginInfo.cif || '',
        token: otp || '',
        connId: settingValues.newUsername,
      };
      requestChangePassword.run(payload);
    },
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const requestChangePassword = useChangeUsername({
    onSuccess: () => {
      toast(() => <Notification type='success' message='Change username success' />);
      onLogout(ROUTE_PATH.LOGIN);
    },
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const requestResendLoginOtp = useSendLoginOtp({
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const onResendOtp = () => {
    const payload = {
      authType: '1',
      trdType: '1',
    };
    requestResendLoginOtp.run(payload);
  };

  useEffect(() => {
    if (!settingValues.newUsername || !userLoginInfo.phone) {
      router.push(ROUTE_PATH.SETTING_CHANGE_USERNAME);
    }
  }, []);

  return (
    <>
      {isMobile ? <LoginHeader /> : <MainHeader />}

      <div className='laptop:mt-[15vh] laptop:flex laptop:items-center laptop:justify-center'>
        <div className='px-4'>
          <OtpVerification
            onSubmit={onSubmit}
            onResendOtp={onResendOtp}
            phoneNumber={userLoginInfo.phone}
            settingLayout
            otpTime={60}
          />
        </div>
      </div>
    </>
  );
};

export default ChangeUsernameVertification;