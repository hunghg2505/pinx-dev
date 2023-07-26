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
            className=' left-0 top-0 h-full w-full object-cover tablet:rounded-[8px]'
          />
        );
      }}
    </Field>
  );
};
export default Img;
