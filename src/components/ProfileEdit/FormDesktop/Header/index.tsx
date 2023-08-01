import React, { createContext } from 'react';

import Avatar from './Avatar';
import Back from './Back';
import Cover from './Cover';
import Phone from './Phone';
import Verify from './Verify';

export const profileUserContext = createContext(undefined);

const Header = () => {
  return (
    <div className='bg-white'>
      <div className='relative w-full pt-[41%] tablet:pt-[280px]'>
        <Back />
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
