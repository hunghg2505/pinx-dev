import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import ItemInfluence from '@components/Home/People/Influencer/ItemInfluence';
import { IKOL, useGetInfluencer } from '@components/Home/service';
import Text from '@components/UI/Text';

const PeopleSpotlight = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const onGoBack = () => {
    router.back();
  };
  const { KOL, refresh } = useGetInfluencer();
  return (
    <>
      <div className='rounded-[8px] bg-[#FFF] px-[10px] py-[20px] tablet:px-[0]'>
        <div className='relative text-center'>
          <img
            src='/static/icons/back_icon.svg'
            alt=''
            className='absolute left-0 top-0 w-[28px] cursor-pointer'
            onClick={onGoBack}
          />
          <Text type='body-20-semibold' color='neutral-1' className='mobile:hidden tablet:block'>
            {t('people_in_spotlight')}
          </Text>
        </div>
        <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9] mobile:hidden tablet:block'></div>

        <div className='mb-4 mt-[44px] mobile:block tablet:hidden'>
          <Text color='neutral-black' type='body-20-semibold' className='mb-[16px]'>
            {t('people_in_spotlight')}
          </Text>

          <Text type='body-14-regular'>{t('people_in_spotlight_desc')}</Text>
        </div>

        <div className='grid grid-cols-2 gap-[16px] px-[0] tablet:grid-cols-3 tablet:px-[16px] desktop:grid-cols-4 '>
          {KOL?.slice(0, 20).map((item: IKOL, index: number) => {
            return <ItemInfluence data={item} refresh={refresh} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};
export default PeopleSpotlight;
