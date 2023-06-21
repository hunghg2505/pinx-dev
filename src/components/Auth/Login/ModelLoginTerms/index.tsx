import React, { useEffect, useState } from 'react';

// eslint-disable-next-line import/order
import Image from 'next/image';

import 'rc-dialog/assets/index.css';

import { useRouter } from 'next/router';
import Dialog from 'rc-dialog';

import { NegativeButton, PositiveButton } from '@components/UI/Button';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

import { useGetContract } from './service';

interface IProps {
  visible: boolean;
  closeIcon?: boolean;
  onToggle: () => void;
}

const ModalLoginTerms = (props: IProps) => {
  const router = useRouter();
  const { visible, closeIcon, onToggle } = props;
  const [contractList, setContractList] = useState<any[]>([]);
  const requestGetContract = useGetContract({
    onSuccess: (res: any) => {
      if (res?.data) {
        setContractList(res?.data?.list);
      }
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
    router.push(ROUTE_PATH.LOGIN_OTP_VERIFICATION);
    onToggle();
  };

  useEffect(() => {
    if (visible) {
      requestGetContract.run();
    }
  }, [visible]);

  return (
    <>
      <Dialog visible={visible} onClose={onToggle} closeIcon={renderCloseIcon()}>
        <div>
          <Text type='body-16-bold' className='text-center'>
            Cập nhật điều khoản dịch vụ
          </Text>
          <Text type='body-14-bold' color='neutral-4' className='mt-5'>
            Theo <span className='text-[--primary-2]'>nghị định 13</span> mới ban hành của chính
            phủ, để sử dụng PineX quý khách vui lòng kiểm tra lại điều khoản dịch vụ mới cập nhật
          </Text>
        </div>
        <div>
          {contractList?.map((item: any, index: number) => (
            <div
              className='flex items-center justify-between border-b-[1px] !border-solid border-[--neutral-7] pb-3 pt-5 last:border-b-0'
              key={index}
            >
              <div className='flex items-center'>
                <Image
                  src='/static/images/pdf_icon.png'
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
        <div className='flex justify-between pt-2'>
          <a className='w-[48%]' href='tel:090000000'>
            <NegativeButton className='w-full'>Contact support</NegativeButton>
          </a>
          <div className='w-[48%]'>
            <PositiveButton className='w-full' onClick={onAgreeContract}>
              Agree
            </PositiveButton>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default ModalLoginTerms;
