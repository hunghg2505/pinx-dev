import React from 'react';

import { useClickAway, useFocusWithin } from 'ahooks';
import classNames from 'classnames';
import { router } from 'next/client';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import FormItem from '@components/UI/FormItem';
import { IconSearchWhite } from '@components/UI/Icon/IconSearchWhite';
import Input from '@components/UI/Input';
import { ROUTE_PATH } from '@utils/common';

const SearchInput = () => {
  const { t } = useTranslation('common');
  const searchParams = useSearchParams();
  const search = searchParams.get('q') || '';
  const [form] = Form.useForm();
  const [query, setQuery] = React.useState(search);

  // Remove value input search when refresh open new page
  React.useEffect(() => {
    setQuery(search);
  }, [search]);

  const [inputFocus, setInputFocus] = React.useState(false);
  // const [showPopup, setShowPopup] = React.useState(false);
  const ref = React.useRef(null);
  useFocusWithin(ref, {
    onFocus: () => {
      setInputFocus(true);
    },
  });

  useClickAway(() => {
    setInputFocus(false);
  }, ref);

  const handleParam = () => setQuery(form.getFieldValue('search'));

  const handleSubmit = () => {
    router.push({
      pathname: ROUTE_PATH.SEARCHSEO,
      query: { q: query },
    });
  };

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
        <Form form={form} onFinish={handleSubmit} onValuesChange={handleParam}>
          <FormItem name='search'>
            <Input
              ref={ref}
              className={classNames(
                'h-[40px] rounded-[8px] pl-[36px] pr-[12px] outline-none transition-all duration-300 ease-in-out',
                {
                  'w-[375px] bg-[#F7F6F8]': inputFocus,
                  'w-[220px] bg-[#EFF2F5] ': !inputFocus,
                },
              )}
              placeholder={t('search_uppercase')}
              icon={<IconSearchWhite />}
              value={query}
            />
          </FormItem>
        </Form>
      </div>
    </>
  );
};

export default SearchInput;
