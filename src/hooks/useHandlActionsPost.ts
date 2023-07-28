import { useCallback } from 'react';

export const useHandlActionsPost = () => {
  const handleRemoveActionPost = useCallback(() => {
    if (document) {
      document.addEventListener('click', (e) => {
        e.stopPropagation();

        const itemActiving = document.querySelector('.active-actions-post');
        if (itemActiving) {
          itemActiving.classList.remove('active-actions-post');
        }
      });
    }
  }, []);

  const refButtonList = useCallback((node?: HTMLDivElement) => {
    if (!node || !node?.nextElementSibling) {
      return;
    }

    node.addEventListener('click', (e) => {
      e.stopPropagation();

      if (node.nextElementSibling?.className?.includes('active-actions-post')) {
        node.nextElementSibling.classList.remove('active-actions-post');
      } else {
        const itemActiving = document.querySelector('.active-actions-post');
        if (itemActiving) {
          itemActiving.classList.remove('active-actions-post');
        }

        // @ts-ignore
        node.nextElementSibling.classList.add('active-actions-post');
      }
    });
  }, []);

  return {
    refButtonList,
    handleRemoveActionPost,
  };
};
