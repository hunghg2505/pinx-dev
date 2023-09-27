// import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { useUserRegisterInfo } from '@hooks/useUserRegisterInfo';
import { ROUTE_PATH } from '@utils/common';
import { investmentPreferenceTracking } from 'src/mixpanel/mixpanel';

import { useSelectTopic, useSuggestTopic } from './service';

interface ITopicCard {
  name: string;
  id: number;
}

const RegisterCompanyStep = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [selected, setSelected] = useState<ITopicCard[]>([]);
  const { userRegisterInfo } = useUserRegisterInfo();

  const listTopicSuggest = useSuggestTopic();

  const { onSelectTopic } = useSelectTopic({
    onSuccess: (_, params) => {
      router.push(ROUTE_PATH.HOME);
      investmentPreferenceTracking(
        userRegisterInfo.selectedStock || [],
        userRegisterInfo.selectedTheme || [],
        params[0]?.topicCodes.toString().split(','),
      );
    },
  });

  useEffect(() => {
    listTopicSuggest.getTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkIsSelected = (value: ITopicCard) => {
    const findItem = selected.find((item) => item === value);
    if (findItem) {
      return true;
    }
    return false;
  };

  const onSelect = (value: ITopicCard) => {
    if (checkIsSelected(value)) {
      const selectedDraft = selected.filter((item) => item !== value);
      setSelected(selectedDraft);
    } else {
      setSelected([...selected, value]);
    }
  };

  const handleContinue = () => {
    onSelectTopic(selected.toString());
  };

  return (
    <div className='flex align-middle desktop:container tablet:h-[100vh] desktop:h-[100vh]'>
      <div className='md:h-screen lg:py-0 mx-auto  flex flex-col items-center justify-center px-6 py-8'>
        <div className='topicCard md:mt-0 sm:max-w-md xl:p-0 w-full rounded-lg'>
          <div className='justify-center mobile:hidden mobile:w-0 tablet:mb-[27px] tablet:flex tablet:w-full desktop:mb-[27px] desktop:w-full'>
            <Image
              src='/static/logo/logo.png'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className={'h-[72px] w-[72px] object-contain'}
            />
          </div>
          <div className='flex flex-col items-center'>
            <Text type='body-28-bold' className='mt-6'>
              {t('register_topic_titile')}
            </Text>
            <div className='neutral-4 mt-[8px] flex flex-col items-center'>
              <Text type='body-16-regular'>{t('register_topic_sub_titile')}</Text>
            </div>
          </div>
          <div
            className={
              'mb-[81px] mt-9 flex w-full flex-wrap items-center justify-center gap-x-[20px] gap-y-[24px] mobile:mt-9 tablet:mt-[64px] desktop:mt-[64px]'
            }
          >
            {listTopicSuggest.topics?.data?.map((item: any) => (
              <div
                className='relative flex justify-center'
                key={item?.topicCode}
                onClick={() => onSelect(item?.topicCode)}
              >
                <div
                  className={classNames(
                    'flex cursor-pointer items-center justify-center rounded-[30px] border-[1px] bg-[rgba(234,244,251,1)] p-4 shadow-[4px_0_5px_0_rgba(195,216,227,0.5)]',
                    {
                      'border-solid border-[#1F6EAC]': checkIsSelected(item?.topicCode),
                      'border-solid border-[#FFFFFF]': !checkIsSelected(item?.topicCode),
                    },
                  )}
                >
                  <div className='absolute right-[4px] top-[-8px] flex h-[24px] w-[24px] flex-row items-center justify-center '>
                    {checkIsSelected(item?.topicCode) && (
                      <img
                        loading='lazy'
                        src='/static/icons/iconSelected.svg'
                        alt=''
                        width='24'
                        height='24'
                      />
                    )}
                  </div>
                  <Text
                    type={'body-16-bold'}
                    color={checkIsSelected(item?.topicCode) ? 'primary-2' : 'neutral-1'}
                  >
                    {item.topicName}
                  </Text>
                </div>
              </div>
            ))}
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
