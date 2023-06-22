// import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import Image from 'next/image';

import Text from '@components/UI/Text';

import styles from './index.module.scss';
import { useGetDetailStockCode, useSelectedTopics, useSuggestStockCode } from './service';
import { IMAGE_COMPANY_URL } from '@utils/constant';
import toast from 'react-hot-toast';
import Notification from '@components/UI/Notification';
import { ROUTE_PATH } from '@utils/common';
import { useRouter } from 'next/router';

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
    if (listSuggestStock.stockCodes) detailStockSuggested.run();
  }, [listSuggestStock.stockCodes]);

  const detailStockSuggested = useGetDetailStockCode(paramsGetDetailStockCodesRef.current.params);

  const { onSelectedStocks } = useSelectedTopics({
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
    onSelectedStocks(selected.toString());
  };

  return (
    <>
      <div className='mx-auto flex flex-col  items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='companyCardmd:mt-0 w-full rounded-lg bg-white sm:max-w-md xl:p-0'>
          <div className='flex w-full'>
            <Image
              src='/static/icons/back_icon.svg'
              alt=''
              width='0'
              height='0'
              className={'h-[20px] w-[20px]'}
            />
          </div>
          <div className='flex flex-col items-center max-sm:mt-6'>
            <Text type='body-24-bold' className='mt-6'>
              What are you up to?
            </Text>
            <div className='neutral-4 flex flex-col items-center text-[body-14-medium]'>
              <Text type='body-14-regular'>Choose companies you would like </Text>
              <Text type='body-14-regular'>to get updates from</Text>
            </div>
          </div>
          <div className={'mt-9 flex w-full flex-wrap items-center justify-center gap-y-[16px]'}>
            {detailStockSuggested.detailStockCodes?.data.map((item: any) => {
              const urlImageCompany = `${
                item?.stockCode?.length === 3 || item?.stockCode[0] !== 'C'
                  ? item.stockCode
                  : item.stockCode?.slice(1, 4)
              }.png`;
              return (
                <div
                  className={classNames('flex justify-center', styles.companyCard)}
                  key={item.stockCode}
                  onClick={() => onSelect(item?.stockCode)}
                >
                  <div
                    className={classNames(
                      'flex items-center justify-center rounded-full bg-[--neutral-8] px-2 py-[6px]',
                      {
                        [styles.selected]: checkIsSelected(item?.stockCode),
                      },
                    )}
                  >
                    <div
                      className={classNames(
                        'flex items-center justify-center rounded-full bg-[--neutral-8] px-2 py-[6px]',
                        {
                          [styles.selected]: checkIsSelected(item?.stockCode),
                        },
                      )}
                    >
                      <Image
                        src={`${IMAGE_COMPANY_URL}${urlImageCompany}`}
                        alt=''
                        width='0'
                        height='0'
                        sizes='100vw'
                        className={'mr-[6px] h-[48px] w-[48px] rounded-full object-contain'}
                      />
                      <Text type='body-14-bold'>{item.stockCode}</Text>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type='submit'
            onClick={handleContinue}
            className='!mt-10 flex w-full justify-center rounded-[10px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] py-[14px] text-center text-[17px] font-[700] text-white'
          >
            Continue {selected.length > 0 && <Text className='ml-[3px]'>({selected.length})</Text>}
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterCompanyStep;
