import { useTranslation } from 'next-i18next';

// import { Skeleton } from '@components/UI/Skeleton';

const TabMobileSkeleton = () => {
  const { t } = useTranslation();
  return (
    <>
      <p className='pb-[10px] text-[14px] font-semibold leading-[21px] text-[#0d0d0d]'>
        {t('market')}
      </p>
      <div className='mt-[24px] desktop:px-[16px]'>
        <div className='grid min-h-[476px] grid-cols-2 flex-wrap items-center gap-[16px]'>
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className='h-[230px] w-full rounded-[8px] bg-[#e1edf4] tablet:w-[163px]'
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TabMobileSkeleton;
