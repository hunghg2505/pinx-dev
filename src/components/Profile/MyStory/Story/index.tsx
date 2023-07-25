import React, { useContext } from 'react';

import { profileUserContext } from '@components/Profile';

import Influencer from './Influencer';
import Normal from './Normal';

const Story = () => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <>
      {profileUser?.isFeatureProfile && <Influencer />}
      {!profileUser?.isFeatureProfile && <Normal />}
    </>
  );
};
export default Story;
