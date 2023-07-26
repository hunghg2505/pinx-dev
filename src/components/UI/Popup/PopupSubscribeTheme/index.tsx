import React from 'react';

import { useAtom } from 'jotai';
import Form from 'rc-field-form';
import { toast } from 'react-hot-toast';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import Loading from '@components/UI/Loading';
import Modal from '@components/UI/Modal/Modal';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { initialPopupStatus, popupStatusAtom } from '@store/popup/popup';
import { isUnubsribeThemeAtom, popupThemeDataAtom } from '@store/theme';

import { useShareThemeActivity } from './service';

interface IProps {
  visible: boolean;
  onRefreshActivities?: () => void;
}

const PopupSubsribeTheme = (props: IProps) => {
  const { visible } = props;
  const { userLoginInfo } = useUserLoginInfo();
  const [popupThemeData] = useAtom(popupThemeDataAtom);
  const [, setPopupStatus] = useAtom(popupStatusAtom);
  const [isUnubsribeTheme, setIsUnubsribeTheme] = useAtom(isUnubsribeThemeAtom);
  const [form] = Form.useForm();

  const requestShareThemeActivity = useShareThemeActivity({
    onSuccess: () => {
      // onRefreshActivities && onRefreshActivities();
      handleClose();
    },
    onError(e: any) {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const initialValues = {
    shareContent: `${userLoginInfo.displayName} has just ${
      isUnubsribeTheme ? 'unsubscribed' : 'subscribed'
    } to ${popupThemeData.name}`,
  };

  const handleClose = () => {
    setPopupStatus(initialPopupStatus);
    setIsUnubsribeTheme(false);
  };

  const onShareThemeActivity = (values: any) => {
    const payload = {
      action: isUnubsribeTheme ? 'UNSUBSCRIBE' : 'SUBSCRIBE',
      message: values.shareContent as string,
      themeCode: popupThemeData.code || '',
      themeName: popupThemeData.name || '',
    };
    requestShareThemeActivity.run(payload);
  };

  return (
    <>
      <Modal visible={visible} onClose={handleClose}>
        <img
          src='/static/icons/speaker.svg'
          alt='Icon speaker'
          width='0'
          height='0'
          className='mx-auto mb-1 h-[52px] w-[52px] text-center'
        />
        <Text type='body-24-bold' className='text-center text-[#128F63]'>
          I&apos;m {isUnubsribeTheme ? 'unsubscribing' : 'subscribing'}
        </Text>
        <Form
          form={form}
          className='mt-5'
          initialValues={initialValues}
          onFinish={onShareThemeActivity}
        >
          <FormItem
            name='shareContent'
            className='mb-5 flex h-[50px] flex-col items-start justify-start'
          >
            <textarea
              placeholder='Input content...'
              className='h-full w-full resize-none outline-none'
            />
          </FormItem>

          <div className='relative flex h-[205px] w-full rounded-lg'>
            <img
              src={popupThemeData?.bgImage || popupThemeData?.url}
              alt=''
              className='absolute left-0 top-0 h-full w-full rounded-lg object-cover'
            />
            <div className='my-[18px] ml-[20px] flex w-[120px] flex-col items-center justify-around rounded-lg bg-[rgba(248,248,248,0.50)] px-2 backdrop-blur-[1px]'>
              <img
                src={
                  isUnubsribeTheme ? '/static/icons/Lotus-gray.svg' : '/static/icons/Lotus-blue.svg'
                }
                alt=''
                className='mx-auto h-[22px] w-[22px] rounded-full bg-white'
              />
              <Text type='body-12-medium' className='mt'>
                {isUnubsribeTheme ? 'Unsubscribe' : 'Subscribe'}
              </Text>
              <Text type='body-12-bold' className='text-center'>
                {popupThemeData.name}
              </Text>
            </div>
          </div>
          <MainButton
            className='mt-5 flex w-full justify-center'
            type='submit'
            disabled={requestShareThemeActivity?.loading}
          >
            {requestShareThemeActivity?.loading && (
              <div className='mr-[8px]'>
                <Loading />
              </div>
            )}
            Create post
          </MainButton>
        </Form>
      </Modal>
    </>
  );
};
export default PopupSubsribeTheme;
