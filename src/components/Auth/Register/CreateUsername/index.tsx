// import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';
import toast from 'react-hot-toast';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import LabelInput from '@components/UI/LabelInput';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';
import { REG_USERNAME } from '@utils/reg';

import { useCreateUsername } from './service';

const CreateUsername = () => {
  const router = useRouter();
  const { t } = useTranslation('auth');
  const [form] = Form.useForm();
  const { onLogin } = useAuth();

  const requestCreateUsername = useCreateUsername({
    onSuccess: (res: any) => {
      if (res?.data.token) {
        onLogin({
          token: res?.data.token,
          refreshToken: res?.refresh_token,
          expiredTime: res?.expired_time || 0,
        });
        switch (res?.data.nextStep) {
          case 'OTP': {
            router.push(ROUTE_PATH.REGISTER_OTP_VERIFICATION);
            break;
          }
        }
      }
    },
    onError(e) {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const onSubmit = (value: any) => {
    requestCreateUsername.run({ username: value.username });
  };

  return (
    <div className='mobile:mt-20 laptop:m-0 laptop:w-[450px]'>
      <div className='mt-[36px]'>
        <Text type='body-28-bold'>{t('create_user_name')}</Text>
        <Text type='body-16-regular' color='neutral-4'>
          {t('create_user_name_note')}
        </Text>
      </div>

      <Form className='mt-10 space-y-6 laptop:w-full' form={form} onFinish={onSubmit}>
        <FormItem
          name='username'
          rules={[
            {
              required: true,
              message: 'Please enter user name'
            },
            {
              pattern: REG_USERNAME,
              message: 'Please check username format'
            }
          ]}>
          <LabelInput placeholder={t('user_name')} name='username' labelContent={t('user_name')} />
        </FormItem>
        <Text type='body-12-regular' className='!mt-1'>
          {t('create_user_name_rule')}
        </Text>

        <MainButton type='submit' className='!mt-10 w-full'>
          {t('create_user_name')}
        </MainButton>
      </Form>
    </div>
  );
};

export default CreateUsername;
