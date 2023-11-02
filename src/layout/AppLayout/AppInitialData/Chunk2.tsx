import { useMount } from 'ahooks';

import { usePostThemeInitial } from '@store/postTheme/useGetPostTheme';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { useStockMarketHome } from '@store/stockMarketHome/useStockMarketHome';

const Chunk2 = () => {
  const { run: getUserProfile } = useProfileInitial();
  usePostThemeInitial();
  const { getInitDataStockMarketHome } = useStockMarketHome();

  useMount(() => {
    getUserProfile();
    getInitDataStockMarketHome();
  });

  return <></>;
};

export default Chunk2;
