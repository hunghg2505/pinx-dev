import React from 'react';

import Header from './Header';
import MyStory from './MyStory';

const Profile = () => {
  return (
    <>
      <Header
        cover='/static/images/theme.jpg'
        avatar='/static/images/theme1.png'
        name='Anthony Starr'
        star
      />
      <MyStory />
    </>
  );
};
export default Profile;
