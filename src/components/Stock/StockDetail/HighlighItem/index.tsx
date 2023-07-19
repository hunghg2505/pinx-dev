import React from 'react';

import Text from '@components/UI/Text';

interface IHighlighItem {
  value: string;
}

const HighlighItem = ({ value }: IHighlighItem) => {
  return (
    <div className='flex h-[30px] items-center justify-center rounded-full border border-solid border-[#B1D5F1] px-[10px]'>
      <Text type='body-14-medium' color='primary-2'>
        #{value}
      </Text>
    </div>
  );
};

export default HighlighItem;
