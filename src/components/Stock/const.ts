import { ActivityIconType, FinancialAnnualKey } from './type';

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
  { icon: 'iconTrading.svg', type: ActivityIconType.SOLD, label: 'activities.sold' },
];

export const SHARE_HOLDER_COLOR = [
  '#72cd5f',
  '#715f95',
  '#55bee8',
  '#e1658e',
  '#fbda21',
  '#999999',
];

export const manualTranslateFinancialIndicator = (key: string) => {
  switch (key) {
    case FinancialAnnualKey.EPS: {
      return 'financial_indicator.eps_4q';
    }
    case FinancialAnnualKey.BVPS: {
      return 'financial_indicator.bvps';
    }
    case FinancialAnnualKey.PE: {
      return 'financial_indicator.pe';
    }
    case FinancialAnnualKey.ROS: {
      return 'financial_indicator.ros';
    }
    case FinancialAnnualKey.ROEA: {
      return 'financial_indicator.roea';
    }
    case FinancialAnnualKey.ROAA: {
      return 'financial_indicator.roaa';
    }
    default: {
      return '';
    }
  }
};
