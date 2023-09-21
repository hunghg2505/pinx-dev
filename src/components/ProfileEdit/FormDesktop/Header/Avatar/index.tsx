import React from 'react';

// eslint-disable-next-line import/named
import { FormInstance } from 'rc-field-form';

import Img from './Img';
import Update from './Update';

const Avatar = ({ form }: { form: FormInstance }) => {
  return (
    <div className='absolute bottom-[0%] left-[16px] z-10 translate-y-[calc(50%+25px)] tablet:left-[10px] tablet:translate-y-[calc(100%-18px)] tablet:p-[0px] xdesktop:left-[32px]'>
      <Img />
      <label className=''>
        <Update form={form} />
      </label>
    </div>
  );
};
export default Avatar;
