import { useEffect } from 'react';

import { useProfileInitial } from '@store/profile/useProfileInitial';
import { useStockMarketHome } from '@store/stockMarketHome/useStockMarketHome';

const Chunk2 = () => {
  const { run: getUserProfile } = useProfileInitial();
  const { getInitDataStockMarketHome } = useStockMarketHome();

  useEffect(() => {
    getUserProfile();
    const t = setTimeout(() => {
      getInitDataStockMarketHome();
      clearTimeout(t);
    }, 10_000);
  }, []);

  return <></>;
};

export default Chunk2;
