import React, { useContext } from 'react';

import { profileUserContext } from '@components/MyProfile';

import Influencer from './Influencer';
import Normal from './Normal';

const Story = ({ closeStory }: { closeStory: () => void }) => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <>
      {profileUser?.isFeatureProfile && (
        <Influencer
          closeStory={() => {
            closeStory();
          }}
        />
      )}
      {!profileUser?.isFeatureProfile && (
        <Normal
          closeStory={() => {
            closeStory();
          }}
        />
      )}
    </>
  );
};
export default Story;
