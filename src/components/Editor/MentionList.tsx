/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import classNames from 'classnames';
import { atom } from 'jotai';
// import { useRouter } from 'next/router';

import AvatarDefault from '@components/UI/AvatarDefault';
import Text from '@components/UI/Text';
import { isUrlValid, replaceImageError } from '@utils/common';

export const dataMention: any = atom([]);

export default forwardRef((props: any, ref) => {
  // const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectItem = (index: any) => {
    const item = props.items?.[index];
    if (item) {
      const isStock = !!item?.stockCode;
      const isHashTag = typeof item === 'string' && item.includes('#');
      // const hashTag = isHashTag && item?.content?.replace('#', '');
      if (isStock) {
        props.command({ id: item.id, label: item.stockCode });
      } else if (isHashTag) {
        props.command({ id: null, label: item });
      } else {
        props.command({ id: item.id, label: item.displayName });
      }
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  // const enterHandler = () => {
  //   selectItem(selectedIndex);
  // };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: any }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }
      if (event.key === 'Enter') {
        // enterHandler();
        return true;
      }

      return false;
    },
  }));
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const renderText = (item: any) => {
    const isStock = !!item.stockCode;
    const isHashTag = typeof item === 'string' && item.includes('#');
    if (isStock) {
      return item.stockCode;
    }
    if (isHashTag) {
      console.log('item', item);
      return item;
    }
    return item.displayName;
  };
  // const renderImage = (item: any) => {
  //   const isStock = !!item.stockCode;
  //   console.log('🚀 ~ file: MentionList.tsx:79 ~ renderImage ~ isStock:', isStock);
  //   const isHashTag = item.isHashtag;
  //   if (isHashTag) {
  //     return <></>;
  //   }
  //   // if(!isHashTag){
  //   //   if(isStock){
  //   //     if()
  //   //   }
  //   // }
  //   console.log('🚀 ~ file: MentionList.tsx:81 ~ renderImage ~ isHashTag:', isHashTag);
  // };
  return (
    <div
      className={classNames(
        'mentionList flex justify-center overflow-hidden rounded-[12px] ',
        // {
        //   'mobile-max:bottom-auto mobile-max:left-2/4 mobile-max:right-auto mobile-max:top-[58%] mobile-max:w-[calc(100%_-_32px)] mobile-max:-translate-x-1/2 mobile-max:-translate-y-2/4 mobile-max:transform':
        //     router?.pathname === '/theme/[id]',
        // },
        {
          'border border-solid border-neutral_07 bg-white ': props.items?.length,
        },
      )}
    >
      {props.items?.length > 0 && (
        // để 375 thì màn mobile bị tràn ở write posst
        <div className='w-[300px] max-w-full bg-[#ffffff]'>
          <div className='items h flex max-h-[190px] w-full flex-col overflow-x-hidden overflow-y-scroll'>
            {props.items?.map((item: any, index: number) => {
              const isStock = !!item.stockCode;
              const isHashTag = typeof item === 'string' && item.includes('#');
              let url = '';
              const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
              if (isStock) {
                url = `${imageCompanyUrl}${
                  item?.stockCode?.length === 3 || item?.stockCode[0] !== 'C'
                    ? item?.stockCode
                    : item?.stockCode?.slice(1, 4)
                }.png`;
              }

              return (
                <button
                  // className={`item ${index === selectedIndex ? 'is-selected' : ''}`}
                  className={classNames(
                    'item h-30px flex items-center p-[6px] hover:bg-[var(--primary-3)] tablet:p-[12px]',
                  )}
                  key={index}
                  onClick={() => selectItem(index)}
                >
                  {!isHashTag &&
                    (isStock ? (
                      <div className='mr-[12px] flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full object-contain'>
                        <img
                          src={url}
                          alt=''
                          width={0}
                          height={0}
                          sizes='100vw'
                          className='block'
                        />
                      </div>
                    ) : isUrlValid(item.avatar) ? (
                      <img
                        src={item.avatar}
                        alt=''
                        width={0}
                        height={0}
                        sizes='100vw'
                        onError={replaceImageError}
                        className='mr-[12px] h-[36px] w-[36px] rounded-full border border-solid border-[#ebebeb] object-cover'
                      />
                    ) : (
                      <div className='mr-[12px] h-[36px] w-[36px] rounded-full object-cover'>
                        <AvatarDefault nameClassName='text-[16px]' name={item?.displayName} />
                      </div>
                    ))}
                  <Text
                    type='body-14-medium'
                    className='max-w-[180px] truncate text-[#0D0D0D] tablet:!text-[16px] tablet:!font-semibold'
                  >
                    {renderText(item)}
                  </Text>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});
