import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { useLoginOtp } from '@components/Auth/Login/OtpVerification/service';
import OtpVerification from '@components/Auth/OtpVerification';
import Notification from '@components/UI/Notification';
import { useSendLoginOtp } from '@components/UI/Popup/PopupLoginTerms/service';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';
import { settingAtom } from '@store/setting/setting';
import { ROUTE_PATH } from '@utils/common';

import { useChangeUsername } from './service';

const ChangeUsernameVertification = () => {
  const { userLoginInfo } = useUserLoginInfo();
  const router = useRouter();
  const [settingValues] = useAtom(settingAtom);
  const { onLogout } = useAuth();
  const [otp, setOtp] = useState<string>();

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
      onLogout();
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
    <div className='px-4'>
      <OtpVerification
        onSubmit={onSubmit}
        onResendOtp={onResendOtp}
        phoneNumber={userLoginInfo.phone}
      />
    </div>

  );
};

export default ChangeUsernameVertification;
