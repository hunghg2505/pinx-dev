import { memo } from 'react';

import BasicInfo from './BasicInfo';
import Follow from './Follow';
import Options from './Options';
import UpdateAccount from './UpdateAccount';

const MenuProfile = ({ ...props }: any) => {
  return (
    <>
      <BasicInfo userName={props?.username} avatar={props?.avatar} status={props?.isVerify} />
      <Follow follower={props?.follower} following={props?.following} />
      <UpdateAccount />
      <Options />
    </>
  );
};

export default memo(MenuProfile);
