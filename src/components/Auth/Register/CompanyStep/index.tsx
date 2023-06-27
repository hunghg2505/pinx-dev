import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';
import { IMAGE_COMPANY_URL } from '@utils/constant';

import styles from './index.module.scss';
import { useGetDetailStockCode, useSelectStock, useSuggestStockCode } from './service';

const RegisterCompanyStep = () => {
  // const { t } = useTranslation('common');
  // const [form] = Form.useForm();
  const router = useRouter();
  const [selected, setSelected] = useState<any[]>([]);
  const paramsGetDetailStockCodesRef: any = useRef({ params: '' });

  const listSuggestStock = useSuggestStockCode({
    onSuccess: async (res: any) => {
      paramsGetDetailStockCodesRef.current.params = await res.data.toString();
    },
  });

  useEffect(() => {
    if (listSuggestStock.stocks) {
      detailStockSuggested.run();
    }
  }, [listSuggestStock.stocks]);

  const detailStockSuggested = useGetDetailStockCode(paramsGetDetailStockCodesRef.current.params);

  const requestSelectStock = useSelectStock({
    onSuccess: () => {
      toast(() => <Notification type='success' message='Subscribe successfully!' />);
      router.push(ROUTE_PATH.REGISTER_THEME);
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

  const handleContinue = () => {
    requestSelectStock.run(selected.toString());
  };

  return (
    <div className='flex align-middle desktop:container tablet:h-[100vh] desktop:h-[100vh]'>
      <div className='md:h-screen lg:py-0 mx-auto flex flex-col items-center justify-center px-6 py-8'>
        <div className='companyCard md:mt-0 sm:max-w-md xl:p-0 w-full rounded-lg bg-white'>
          <div className='flex justify-center mobile:w-0 tablet:mb-[27px] tablet:w-full desktop:mb-[27px] desktop:w-full'>
            <Image
              src='/static/icons/logo.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className={'h-[72px] w-[72px] object-contain'}
            />
          </div>
          <div className='max-sm:mt-6 flex flex-col items-center'>
            <Text type='body-28-bold' className='mt-6'>
              What are you up to?
            </Text>
            <div className='neutral-4 mt-[8px] flex flex-col items-center'>
              <Text
                type='body-16-regular'
                className='text-center mobile:w-[269px] tablet:w-full desktop:w-full'
              >
                Choose companies you would like to get updates from
              </Text>
            </div>
          </div>
          <div
            className={
              'flex w-full flex-wrap items-center justify-center gap-y-[16px] mobile:mt-9 tablet:mt-[64px] desktop:mt-[64px]'
            }
          >
            {detailStockSuggested.detailStockCodes?.data.map((item: any) => {
              const urlImageCompany = `${
                item?.stockCode?.length === 3 || item?.stockCode[0] !== 'C'
                  ? item.stockCode
                  : item.stockCode?.slice(1, 4)
              }.png`;
              return (
                <div
                  className={classNames('relative flex justify-center', styles.companyCard)}
                  key={item.stockCode}
                  onClick={() => onSelect(item?.stockCode)}
                >
                  <div
                    className={classNames(
                      'flex cursor-pointer items-center justify-center  rounded-full border-[1px] px-2 py-[6px] shadow-[0_2px_4px_0_rgba(0,0,0,0.1)]',
                      {
                        'border-solid border-[#1F6EAC]': checkIsSelected(item?.stockCode),
                        'border-solid border-[#FFFFFF]': !checkIsSelected(item?.stockCode),
                      },
                    )}
                  >
                    <div className='flex items-center justify-center rounded-full bg-[--neutral-8] px-2 py-[6px]'>
                      <div className='absolute bottom-[-8px] right-[4px] flex h-[24px] w-[24px] flex-row items-center justify-center '>
                        {checkIsSelected(item?.stockCode) && (
                          <Image
                            src='/static/icons/iconSelected.svg'
                            alt=''
                            width='24'
                            height='24'
                          />
                        )}
                      </div>
                      <Image
                        src={`${IMAGE_COMPANY_URL}${urlImageCompany}`}
                        alt=''
                        width='0'
                        height='0'
                        sizes='100vw'
                        className={'h-[48px] w-[48px] rounded-full object-contain'}
                      />
                      {/* <Text type='body-14-bold'>{item.stockCode}</Text> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='flex w-full justify-center mobile:mt-9 tablet:mt-[64px] desktop:mt-[64px]'>
            <button
              type='submit'
              onClick={handleContinue}
              className='flex justify-center rounded-[10px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] py-[14px] text-center text-[17px] font-[700] text-white mobile:px-[48px] tablet:px-[130px] desktop:px-[130px]'
            >
              Continue{' '}
              {selected.length > 0 && <Text className='ml-[3px]'>({selected.length})</Text>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompanyStep;
