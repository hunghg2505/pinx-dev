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
    const t = setTimeout(() => {
      getInitDataStockMarketHome();
      clearTimeout(t);
    }, 7000);
  });

  return <></>;
};

export default Chunk2;
