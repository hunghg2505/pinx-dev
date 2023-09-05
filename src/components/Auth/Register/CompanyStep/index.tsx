import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { ROUTE_PATH, imageStock } from '@utils/common';
import { ModifyWatchlist } from '@utils/dataLayer';

import styles from './index.module.scss';
import {
  ResultListStock,
  useGetDetailStockCode,
  useGetMyStock,
  useSelectStock,
  useSuggestStockCode,
  useUnSelectStock,
} from './service';

const RegisterCompanyStep = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [selected, setSelected] = useState<any[]>([]);
  const [myListStock, setMyListStock] = useState<string[]>([]);
  const paramsGetDetailStockCodesRef: any = useRef({ params: '' });

  const listSuggestStock = useSuggestStockCode({
    onSuccess: async (res: any) => {
      // file deepcode ignore BadAwaitExpression: <please specify a reason of ignoring this>
      paramsGetDetailStockCodesRef.current.params = res?.data.toString();
    },
  });

  const requestUnSelectStock = useUnSelectStock();

  useEffect(() => {
    if (listSuggestStock.stockCodes) {
      detailStockSuggested.run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listSuggestStock.stockCodes]);

  useEffect(() => {
    requestGetMyStocks.run();
  }, []);

  const detailStockSuggested = useGetDetailStockCode(paramsGetDetailStockCodesRef.current.params);

  const requestSelectStock = useSelectStock({
    onSuccess: (_, params) => {
      router.push(ROUTE_PATH.REGISTER_THEME);

      // gtm
      const unselectedStock = myListStock.filter((item) => !selected.includes(item));
      const stockHasAdd = params
        .toString()
        .split(',')
        .filter((item: string) => !myListStock.includes(item));
      ModifyWatchlist(stockHasAdd, unselectedStock, 'Default', myListStock, myListStock?.length);
    },
  });

  const requestGetMyStocks = useGetMyStock({
    onSuccess: (res: ResultListStock) => {
      const listStock = res.data[0].stocks;
      if (listStock.length > 0) {
        const listStockCode = listStock.map((item) => item.stockCode);
        setSelected(listStockCode);
        setMyListStock(listStockCode);
      }
    },
  });

  const checkIsSelected = (value: any) => {
    const findItem = selected.find((item) => item === value);
    if (findItem) {
      return true;
    }
    return false;
  };
  const onSelect = (value: any) => {
    if (checkIsSelected(value)) {
      const selectedDraft = selected.filter((item) => item !== value);
      setSelected(selectedDraft);
    } else {
      setSelected([...selected, value]);
    }
  };

  const handleContinue = async () => {
    const unselectedStock = myListStock.filter((item) => !selected.includes(item));
    for await (const item of unselectedStock) {
      requestUnSelectStock.run(item);
    }
    requestSelectStock.run(selected.toString());
  };

  return (
    <div className='flex align-middle desktop:container tablet:h-[100vh] desktop:h-[100vh]'>
      <div className='md:h-screen lg:py-0 flex flex-1 flex-col items-center justify-center py-8 tablet:mx-auto'>
        <div className='companyCard md:mt-0 sm:max-w-md xl:p-0 w-full rounded-lg'>
          <div className='justify-center mobile:hidden mobile:w-0 tablet:mb-[27px] tablet:flex tablet:w-full desktop:mb-[27px] desktop:flex desktop:w-full'>
            <img
              src='/static/icons/logo.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className={'h-[72px] w-[72px] object-contain'}
            />
          </div>
          <div className='max-sm:mt-6 flex flex-col items-center px-3'>
            <Text type='body-28-bold' className='mt-6 text-center'>
              {t('register_company_titile')}
            </Text>
            <div className='neutral-4 mt-[8px] flex flex-col items-center'>
              <Text
                type='body-16-regular'
                className='text-center mobile:w-[269px] tablet:w-full desktop:w-full'
              >
                {t('register_company_sub_titile')}
              </Text>
            </div>
          </div>
          <div
            className={classNames(
              'tablet-max:flex tablet-max:h-[70vh] tablet-max:w-screen tablet-max:flex-col tablet-max:justify-center tablet-max:overflow-x-auto ',
              styles.listCompany,
            )}
          >
            {/* mb-[81px] flex w-full flex-wrap items-center justify-center gap-y-[16px] tablet-max:w-[1000px] mobile-max:h-[300px] mobile-max:flex-col mobile:mt-9 tablet:mt-[64px] desktop:mt-[64px] */}
            <div className='mb-[81px] flex-wrap mobile:mt-9 mobile-max:!columns-3 tablet-max:h-[350px] tablet-max:columns-5 tablet:mt-[64px] tablet:flex tablet:w-full tablet:items-center tablet:justify-center tablet:gap-y-[16px] desktop:mt-[64px] '>
              {detailStockSuggested.detailStockCodes?.data.map((item: any) => {
                return (
                  <div
                    className={classNames('relative h-[67px] w-[67px]', styles.companyCard)}
                    key={item.stockCode}
                    onClick={() => onSelect(item?.stockCode)}
                  >
                    <div
                      className={classNames(
                        'flex cursor-pointer items-center justify-center rounded-full border border-solid bg-[rgba(255,255,255,0.33)] p-[8.5px] shadow-[0_4px_5px_0_rgba(195,216,227,0.46)] backdrop-blur-[2.7182817459106445px]',
                        {
                          'border-[var(--primary-1)]': checkIsSelected(item?.stockCode),
                          'border-[rgba(255,255,255,0.25)]': !checkIsSelected(item?.stockCode),
                        },
                      )}
                    >
                      <div className='flex items-center justify-center rounded-full bg-[--neutral-9]'>
                        <div className='absolute bottom-[-8px] right-[4px] flex h-[24px] w-[24px] flex-row items-center justify-center '>
                          {checkIsSelected(item?.stockCode) && (
                            <img
                              src='/static/icons/iconSelected.svg'
                              alt=''
                              width='24'
                              height='24'
                            />
                          )}
                        </div>
                        <div className='flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-full object-contain shadow-[0_2px_4px_0_#0000001A]'>
                          <img
                            src={imageStock(item?.stockCode)}
                            alt=''
                            width='0'
                            height='0'
                            sizes='100vw'
                            className='block'
                          />
                        </div>
                        {/* <Text type='body-14-bold'>{item.stockCode}</Text> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='fixed bottom-0 left-0 right-0 z-[11] flex h-[81px] w-full justify-center px-[16px]'>
            <button
              type='submit'
              onClick={handleContinue}
              className='my-auto flex h-[49px] w-[343px] items-center justify-center rounded-[10px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] text-center text-[17px] font-[700] text-white'
            >
              {t('select')} <Text className='ml-[3px]'>({selected.length})</Text>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompanyStep;
