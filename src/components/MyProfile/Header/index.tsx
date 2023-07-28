import React, { useContext } from 'react';

import Figure from './Figure';
import Avatar from './Figure/Avatar';
import IconAvartaEdit from './Figure/Avatar/IconAvartaEdit';
import Img from './Figure/Avatar/Img';
import Back from './Figure/Back';
import Cover from './Figure/Cover';
import Info from './Info';
import { profileUserContext } from '..';

const Header = () => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <header className='mb-[22px]'>
      <Figure>
        <>
          <Back />
          <Cover />
          <Avatar>
            <>
              <Img avatar={profileUser?.avatar} />
              <IconAvartaEdit />
            </>
          </Avatar>
        </>
      </Figure>
      <Info />
    </header>
  );
};
export default Header;
