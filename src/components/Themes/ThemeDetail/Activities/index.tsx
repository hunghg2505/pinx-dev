import React from 'react';

import { useTranslation } from 'next-i18next';

import { INewFeed } from '@components/Home/service';
import { IThemeDetail, useGetListActivitiesTheme } from '@components/Themes/service';
import Text from '@components/UI/Text';

import ItemActivities from './ItemActivities';

const Activities = ({ data }: { data: IThemeDetail }) => {
  const { t } = useTranslation('theme');
  const { activities, run, refresh } = useGetListActivitiesTheme(data?.code);
  React.useEffect(() => {
    if (data?.code) {
      run();
    }
  }, [data?.code]);
  return (
    <>
      <Text
        type='body-20-semibold'
        color='neutral-black'
        className='mb-[20px] mt-[21px] block desktop:hidden'
      >
        {t('tab.activities')}
      </Text>
      <div className='flex flex-col gap-y-[16px] mobile:mb-[20px] desktop:mb-0 desktop:mt-[21px]'>
        {activities?.map((item: INewFeed, index: number) => {
          return <ItemActivities key={index} data={item} refresh={refresh} />;
        })}
      </div>
    </>
  );
};
export default Activities;
