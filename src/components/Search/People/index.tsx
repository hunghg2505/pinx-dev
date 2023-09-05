import React from 'react';

import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import PeopleItem from '@components/Explore/ModalPeopleYouKnow/PeopleItem';
import { TYPESEARCH } from '@components/Home/service';
import FormItem from '@components/UI/FormItem';
import { IconSearchWhite } from '@components/UI/Icon/IconSearchWhite';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';
import { Search } from '@utils/dataLayer';

import { useGetPeople } from '../service';

const People = ({ keyword }: { keyword: any }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [page, setPage] = React.useState<number>(0);
  const [listComapany, setListCompany] = React.useState<any>([]);
  const refInput = React.useRef(null);
  const { people, run, refresh } = useGetPeople({
    onSuccess: (res: any) => {
      const newPage = page + 1;
      setPage(newPage);
      setListCompany([...listComapany, ...res?.data?.list]);
      Search('people', keyword, res?.data?.totalElements, 'page-search');
    },
  });
  React.useEffect(() => {
    run(keyword);
  }, []);
  const [form] = Form.useForm();
  const { run: search } = useDebounceFn(
    () => {
      const value = form.getFieldValue('search');
      router.push({
        pathname: ROUTE_PATH.SEARCH,
        query: {
          keyword: value,
          type: TYPESEARCH.FRIEND,
        },
      });
      run(value);
    },
    {
      wait: 500,
    },
  );

  return (
    <>
      <div>
        <Form form={form} onValuesChange={search} initialValues={{ search: keyword }}>
          <FormItem name='search'>
            <Input
              className='h-[40px] w-full rounded-[8px] bg-[#EFF2F5] pl-[36px] pr-[12px] outline-none'
              placeholder={t('are_you_looking_for_something')}
              icon={<IconSearchWhite />}
              ref={refInput}
            />
          </FormItem>
        </Form>
        {people?.length > 0 ? (
          <div className='flex flex-col mobile:mt-[20px] mobile:gap-y-[12px] tablet:mt-[10px] desktop:gap-y-0'>
            {people?.map((item: any, index: number) => (
              <PeopleItem data={item} key={index} refreshList={refresh} />
            ))}
          </div>
        ) : (
          <div className=''>
            <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
            <Text type='body-14-regular' color='neutral-gray' className='text-center'>
              {t('no_people_result')} {keyword ? `${t('found_for')} ${keyword}` : ''}
            </Text>
          </div>
        )}
      </div>
    </>
  );
};
export default People;
