import React from 'react';

import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Button } from '@components/UI/Button';
import Text from '@components/UI/Text';
import Themes from '@components/WatchList/Themes';

import ComponentWatchList from './ComponentWatchList';
import ModalAddStock from './ModalAddStock';
import { useGetInterest } from './service';

const Interest = dynamic(() => import('@components/WatchList/Interest'), {
  ssr: false,
});

const isEditAtom = atomWithStorage('isEditWatchList', false);

const WatchList = () => {
  const { t } = useTranslation('watchlist');
  const [isEdit, setIsEdit] = useAtom(isEditAtom);
  const router = useRouter();
  const onGoBack = () => {
    router.back();
  };

  const { interestStock, refreshInterest, loading } = useGetInterest();

  if (loading) {
    return <></>;
  }

  return (
    <div className='flex flex-col gap-y-[32px] rounded-[8px] bg-white px-[10px] py-[20px] desktop:gap-y-[20px] desktop:px-[24px]'>
      <div className='flex flex-col gap-y-[16px] desktop:gap-y-[20px]'>
        {!isEdit && (
          <img
            src='/static/icons/back_icon.svg'
            alt=''
            className='w-[28px] cursor-pointer desktop:hidden'
            onClick={onGoBack}
          />
        )}
        {isEdit ? (
          <>
            <div className='relative flex items-center'>
              <div className='flex'>
                <div className='flex min-h-[28px] items-center'>
                  <Text
                    type='body-12-semibold'
                    className='cursor-pointer text-[#1F6EAC]'
                    onClick={() => setIsEdit(false)}
                  >
                    {t('cancelTxt')}
                  </Text>
                </div>
              </div>
              <div className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'>
                <img
                  src='/static/icons/iconFilterSortaz.svg'
                  alt=''
                  className='h-[28px] w-[28px]'
                />
              </div>
              <div className='ml-auto flex'>
                <div className='flex min-h-[28px] items-center'>
                  <Button className='flex min-h-[24px] min-w-[76px] items-center justify-center rounded-full bg-[#589DC0]'>
                    <Text type='body-12-medium' color='cbwhite'>
                      {t('saveTxt')}
                    </Text>
                  </Button>
                </div>
              </div>
            </div>
            <div className='min-h-[1px] desktop:ml-[-24px] desktop:mr-[-24px] desktop:bg-[#EEF5F9]'></div>
          </>
        ) : (
          <div className='flex items-center justify-between'>
            <Text type='body-20-bold' color='neutral-1' className='desktop:!text-[28px]'>
              {t('title')}
            </Text>
            <Button
              onClick={() => setIsEdit(true)}
              className='flex items-center justify-end desktop:min-h-[34px] desktop:min-w-[135px] desktop:rounded-[5px] desktop:bg-[#EEF5F9]'
            >
              <img
                src='/static/icons/explore/iconEdit.svg'
                alt=''
                className='mr-[4px] h-[13px] w-[13px]'
              />
              <Text type='body-14-semibold' color='primary-2'>
                {t('editText')}
              </Text>
            </Button>
          </div>
        )}

        <ComponentWatchList isEdit={isEdit} />
        {isEdit && (
          <ModalAddStock>
            <img src='/static/icons/iconAddPlus.svg' alt='' className='h-[28px] w-[29px]' />
            <Text type='body-14-semibold' className='text-[#1F6EAC]'>
              {t('addTxt')}
            </Text>
          </ModalAddStock>
        )}
      </div>

      <Interest isEdit={isEdit} interestStock={interestStock} refreshInterest={refreshInterest} />
      <Themes isEdit={isEdit} />
    </div>
  );
};
export default WatchList;
