import React from 'react';

import { useFocusWithin } from 'ahooks';
import classNames from 'classnames';
import Form from 'rc-field-form';

import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
import { IconSearchWhite } from '@layout/components/MainHeader';

import { useGetPopular, useGetSearchRecent } from '../service';

const Search = () => {
  const refInput = React.useRef(null);
  const [form] = Form.useForm();
  const [showPopup, setShowPopup] = React.useState(false);
  const { listRecent } = useGetSearchRecent();
  const { popular } = useGetPopular();
  console.log('🚀 ~ file: index.tsx:19 ~ Search ~ listRecent:', listRecent);
  const onChange = () => {
    const value = form.getFieldValue('search');
    if (value === '') {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  };
  const isFocusWithin = useFocusWithin(refInput, {
    onFocus: () => {},
    onBlur: () => {},
  });

  return (
    <>
      <div
        className={classNames('relative mr-[12px] mt-[16px] w-full', {
          '[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]':
            showPopup,
        })}
      >
        <Form form={form} onValuesChange={onChange}>
          <FormItem name='search'>
            <Input
              className='h-[40px] w-full rounded-[8px] bg-[#EFF2F5] pl-[36px] pr-[12px] outline-none'
              placeholder='Are you looking for something?'
              icon={<IconSearchWhite />}
              ref={refInput}
            />
          </FormItem>
        </Form>
        {isFocusWithin && (
          <div className='absolute left-0 top-[50px] z-10 min-h-[180px] w-full rounded-[8px] bg-[#FFF] px-[16px] py-[24px] [box-shadow:0px_9px_28px_8px_rgba(0,_0,_0,_0.05),_0px_6px_16px_0px_rgba(0,_0,_0,_0.08),_0px_3px_6px_-4px_rgba(0,_0,_0,_0.12)]'>
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
      </div>
      <div
        className={classNames(
          'pointer-events-none fixed bottom-0  left-0 z-10 h-[65vh] w-full -translate-y-full transform bg-[#ffffff] px-[16px] opacity-0 [transition:0.5s]',
          { 'pointer-events-auto bottom-0 top-auto translate-y-[0] opacity-100': showPopup },
        )}
      >
        <div className='mt-[24px]'>
          <Text type='body-20-semibold' color='neutral-1'>
            Company
          </Text>
          <Text type='body-14-regular' color='neutral-4' className='mt-[16px]'>
            No company result found for szxc
          </Text>
        </div>
        <div className='mt-[32px]'>
          <Text type='body-20-semibold' color='neutral-1'>
            People
          </Text>
          <Text type='body-14-regular' color='neutral-4' className='mt-[16px]'>
            No people result found for szxc
          </Text>
        </div>
        <div className='mt-[32px]'>
          <Text type='body-20-semibold' color='neutral-1'>
            Posts
          </Text>
          <Text type='body-14-regular' color='neutral-4' className='mt-[16px]'>
            No post result found for szxc
          </Text>
        </div>
        <div className='mt-[32px]'>
          <Text type='body-20-semibold' color='neutral-1'>
            News
          </Text>
          <Text type='body-14-regular' color='neutral-4' className='mt-[16px]'>
            No news result found for szxc
          </Text>
        </div>
      </div>
    </>
  );
};
export default Search;
