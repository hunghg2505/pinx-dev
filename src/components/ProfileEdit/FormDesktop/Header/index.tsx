import React, { createContext } from 'react';

import Avatar from './Avatar';
import Back from './Back';
import Cover from './Cover';
import Phone from './Phone';
import Verify from './Verify';

export const profileUserContext = createContext(undefined);

const Header = () => {
  return (
    <div className='bg-white px-[20px]'>
      <div className='flex items-center justify-between pt-[20px] pb-[14px]'>
        <Back />
      </div>
      <div className='relative  pt-[200px]'>
        <Cover />
        <div className='mx-auto'>
          <Avatar />
          <Phone />
          <Verify />
        </div>
      </div>
    </div>
  );
};
export default Header;
