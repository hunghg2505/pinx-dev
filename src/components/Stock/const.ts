import { ActivityIconType } from './type';

export const ACTIVITIES_TYPE = [
  { icon: 'iconHeartActiveNoShadow.svg', type: ActivityIconType.SUBSCRIBE, label: 'Subscribe' },
  { icon: 'iconHeart2.svg', type: ActivityIconType.UNSUBSCRIBE, label: 'Unsubscribe' },
  { icon: 'iconTreeNoShadow.svg', type: ActivityIconType.INVESTED, label: 'Invested in' },
  { icon: 'iconTrading.svg', type: ActivityIconType.SOLD, label: 'Sold' },
];
