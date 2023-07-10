import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

import PeopleItem from './PeopleItem';

const PeopleSpotlight = () => {
  const router = useRouter();
  const onGoBack = () => {
    router.back();
  };
  return (
    <>
      <img
        src='/static/icons/back_icon.svg'
        alt=''
        className='mb-[16px] w-[28px] cursor-pointer'
        onClick={onGoBack}
      />
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px]'>
        People in spotlight
      </Text>
      <Text type='body-14-regular' color='cbblack'>
        Be inspired by our stock expert’s investment stories.
      </Text>
      <div className=' mt-[16px]'>
        <PeopleItem />
        <PeopleItem />
      </div>
    </>
  );
};
export default PeopleSpotlight;
