import { viewTickerInfoTracking } from 'src/mixpanel/mixpanel';

// tracking event view ticker info
export const handleTrackingViewTicker = (stockCode: string, locationDetail: string) => {
  viewTickerInfoTracking(stockCode, 'Home screen', locationDetail, 'Stock');
};
