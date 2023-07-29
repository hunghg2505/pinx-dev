import React from 'react';

import { Field } from 'rc-field-form';

const Img = () => {
  return (
    <Field name='coverImage'>
      {({ value }) => {
        return (
          <img
            src={value}
            alt='background cover'
            className='top-0 h-full w-full rounded-[8px] object-cover'
          />
        );
      }}
    </Field>
  );
};
export default Img;
