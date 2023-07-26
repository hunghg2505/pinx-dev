import React, { useContext, useEffect } from 'react';

import { useTranslation } from 'next-i18next';
import Form, { useForm } from 'rc-field-form';
import { toast } from 'react-hot-toast';

import Notification from '@components/UI/Notification';

import Header from './Header';
import Info from './Infomation';
import { profileUserContext } from '..';
import { useUpdateUserProfile } from '../service';

const FormDesktop = () => {
  const [form] = useForm();

  const profileUser = useContext<any>(profileUserContext);
  const { run } = useUpdateUserProfile();
  useEffect(() => {
    form.resetFields();
  }, [profileUser]);
  const { t } = useTranslation('editProfile');
  return (
    <>
      {profileUser && (
        <Form
          form={form}
          preserve
          initialValues={{
            avatar: profileUser?.avatar || '',
            bio: profileUser?.caption || '',
            displayName: profileUser?.displayName || '',
            position: profileUser?.position || '',
            coverImage: profileUser?.coverImage,
          }}
          onFinish={(value) => {
            if (value.displayName === '') {
              toast(() => <Notification type='error' message={t('displayname_required')} />);
              return;
            }
            // if (value.position === '') {
            //   toast(() => <Notification type='error' message={t('position_required')} />);
            //   return;
            // }
            run(value);
          }}
        >
          <Header />
          <Info />
        </Form>
      )}
    </>
  );
};
export default FormDesktop;
