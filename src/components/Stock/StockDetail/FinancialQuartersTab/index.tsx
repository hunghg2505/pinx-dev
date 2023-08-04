import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

import { manualTranslateFinancialIndicator } from '@components/Stock/const';
import { useFinancialIndicator } from '@components/Stock/service';
import { FinancialAnnualKey, FinancialType } from '@components/Stock/type';
import Text from '@components/UI/Text';

interface IFinancialQuartersTabProps {
  stockCode: string;
}

const FinancialQuartersTab = ({ stockCode }: IFinancialQuartersTabProps) => {
  const { i18n, t } = useTranslation(['stock']);
  const [page, setPage] = useState(1);
  const { financialIndicator, onGetFinancialIndicator, loading } = useFinancialIndicator({
    params: {
      stockCode,
      termType: FinancialType.QUARTER,
    },
  });

  useEffect(() => {
    !loading && onGetFinancialIndicator(page);
  }, [page]);

  const handleBack = () => setPage((prev) => prev + 1);
  const handleNext = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <table className=' w-full table-fixed border-collapse overflow-hidden rounded-[12px] border-hidden shadow-[0_0_0_1px_var(--neutral-7)]'>
      <thead>
        <tr className='h-[78px]'>
          <th className='align-middle'>
            {financialIndicator?.data && financialIndicator?.data.hasBack && (
              <img
                src='/static/icons/back_icon.svg'
                alt='Previous icon'
                className='ml-[12px] h-[24px] w-[24px] cursor-pointer object-contain'
                onClick={handleBack}
              />
            )}
          </th>
          <th className='align-middle'>
            <Text type='body-14-bold' className='mb-[12px] text-[#0D0D0D]'>
              {i18n.language === 'vi'
                ? financialIndicator?.data.head.termName
                : financialIndicator?.data.head.termNameEN}
            </Text>
            <Text type='body-12-medium' color='primary-2'>
              {dayjs(financialIndicator?.data.head.periodBegin).format('MM/YYYY')}
              {' - '}
              {dayjs(financialIndicator?.data.head.periodEnd).format('MM/YYYY')}
            </Text>
          </th>
          <th className='text-right align-middle'>
            {page > 1 && (
              <img
                src='/static/icons/back_icon.svg'
                alt='Next icon'
                className='ml-auto mr-[12px] h-[24px] w-[24px] rotate-180 cursor-pointer object-contain'
                onClick={handleNext}
              />
            )}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className='border border-solid border-[var(--neutral-7)] bg-[#F7F6F8] py-[12px] text-center'>
            <Text type='body-14-medium' className='text-[#999999]'>
              {t(manualTranslateFinancialIndicator(FinancialAnnualKey.EPS))}
            </Text>

            <Text type='body-16-regular' className='mt-[5px] text-[#0D0D0D]'>
              {Number(financialIndicator?.data.content.eps)}
            </Text>
          </td>

          <td className='border border-solid border-[var(--neutral-7)] bg-[#F7F6F8] py-[12px] text-center'>
            <Text type='body-14-medium' className='uppercase text-[#999999]'>
              {t(manualTranslateFinancialIndicator(FinancialAnnualKey.BVPS))}
            </Text>

            <Text type='body-16-regular' className='mt-[5px] text-[#0D0D0D]'>
              {Number(financialIndicator?.data.content.bvps)}
            </Text>
          </td>

          <td className='border border-solid border-[var(--neutral-7)] bg-[#F7F6F8] py-[12px] text-center'>
            <Text type='body-14-medium' className='uppercase text-[#999999]'>
              {t(manualTranslateFinancialIndicator(FinancialAnnualKey.PE))}
            </Text>

            <Text type='body-16-regular' className='mt-[5px] text-[#0D0D0D]'>
              {Number(financialIndicator?.data.content.pe)}
            </Text>
          </td>
        </tr>
        <tr>
          <td className='border border-solid border-[var(--neutral-7)] bg-[#F7F6F8] py-[12px] text-center'>
            <Text type='body-14-medium' className='uppercase text-[#999999]'>
              {t(manualTranslateFinancialIndicator(FinancialAnnualKey.ROS))}
            </Text>

            <Text type='body-16-regular' className='mt-[5px] text-[#0D0D0D]'>
              {Number(financialIndicator?.data.content.ros)}
            </Text>
          </td>

          <td className='border border-solid border-[var(--neutral-7)] bg-[#F7F6F8] py-[12px] text-center'>
            <Text type='body-14-medium' className='uppercase text-[#999999]'>
              {t(manualTranslateFinancialIndicator(FinancialAnnualKey.ROEA))}
            </Text>

            <Text type='body-16-regular' className='mt-[5px] text-[#0D0D0D]'>
              {Number(financialIndicator?.data.content.roea)}
            </Text>
          </td>

          <td className='border border-solid border-[var(--neutral-7)] bg-[#F7F6F8] py-[12px] text-center'>
            <Text type='body-14-medium' className='uppercase text-[#999999]'>
              {t(manualTranslateFinancialIndicator(FinancialAnnualKey.ROAA))}
            </Text>

            <Text type='body-16-regular' className='mt-[5px] text-[#0D0D0D]'>
              {Number(financialIndicator?.data.content.roaa)}
            </Text>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FinancialQuartersTab;
