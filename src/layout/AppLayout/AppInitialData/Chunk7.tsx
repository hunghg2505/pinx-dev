import { useUpdateEffect } from 'ahooks';
import { useAtom } from 'jotai';

import useScript from '@hooks/useScript';
import { atomMixpanel } from '@store/mixpanel/mixpanel';

const Chunk7 = () => {
  const [, setMixpanel] = useAtom(atomMixpanel);
  const status = useScript(
    'https://cdn.jsdelivr.net/npm/mixpanel-browser@2.47.0/dist/mixpanel.umd.js',
    8000,
  );

  useUpdateEffect(() => {
    if (status === 'ready') {
      setMixpanel(true);
    }
  }, [status]);

  return <></>;
};

export default Chunk7;
