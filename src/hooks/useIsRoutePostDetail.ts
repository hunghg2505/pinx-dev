import { useRouter } from 'next/router';

export const useRouterPostDetail = () => {
  const router = useRouter();

  return router.pathname === '/post/[id]';
};
