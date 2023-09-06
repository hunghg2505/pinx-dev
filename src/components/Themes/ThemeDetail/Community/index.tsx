import React from 'react';

import { useRequest } from 'ahooks';
import { useTranslation } from 'next-i18next';

import { IThemeDetail, IUserTheme, getCommunity } from '@components/Themes/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import Text from '@components/UI/Text';
import useObserver from '@hooks/useObserver';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { formatStringToNumber, isUrlValid, replaceImageError } from '@utils/common';

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
interface IProps {
  payload: IThemeDetail;
}
const Community = React.forwardRef((props: IProps, ref: any) => {
  const { payload } = props;
  const { t } = useTranslation('theme');
  const themeCode = payload?.code;
  const { userLoginInfo } = useUserLoginInfo();
  const { data, loading, mutate, runAsync } = useRequest(async (page: any, code: string) => {
    if (page === false) {
      return;
    }
    return getCommunity(page, code);
  });

  React.useImperativeHandle(ref, () => {
    return {
      removeItem,
      addItem,
    };
  });
  React.useEffect(() => {
    runAsync(1, themeCode);
  }, [themeCode]);
  const service = async () => {
    if (!data?.page || loading) {
      return;
    }
    const newData: any = await runAsync(data?.page, themeCode);
    if (newData?.list?.length) {
      mutate({
        list: [...data?.list, ...newData?.list],
        page: newData?.page ? newData?.page + 1 : false,
        totalElements: newData?.totalElements,
      });
    }
  };
  const addItem = () => {
    const newData = {
      customerId: userLoginInfo?.id,
      name: userLoginInfo?.name,
      displayName: userLoginInfo?.displayName,
      phoneNumber: userLoginInfo?.phone,
      avatar: userLoginInfo?.avatar,
      email: userLoginInfo?.email,
      isKol: userLoginInfo?.isKol,
      isFeatureProfile: userLoginInfo?.isFeatureProfile,
    };

    const isExists =
      data?.list &&
      data.list.length > 0 &&
      data?.list?.some((item: any) => item?.customerId === newData.customerId);

    if (!isExists) {
      mutate({
        list: [newData, ...data?.list],
        page: data.page,
        totalElements: data?.totalElements + 1,
      });
    }
  };
  const removeItem = () => {
    const isExists = [...data?.list]?.some((item) => item.customerId === userLoginInfo?.id);
    const newData = [...data?.list]?.filter((item) => item.customerId !== userLoginInfo?.id);

    if (isExists) {
      mutate({
        list: newData,
        page: data.page,
        totalElements: data?.totalElements - 1,
      });
    }
  };
  const { refLastElement } = useObserver();
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
            {formatStringToNumber(data?.totalElements) || 0}
          </Text>
        </div>
      </div>
      <div className='flex items-center gap-x-[11px] desktop:hidden'>
        {data?.list &&
          [...data?.list]?.slice(0, 3)?.map((item: any, index: number) => {
            return (
              <div className='flex flex-col content-center items-center justify-center' key={index}>
                {isUrlValid(item.avatar) ? (
                  <img
                    src={item.avatar}
                    alt=''
                    width='0'
                    height='0'
                    onError={replaceImageError}
                    className='h-[38px] w-[38px] justify-items-center rounded-full border-2 border-solid border-[#EAF4FB] object-cover'
                  />
                ) : (
                  <div className='h-[38px] w-[38px] justify-items-center rounded-full border-2 border-solid border-[#EAF4FB] object-cover'>
                    <AvatarDefault nameClassName='text-[16px]' name={item?.displayName} />
                  </div>
                )}
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
              {formatStringToNumber(data?.totalElements) || 0}
            </Text>
            <IconArrow />
          </div>
        </ModalCommunity>
      </div>
      <div className='grid-cols-2 gap-x-[24px] gap-y-[20px] mobile:hidden desktop:grid'>
        {data?.list &&
          [...data?.list]?.map((item: IUserTheme, idx: number) => {
            if (idx + 1 === data?.list?.length) {
              return (
                <div
                  ref={(node) => refLastElement(node, service)}
                  key={`community-${item?.customerId}`}
                >
                  <ItemPeople key={item.customerId} data={item} />
                </div>
              );
            }

            return (
              <div key={`community-${item?.customerId}`}>
                <ItemPeople key={item.customerId} data={item} />
              </div>
            );
          })}
      </div>
    </div>
  );
});
export default React.memo(Community);
