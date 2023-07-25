import { useRouter } from 'next/router';

import ItemInfluence from '@components/Home/People/Influencer/ItemInfluence';
import { IKOL, useGetInfluencer } from '@components/Home/service';
import Text from '@components/UI/Text';

const PeopleSpotlight = () => {
  const router = useRouter();
  const onGoBack = () => {
    router.back();
  };
  const { KOL, refresh } = useGetInfluencer();
  return (
    <>
      <div className='rounded-[8px] bg-[#FFF] px-[24px] py-[20px] tablet-max:px-[0]'>
        <div className='relative text-center'>
          <img
            src='/static/icons/back_icon.svg'
            alt=''
            className='absolute left-0 top-0 w-[28px] cursor-pointer'
            onClick={onGoBack}
          />
          <Text type='body-20-semibold' color='neutral-1' className='mobile:hidden tablet:block'>
            People in spotlight
          </Text>
        </div>
        <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9] mobile:hidden tablet:block'></div>

        <div className='mt-[44px] mobile:block tablet:hidden'>
          <Text color='neutral-black' type='body-20-semibold' className='mb-[16px]'>
            People in spotlight
          </Text>

          <Text type='body-14-regular'>Be inspired by our stock expert’s investment stories.</Text>
        </div>

        <div className=' mt-[16px] flex flex-wrap gap-x-[14px] gap-y-[20px] mobile-max:grid mobile-max:grid-cols-2'>
          {KOL?.slice(0, 20).map((item: IKOL, index: number) => {
            return <ItemInfluence data={item} refresh={refresh} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};
export default PeopleSpotlight;
