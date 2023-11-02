import { useMount } from 'ahooks';

import { useHandlActionsPost } from '@hooks/useHandlActionsPost';
import { usePostHomePage } from '@store/postHomePage/postHomePage';
import { usePostThemeInitial } from '@store/postTheme/useGetPostTheme';
import { useProfileSettingInitial } from '@store/profileSetting/useGetProfileSetting';

const Chunk1 = () => {
  const { requestProfleSetting } = useProfileSettingInitial();
  usePostThemeInitial();
  const { handleRemoveActionPost } = useHandlActionsPost();
  const { initialHomePostData } = usePostHomePage();

  useMount(() => {
    initialHomePostData();
    handleRemoveActionPost();
    requestProfleSetting();
  });

  return <></>;
};

export default Chunk1;
