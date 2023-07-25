import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

import {
  ResultSubscribedTheme,
  useGetSubscribedTheme,
  useSubscribeThemes,
  useSuggestThemes,
  useUnSubscribeTheme,
} from './service';
import ThemeCard from './ThemeCard';

const RegisterThemes = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [selected, setSelected] = useState<any[]>([]);
  const [subscribedTheme, setSubscribedTheme] = useState<string[]>([]);
  const listThemesSuggest = useSuggestThemes();

  const { onSubscribeThemes } = useSubscribeThemes({
    onSuccess: () => {
      router.push(ROUTE_PATH.REGISTER_TOPIC);
    },
  });

  useEffect(() => {
    requestGetSubscribedTheme.run();
  }, []);

  const requestUnSubscribeTheme = useUnSubscribeTheme();

  const requestGetSubscribedTheme = useGetSubscribedTheme({
    onSuccess: (res: ResultSubscribedTheme) => {
      const listTheme = res.data;
      if (listTheme) {
        const listThemeCode = listTheme.map((item) => item.code);
        setSelected(listThemeCode);
        setSubscribedTheme(listThemeCode);
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

  const handleContinue = () => {
    const paramsThemesSelected = selected.toString();
    onSubscribeThemes(paramsThemesSelected);

    const unSubscribeTheme = subscribedTheme.filter((item) => !selected.includes(item));
    if (unSubscribeTheme.length > 0) {
      requestUnSubscribeTheme.run(unSubscribeTheme.toString());
    }
  };

  return (
    <div className='desktop:container'>
      <div className='md:h-screen lg:py-0 mx-auto flex flex-col items-center justify-center px-[10px] tablet:pt-8 desktop:pt-8'>
        <div className='themeCard md:mt-0 sm:max-w-md xl:p-0 w-full rounded-lg bg-white'>
          <div className='justify-center mobile:hidden mobile:w-0 tablet:mb-[27px] tablet:flex tablet:w-full desktop:mb-[27px] desktop:w-full'>
            <img
              src='/static/icons/logo.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className={'h-[72px] w-[72px] object-contain'}
            />
          </div>
          <div className='max-sm:mt-6 flex flex-col items-center justify-center'>
            <div className='text-center mobile:w-[258px] tablet:w-full desktop:w-full'>
              <Text type='body-28-bold' className='mt-6'>
                {t('register_theme_titile')}
              </Text>
              <div className='neutral-4 mt-[8px] flex flex-col items-center text-[body-14-medium] tablet:w-full desktop:w-full'>
                <Text type='body-16-regular'>{t('register_theme_sub_titile')}</Text>
              </div>
            </div>
          </div>
          <div
            className={
              'mx-auto mb-[81px] flex w-full flex-wrap items-center justify-center gap-[12px] mobile:mt-9 tablet:mt-[64px] tablet:max-w-[905px] tablet:gap-[20px] desktop:mt-[64px] desktop:w-[905px] desktop:gap-[20px]'
            }
          >
            {listThemesSuggest.themes?.data?.map((item: any) => {
              return (
                <div
                  className='max-[375px]:w-[150px] w-[166px] cursor-pointer'
                  key={item?.code}
                  onClick={() => onSelect(item?.code)}
                >
                  <ThemeCard
                    isSelected={checkIsSelected(item?.code)}
                    title={item?.name}
                    image={item?.url}
                    totalSubscribe={item?.totalSubscribe}
                    latestUserLikeThis={item?.latestSubscribe}
                  />
                </div>
              );
            })}
          </div>
          <div className='fixed bottom-0 left-0 right-0 z-10 flex h-[81px] w-full justify-center bg-white px-[16px]'>
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

export default RegisterThemes;
