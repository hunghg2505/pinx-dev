import React, { useEffect, useRef, useState } from 'react';

// import Loading from '@components/UI/Loading';
import { Skeleton } from '@components/UI/Skeleton';
import useBottomScroll from '@hooks/useBottomScroll';

import Empty from '../Empty';
import MediaItem from '../MediaItem';
import { ResponseSearchMedia, useSearchMedia } from '../service';

interface MediaTabProps {
  textSearch: string;
  onTrackingViewTicker: (stockCode: string, locationDetail: string) => void;
  textSearchFormat: string;
}

const SkeletonLoadingMedia = () => {
  return (
    <div>
      <Skeleton wrapClassName='max-h-full' height={200} className='max-h-full !w-full !rounded' />

      <Skeleton
        round
        rows={2}
        height={14}
        className='!w-full'
        wrapClassName='!gap-y-[4px] !w-full mt-[8px]'
      />
    </div>
  );
};

const MediaTab = ({ textSearch, onTrackingViewTicker, textSearchFormat }: MediaTabProps) => {
  const [listMedia, setListMedia] = useState<ResponseSearchMedia>();
  const ref = useRef(null);
  const requestGetListMedia = useSearchMedia({
    manual: true,
    onSuccess: ({ data }: ResponseSearchMedia) => {
      setListMedia((prev) => ({
        data: {
          list: [...(prev?.data.list || []), ...(data?.list || [])],
          totalElements: data?.totalElements,
          totalPages: data?.totalPages,
          pageSize: data?.pageSize,
          pageNumber: data?.pageNumber,
          isLast: data?.isLast,
        },
      }));
    },
  });

  useEffect(() => {
    if (textSearchFormat.trim()) {
      requestGetListMedia.run({
        textSearch: textSearchFormat,
      });
    }

    return () => {
      setListMedia(undefined);
    };
  }, [textSearch]);

  useBottomScroll(ref, () => {
    if (!listMedia?.data.isLast && !requestGetListMedia.loading) {
      requestGetListMedia.run({
        textSearch,
        page: Number(listMedia?.data.pageNumber) + 1,
      });
    }
  });
  return listMedia?.data.list && listMedia?.data.list.length > 0 ? (
    <div className='grid grid-cols-1 gap-[16px] tablet:grid-cols-2' ref={ref}>
      {listMedia.data.list?.map((item: any) => {
        return (
          <MediaItem
            onTrackingViewTicker={(stockCode) => onTrackingViewTicker(stockCode, 'Media tab')}
            key={`media-item-${item?.id}`}
            data={item}
            type={item?.type}
          />
        );
      })}

      {!listMedia?.data.isLast && requestGetListMedia.loading && (
        <>
          <SkeletonLoadingMedia />
          <SkeletonLoadingMedia />
        </>
      )}
    </div>
  ) : (
    <>
      {(!listMedia && !textSearchFormat) || (listMedia && textSearch) ? (
        <Empty keyword={textSearch} />
      ) : (
        <div className='flex min-h-[150px] flex-row items-center justify-center'>
          {/* <Loading /> */}
          <Skeleton className='!h-[290px] !w-full !rounded-[8px]' />
        </div>
      )}
    </>
  );
};

export default MediaTab;
