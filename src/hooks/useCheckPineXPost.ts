import { useEffect, useState } from 'react';

const useCheckPineXPost = (postUrl: string) => {
  const [isPineXPost, setIsPineXPost] = useState(false);
  const [postSlug, setPostSlug] = useState('');

  useEffect(() => {
    if (postUrl) {
      const currentUrl = window.location.origin;
      const isPostOfPineX = (postUrl as string).includes(currentUrl) && postUrl.includes('/post');
      setIsPineXPost(isPostOfPineX);

      const findIndex = (postUrl as string).search('/post');
      setPostSlug((postUrl as string).slice(findIndex));
    }
  }, [postUrl]);

  return { isPineXPost, postSlug };
};

export default useCheckPineXPost;
