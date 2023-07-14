import React from 'react';

import { useDebounceFn, useFocusWithin } from 'ahooks';
import classNames from 'classnames';
import Form from 'rc-field-form';

import { TYPESEARCH } from '@components/Home/service';
import { ExploreButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
import { IconSearchWhite } from '@layout/components/MainHeader';
import { getAccessToken } from '@store/auth';

import Company from './Company';
import Post from './Post';
import PeopleItem from '../ModalPeopleYouKnow/PeopleItem';
import { useGetPopular, useGetSearchRecent, useSearchPublic } from '../service';

const Search = () => {
  const refInput = React.useRef(null);
  const [form] = Form.useForm();
  const [showPopup, setShowPopup] = React.useState(false);
  const { listRecent } = useGetSearchRecent();
  const { popular } = useGetPopular();
  const isLogin = getAccessToken();

  const isFocusWithin = useFocusWithin(refInput, {
    onFocus: () => {},
    onBlur: () => {},
  });
  const { search, data } = useSearchPublic();
  const { run } = useDebounceFn(
    () => {
      const value = form.getFieldValue('search');
      if (value === '') {
        setShowPopup(false);
      } else {
        setShowPopup(true);
      }
      search({
        keyword: value,
        searchType: TYPESEARCH.ALL,
      });
    },
    {
      wait: 500,
    },
  );
  const valueInput = form.getFieldValue('search');
  const companies = data?.data?.companies;
  console.log('🚀 ~ file: index.tsx:48 ~ Search ~ companies:', companies);
  const news = data?.data?.news;
  console.log('🚀 ~ file: index.tsx:50 ~ Search ~ news:', news);
  const posts = data?.data?.posts;
  console.log('🚀 ~ file: index.tsx:52 ~ Search ~ posts:', posts);
  const users = data?.data?.users;
  console.log('🚀 ~ file: index.tsx:54 ~ Search ~ users:', users);
  return (
    <>
      <div
        className={classNames('relative mr-[12px] mt-[16px] w-full', {
          '[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]':
            showPopup,
        })}
      >
        <Form form={form} onValuesChange={run}>
          <FormItem name='search'>
            <Input
              className='h-[40px] w-full rounded-[8px] bg-[#EFF2F5] pl-[36px] pr-[12px] outline-none'
              placeholder='Are you looking for something?'
              icon={<IconSearchWhite />}
              ref={refInput}
            />
          </FormItem>
        </Form>
        {isFocusWithin && valueInput === '' && (
          <div className='absolute left-0 top-[50px] z-10 w-full rounded-[8px] bg-[#FFF] px-[16px] py-[24px] [box-shadow:0px_9px_28px_8px_rgba(0,_0,_0,_0.05),_0px_6px_16px_0px_rgba(0,_0,_0,_0.08),_0px_3px_6px_-4px_rgba(0,_0,_0,_0.12)]'>
            {isLogin && (
              <>
                <Text type='body-14-semibold' color='neutral-black'>
                  Recent
                </Text>
                <div className='mb-[20px] mt-[12px] flex flex-row flex-wrap gap-[16px]'>
                  {listRecent?.slice(0, 5)?.map((item: any, index: number) => {
                    return (
                      <div key={index} className='rounded-[1000px] bg-[#EEF5F9] px-[12px] py-[4px]'>
                        <Text type='body-14-regular' color='primary-2'>
                          {item?.keyword}
                        </Text>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            <Text type='body-14-semibold' color='neutral-black'>
              Popular
            </Text>
            <div className='mt-[12px] flex flex-row flex-wrap gap-[16px]'>
              {popular?.slice(0, 6)?.map((item: any, index: number) => {
                return (
                  <div key={index} className='rounded-[1000px] bg-[#EEF5F9] px-[12px] py-[4px]'>
                    <Text type='body-14-regular' color='primary-2'>
                      {item?.keyword}
                    </Text>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div
          className={classNames(
            'pointer-events-none absolute left-0  top-[55px] z-20 h-[65vh] w-full -translate-y-full transform rounded-[12px] bg-[#ffffff] px-[16px] opacity-0 [box-shadow:0px_9px_28px_8px_rgba(0,_0,_0,_0.05),_0px_6px_16px_0px_rgba(0,_0,_0,_0.08),_0px_3px_6px_-4px_rgba(0,_0,_0,_0.12)] [transition:0.5s]',
            { 'pointer-events-auto bottom-0 top-auto translate-y-[0] opacity-100': showPopup },
          )}
        >
          <div className='mt-[24px]'>
            <Text type='body-20-semibold' color='neutral-1'>
              Company
            </Text>
            {companies?.length > 0 ? (
              <>
                <div className='mb-[16px] mt-[16px] flex flex-col gap-y-[16px]'>
                  <Company />
                  <Company />
                </div>
                <ExploreButton>
                  <Text type='body-14-bold' color='primary-2'>
                    Show more
                  </Text>
                </ExploreButton>
              </>
            ) : (
              <Text type='body-14-regular' color='neutral-4' className='mt-[16px]'>
                No company result found for {valueInput}
              </Text>
            )}
          </div>
          <div className='mt-[32px]'>
            <Text type='body-20-semibold' color='neutral-1'>
              People
            </Text>
            {users?.length > 0 ? (
              <>
                <div className='mb-[16px] mt-[16px] flex flex-col gap-y-[16px]'>
                  {users?.map((item: any, index: number) => (
                    <PeopleItem data={item} key={index} />
                  ))}
                </div>
                <ExploreButton>
                  <Text type='body-14-bold' color='primary-2'>
                    Show more
                  </Text>
                </ExploreButton>
              </>
            ) : (
              <Text type='body-14-regular' color='neutral-4' className='mt-[16px]'>
                No people result found for {valueInput}
              </Text>
            )}
          </div>
          <div className='mt-[32px]'>
            <Text type='body-20-semibold' color='neutral-1'>
              Posts
            </Text>
            {posts?.length > 0 ? (
              <div className='mb-[16px] mt-[16px] flex flex-col gap-y-[16px]'>
                <Post />
                <Post />
              </div>
            ) : (
              <Text type='body-14-regular' color='neutral-4' className='mt-[16px]'>
                No post result found for {valueInput}
              </Text>
            )}
          </div>
          <div className='mt-[32px]'>
            <Text type='body-20-semibold' color='neutral-1'>
              News
            </Text>
            {news?.length > 0 ? (
              '123'
            ) : (
              <Text type='body-14-regular' color='neutral-4' className='mt-[16px]'>
                No news result found for {valueInput}
              </Text>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Search;
