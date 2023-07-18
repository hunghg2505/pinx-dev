import React, { useContext } from 'react';

import { profileUserContext } from '@components/Profile';

import Influencer from './Influencer';
import Normal from './Normal';

const Story = ({ closeStory }: { closeStory: () => void }) => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <>
      {profileUser?.isKol && (
        <Influencer
          closeStory={() => {
            closeStory();
          }}
        />
      )}
      {!profileUser?.isKol && (
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
