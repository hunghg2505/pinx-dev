import React from 'react';

import { useAtom } from 'jotai';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
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
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { isUnubsribeThemeAtom, popupThemeDataAtom } from '@store/theme';
import { validateHTML } from '@utils/common';

import { useShareThemeActivity } from './service';

interface IProps {
  visible: boolean;
  onRefreshActivities?: () => void;
}

const PopupSubsribeTheme = (props: IProps) => {
  const { t } = useTranslation();
  const { visible, onRefreshActivities } = props;
  const { userLoginInfo } = useUserLoginInfo();
  const [popupThemeData] = useAtom(popupThemeDataAtom);
  const [, setPopupStatus] = useAtom(popupStatusAtom);
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const [isUnubsribeTheme, setIsUnubsribeTheme] = useAtom(isUnubsribeThemeAtom);
  const [form] = Form.useForm();

  const requestShareThemeActivity = useShareThemeActivity({
    onSuccess: async (res: any) => {
      setPostDetailStatus({ ...postDetailStatus, themeWatchlist: res?.data });
      onRefreshActivities && onRefreshActivities();
      toast(() => <Notification type='success' message={t('share_subscribe_theme_success')} />);
      setTimeout(() => toast.dismiss(), 4000); // handle toast not disappear on mobile
      handleClose();
    },
    onError(e: any) {
      let error = e?.error;
      if (e?.errorCode && e.errorCode === 'error.activity.tooMany') {
        error = t('activity.tooMany.message');
      }
      toast(() => <Notification type='error' message={error} />);
    },
  });

  const initialValues = {
    shareContent: t('has_just_subscribe_theme', {
      name: userLoginInfo.displayName,
      action: isUnubsribeTheme ? t('unsubscribe_theme') : t('subscribe_theme'),
      themeName: popupThemeData.name,
    }),
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
    if (values.shareContent && validateHTML(values.shareContent)) {
      toast(() => <Notification type='error' message={t('your_post_should_be_review')} />);
    } else {
      requestShareThemeActivity.run(payload);
    }
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
        <Text type='body-24-bold' className='text-center text-[#128F63] galaxy-max:text-[22px]'>
          {isUnubsribeTheme ? t('im_unsubscribing') : t('im_subscribing')}
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
              placeholder={t('what_do_you_want_to_comment')}
              className='h-full w-full resize-none outline-none galaxy-max:text-[12px]'
            />
          </FormItem>

          <div className='relative flex h-[205px] w-full rounded-lg'>
            <Image
              width='0'
              height='0'
              sizes='100vw'
              src={popupThemeData?.bgImage || popupThemeData?.url || ''}
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
                {isUnubsribeTheme ? t('unsubscribe') : t('subscribe')}
              </Text>
              <Text type='body-12-bold' className='text-center'>
                {popupThemeData.name}
              </Text>
            </div>
          </div>
          <MainButton
            className='mt-5 flex w-full justify-center galaxy-max:text-[15px]'
            type='submit'
            disabled={requestShareThemeActivity?.loading}
          >
            {requestShareThemeActivity?.loading && (
              <div className='mr-[8px]'>
                <Loading />
              </div>
            )}
            {t('create_post')}
          </MainButton>
        </Form>
      </Modal>
    </>
  );
};
export default PopupSubsribeTheme;
