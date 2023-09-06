import React, { useContext } from 'react';

import Figure from '@components/MyProfile/Header/Figure';
import CoverAvatar from '@components/MyProfile/Header/Figure/Avatar';
import Avatar from '@components/MyProfile/Header/Figure/Avatar/Img';
import Cover from '@components/MyProfile/Header/Figure/Cover/Image';

import Back from './Back';
import Info from './Info';
import { profileUserContext } from '..';

const Header = () => {
  const profileUser = useContext<any>(profileUserContext);

  return (
    <header className='mb-[18px] tablet:mb-[16px]'>
      <Figure>
        <>
          <Back />
          <Cover coverImage={profileUser?.coverImage} />
          <CoverAvatar>
            <Avatar displayName={profileUser?.displayName} avatar={profileUser?.avatar} />
          </CoverAvatar>
        </>
      </Figure>
      <Info />
    </header>
  );
};
export default Header;
