import React from 'react';

import Image from 'next/image';
import { Field } from 'rc-field-form';

const Img = () => {
  return (
    <Field name='coverImage'>
      {({ value }) => {
        return (
          <Image
            width='0'
            height='0'
            sizes='100vw'
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
