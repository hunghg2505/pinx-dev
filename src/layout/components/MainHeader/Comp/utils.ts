import { downloadPineXAppTracking } from 'src/mixpanel/mixpanel';

export const handleRedirect = (url: string) => {
  downloadPineXAppTracking('CTA in App', 'MenuProfileMobile');
  window.open(url, '_blank');
};
