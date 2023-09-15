import React from 'react';

import { Field } from 'rc-field-form';

import CustomImage from '@components/UI/CustomImage';

const Img = () => {
  return (
    <Field name='avatar'>
      {({ value }) => {
        return (
          <CustomImage
            width='0'
            height='0'
            sizes='100vw'
            src={value}
            alt='background cover'
            className='mx-auto h-[174px] w-[174px] rounded-full object-cover shadow-lg tablet:h-[100px] tablet:w-[100px]'
          />
        );
      }}
    </Field>
  );
};
export default Img;
