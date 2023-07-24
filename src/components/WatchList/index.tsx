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

  const { interestStock, refreshInterest } = useGetInterest();


  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleSort = () => {};

  return (
    <div className='flex flex-col gap-y-[32px] desktop:gap-y-[20px] desktop:px-[24px] py-[20px]'>
      <div className='flex flex-col gap-y-[16px] desktop:gap-y-[20px]'>
        {!isEdit && (
          <img
            src='/static/icons/back_icon.svg'
            alt=''
            className='desktop:hidden w-[28px] cursor-pointer'
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
                    className='text-[#1F6EAC] cursor-pointer'
                    onClick={() => setIsEdit(false)}
                  >
                    { t('cancelTxt') }
                  </Text>
                </div>
              </div>
              <div
                onClick={handleSort}
                className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'
              >
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
                      { t('saveTxt') }
                    </Text>
                  </Button>
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className='desktop:ml-[-24px] desktop:mr-[-24px] desktop:bg-[#EEF5F9] min-h-[1px]'></div>
            {/* /Divider */}
          </>
        ) : (
          <div className='flex items-center justify-between'>
            <Text type='body-20-bold' color='neutral-1' className='desktop:!text-[28px]'>
              { t('title') }
            </Text>
            <Button
              onClick={() => setIsEdit(true)}
              className='flex items-center justify-center desktop:min-h-[34px] desktop:min-w-[135px] desktop:rounded-[5px] desktop:bg-[#EEF5F9]'
            >
              <img
                src='/static/icons/explore/iconEdit.svg'
                alt=''
                className='mr-[4px] h-[13px] w-[13px]'
              />
              <Text type='body-14-semibold' color='primary-2'>
                { t('editText') }
              </Text>
            </Button>
          </div>
        )}

        <ComponentWatchList isEdit={isEdit} />
        {isEdit && (
          <ModalAddStock>
            <img src='/static/icons/iconAddPlus.svg' alt='' className='h-[28px] w-[29px]' />
            <Text type='body-14-semibold' className='text-[#1F6EAC]'>
              { t('addTxt') }
            </Text>
          </ModalAddStock>
        )}
      </div>

      <Interest
        isEdit={isEdit}
        interestStock={interestStock}
        refreshInterest={refreshInterest}
      />
      <Themes isEdit={isEdit} />
    </div>
  );
};
export default WatchList;
