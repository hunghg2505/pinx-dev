import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Dialog from 'rc-dialog';
import toast from 'react-hot-toast';

import { API_PATH } from '@api/constant';
import { PREFIX_API_PIST } from '@api/request';
import { RoundButton } from '@components/UI/Button';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';

import { useGetContract, useSendLoginOtp, useConfirmContract } from './service';

import 'rc-dialog/assets/index.css';

interface IProps {
  userType: string;
  visible: boolean;
  closeIcon?: React.ReactNode;
  onToggle: () => void;
}

const ModalLoginTerms = (props: IProps) => {
  const router = useRouter();
  const { visible, closeIcon, onToggle, userType } = props;
  const [contractList, setContractList] = useState<any[]>([]);
  const [session, setSession] = useState<string>('');
  const { onLogout } = useAuth();
  const { userLoginInfo } = useUserLoginInfo();

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
    },
    onError(e) {
      // onLogout();
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const requestConfirmContract = useConfirmContract({
    onSuccess: () => {
      router.push(ROUTE_PATH.HOME);
    },
    onError(e) {
      // onLogout();
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const renderCloseIcon = (): React.ReactNode => {
    if (closeIcon) {
      return closeIcon;
    }
    return <>X</>;
  };

  const onSendLoginOtp = () => {
    const payload = {
      authType: '1',
      positionNo: '',
      trdType: '1',
    };
    requestSendLoginOtp.run(payload);
    onToggle();
  };

  const onConfirmContract = () => {
    const payload = {
      authType: '1',
      cif: userLoginInfo.cif || '',
      token: '',
    };
    requestConfirmContract.run(payload);
    onToggle();
  };

  const onSubmit = () => {
    if (userType === 'NEW') {
      onConfirmContract();
    } else { onSendLoginOtp() }
  }

  const handleClose = () => {
    if (userType === 'VSD') {
      if (dayjs().isAfter(dayjs('2023-07-22'))) {
        onLogout();
      }
    } else {
      onLogout();
    }
    onToggle();
  };

  useEffect(() => {
    if (visible) {
      requestGetContract.run();
    }
  }, [visible]);

  const getLinkContract = (linkUrl: string) => {
    return PREFIX_API_PIST +
      API_PATH.READ_CONTRACT +
      '?link=' +
      encodeURIComponent(linkUrl) +
      '&session=' +
      session;
  }

  return (
    <>
      <Dialog visible={visible} onClose={handleClose} closeIcon={renderCloseIcon()}>
        <div>
          <Text type='body-22-bold' className='mt-16 text-center'>
            Dear Customer
          </Text>
          <Text type='body-14-regular' color='neutral-4' className='mt-5 text-center'>
            In compliance with
            <span className='text-[#EAA100]'>&nbsp;DECREE 13/2023/NĐ-CP&nbsp;</span>
            on Protection of Personal Data, please read carefully and confirm your agreement to the
            Adjustment of Conditions and Privacy by selecting Agree:
          </Text>
        </div>
        <div className='mt-8'>
          {contractList?.map((item: any, index: number) => (
            <a
              className='flex cursor-pointer items-center justify-between border-t-[1px] !border-solid border-[--neutral-7] pb-3 pt-5 last:border-b-[1px]'
              key={index}
              href={
                userType === 'NEW'
                  ? item.fileUrl
                  : getLinkContract(item.fileUrl)}
              target='_blank'
              rel="noreferrer"
            >
              <div className='flex items-center'>
                <Image
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
              <Image
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
          {userType === 'VSD'
            ? '(!) Please confirm before July 22, 2023. After the above period, the online trading feature will be discontinued due to limitations on data processing transactions.'
            : 'You need to agree to continue using the services'}
        </Text>
        <div className='mt-12'>
          <a className='w-full' href='tel:02462823535'>
            <RoundButton className='flex w-full items-center justify-center border-none'>
              <Image
                src='/static/icons/contact_icon.svg'
                alt=''
                width='0'
                height='0'
                className='mr-2 h-[20px] w-[20px]'
              />
              Contact support
            </RoundButton>
          </a>
          <div className='w-full'>
            <RoundButton
              className='mt-3 w-full bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] text-[--white]'
              onClick={onSubmit}
            >
              Agree
            </RoundButton>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default ModalLoginTerms;
