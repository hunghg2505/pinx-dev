// import { useTranslation } from 'next-i18next';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import Form from 'rc-field-form';
import toast from 'react-hot-toast';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import LabelInput from '@components/UI/LabelInput';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserRegisterInfo } from '@hooks/useUserRegisterInfo';
import { useAuth } from '@store/auth/useAuth';
import { popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH } from '@utils/common';
import { REG_USERNAME } from '@utils/reg';

import { useCreateUsername } from './service';

interface IProps {
  isModal?: boolean;
}

const CreateUsername = (props: IProps) => {
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const router = useRouter();
  const [form] = Form.useForm();
  const { onRegister } = useAuth();
  const { userRegisterInfo, setUserRegisterInfo } = useUserRegisterInfo();

  const requestCreateUsername = useCreateUsername({
    onSuccess: (res: any) => {
      if (res?.data.token) {
        setUserRegisterInfo({
          ...userRegisterInfo,
          token: res?.data.token,
        });
        onRegister({
          token: res?.data.token,
          refreshToken: res?.refresh_token,
          expiredTime: res?.expired_time || 0,
        });
        switch (res?.data.nextStep) {
          case 'OTP': {
            if (props.isModal) {
              setPopupStatus({
                ...popupStatus,
                popupRegisterOtp: true,
                popupRegisterUsername: false,
              });
            } else {
              router.push(ROUTE_PATH.REGISTER_OTP_VERIFICATION);
            }
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
    <div
      className={`laptop:m-0 ${
        props.isModal ? 'mobile:mt-0' : 'mobile:mt-20 laptop:min-w-[450px]'
      }`}
    >
      <div className='mt-[36px]'>
        <Text type='body-28-bold'>Create username</Text>
        <Text type='body-16-regular' color='neutral-4'>
          Set up your username across all Pinetree’s platform safely.
        </Text>
      </div>

      <Form className='mt-10 space-y-6 laptop:w-full' form={form} onFinish={onSubmit}>
        <FormItem
          name='username'
          rules={[
            {
              required: true,
              message: 'Please enter user name',
            },
            {
              pattern: REG_USERNAME,
              message: 'Please check username format',
            },
          ]}
        >
          <LabelInput placeholder='Username' name='username' labelContent='Username' />
        </FormItem>
        <Text type='body-12-regular' className='!mt-1'>
          Username must contain at least 1 uppercase letter and not contain special characters
          including @ # $ % ^ & * ! ?
        </Text>

        <MainButton type='submit' className='!mt-10 w-full'>
          Select this username
        </MainButton>
      </Form>
    </div>
  );
};

export default CreateUsername;
