import React from 'react';

import classNames from 'classnames';

import Text from '@components/UI/Text';

interface IEmptyDataProps {
  title: string;
  description: string;
  textHasAction?: string;
  onClickTextHasAct?: () => void;
  titleClassName?: string;
}

const EmptyData = ({
  title,
  description,
  textHasAction,
  onClickTextHasAct,
  titleClassName,
}: IEmptyDataProps) => {
  return (
    <div className='rounded-[12px] border border-dashed border-[#ccc] bg-[#F7F6F8] px-[36px] py-[28px] text-center'>
      <Text type='body-16-semibold' className={classNames('text-[#0D0D0D]', titleClassName)}>
        {title}
      </Text>

      <Text type='body-12-regular' className='mt-[16px] text-[#999999]'>
        {description}
      </Text>

      {textHasAction && (
        <Text
          type='body-14-bold'
          onClick={onClickTextHasAct}
          color='primary-2'
          className='mt-[28px] inline-block cursor-pointer'
        >
          {textHasAction}
        </Text>
      )}
    </div>
  );
};

export default EmptyData;
