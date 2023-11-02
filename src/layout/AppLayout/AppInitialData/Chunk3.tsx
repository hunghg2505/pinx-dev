import { useMount } from 'ahooks';

import { initMixpanel } from 'src/mixpanel/mixpanelInitial';

const Chunk3 = () => {
  useMount(() => {
    const t = setTimeout(() => {
      initMixpanel();
      clearTimeout(t);
    }, 7000);
  });

  return <></>;
};

export default Chunk3;
