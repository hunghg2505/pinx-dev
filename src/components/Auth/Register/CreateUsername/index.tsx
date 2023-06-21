// import { useTranslation } from 'next-i18next';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import { StyledInput } from '@components/UI/Input';
import Text from '@components/UI/Text';

import 'rc-picker/assets/index.css';
import { useCreateUsername } from './service';

const CreateUsername = () => {
  const { t } = useTranslation('auth');
  const [form] = Form.useForm();

  const requestCreateUsername = useCreateUsername({
    onSuccess: (res: any) => {
      if (res?.data.token) {
        console.log(res);
      }
    },
    onError(e) {
      console.log(e?.errors?.[0] || e?.message, 'error');
    },
  });

  const onSubmit = (value: any) => {
    requestCreateUsername.run({ username: value.username });
  };

  return (
    <>
      <div className='mx-auto flex flex-col  items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-lg bg-white sm:max-w-md md:mt-0 xl:p-0'>
          <div className='mt-[56px]'>
            <Text type='body-28-bold'>{t('create_user_name')}</Text>
            <Text type='body-16-regular' color='neutral-4'>
              {t('create_user_name_note')}
            </Text>
          </div>

          <Form className='mt-10 space-y-6' form={form} onFinish={onSubmit}>
            <FormItem
              name='username'
              rules={[{ required: true, message: 'Please enter user name!' }]}
            >
              <StyledInput placeholder={t('user_name')} />
            </FormItem>
            <Text type='body-12-regular' className='!mt-1'>
              {t('create_user_name_rule')}
            </Text>

            <MainButton type='submit' className='!mt-10 w-full'>
              {t('create_user_name')}
            </MainButton>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateUsername;
