import React, { useContext, useEffect } from 'react';

import Form, { useForm } from 'rc-field-form';

import Header from './Header';
import Info from './Infomation';
import { profileUserContext } from '..';
import { useUpdateUserProfile } from '../service';

const FormEdit = () => {
  const [form] = useForm();

  const profileUser = useContext<any>(profileUserContext);
  const { run } = useUpdateUserProfile();
  useEffect(() => {
    form.resetFields();
  }, [profileUser]);

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
          }}
          onFinish={(value) => {
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
export default FormEdit;
