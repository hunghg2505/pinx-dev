import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { IWatchListItem } from '@components/Home/service';
import { Button } from '@components/UI/Button';
import Empty from '@components/UI/Empty';
import Text from '@components/UI/Text';
import ModalAddStock from '@components/WatchList/ModalAddStock';
import ItemWatchList from '@components/WatchList/YourWatchList/ItemWatchList';

interface IProps {
  watchlistId?: number,
  dataStock?: any,
  isEdit?: boolean;
  setIsEdit?: any;
  yourWatchListStock?: any;
  refreshYourWatchList?:any;
  loadingYourWatchList?: boolean;
  setDataStock?: any;
}
const YourWatchList = (props: IProps) => {
  const {
    dataStock,
    isEdit = false,
    setIsEdit,
    yourWatchListStock,
    refreshYourWatchList,
    setDataStock,
  } = props;
  const { t } = useTranslation('watchlist');

  React.useEffect(() => {
    setDataStock(yourWatchListStock);
  }, [isEdit]);

  return (
    <>
      {/* Top header */}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      d="M17.5 21L10.5 14L17.5 7"
                      stroke="#1F6EAC"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Text>
              </div>
            </div>
            <div className='absolute opacity-0 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'>
              <img
                src='/static/icons/iconFilterSortaz.svg'
                alt=''
                className='h-[28px] w-[28px]'
              />
            </div>
            <div className='ml-auto flex'>
              <div className='flex min-h-[28px] items-center'>

              </div>
            </div>
          </div>
          <div className='min-h-[1px] desktop:ml-[-24px] desktop:mr-[-24px] desktop:bg-[#EEF5F9]'></div>
        </>
      ):(
        <>
          <div className='flex items-center justify-between'>
            <Text type='body-20-bold' color='neutral-1' className='desktop:!text-[28px]'>
              {t('title')}
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
                {t('editText')}
              </Text>
            </Button>
          </div>
        </>
      )}
      {/* /Top header */}

      <div className='flex flex-col gap-y-[16px]'>
        {dataStock?.length < 1 && (
          <>
            <Empty/>
            {!isEdit&&(
              <ModalAddStock
                refreshYourWatchList={refreshYourWatchList}
                dataStock={dataStock}
                yourWatchListStock={yourWatchListStock}
              >
                <img src='/static/icons/iconAddPlus.svg' alt='' className='h-[28px] w-[29px]' />
                <Text type='body-14-semibold' className='text-[#1F6EAC]'>
                  {t('addTxt')}
                </Text>
              </ModalAddStock>
            )}
          </>
        )}
        {isEdit ? (
          <>
            {dataStock?.map((item: IWatchListItem, index: number) => (
              <div
                key={index}
                className={classNames({
                  'relative flex items-center justify-between rounded-[12px] border-b-[1px] border-solid border-[#EBEBEB] bg-[#ECECEC] p-[12px]':
                  isEdit,
                  'flex items-center justify-between rounded-[12px] p-[12px] tablet-max:bg-[#F7F6F8] desktop:rounded-none desktop:border-b-[1px] desktop:border-solid desktop:border-[#EBEBEB] desktop:px-0 desktop:py-[10px] ':
                    !isEdit,
                })}
              >
                <ItemWatchList
                  data={item}
                  isEdit={isEdit}
                  refreshYourWatchList={refreshYourWatchList}
                />
              </div>
            ))}
            <ModalAddStock
              refreshYourWatchList={refreshYourWatchList}
              dataStock={dataStock}
              yourWatchListStock={yourWatchListStock}
            >
              <img src='/static/icons/iconAddPlus.svg' alt='' className='h-[28px] w-[29px]' />
              <Text type='body-14-semibold' className='text-[#1F6EAC]'>
                {t('addTxt')}
              </Text>
            </ModalAddStock>
          </>
        ) : (
          <>
            {dataStock?.map((item: IWatchListItem, index: number) => (
              <div
                key={index}
                className={classNames({
                  'relative flex items-center justify-between rounded-[12px] border-b-[1px] border-solid border-[#EBEBEB] bg-[#ECECEC] p-[12px]':
                  isEdit,
                  'flex items-center justify-between rounded-[12px] p-[12px] tablet-max:bg-[#F7F6F8] desktop:rounded-none desktop:border-b-[1px] desktop:border-solid desktop:border-[#EBEBEB] desktop:px-0 desktop:py-[10px] ':
                    !isEdit,
                })}
              >
                <ItemWatchList
                  data={item}
                  isEdit={isEdit}
                  refreshYourWatchList={refreshYourWatchList}
                />
              </div>
            ))}
          </>
        )}

      </div>
    </>
  );
};
export default YourWatchList;
