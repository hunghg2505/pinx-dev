import React from 'react';

// eslint-disable-next-line import/named
import { FormInstance } from 'rc-field-form';

import Img from './Img';
import UpLoadCover from './UpLoadCover';

const Cover = ({ form }: { form: FormInstance }) => {
  return (
    <>
      <div className='absolute left-0 top-0 h-full w-full'>
        <Img />
        <UpLoadCover form={form} />
      </div>
    </>
  );
};
export default Cover;
