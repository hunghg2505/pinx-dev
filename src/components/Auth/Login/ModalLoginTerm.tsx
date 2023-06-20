import React from 'react';

// eslint-disable-next-line import/order
import Image from 'next/image';

import 'rc-dialog/assets/index.css';

import Dialog from 'rc-dialog';

import { NegativeButton, PositiveButton } from '@components/UI/Button';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';


const mockData = [
  {
    id: 1,
    name: 'Terms & Conditions',
  },
  {
    id: 2,
    name: 'eContract',
  }
];

interface IProps {
  children: any;
  closeIcon?: boolean;
}


const ModalLoginTerm = (props: IProps) => {
  const { children, closeIcon } = props;
  const [visible, setVisible] = React.useState(false);
  const { userLoginInfo } = useUserLoginInfo();

  const onVisible = () => {
    setVisible(!visible);
  };

  const renderCloseIcon = (): React.ReactNode => {
    if (closeIcon) {
      return closeIcon;
    }
    return <>X</>;
  };
  return (
    <>
      <span onClick={onVisible} className='cursor-pointer'>
        {children}
      </span>
      <Dialog visible={visible} onClose={onVisible} closeIcon={renderCloseIcon()}>
        <div>
          <Text type='body-16-bold' className='text-center' onClick={() => console.log('xxx userLoginInfo', userLoginInfo)}>Cập nhật điều khoản dịch vụ</Text>
          <Text type='body-14-bold' color='neutral-4' className='mt-5'>Theo <span className='text-[--primary-2]'>nghị định 13</span> mới ban hành của chính phủ, để sử dụng PineX quý khách vui lòng kiểm tra lại điều khoản dịch vụ mới cập nhật</Text>
        </div>
        <div>
          {mockData.map((item: any, index: number) => (
            <div className='flex justify-between items-center pt-5 pb-3 !border-solid border-b-[1px] border-[--neutral-7] last:border-b-0' key={index}>
              <div className='flex items-center'>
                <Image src='/static/images/pdf_icon.png' alt='' width='32' height='32' className='w-[32px] h-[32px] mr-2' />
                <Text type='body-14-bold' color='primary-2'>{item.name}</Text>
              </div>
              <Image src='/static/icons/arrow_circle_right.svg' alt='' width='0' height='0' className='w-[28px] h-[28px]' />
            </div>
          ))}
        </div>
        <div className='flex justify-between pt-2'>
          <a className='w-[48%]' href='tel:090000000'>
            <NegativeButton className='w-full'>Contact support</NegativeButton>
          </a>
          <div className='w-[48%]'>
            <PositiveButton className='w-full'>Agree</PositiveButton>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default ModalLoginTerm;
