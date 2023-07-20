import React, { useContext, useEffect } from 'react';

import Form, { useForm } from 'rc-field-form';

import Header from './Header';
import Info from './Infomation';
import { profileUserContext } from '..';
import { useUpdateUserProfile, useUploadImage } from '../service';

const FormEdit = () => {
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
          initialValues={{
            avatar: profileUser?.avatar || '',
            bio: profileUser?.caption || '',
            displayName: profileUser?.displayName || '',
            position: profileUser?.position || '',
          }}
          onFinish={async (value) => {
            const formData = new FormData();
            formData.append('files', value.file);
            uploadImage(formData,value);
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
