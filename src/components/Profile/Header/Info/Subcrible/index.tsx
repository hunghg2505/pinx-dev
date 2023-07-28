import React, { useContext, useState } from 'react';

import { profileUserContext } from '@components/Profile';
import PopupAccessLimit from '@components/UI/Popup/PopupAccessLimit';

import Subscribing from './Subscribing';
import Unsubscribe from './Unsubscribe';

const Subcrible = () => {
  const profileUser = useContext<any>(profileUserContext);
  const [visible, setVisible] = useState(false);
  return (
    <>
      <PopupAccessLimit
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
      <div className=' mb-[5px] hidden text-right tablet:block'>
        {profileUser?.isFollowed && <Unsubscribe />}
        {!profileUser?.isFollowed && (
          <Subscribing
            access={() => {
              setVisible(true);
            }}
          />
        )}
      </div>
    </>
  );
};
export default Subcrible;
