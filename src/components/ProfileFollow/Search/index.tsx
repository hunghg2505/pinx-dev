import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import FormItem from '@components/UI/FormItem';

import SearchIcon from './SearchIcon';

const Search = ({ fullName: fullNameProps }: { fullName: string }) => {
  const { t } = useTranslation('profile');
  const { push, query } = useRouter();
  const [form] = Form.useForm();

  const onSubmit = ({ fullName }: { fullName: string }) => {
    if (fullName) {
      push({ query: { ...query, fullName } });
    } else {
      delete query.fullName;
      push({ query: { ...query } });
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      fullName: fullNameProps,
    });
  }, [query]);

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [query.tab]);

  return (
    <Form form={form} onFinish={onSubmit}>
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
