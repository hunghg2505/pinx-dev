import { useEffect, useState } from 'react';

export const useCheckURL = () => {
  const [url] = useState();
  useEffect(() => {}, []);
  return { url };
};
