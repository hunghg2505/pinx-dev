import React from 'react';

import { Field } from 'rc-field-form';

const Update = () => {
  return (
    <Field name='avatar'>
      {({ onChange }, _, form) => {
        return (
          <input
            type='file'
            accept="image/*"
            className='hidden'
            onChange={(e: any) => {
              form.setFieldValue('file', e.target.files[0]);
              onChange(URL.createObjectURL(e.target.files[0]));
            }}
          />
        );
      }}
    </Field>
  );
};
export default Update;
