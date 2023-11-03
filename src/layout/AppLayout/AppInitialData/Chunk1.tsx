import { useEffect } from 'react';

import { useHandlActionsPost } from '@hooks/useHandlActionsPost';
import { useProfileSettingInitial } from '@store/profileSetting/useGetProfileSetting';

const Chunk1 = () => {
  const { requestProfleSetting } = useProfileSettingInitial();
  const { handleRemoveActionPost } = useHandlActionsPost();

  useEffect(() => {
    handleRemoveActionPost();
    requestProfleSetting();
  }, []);

  return <></>;
};

export default Chunk1;
