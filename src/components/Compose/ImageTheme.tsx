import { useMemo } from 'react';

import { useAtomValue } from 'jotai';

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
    <img
      src={bgUrl}
      alt=''
      className='pointer-events-none absolute left-0 top-0 z-[1] h-full w-full object-cover'
    />
  );
};
