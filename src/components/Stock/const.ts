import { ActivityIconType } from './type';

export const ACTIVITIES_TYPE = [
  {
    icon: 'iconHeartActiveNoShadow.svg',
    type: ActivityIconType.SUBSCRIBE,
    label: 'activities.subscribe',
  },
  { icon: 'iconHeart2.svg', type: ActivityIconType.UNSUBSCRIBE, label: 'activities.unsubscribe' },
  {
    icon: 'iconTreeNoShadow.svg',
    type: ActivityIconType.INVESTED,
    label: 'activities.invested_in',
  },
  { icon: 'iconTrading.svg', type: ActivityIconType.SOLD, label: 'activities.activities' },
];
