import React from 'react';

import Figure from './Figure';
import Info from './Info';

const Header = ({ isMe }: { isMe: boolean }) => {
  return (
    <header className='mb-[32px]'>
      <Figure isMe={isMe} />
      <Info />
    </header>
  );
};
export default Header;
