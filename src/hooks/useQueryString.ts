import { useMemo } from 'react';

import qs from 'query-string';
import { useLocation } from 'react-router-dom';

export const useQueryString = () => {
  const location = useLocation();
  return useMemo(() => qs.parse(location.search), [location.search]);
};
