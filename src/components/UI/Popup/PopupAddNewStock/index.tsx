import React from 'react';

import 'rc-dialog/assets/index.css';
import classNames from 'classnames';
// import { useAtom } from 'jotai';
import Dialog from 'rc-dialog';
import Form from 'rc-field-form';

import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
import styles from '@components/WatchList/index.module.scss';
import { IconSearchWhite } from '@layout/components/MainHeader';
// import { popupStatusAtom } from '@store/popup/popup';



interface IProps {
  visible: boolean;
  onClose: () => void;
}

const dataItemStock = [
  {
    img: 'https://picsum.photos/48/48/?random',
    codeStock: 'VNM',
    exChange: 'HOSE',
    companyName: 'CTCP Tập đoàn Đầu tư Địa ốc NoVa',
  },
  {
    img: 'https://picsum.photos/48/48/?random',
    codeStock: 'HAG',
    exChange: 'VNINDEX',
    companyName: 'CTCP Tập đoàn Đầu tư Địa ốc NoVa',
  },
];

const ModalAuth = (props: IProps) => {
  const { visible, onClose } = props;
  // const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);

  const renderCloseIcon = (): React.ReactNode => {
    return (
      <img
        src='/static/icons/iconClose.svg'
        alt=''
        width='0'
        height='0'
        sizes='100vw'
        className='w-[13px]'
      />
    );
  };

  const handleClose = () => {
    onClose();
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSubmit = () => {};

  // @ts-ignore
  return (
    <>
      <Dialog className='popupAddNewStock' visible={visible} onClose={handleClose} closeIcon={renderCloseIcon()}>
        <div className='flex flex-col gap-y-[20px]'>
          <div></div>
          <div>
            <Form onClick={onSubmit}>
              <FormItem>
                <Input
                  className='h-[44px] w-full rounded-[8px] bg-[#EFF2F5] pl-[36px] pr-[12px] outline-none'
                  placeholder='Search for symbol or company'
                  icon={<IconSearchWhite />}
                />
              </FormItem>
            </Form>
          </div>
          <div className='px-[28px] py-[20px] bg-[#F7F6F8] rounded-[12px] flex flex-col gap-y-[8px] items-center'>
            <Text type='body-20-semibold' className='text-[#0D0D0D]'>Empty</Text>
            <Text type='body-14-regular' className='text-[#999]'>No transactions</Text>
          </div>
          <div className='flex flex-col gap-y-[16px]'>
            {dataItemStock.map((item,index) => (
              <div key={index} className='flex items-center justify-between bg-[#ECECEC] p-[12px] rounded-[12px] border-b-[1px] border-[#EBEBEB] border-solid relative'>
                <div className='flex items-center gap-x-[10px]'>
                  <img
                    src={item.img+index}
                    alt=""
                    className='rounded-full w-[36px] tablet:w-[48px] h-[36px] tablet:h-[48px]'
                  />
                  <div className='flex flex-col gap-y-[4px]'>
                    <div className='flex gap-x-[4px]'>
                      <Text type='body-16-semibold' className='text-[#0D0D0D]'>{item.codeStock}</Text>
                      <Text type='body-10-regular' className='text-#394251 px-[7px] py-[2px] bg-[#fff] rounded-[4px] border-[1px] border-[#EBEBEB] border-solid leading-[16px]'>{item.exChange}</Text>
                    </div>
                    <Text type='body-12-regular' className='text-[#474D57] max-w-[155px]'>{item.companyName}</Text>
                  </div>
                </div>
                <div className='flex pr-[12px]'>
                  <div className={classNames(
                    'absolute -right-3 top-1/2 -translate-y-1/2 w-[24px] h-[24px] rounded-full bg-[#fff] flex items-center justify-center cursor-pointer',
                    styles.heart
                  )}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 8C0 3.58065 3.58065 0 8 0C12.4194 0 16 3.58065 16 8C16 12.4194 12.4194 16 8 16C3.58065 16 0 12.4194 0 8ZM8.41613 12.4677L11.9839 8.78387C13.0226 7.7129 12.9613 5.93871 11.8065 4.95161C10.7968 4.09032 9.29355 4.24516 8.36774 5.2L8.00323 5.57419L7.63871 5.2C6.7129 4.24516 5.20968 4.09032 4.2 4.95161C3.04194 5.93871 2.98065 7.7129 4.01613 8.78387L7.58065 12.4677C7.8129 12.7065 8.1871 12.7065 8.41613 12.4677Z" fill="black"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default ModalAuth;
