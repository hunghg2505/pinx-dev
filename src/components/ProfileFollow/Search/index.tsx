import React, { useEffect, useState } from 'react';

import { useDebounce } from 'ahooks';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import FormItem from '@components/UI/FormItem';

import SearchIcon from './SearchIcon';

interface ISearchProps {
  onSearchChange: (fullName: string) => void;
  fullName: string;
}

const Search = ({ onSearchChange, fullName: fullNameProps }: ISearchProps) => {
  const { t } = useTranslation('profile');
  const [fullName, setFullName] = useState('');
  const [form] = Form.useForm();
  const debouncedValue = useDebounce(fullName, { wait: 500 });

  useEffect(() => {
    form.setFieldsValue({
      fullName: fullNameProps,
    });
  }, [fullNameProps]);

  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <Form
      onChange={() => {
        const fullName = form.getFieldValue('fullName');
        setFullName(fullName);
      }}
      form={form}
    >
      <div className='mb-[20px] flex items-center justify-between border-b-2 border-solid border-neutral_07 py-[10px]'>
        <FormItem name='fullName' className='flex-1'>
          <input
            className='w-full outline-none'
            type='text'
            placeholder={t('search_placeholder')}
          />
        </FormItem>
        <SearchIcon />
      </div>
    </Form>
  );
};
export default Search;
