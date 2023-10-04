import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';

import { API_PATH } from '@api/constant';
import { PREFIX_API_PIST } from '@api/request';
import { RoundButton } from '@components/UI/Button';
import Modal from '@components/UI/Modal/Modal';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';
import { PHONE_CONTACT_SUPPORT } from 'src/constant';

import { useGetContract, useSendLoginOtp, useConfirmContract } from './service';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const ModalLoginTerms = (props: IProps) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { visible, onClose } = props;
  const [contractList, setContractList] = useState<any[]>([]);
  const [session, setSession] = useState<string>('');
  const { onLogout } = useAuth();
  const { userLoginInfo, forceAllowTerm, userType } = useUserLoginInfo();
  const { isDesktop, isMobile } = useResponsive();

  const requestGetContract = useGetContract({
    onSuccess: (res: any) => {
      if (res?.data) {
        setContractList(res?.data?.list);
        setSession(res?.data.session);
      }
    },
    onError(e) {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const requestSendLoginOtp = useSendLoginOtp({
    onSuccess: () => {
      router.push(ROUTE_PATH.LOGIN_OTP_VERIFICATION);
      onClose();
    },
    onError(e) {
      // onLogout();
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const requestConfirmContract = useConfirmContract({
    onSuccess: () => {
      router.push(ROUTE_PATH.HOME);
      onClose();
    },
    onError(e) {
      // onLogout();
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const onSendLoginOtp = () => {
    const payload = {
      authType: '1',
      trdType: '1',
    };
    requestSendLoginOtp.run(payload);
  };

  const onConfirmContract = () => {
    const payload = {
      authType: '1',
      cif: userLoginInfo.cif || '',
      token: '',
    };
    requestConfirmContract.run(payload);
    onClose();
  };

  const onSubmit = () => {
    if (userType === 'NEW') {
      onConfirmContract();
    } else {
      onSendLoginOtp();
    }
  };

  const handleClose = () => {
    if (userType === 'VSD') {
      if (forceAllowTerm) {
        onLogout();
      }
    } else {
      onLogout();
    }
    onClose();
  };

  useEffect(() => {
    if (visible) {
      requestGetContract.run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const getLinkContract = (linkUrl: string) => {
    return (
      PREFIX_API_PIST +
      API_PATH.READ_CONTRACT +
      '?link=' +
      encodeURIComponent(linkUrl) +
      '&session=' +
      session
    );
  };

  return (
    <>
      <Modal visible={visible} onClose={handleClose}>
        <div>
          <Text type='body-22-bold' className='mt-16 text-center'>
            {t('dear_customer')}
          </Text>
          <Text type='body-14-regular' color='neutral-4' className='mt-5 text-center'>
            {t('in_compliance_with')}
            <span className='text-[#EAA100]'>&nbsp;{t('degree_13')}&nbsp;</span>
            {t('degree_13_content')}
          </Text>
        </div>
        <div className='mt-8'>
          {contractList?.map((item: any, index: number) => (
            <a
              className='flex cursor-pointer items-center justify-between border-t-[1px] !border-solid border-[--neutral-7] pb-3 pt-5 last:border-b-[1px]'
              key={index}
              href={userType === 'NEW' ? item.fileUrl : getLinkContract(item.fileUrl)}
              target='_blank'
              rel='noreferrer'
            >
              <div className='flex items-center'>
                <img
                  src='/static/icons/document_text.svg'
                  alt=''
                  width='32'
                  height='32'
                  className='mr-2 h-[32px] w-[32px]'
                />
                <Text type='body-14-bold' color='primary-2'>
                  {item.fileName}
                </Text>
              </div>
              <img
                src='/static/icons/arrow_circle_right.svg'
                alt=''
                width='0'
                height='0'
                className='h-[28px] w-[28px]'
              />
            </a>
          ))}
        </div>
        <Text type='body-12-regular' className='mt-2 text-center'>
          {userType === 'VSD' ? `(!) ${t('degree_13_note_1')}` : t('degree_13_note_2')}
        </Text>
        <div className='mt-12'>
          <a className='w-full' href={PHONE_CONTACT_SUPPORT}>
            <RoundButton className='flex w-full items-center justify-center border-none'>
              <img
                src='/static/icons/contact_icon.svg'
                alt=''
                width='0'
                height='0'
                className='mr-2 h-[20px] w-[20px]'
              />
              {isMobile && t('contact_support')}
              {isDesktop && '024 6282 3535'}
            </RoundButton>
          </a>
          <div className='w-full'>
            <RoundButton
              className='mt-3 w-full bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] text-[--white]'
              onClick={onSubmit}
              disabled={requestSendLoginOtp.loading || requestConfirmContract.loading}
              loading={requestSendLoginOtp.loading || requestConfirmContract.loading}
            >
              {t('agree')}
            </RoundButton>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalLoginTerms;
