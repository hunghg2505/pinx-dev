import React from 'react';

import ModalFilter from '@components/Home/ModalFilter';
import Text from '@components/UI/Text';

interface IPropsModalFilter {
  onFilter: () => void;
  filterType: string;
}

export const FilterFake = () => {
  return (
    <>
      <div className='flex items-center pl-[16px] filter mobile:py-[12px] mobile-max:[border-top:1px_solid_#EAF4FB] desktop:mb-[20px]'>
        <Text
          type='body-16-bold'
          color='neutral-2'
          className='mr-[12px] mobile:text-[16px] desktop:!text-[24px]'
        >
          News feed
        </Text>
        <div className='primary-2 flex min-w-[89px] cursor-pointer items-center justify-center rounded-[4px] border-[1px] border-solid border-[#B1D5F1] bg-[#F0F7FC] text-[#1F6EAC] [box-shadow:0px_1px_2px_rgba(0,_0,_0,_0.06)] mobile:h-[34px] mobile:px-[5px] desktop:h-[38px] desktop:px-[14px]'>
          Most recent
        </div>
      </div>
    </>
  );
};

const Filter = (props: IPropsModalFilter) => {
  return (
    <>
      <div className='flex items-center pl-[16px] filter mobile:py-[12px] mobile-max:[border-top:1px_solid_#EAF4FB] desktop:mb-[20px]'>
        <Text
          type='body-16-bold'
          color='neutral-2'
          className='mr-[12px] mobile:text-[16px] desktop:!text-[24px]'
        >
          News feed
        </Text>
        <ModalFilter run={props.onFilter} type={props.filterType} />
      </div>
    </>
  );
};

export default Filter;
