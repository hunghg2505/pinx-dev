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
        return t('posts');
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
    <div className='box-shadow card-style mb-10 rounded-[8px] bg-[#FFF] p-[10px] tablet:mt-[24px] tablet:p-[16px] desktop:mt-0'>
      <div className='relative mb-[16px] mt-[12px] h-[40px] text-center tablet:mt-0'>
        <img
          src='/static/icons/back_icon.svg'
          alt=''
          className='absolute top-1/2 w-[28px] -translate-y-1/2 cursor-pointer'
          onClick={onGoBack}
        />
        <Text
          type='body-20-semibold'
          color='neutral-1'
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        >
          {renderText()}
        </Text>
      </div>
      <div className='mobile-max:ml-[16px]'>{renderContent()}</div>
    </div>
  );
};
export default Search;
