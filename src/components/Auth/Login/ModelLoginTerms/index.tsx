import React, { useEffect, useState } from 'react';

import Image from 'next/image';
// eslint-disable-next-line import/order
import NextLink from 'next/link';
import 'rc-dialog/assets/index.css';

import { useRouter } from 'next/router';
import Dialog from 'rc-dialog';

import { RoundButton } from '@components/UI/Button';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';

import { useGetContract, useAgreeContract } from './service';

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
  const otherContract = contractList?.length > 0 ? [...contractList.filter((item, index) => index > 0)] : [];
  const { userLoginInfo } = useUserLoginInfo();
  const { onLogout } = useAuth();

  const requestGetContract = useGetContract({
    onSuccess: (res: any) => {
      if (res?.data) {
        setContractList(res?.data?.list);
        setSession(res?.data.session)
      }
    },
    onError(e) {
      console.log(e?.errors?.[0] || e?.message, 'error');
    },
  });

  const requestAgreeContract = useAgreeContract({
    onSuccess: () => {
      if (userType === 'NEW') {
        router.push(ROUTE_PATH.Home);
      } else { router.push(ROUTE_PATH.LOGIN_OTP_VERIFICATION); }
    },
    onError(e) {
      console.log(e?.errors?.[0] || e?.message, 'error');
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
      trdType: '1'
    }
    requestAgreeContract.run(payload);
    onToggle();
  };

  const handleClose = () => {
    onLogout();
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
          <Text type='body-22-bold' className='text-center mt-16'>
            Kính gửi quý khách
          </Text>
          <Text type='body-14-regular' color='neutral-4' className='mt-5 text-center'>
            Tuân thủ
            <NextLink
              href={{
                pathname: ROUTE_PATH.TERMS_OF_SERVICE,
                query: {
                  link: contractList[0]?.fileUrl,
                  session,
                },
              }}

              className='text-[#EAA100]'>
              <span>
                &nbsp;NGHỊ ĐỊNH 13/2023/NĐ-CP&nbsp;
              </span>
            </NextLink>
            về Bảo vệ Dữ liệu Cá nhân, Quý Khách vui lòng đọc kỹ và xác nhận đồng ý với bản Điều Khoản Điều Kiện và Chính Sách Bảo Mật bằng cách chọn Đồng ý:
          </Text>
        </div>
        <div className='mt-8'>
          {otherContract?.map((item: any, index: number) => (
            <div
              className='flex items-center justify-between border-t-[1px] !border-solid border-[--neutral-7] pb-3 pt-5 last:border-b-[1px]'
              key={index}
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
        <Text type='body-12-regular' className='text-center mt-2'>
          {
            userType === 'VSD'
              ? '(!) Vui lòng xác nhận trước 22/07/2023, sau thời hạn trên, tính năng giao dịch trực tuyến bị ngưng do hạn chế về xử lý dữ liệu giao dịch'
              : 'Bạn cần đồng ý để tiếp tục sử dụng dịch vụ này'
          }
        </Text>
        <div className='mt-12'>
          <a className='w-full' href='tel:090000000'>
            <RoundButton className='w-full border-none flex items-center justify-center'>
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
            <RoundButton className='w-full bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] mt-3 text-[--white]' onClick={onAgreeContract}>
              Agree
            </RoundButton>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default ModalLoginTerms;
