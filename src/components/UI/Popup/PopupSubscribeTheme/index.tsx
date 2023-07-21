import React from 'react';

import 'rc-dialog/assets/index.css';
import { useAtom } from 'jotai';
import Dialog from 'rc-dialog';
import Form from 'rc-field-form';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { initialPopupStatus, popupStatusAtom } from '@store/popup/popup';
import { isUnubsribeThemeAtom, popupThemeDataAtom } from '@store/theme';

interface IProps {
  visible: boolean;
}

const PopupSubsribeTheme = (props: IProps) => {
  const { visible } = props;
  const { userLoginInfo } = useUserLoginInfo();
  const [popupThemeData] = useAtom(popupThemeDataAtom);
  const [, setPopupStatus] = useAtom(popupStatusAtom);
  const [isUnubsribeTheme, setIsUnubsribeTheme] = useAtom(isUnubsribeThemeAtom);
  const [form] = Form.useForm();
  const initialValues = {
    shareContent: `${userLoginInfo.displayName} has just ${isUnubsribeTheme ? 'unsubscribed' : 'subscribed'} to ${popupThemeData.name}`
  };
  const renderCloseIcon = (): React.ReactNode => {
    return <img src='/static/icons/close_icon.svg' alt='' />;
  };

  const handleClose = () => {
    setPopupStatus(initialPopupStatus);
    setIsUnubsribeTheme(false);
  };

  return (
    <>
      <Dialog visible={visible} onClose={handleClose} closeIcon={renderCloseIcon()}>
        <img
          src='/static/icons/speaker.svg'
          alt='Icon speaker'
          width='0'
          height='0'
          className='h-[52px] w-[52px] text-center mb-1 mx-auto'
        />
        <Text type='body-24-bold' className='text-center text-[#128F63]'>I&apos;m {isUnubsribeTheme ? 'unsubscribing' : 'subscribing'}</Text>
        <Form form={form} className='mt-5' initialValues={initialValues}>
          <FormItem name='shareContent' className='flex mb-5 flex-col items-start justify-start h-[50px]'>
            <textarea placeholder='Input content...' className='h-full w-full outline-none' />
          </FormItem>

          <div className='relative flex h-[205px] rounded-lg w-full'>
            <img
              src={popupThemeData?.bgImage || popupThemeData?.url}
              alt=''
              className='absolute left-0 top-0 h-full w-full rounded-lg object-cover'
            />
            <div className='flex flex-col justify-around items-center ml-[20px] my-[18px] rounded-lg bg-[rgba(248,248,248,0.50)] backdrop-blur-[1px] w-[120px] px-2'>
              <img
                src={isUnubsribeTheme ? '/static/icons/Lotus-gray.svg' : '/static/icons/Lotus-blue.svg'}
                alt=''
                className='h-[22px] w-[22px] rounded-full bg-white mx-auto'
              />
              <Text type='body-12-medium' className='mt'>
                {isUnubsribeTheme ? 'Unsubscribe' : 'Subscribe'}
              </Text>
              <Text type='body-12-bold' className='text-center'>
                {popupThemeData.name}
              </Text>
            </div>
          </div>

          <MainButton className='w-full mt-5'>Create post</MainButton>
        </Form>

      </Dialog>
    </>
  );
};
export default PopupSubsribeTheme;
