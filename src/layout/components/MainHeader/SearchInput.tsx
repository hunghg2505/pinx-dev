import React from 'react';

import Form from 'rc-field-form';

import FormItem from '@components/UI/FormItem';
import { IconSearchWhite } from '@components/UI/Icon/IconSearchWhite';
import Input from '@components/UI/Input';

const SearchInput = () => {
  return (
    <>
      <button className='mr-[0] flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full bg-[#F8F8F8] mobile:block tablet:hidden tablet:h-[44px] tablet:w-[44px] desktop:mr-[12px]'>
        <img
          src='/static/icons/search-gray.svg'
          alt='Search icon'
          className='m-auto h-[22px] w-[22px]'
        />
      </button>

      <div className='mr-[32px] mobile:hidden tablet:block'>
        <Form>
          <FormItem name='search'>
            <Input
              className='h-[40px] w-[220px] rounded-[8px] bg-[#EFF2F5] pl-[36px] pr-[12px] outline-none'
              placeholder='Search'
              icon={<IconSearchWhite />}
            />
          </FormItem>
        </Form>
      </div>
    </>
  );
};

export default SearchInput;
