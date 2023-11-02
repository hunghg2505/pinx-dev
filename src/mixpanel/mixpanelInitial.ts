// import mixpanel from 'mixpanel-browser';

import { ENV } from '@utils/env';

export const initMixpanel = () => {
  return new Promise((resolve) => {
    (window as any).mixpanel.init(ENV.MIXPANEL_PROJECT_TOKEN, {
      debug: true,
      track_pageview: true,
      persistence: 'localStorage',
    });

    setTimeout(resolve, 8000);
  });
};
