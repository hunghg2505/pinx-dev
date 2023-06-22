import React, { useState } from 'react';

import Image from 'next/image';

import Text from '@components/UI/Text';

import ThemeCard from './ThemeCard';
import { useSubscribeThemes, useSuggestThemes } from './service';
import { Toaster, toast } from 'react-hot-toast';
import Notification from '@components/UI/Notification';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@utils/common';

const RegisterThemes = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<any[]>([]);
  const listThemesSuggest = useSuggestThemes();

  const { onSubscribeThemes } = useSubscribeThemes({
    onSuccess: () => {
      toast(() => <Notification type='success' message='Subscribe successfully!' />);
      router.push(ROUTE_PATH.REGISTER_TOPIC);
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
          <div className='flex flex-col items-center justify-center max-sm:mt-6'>
            <div className='w-[227px]'>
              <Text type='body-24-bold' className='mt-6'>
                See the economic in innovative way
              </Text>
              <div className='neutral-4 mt-6 flex flex-col items-center text-[body-14-medium]'>
                <Text type='body-14-medium'>
                  Choose your favourite Themes crafted for your desired interests
                </Text>
              </div>
            </div>
          </div>
          <div className={'mt-9 flex w-full flex-wrap items-center justify-center gap-[12px]'}>
            {listThemesSuggest.themes?.data?.map((item: any) => {
              return (
                <div className='w-[48%]' key={item?.code} onClick={() => onSelect(item?.code)}>
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

export default RegisterThemes;
