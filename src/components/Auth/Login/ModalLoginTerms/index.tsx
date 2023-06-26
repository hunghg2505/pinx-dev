import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Dialog from 'rc-dialog';
import toast from 'react-hot-toast';

import { RoundButton } from '@components/UI/Button';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';

import { useGetContract, useAgreeContract } from './service';

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
  // const otherContract =
  //   contractList?.length > 0 ? contractList.filter((item, index) => index > 0) : [];
  const otherContract = [
    { fileName: userType === 'NEW' ? 'Terms & Conditions' : 'Consent to Data processing' },
  ];
  const { userLoginInfo } = useUserLoginInfo();
  const { onLogout } = useAuth();

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

  const requestAgreeContract = useAgreeContract({
    onSuccess: () => {
      if (userType === 'NEW') {
        router.push(ROUTE_PATH.HOME);
      } else {
        router.push(ROUTE_PATH.LOGIN_OTP_VERIFICATION);
      }
    },
    onError(e) {
      onLogout();
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const renderCloseIcon = (): React.ReactNode => {
    if (closeIcon) {
      return closeIcon;
    }
    return <>X</>;
  };

  const onAgreeContract = () => {
    const payload = {
      authType: '1',
      cif: userLoginInfo.cif || '',
      token: userLoginInfo.token || '',
      positionNo: '',
      trdType: '1',
    };
    requestAgreeContract.run(payload);
    onToggle();
  };

  const handleClose = () => {
    const now = dayjs();
    if (!now.isBefore(dayjs('2023-07-22')) && userType !== 'VSD') {
      onLogout();
    }
    onToggle();
  };

  useEffect(() => {
    if (visible) {
      requestGetContract.run();
    }
  }, [visible]);

  return (
    <>
      <Dialog visible={visible} onClose={handleClose} closeIcon={renderCloseIcon()}>
        <div>
          <Text type='body-22-bold' className='mt-16 text-center'>
            Dear Customer
          </Text>
          <Text type='body-14-regular' color='neutral-4' className='mt-5 text-center'>
            In compliance with
            <NextLink
              href={{
                pathname: ROUTE_PATH.TERMS_OF_SERVICE,
                query: {
                  link: contractList[0]?.fileUrl,
                  session,
                },
              }}
              className='text-[#EAA100]'
            >
              <span>&nbsp;DECREE 13/2023/NĐ-CP&nbsp;</span>
            </NextLink>
            on Protection of Personal Data, please read carefully and confirm your agreement to the
            Adjustment of Conditions and Privacy by selecting Agree:
          </Text>
        </div>
        <div className='mt-8'>
          {otherContract?.map((item: any, index: number) => (
            <div
              className='flex cursor-pointer items-center justify-between border-t-[1px] !border-solid border-[--neutral-7] pb-3 pt-5 last:border-b-[1px]'
              key={index}
              onClick={() => console.log('xxx other contract')}
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
            </div>
          ))}
        </div>
        <Text type='body-12-regular' className='mt-2 text-center'>
          {userType === 'VSD'
            ? '(!) Please confirm before July 22, 2023. After the above period, the online trading feature will be discontinued due to limitations on data processing transactions.'
            : 'You need to agree to continue using the services'}
        </Text>
        <div className='mt-12'>
          <a className='w-full' href='tel:090000000'>
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
              onClick={onAgreeContract}
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
