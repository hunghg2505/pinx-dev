import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { TYPESEARCH } from '@components/Home/service';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

import Company from './Company';
import News from './News';
import People from './People';
import Post from './Post';

const Search = () => {
  const { t } = useTranslation('theme');
  const router = useRouter();
  const onGoBack = () => {
    router.push(ROUTE_PATH.EXPLORE);
  };
  const keyword = router?.query?.keyword;
  const type = router?.query?.type;
  const renderText = () => {
    switch (type) {
      case TYPESEARCH.STOCK: {
        return t('company');
      }
      case TYPESEARCH.FRIEND: {
        return t('people');
      }
      case TYPESEARCH.POST: {
        return t('post');
      }
      case TYPESEARCH.NEWS: {
        return t('news');
      }
      default: {
        break;
      }
    }
  };

  const renderContent = () => {
    switch (type) {
      case TYPESEARCH.STOCK: {
        return <Company keyword={keyword} />;
      }
      case TYPESEARCH.FRIEND: {
        return <People keyword={keyword} />;
      }
      case TYPESEARCH.POST: {
        return <Post keyword={keyword} />;
      }
      case TYPESEARCH.NEWS: {
        return <News keyword={keyword} />;
      }
      default: {
        break;
      }
    }
  };

  return (
    <div className='rounded-[8px] bg-[#FFF] px-[24px] py-[20px]'>
      <div className='relative text-center'>
        <img
          src='/static/icons/back_icon.svg'
          alt=''
          className='absolute left-0 top-0 w-[28px] cursor-pointer'
          onClick={onGoBack}
        />
        <Text type='body-20-semibold' color='neutral-1' className=''>
          {renderText()}
        </Text>
      </div>
      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      <div className='mobile-max:ml-[16px]'>{renderContent()}</div>
    </div>
  );
};
export default Search;
