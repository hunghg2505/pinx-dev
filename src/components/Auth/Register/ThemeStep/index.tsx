import React, { useState } from 'react';

import Image from 'next/image';

import Text from '@components/UI/Text';

import ThemeCard from './ThemeCard';

const mockData = [
  {
    name: 'test1',
    title: 'Renewable energy for a stable future',
    img: '',
    id: 1,
  },
  {
    name: 'test2',
    img: '',
    title: 'Renewable energy for a stable future 1',
    id: 2,
  },
  {
    name: 'test3',
    img: '',
    title: 'Renewable energy for a stable future 2',
    id: 3,
  },
  {
    name: 'test4',
    img: '',
    title: 'Renewable energy for a stable future 3',
    id: 4,
  },
  {
    name: 'test5',
    img: '',
    title: 'Renewable energy for a stable future 4',
    id: 5,
  },
  {
    name: 'test6',
    img: '',
    title: 'Renewable energy for a stable future 5',
    id: 6,
  },
];

const RegisterThemes = () => {
  const [selected, setSelected] = useState<any[]>([]);

  const checkIsSelected = (value: any) => {
    const findItem = selected.find((item) => item.id === value.id);
    if (findItem) {
      return true;
    }
    return false;
  };

  const onSelect = (value: any) => {
    if (checkIsSelected(value)) {
      const selectedDraft = selected.filter((item) => item.id !== value.id);
      setSelected(selectedDraft);
    } else {
      setSelected([...selected, value]);
    }
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
            {mockData.map((item: any) => {
              return (
                <div className='w-[48%]' key={item?.id} onClick={() => onSelect(item)}>
                  <ThemeCard isSelected={checkIsSelected(item)} title={item?.title} />
                </div>
              );
            })}
          </div>
          <button
            type='submit'
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
