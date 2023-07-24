import React, { useContext } from 'react';

import { profileUserContext } from '@components/Profile';

import Influencer from './Influencer';
import Normal from './Normal';

const Story = ({ closeStory }: { closeStory: () => void }) => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <>
      {profileUser?.profileUser && (
        <Influencer
          closeStory={() => {
            closeStory();
          }}
        />
      )}
      {!profileUser?.profileUser && (
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
