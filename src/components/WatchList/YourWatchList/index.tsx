import React from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { IWatchListItem } from '@components/Home/service';
import { Button } from '@components/UI/Button';
// @ts-ignore
import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';
import ModalAddStock from '@components/WatchList/ModalAddStock';
import ItemWatchList from '@components/WatchList/YourWatchList/ItemWatchList';

interface IProps {
  watchlistId?: number;
  dataStock?: any;
  isEdit?: boolean;
  setIsEdit?: any;
  yourWatchListStock?: any;
  refreshYourWatchList?: any;
  loadingYourWatchList?: boolean;
  refreshInterest?: any;
  setDataStock?: any;
  findIndex?: number;
  isChangeStockPrice?: boolean;
}

const Empty = dynamic(() => import('@components/UI/Empty'), {
  ssr: false,
});

const YourWatchList = (props: IProps) => {
  const {
    watchlistId,
    dataStock,
    isEdit = false,
    setIsEdit,
    yourWatchListStock,
    refreshYourWatchList,
    refreshInterest,
    setDataStock,
    findIndex,
    isChangeStockPrice,
    loadingYourWatchList,
  } = props;
  const { t } = useTranslation('watchlist');
  const [isAz, setIsAz] = React.useState<boolean>(true);

  React.useEffect(() => {
    setDataStock(yourWatchListStock);
  }, [isEdit]);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = [...dataStock];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDataStock(items);
    useSortStock.run(watchlistId, {
      stocks: `${changeArrToString(items)}`,
    });
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const changeArrToString = (data: any) => {
    const tmp = [];
    for (const item of data) {
      tmp.push(item.stockCode);
    }
    return tmp.toString();
  };

  const handleSort = async () => {
    let sorted: any = [];
    sorted = isAz
      ? [...dataStock].sort((a: any, b: any) => (a.stockCode > b.stockCode ? 1 : -1))
      : [...dataStock].sort((a: any, b: any) => (a.stockCode > b.stockCode ? -1 : 1));
    await setDataStock(sorted);
    useSortStock.run(watchlistId, {
      stocks: `${changeArrToString(sorted)}`,
    });
    setIsAz(!isAz);
  };

  const useSortStock = useRequest(
    (code, payload) => {
      return privateRequest(requestPist.put, API_PATH.PRIVATE_SORT_STOCK(code), {
        data: payload,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        refreshInterest && refreshInterest();
        refreshYourWatchList && refreshYourWatchList();
      },
    },
  );
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
                    xmlns='http://www.w3.org/2000/svg'
                    width={28}
                    height={28}
                    viewBox='0 0 28 28'
                    fill='none'
                  >
                    <path
                      d='M17.5 21L10.5 14L17.5 7'
                      stroke='#1F6EAC'
                      strokeWidth={3}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Text>
              </div>
            </div>
            <div className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] opacity-0'></div>
            <div className='ml-auto flex'>
              <div className='flex min-h-[28px] cursor-pointer items-center' onClick={handleSort}>
                <img
                  src={
                    isAz
                      ? '/static/icons/iconFilterSortaz.svg'
                      : '/static/icons/iconFilterSortza.svg'
                  }
                  alt=''
                  className='h-[28px] w-[28px]'
                />
              </div>
            </div>
          </div>
          <div className='min-h-[1px] desktop:ml-[-24px] desktop:mr-[-24px] desktop:bg-[#EEF5F9]'></div>
        </>
      ) : (
        <>
          <div className='flex items-center justify-between '>
            <Text type='body-20-bold' color='neutral-1' className=' desktop:!text-[28px]'>
              {t('title')}
            </Text>
            {dataStock?.length > 0 && (
              <>
                <Button
                  onClick={() => setIsEdit(true)}
                  className='flex items-center justify-center desktop:min-h-[34px] desktop:min-w-[135px] desktop:rounded-[5px] desktop:bg-[#EEF5F9]'
                >
                  <img
                    src='/static/icons/explore/iconEdit.svg'
                    alt=''
                    className='mr-[4px] h-[13px] w-[13px]'
                  />
                  <Text type='body-14-semibold' className='galaxy-max:hidden' color='primary-2'>
                    {t('editText')}
                  </Text>
                </Button>
              </>
            )}
          </div>
        </>
      )}
      {/* /Top header */}

      <div className='flex flex-col'>
        {isEdit ? (
          <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId='characters'>
                {(provided) => (
                  <div
                    className={classNames({
                      'characters flex flex-col': isEdit,
                      'characters flex flex-col gap-y-[16px] ': !isEdit,
                    })}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {dataStock?.map((item: IWatchListItem, index: number) => {
                      return (
                        <Draggable key={index} draggableId={`${index}id`} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={classNames({
                                '!border-[#EFF2F5] !bg-[#F0F7FC] ': snapshot.isDragging,
                                'relative mb-[16px] flex items-center justify-between rounded-[12px] border-b-[1px] border-solid border-[#EBEBEB] bg-[#ECECEC] p-[12px] ':
                                  isEdit,
                                'flex items-center justify-between rounded-[12px] p-[12px] tablet-max:bg-[#F7F6F8] desktop:rounded-none desktop:border-b-[1px] desktop:border-solid desktop:border-[#EBEBEB] desktop:px-0 desktop:py-[10px] ':
                                  !isEdit,
                              })}
                            >
                              <ItemWatchList
                                data={item}
                                isEdit={isEdit}
                                refreshYourWatchList={refreshYourWatchList}
                                refreshInterest={refreshInterest}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {dataStock?.length < 1 && (
              <>
                <Empty className={'mb-[16px]'} />
              </>
            )}
            <ModalAddStock
              refreshYourWatchList={refreshYourWatchList}
              dataStock={dataStock}
              yourWatchListStock={yourWatchListStock}
              isEdit={isEdit}
            >
              <img
                loading='lazy'
                src='/static/icons/iconAddPlus.svg'
                alt=''
                className='h-[28px] w-[29px]'
              />
              <Text type='body-14-semibold' className='text-[#1F6EAC]'>
                {t('addTxt')}
              </Text>
            </ModalAddStock>
          </>
        ) : (
          <>
            {!loadingYourWatchList && (
              <ModalAddStock
                refreshYourWatchList={refreshYourWatchList}
                dataStock={dataStock}
                yourWatchListStock={yourWatchListStock}
                isEdit={isEdit}
              >
                <img
                  loading='lazy'
                  src='/static/icons/iconAddPlus.svg'
                  alt=''
                  className='h-[28px] w-[29px]'
                />
                <Text type='body-14-semibold' className='text-[#1F6EAC]'>
                  {t('addTxt')}
                </Text>
              </ModalAddStock>
            )}

            {loadingYourWatchList ? (
              <div>
                <div className='flex items-center justify-between border-b border-solid border-[#EBEBEB] py-[10px]'>
                  <div className='flex items-center'>
                    <Skeleton avatar width={48} height={48} />

                    <div className='ml-[10px] flex flex-col gap-y-[8px]'>
                      <Skeleton height={15} round width={100} />
                      <Skeleton height={15} round width={115} />
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-[8px]'>
                    <Skeleton height={15} round width={100} wrapClassName='items-end' />
                    <Skeleton height={15} round width={115} />
                  </div>
                </div>

                <div className='flex items-center justify-between border-b border-solid border-[#EBEBEB] py-[10px]'>
                  <div className='flex items-center'>
                    <Skeleton avatar width={48} height={48} />

                    <div className='ml-[10px] flex flex-col gap-y-[8px]'>
                      <Skeleton height={15} round width={100} />
                      <Skeleton height={15} round width={115} />
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-[8px]'>
                    <Skeleton height={15} round width={100} wrapClassName='items-end' />
                    <Skeleton height={15} round width={115} />
                  </div>
                </div>

                <div className='flex items-center justify-between border-b border-solid border-[#EBEBEB] py-[10px]'>
                  <div className='flex items-center'>
                    <Skeleton avatar width={48} height={48} />

                    <div className='ml-[10px] flex flex-col gap-y-[8px]'>
                      <Skeleton height={15} round width={100} />
                      <Skeleton height={15} round width={115} />
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-[8px]'>
                    <Skeleton height={15} round width={100} wrapClassName='items-end' />
                    <Skeleton height={15} round width={115} />
                  </div>
                </div>

                <div className='flex items-center justify-between border-b border-solid border-[#EBEBEB] py-[10px]'>
                  <div className='flex items-center'>
                    <Skeleton avatar width={48} height={48} />

                    <div className='ml-[10px] flex flex-col gap-y-[8px]'>
                      <Skeleton height={15} round width={100} />
                      <Skeleton height={15} round width={115} />
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-[8px]'>
                    <Skeleton height={15} round width={100} wrapClassName='items-end' />
                    <Skeleton height={15} round width={115} />
                  </div>
                </div>

                <div className='flex items-center justify-between border-b border-solid border-[#EBEBEB] py-[10px]'>
                  <div className='flex items-center'>
                    <Skeleton avatar width={48} height={48} />

                    <div className='ml-[10px] flex flex-col gap-y-[8px]'>
                      <Skeleton height={15} round width={100} />
                      <Skeleton height={15} round width={115} />
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-[8px]'>
                    <Skeleton height={15} round width={100} wrapClassName='items-end' />
                    <Skeleton height={15} round width={115} />
                  </div>
                </div>

                <div className='flex items-center justify-between border-b border-solid border-[#EBEBEB] py-[10px]'>
                  <div className='flex items-center'>
                    <Skeleton avatar width={48} height={48} />

                    <div className='ml-[10px] flex flex-col gap-y-[8px]'>
                      <Skeleton height={15} round width={100} />
                      <Skeleton height={15} round width={115} />
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-[8px]'>
                    <Skeleton height={15} round width={100} wrapClassName='items-end' />
                    <Skeleton height={15} round width={115} />
                  </div>
                </div>

                <div className='flex items-center justify-between border-b border-solid border-[#EBEBEB] py-[10px]'>
                  <div className='flex items-center'>
                    <Skeleton avatar width={48} height={48} />

                    <div className='ml-[10px] flex flex-col gap-y-[8px]'>
                      <Skeleton height={15} round width={100} />
                      <Skeleton height={15} round width={115} />
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-[8px]'>
                    <Skeleton height={15} round width={100} wrapClassName='items-end' />
                    <Skeleton height={15} round width={115} />
                  </div>
                </div>

                <div className='flex items-center justify-between border-b border-solid border-[#EBEBEB] py-[10px]'>
                  <div className='flex items-center'>
                    <Skeleton avatar width={48} height={48} />

                    <div className='ml-[10px] flex flex-col gap-y-[8px]'>
                      <Skeleton height={15} round width={100} />
                      <Skeleton height={15} round width={115} />
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-[8px]'>
                    <Skeleton height={15} round width={100} wrapClassName='items-end' />
                    <Skeleton height={15} round width={115} />
                  </div>
                </div>

                <div className='flex items-center justify-between border-b border-solid border-[#EBEBEB] py-[10px]'>
                  <div className='flex items-center'>
                    <Skeleton avatar width={48} height={48} />

                    <div className='ml-[10px] flex flex-col gap-y-[8px]'>
                      <Skeleton height={15} round width={100} />
                      <Skeleton height={15} round width={115} />
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-[8px]'>
                    <Skeleton height={15} round width={100} wrapClassName='items-end' />
                    <Skeleton height={15} round width={115} />
                  </div>
                </div>

                <div className='flex items-center justify-between border-b border-solid border-[#EBEBEB] py-[10px]'>
                  <div className='flex items-center'>
                    <Skeleton avatar width={48} height={48} />

                    <div className='ml-[10px] flex flex-col gap-y-[8px]'>
                      <Skeleton height={15} round width={100} />
                      <Skeleton height={15} round width={115} />
                    </div>
                  </div>

                  <div className='flex flex-col gap-y-[8px]'>
                    <Skeleton height={15} round width={100} wrapClassName='items-end' />
                    <Skeleton height={15} round width={115} />
                  </div>
                </div>
              </div>
            ) : (
              dataStock?.map((item: IWatchListItem, index: number) => {
                const isChangeColor = isChangeStockPrice && findIndex === index;
                return (
                  <div
                    key={index}
                    className={classNames({
                      'relative flex items-center justify-between rounded-[12px] border-b-[1px] border-solid border-[#EBEBEB] bg-[#ECECEC] p-[12px]':
                        isEdit,
                      'mt-[16px] flex items-center justify-between rounded-[12px] p-[12px] first:mt-0 galaxy-max:gap-[8px] tablet-max:bg-[#F7F6F8] desktop:rounded-none desktop:border-b-[1px] desktop:border-solid desktop:border-[#EBEBEB] desktop:px-0 desktop:py-[10px]':
                        !isEdit,
                    })}
                  >
                    <ItemWatchList
                      data={item}
                      isEdit={isEdit}
                      refreshYourWatchList={refreshYourWatchList}
                      isChangeColor={isChangeColor}
                    />
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </>
  );
};
export default YourWatchList;
