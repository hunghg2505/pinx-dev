import React from 'react';

import { useTranslation } from 'next-i18next';

const Follow = () => {
  const { t } = useTranslation('profile');
  return <>{t('upgrade_to_trading_account')}</>;
};
export default Follow();
