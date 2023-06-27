import { RefObject, useEffect, useState } from 'react';

const useClickOutSide = (
  ref: RefObject<any>,
  onClickOutside: () => void,
  excludeElements?: (Element | null)[],
) => {
  const [isExcludeElement, setIsExcludeElement] = useState<boolean | undefined>(false);
  useEffect(() => {
    const isExcludeElement = (target: Element) => {
      const isExcludeElm = excludeElements?.some((elm) => elm?.contains(target));
      setIsExcludeElement(isExcludeElm);
      return isExcludeElm;
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !isExcludeElement(e.target as Element)
      ) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [excludeElements, onClickOutside, ref]);

  return { isExcludeElement };
};

export default useClickOutSide;
