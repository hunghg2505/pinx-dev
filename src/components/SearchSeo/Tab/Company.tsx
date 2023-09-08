import React, { useEffect, useRef, useState } from 'react';

import CompanyItem from '@components/Explore/Search/CompanyItem';
import Loading from '@components/UI/Loading';
import { Skeleton } from '@components/UI/Skeleton';
import useBottomScroll from '@hooks/useBottomScroll';

import Empty from '../Empty';
import { ResponseSearchCompany, useSearchCompany } from '../service';

interface CompanyTabProps {
  textSearch: string;
  onTrackingViewTicker: (stockCode: string, locationDetail: string) => void;
}

const SkeletonLoadingStock = () => {
  return (
    <Skeleton
      rows={2}
      height={58}
      wrapClassName='!gap-y-[16px] !w-full'
      className='!w-full !rounded-[15px]'
    />
  );
};

const CompanyTab = ({ textSearch, onTrackingViewTicker }: CompanyTabProps) => {
  const [companies, setCompanies] = useState<ResponseSearchCompany>();
  const ref = useRef(null);
  const requestGetCompanies = useSearchCompany({
    manual: true,
    onSuccess: ({ data }: ResponseSearchCompany) => {
      setCompanies((prev) => ({
        data: {
          list: [...(prev?.data.list || []), ...data?.list],
          totalElements: data?.totalElements,
          totalPages: data?.totalPages,
          page: data?.page,
          size: data?.size,
          hasNext: data?.hasNext,
        },
      }));
    },
  });

  useEffect(() => {
    if (textSearch.trim()) {
      requestGetCompanies.run({
        textSearch,
      });
    }
  }, [textSearch]);

  useBottomScroll(ref, () => {
    if (companies?.data.hasNext && !requestGetCompanies.loading) {
      requestGetCompanies.run({
        textSearch,
        page: companies.data.page + 1,
      });
    }
  });

  return companies?.data?.totalElements ? (
    <div className='flex flex-col gap-y-[16px]' ref={ref}>
      {companies?.data.list?.map((company: any, index: number) => {
        return (
          <CompanyItem
            onTrackingEventViewStockInfo={() => {
              onTrackingViewTicker(company?.stockCode, 'Company tab');
            }}
            isSearchSeo
            key={`company-${index}`}
            data={company}
          />
        );
      })}

      {companies?.data.hasNext && requestGetCompanies.loading && <SkeletonLoadingStock />}
    </div>
  ) : (
    <>
      {companies && textSearch ? (
        <Empty keyword={textSearch} />
      ) : (
        <div className='flex min-h-[150px] flex-row items-center justify-center'>
          <Loading />
        </div>
      )}
    </>
  );
};

export default CompanyTab;
