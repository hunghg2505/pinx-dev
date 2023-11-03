import { useEffect } from 'react';

import toast, { Toaster, useToasterStore } from 'react-hot-toast';

import { TOAST_LIMIT } from 'src/constant';

const Chunk9 = () => {
  const { toasts } = useToasterStore();

  useEffect(() => {
    for (const t of toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT)) {
      toast.dismiss(t.id);
    } // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return <Toaster />;
};

export default Chunk9;
