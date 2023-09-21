/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import classNames from 'classnames';
// import { useRouter } from 'next/router';
import { atom } from 'jotai';
import Image from 'next/image';

import AvatarDefault from '@components/UI/AvatarDefault';
import CustomImage from '@components/UI/CustomImage';
import Text from '@components/UI/Text';
import { isUrlValid } from '@utils/common';

export const dataMention: any = atom([]);

export default forwardRef((props: any, ref) => {
  // const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const optionHeight = elementRef?.current?.children[0]?.clientHeight as number;
  const selectItem = (index: any) => {
    const item = props.items?.[index];
    if (item) {
      const isStock = !!item?.stockCode;
      const isHashTag = typeof item === 'string' && item[0] === '#';
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
    elementRef.current?.scrollBy(0, -optionHeight);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
    elementRef.current?.scroll(0, selectedIndex * optionHeight);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);
  useEffect(() => {
    if (selectedIndex === 0) {
      elementRef.current?.scroll(0, 0);
    }
    if (props.items && selectedIndex + 1 === props.items.length) {
      const scrollHeight = elementRef.current?.scrollHeight as number;
      elementRef.current?.scroll(0, scrollHeight);
    }
  }, [selectedIndex]);

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
        enterHandler();
        return true;
      }

      return false;
    },
  }));
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const renderText = (item: any) => {
    const isStock = !!item.stockCode;
    const isHashTag = typeof item === 'string' && item[0] === '#';
    if (isStock) {
      return item.stockCode;
    }
    if (isHashTag) {
      // console.log('item', item);
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
          <div
            ref={elementRef}
            className='items h flex max-h-[180px] w-full flex-col overflow-x-hidden overflow-y-scroll'
          >
            {props.items?.map((item: any, index: number) => {
              const isStock = !!item.stockCode;
              const isHashTag = typeof item === 'string' && item[0] === '#';
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
                  id={`suggest-${index}`}
                  className={classNames(
                    'item flex items-center p-[6px] hover:bg-[var(--primary-3)] tablet:p-[12px]',
                    { 'bg-[var(--primary-3)]': index === selectedIndex },
                  )}
                  key={index}
                  onClick={() => selectItem(index)}
                >
                  {!isHashTag &&
                    (isStock ? (
                      <div className='mr-[12px] flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full object-contain'>
                        <Image
                          src={url}
                          alt=''
                          width={0}
                          height={0}
                          sizes='100vw'
                          className='block'
                        />
                      </div>
                    ) : isUrlValid(item.avatar) ? (
                      <CustomImage
                        src={item.avatar}
                        alt=''
                        width={0}
                        height={0}
                        sizes='100vw'
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
