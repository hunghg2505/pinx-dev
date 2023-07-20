import React, { useContext, useEffect } from 'react';

import Form, { useForm } from 'rc-field-form';

import Header from './Header';
import Info from './Infomation';
import { profileUserContext } from '..';
import { useUpdateUserProfile, useUploadImage } from '../service';

const FormDesktop = () => {
  const [form] = useForm();

  const profileUser = useContext<any>(profileUserContext);
  const { run } = useUpdateUserProfile();
  const { run: uploadImage } = useUploadImage(run);
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
            if (value.file) {
              const formData = new FormData();
              formData.append('files', value.file);
              uploadImage(formData, value);
            } else {
              run(value);
            }
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
