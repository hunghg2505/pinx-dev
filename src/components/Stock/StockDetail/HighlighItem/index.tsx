import React from 'react';

import { CompanyRelatedType, IHashtag } from '@components/Stock/type';
import Text from '@components/UI/Text';

interface IHighlighItem {
  data: IHashtag;
  onGoToCompaniesRelatedPage: (type: CompanyRelatedType, hashtag: IHashtag) => void;
}

const HighlighItem = ({ data, onGoToCompaniesRelatedPage }: IHighlighItem) => {
  return (
    <div
      onClick={() => onGoToCompaniesRelatedPage(CompanyRelatedType.HIGHLIGHTS, data)}
      className='flex h-[30px] cursor-pointer items-center justify-center rounded-full border border-solid border-[#B1D5F1] px-[10px]'
    >
      <Text type='body-14-medium' className='galaxy-max:text-[12px]' color='primary-2'>
        #{data.tagName}
      </Text>
    </div>
  );
};

export default HighlighItem;
