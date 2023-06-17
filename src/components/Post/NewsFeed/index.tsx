import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

import ItemComment from './ItemComment';
import NewFeedItem from './NewFeedItem';

const NewsFeed = () => {
  const router = useRouter();
  const onNavigate = () => {
    router.push('/post/1');
  };
  return (
    <>
      <div className='bg-[#ffffff] pb-[28px]'>
        <NewFeedItem onNavigate={onNavigate} />
        <ItemComment onNavigate={onNavigate} />
        <div
          className='mx-[auto] mt-[15px] flex h-[36px] w-[calc((100%_-_32px))] cursor-pointer flex-row items-center justify-center rounded-[4px] bg-[#EAF4FB]'
          onClick={onNavigate}
        >
          <Text type='body-14-medium' color='primary-2'>
            View more 38 replies...
          </Text>
        </div>
      </div>
    </>
  );
};
export default NewsFeed;
