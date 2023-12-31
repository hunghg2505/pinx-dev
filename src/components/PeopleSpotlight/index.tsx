import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { IKOL, useGetInfluencer } from '@components/Home/service';
import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

const ItemInfluence = dynamic(() => import('@components/Home/People/Influencer/ItemInfluence'), {
  ssr: false,
  loading: () => {
    return <Skeleton height={252} className='!w-full !rounded-[15px]' />;
  },
});

const PeopleSpotlight = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const onGoBack = () => {
    router.back();
  };
  const { KOL, refresh } = useGetInfluencer(
    {},
    {
      size: 9999,
    },
  );
  return (
    <>
      <div className='box-shadow card-style mb-10 rounded-[8px] bg-[#FFF] p-[10px] tablet:mt-[24px] tablet:p-[16px] desktop:mt-0'>
        <div className='relative h-[40px] text-center tablet:mb-[16px]'>
          <img
            src='/static/icons/back_icon.svg'
            alt=''
            className='absolute top-1/2 w-[28px] -translate-y-1/2 cursor-pointer'
            onClick={onGoBack}
          />
          <Text
            type='body-20-semibold'
            color='neutral-1'
            className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mobile:hidden tablet:block'
          >
            {t('people_in_spotlight')}
          </Text>
        </div>

        <div className='mb-4 mobile:block tablet:mt-[24px] tablet:hidden'>
          <Text color='neutral-black' type='body-20-semibold' className='mb-[16px]'>
            {t('people_in_spotlight')}
          </Text>

          <Text type='body-14-regular'>{t('people_in_spotlight_desc')}</Text>
        </div>

        <div className='grid grid-cols-2 gap-[16px] galaxy-max:grid-cols-1 galaxy-max:gap-[20px] galaxy-max:px-3 tablet:grid-cols-3 desktop:grid-cols-4 '>
          {KOL?.map((item: IKOL, index: number) => {
            return <ItemInfluence data={item} refresh={refresh} key={`PeopleSpotlight-${index}`} />;
          })}
        </div>
      </div>
    </>
  );
};
export default PeopleSpotlight;
