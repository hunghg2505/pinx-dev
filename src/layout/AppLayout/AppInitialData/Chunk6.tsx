import { useUpdateEffect } from 'ahooks';
import { useAtom } from 'jotai';

import useScript from '@hooks/useScript';
import { atomSplide } from '@store/Splide/Splide';

const Chunk6 = () => {
  const [, setSplide] = useAtom(atomSplide);
  const status = useScript(
    'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js',
  );

  useUpdateEffect(() => {
    if (status === 'ready') {
      setSplide(true);
    }
  }, [status]);

  return <></>;
};

export default Chunk6;
