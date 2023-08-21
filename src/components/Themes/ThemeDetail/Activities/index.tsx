import React from 'react';

import { useTranslation } from 'next-i18next';

import { INewFeed } from '@components/Home/service';
import { IThemeDetail, useGetListActivitiesTheme } from '@components/Themes/service';
import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

import ItemActivities from './ItemActivities';

interface IProps {
  data: IThemeDetail;
  loading?: boolean;
}

const SkeletonLoading = () => {
  return (
    <div className='flex gap-x-[12px]'>
      <Skeleton avatar width={28} height={28} />

      <Skeleton className='!h-[90px] !w-full !rounded-[12px]' wrapClassName='!w-full' />
    </div>
  );
};

const Activities = (props: IProps, ref: any) => {
  const { data, loading: loadingThemeDetail } = props;
  const { t } = useTranslation('theme');
  const { activities, run, refresh, loading } = useGetListActivitiesTheme(data?.code);
  React.useEffect(() => {
    if (data?.code) {
      run();
    }
  }, [data?.code]);

  React.useImperativeHandle(ref, () => {
    return {
      onRefreshActivities: refresh,
    };
  });

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
        {loading || loadingThemeDetail ? (
          <>
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
          </>
        ) : (
          activities?.map((item: INewFeed, index: number) => {
            return <ItemActivities key={index} data={item} refresh={refresh} />;
          })
        )}
      </div>
    </>
  );
};
export default React.forwardRef(Activities);
