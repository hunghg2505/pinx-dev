import React from 'react';

import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import FormItem from '@components/UI/FormItem';
import { IconSearchWhite } from '@components/UI/Icon/IconSearchWhite';
import Input from '@components/UI/Input';

const SearchInput = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <button className='mr-[0] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#F8F8F8] mobile:block tablet:hidden desktop:mr-[12px]'>
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
              placeholder={t('search_uppercase')}
              icon={<IconSearchWhite />}
            />
          </FormItem>
        </Form>
      </div>
    </>
  );
};

export default SearchInput;
