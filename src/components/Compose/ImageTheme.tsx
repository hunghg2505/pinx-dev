import { useMemo } from 'react';

import { useAtomValue } from 'jotai';
import Image from 'next/image';

import { postThemeAtom } from '@store/postTheme/theme';

export const ImageTheme = ({ themeActiveId }: { themeActiveId: string }) => {
  const bgTheme = useAtomValue(postThemeAtom);

  const bgUrl = useMemo(() => {
    if (themeActiveId === 'default') {
      return '';
    }
    return bgTheme?.find((it) => it?.id === themeActiveId)?.bgImage;
  }, [themeActiveId]);

  if (!bgUrl) {
    return <></>;
  }

  return (
    <Image
      src={bgUrl}
      width='0'
      height='0'
      sizes='100vw'
      alt=''
      className='pointer-events-none absolute left-0 top-0 z-[1] h-full w-full object-cover'
    />
  );
};
