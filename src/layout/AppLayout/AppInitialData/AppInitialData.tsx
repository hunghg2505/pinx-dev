import { useEffect } from 'react';

import dynamic from 'next/dynamic';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

import { usePostThemeInitial } from '@store/postTheme/useGetPostTheme';
import { TOAST_LIMIT } from 'src/constant';

const Chunk1 = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk1'));
const Chunk2 = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk2'));
const Chunk3 = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk3'));
const Chunk4 = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk4'));
const Chunk5 = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk5'));
const Chunk6 = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk6'));

const AppInitialData = () => {
  const { toasts } = useToasterStore();
  usePostThemeInitial();

  useEffect(() => {
    for (const t of toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT)) {
      toast.dismiss(t.id);
    } // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <>
      <Chunk1 />
      <Chunk2 />
      <Chunk3 />
      <Chunk4 />
      <Chunk5 />
      <Chunk6 />
      <Toaster />
    </>
  );
};

export default AppInitialData;
