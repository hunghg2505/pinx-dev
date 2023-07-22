import React from 'react';

import { useTranslation } from 'next-i18next';

import { IThemeDetail, IUserTheme, useGetCommunity } from '@components/Themes/service';
import Text from '@components/UI/Text';

import ItemPeople from './ItemPeople';
import ModalCommunity from './ModalCommunity';

const IconArrow = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='17' height='16' viewBox='0 0 17 16' fill='none'>
    <path
      d='M6.40039 12L10.4004 8L6.40039 4'
      stroke='#0D0D0D'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
const Community = ({ payload }: { payload: IThemeDetail }) => {
  const { t } = useTranslation('theme');
  const [page, setPage] = React.useState(1);
  const [listCommunity, setListCommunity] = React.useState<any>([]);
  const { community, run } = useGetCommunity(payload?.code, {
    onSuccess: (res: any) => {
      setPage(res?.data?.number);
      setListCommunity([...listCommunity, ...res?.data?.content]);
    },
  });
  const totalPages = community?.totalPages || 2;
  React.useEffect(() => {
    run();
  }, [payload?.code]);

  React.useEffect(() => {
    window.addEventListener('scroll', loadMore);
    return () => {
      window.removeEventListener('scroll', loadMore);
    };
  }, [page]);
  const loadMore = () => {
    const heigtBottom = document?.scrollingElement?.scrollHeight || 0;
    const heightTop = window.innerHeight + document.documentElement?.scrollTop || 0;
    if (Math.floor(heightTop) === heigtBottom && page < totalPages) {
      run(page + 1);
    }
  };
  return (
    <div className='mt-[20px] mobile-max:mt-[40px]'>
      <Text type='body-20-semibold' color='cbblack' className='mb-[16px] desktop:hidden'>
        {t('tab.community')}
      </Text>
      <div className='mb-[16px] flex items-center'>
        <Text type='body-14-regular' color='cbblack'>
          {t('community_description')}
        </Text>
        <div className='ml-[12px] flex h-[34px] w-[76px] flex-row items-center justify-center rounded-[100px]  bg-[#F7F6F8] mobile:hidden desktop:flex'>
          <Text type='body-14-regular' color='neutral-black' className='mr-[4px]'>
            {community?.totalElements}
          </Text>
        </div>
      </div>
      <div className='flex items-center gap-x-[11px] desktop:hidden'>
        {listCommunity &&
          [...listCommunity]?.slice(0, 3)?.map((item: any, index: number) => {
            return (
              <div className='flex flex-col content-center items-center justify-center' key={index}>
                <img
                  src={item.avatar}
                  alt=''
                  width='0'
                  height='0'
                  className='h-[38px] w-[38px] justify-items-center rounded-full border-2 border-solid border-[#EAF4FB] object-cover'
                />
                <div className='mt-[-10px] flex h-[24px] w-[24px] content-center items-center justify-center rounded-full bg-[#FFFFFF] shadow'>
                  <img
                    src='/static/icons/heart-red.svg'
                    alt=''
                    width='0'
                    height='0'
                    className='h-[16px] w-[16px]'
                  />
                </div>
              </div>
            );
          })}
        <ModalCommunity code={payload?.code}>
          <div className='flex h-[34px] w-[87px] flex-row items-center justify-center rounded-[100px] bg-[#F7F6F8]'>
            <Text type='body-14-regular' color='neutral-black' className='mr-[4px]'>
              {community?.totalElements}
            </Text>
            <IconArrow />
          </div>
        </ModalCommunity>
      </div>
      <div className='grid-cols-2 gap-x-[24px] gap-y-[20px] mobile:hidden desktop:grid'>
        {listCommunity?.map((item: IUserTheme) => {
          return <ItemPeople key={item.customerId} data={item} />;
        })}
      </div>
    </div>
  );
};
export default Community;
