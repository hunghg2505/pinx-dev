import React, { useContext } from 'react';

import Figure from '@components/MyProfile/Header/Figure';
import CoverAvatar from '@components/MyProfile/Header/Figure/Avatar';
import Avatar from '@components/MyProfile/Header/Figure/Avatar/Img';
import Cover from '@components/MyProfile/Header/Figure/Cover/Image';
import AvatarDefault from '@components/UI/AvatarDefault';
import { toNonAccentVietnamese } from '@utils/common';

import Back from './Back';
import Info from './Info';
import { profileUserContext } from '..';

const Header = () => {
  const profileUser = useContext<any>(profileUserContext);
  const name =
    profileUser?.displayName &&
    toNonAccentVietnamese(profileUser?.displayName)?.charAt(0)?.toUpperCase();

  return (
    <header className='mb-[18px] tablet:mb-[16px]'>
      <Figure>
        <>
          <Back />
          <Cover coverImage={profileUser?.coverImage} />
          <CoverAvatar>
            {profileUser?.avatar ? (
              <Avatar avatar={profileUser?.avatar} />
            ) : (
              <div className='h-[113px] w-[113px] tablet:h-[100px] tablet:w-[100px] xdesktop:h-[120px] xdesktop:w-[120px]'>
                <AvatarDefault name={name} />
              </div>
            )}
          </CoverAvatar>
        </>
      </Figure>
      <Info />
    </header>
  );
};
export default Header;
