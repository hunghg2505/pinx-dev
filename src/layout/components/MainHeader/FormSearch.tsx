import React from 'react';

import {
  useClickAway,
  useDebounceFn,
  useFocusWithin, useRequest
} from 'ahooks';
import classNames from 'classnames';
import { router } from 'next/client';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import { API_PATH } from '@api/constant';
import { requestCommunity } from '@api/request';
import styles from '@components/SearchSeo/index.module.scss';
import { useGetSearchRecent } from '@components/SearchSeo/service';
import Fade from '@components/UI/Fade';
import FormItem from '@components/UI/FormItem';
import { IconSearchWhite } from '@components/UI/Icon/IconSearchWhite';
import Input from '@components/UI/Input';
import Loading from '@components/UI/Loading';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { getAccessToken } from '@store/auth';
import { ROUTE_PATH } from '@utils/common';

const FormSearch = ({ className, isOpenSearch, setIsOpenSearch }: any) => {
  const { t } = useTranslation('common');
  const { isDesktop, isMobile } = useResponsive();
  const isLogin = !!getAccessToken();

  const searchParams = useSearchParams();
  const search = searchParams.get('keyword') || '';
  const [form] = Form.useForm();
  const ref = React.useRef(null);
  const valueInput = form.getFieldValue('search');

  // Call API
  const { listRecent, refreshSearchRecent, loadingSearchRecent } = useGetSearchRecent();
  console.log('listRecent',listRecent);

  const [query, setQuery] = React.useState(search);
  const [inputFocus, setInputFocus] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const [showRecent, setShowRecent] = React.useState(false);

  // Remove value input search when refresh open new page
  React.useEffect(() => {
    setQuery(search);
  },[search]);

  useFocusWithin(ref, {
    onFocus: () => {
      setInputFocus(true);
      setShowRecent(true);
    },
  });

  useClickAway(() => {
    setInputFocus(false);
    setShowRecent(false);
    setShowPopup(false);
  }, ref);

  // const handleParam =  () => setQuery(form.getFieldValue('search'));

  const handleSubmit = () => {
    router.push({
      pathname: ROUTE_PATH.SEARCHSEO,
      query: { keyword: query, type:'company' },
    });
    form.setFieldValue('search','');
    setInputFocus(false);
    setShowRecent(false);
    setShowPopup(false);
  };

  const removeFormSearch = () => {
    form.setFieldValue('search','');
    run();
  };

  const useRemoveItemRecent = useRequest(
    (code) => {
      return requestCommunity.delete(API_PATH.PUBLIC_SEARCH_SEO_DELETE(code));
    },
    {
      manual: true,
      onSuccess: () => {
        refreshSearchRecent();
      },
    }
  );
  const removeItemRecent = (code:any) => {
    useRemoveItemRecent.run(code);
  };

  const { run } = useDebounceFn(
    () => {
      const value = form.getFieldValue('search');
      setQuery(value);
      if (value === ''){
        setShowPopup(false);
        // setInputFocus(false);
      }else {
        setShowPopup(true);
        setInputFocus(true);
      }
    },
    {
      wait: 300,
    }
  );



  return (
    <>
      {isMobile && (
        <>
          <div className='cursor-pointer' onClick={() => setIsOpenSearch(!isOpenSearch)}>
            <img
              src='/static/icons/arrow-left.svg'
              alt='Search icon'
              className='m-auto h-[32px] w-[32px]'
            />
          </div>
        </>
      )}
      <div ref={ref} className={classNames(className)}>
        <Form
          className={classNames('',{
            'w-full': isMobile
          })}
          form={form}
          onFinish={handleSubmit}
          onValuesChange={run}>
          <FormItem name='search'>
            <Input
              className={classNames('transition-all border duration-300 ease-in-out h-[40px] rounded-[8px] pl-[36px] pr-[12px] outline-none',{
                'w-[375px] bg-[#F7F6F8] border-[#1F6EAC]': inputFocus && isDesktop,
                'w-[220px] bg-[#EFF2F5] border-[#EFF2F5]': !inputFocus && isDesktop,
                'w-full bg-[#F7F6F8] border-[#1F6EAC]': isMobile
              })}
              placeholder={t('search_uppercase')}
              icon={<IconSearchWhite />}
            />
          </FormItem>
        </Form>
        <div className='absolute top-[50%] translate-y-[-50%] right-[20px] desktop:right-[10px]'>
          {isLogin && loadingSearchRecent && <Loading/>}
        </div>

        {/* Khi nhập input show button close clear data */}
        {valueInput && (
          <>
            <button
              onClick={removeFormSearch}
              className='absolute top-[50%] translate-y-[-50%] right-[10px] desktop:right-[0px] w-[40px] h-[40px] flex items-center justify-center'
            >
              <img
                src='/static/icons/iconClose.svg'
                alt='Search icon'
                className='m-auto h-[14px] w-[14px]'
              />
            </button>
          </>
        )}
        {/* End Khi nhập input show button close clear data */}

        <Fade
          visible={showRecent && listRecent?.length > 0 && isLogin && !valueInput}
          className={classNames(styles.boxShadown,'absolute z-10 px-[16px] py-[24px] w-full left-0 right-0 top-[calc(100%+0px)] desktop:top-[calc(100%+8px)] bg-white min-h-[144px] max-h-[490px] desktop:rounded-lg flex flex-col gap-y-[12px]')}
        >
          {listRecent?.length > 0 && <Text type='body-16-semibold' className='text-[#0D0D0D] leading-5'>Recent</Text>}
          {listRecent?.slice(0,5)?.map((item:any, index:number) => {
            return (
              <div
                key={index}
                className='p-[8px] flex gap-x-[10px] relative hover:bg-[#F7F6F8] cursor-pointer'
              >
                <div className='flex-auto'>{item?.textSearch}</div>
                <button
                  className='btn__close absolute top-[50%] translate-y-[-50%] right-[0px] w-[33px] h-[33px] flex items-center justify-center'
                  onClick={() => removeItemRecent(item?.id)}
                >
                  <img
                    src='/static/icons/iconClose.svg'
                    alt='Search icon'
                    className='m-auto h-[14px] w-[14px]'
                  />
                </button>
              </div>
            );
          })}
        </Fade>
        <Fade
          visible={showPopup}
          className={classNames(styles.boxShadown,'absolute z-10 px-[16px] py-[24px] w-full left-0 right-0 top-[calc(100%+0px)] desktop:top-[calc(100%+8px)] bg-white min-h-[144px] max-h-[490px] desktop:rounded-lg flex flex-col gap-y-[12px]')}
        >

        </Fade>
      </div>
    </>
  );
};
export default FormSearch;
