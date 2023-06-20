// import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import classNames from 'classnames';
import Image from 'next/image'

import Text from '@components/UI/Text';

// import styles from './index.module.scss';

const mockData = [
  {
    name: 'Stock trading',
    id: 1
  },
  {
    name: 'Bonds',
    id: 2
  },
  {
    name: 'Derivatives',
    id: 3
  },
  {
    name: 'Business news',
    id: 4
  },
  {
    name: 'Real estate',
    id: 5
  },
  {
    name: 'Homes',
    id: 6
  },
  {
    name: 'Commodities',
    id: 7
  },
  {
    name: 'Technology',
    id: 8
  },
  {
    name: 'Consumption',
    id: 9
  },
  {
    name: 'Entertainment',
    id: 10
  },
  {
    name: 'World economy',
    id: 11

  },
  {
    name: 'Travel',
    id: 12
  },
  {
    name: 'Vehicles',
    id: 13

  },
  {
    name: 'Financial Invest ',
    id: 14
  }
]

interface ITopicCard {
  name: string;
  id: number;
}

const RegisterCompanyStep = () => {
  const [selected, setSelected] = useState<ITopicCard[]>([]);

  const checkIsSelected = (value: ITopicCard) => {
    const findItem = selected.find(item => item.id === value.id);
    if (findItem) {
      return true;
    }
    return false;
  }

  const onSelect = (value: ITopicCard) => {
    if (!checkIsSelected(value)) {
      setSelected([...selected, value])
    } else {
      const selectedDraft = selected.filter(item => item.id !== value.id);
      setSelected(selectedDraft);
    }
  }

  return (
    <>
      <div className='flex flex-col items-center  justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg companyCardmd:mt-0 sm:max-w-md xl:p-0'>
          <div className='w-full flex'>
            <Image src='/static/icons/back_icon.svg' alt='' width='0' height='0' className={'w-[20px] h-[20px]'} />
          </div>
          <div className='flex flex-col items-center max-sm:mt-6'>
            <Text type='body-24-bold' className='mt-6'>Your favourite topics</Text>
            <div className='flex flex-col items-center text-[body-14-medium] neutral-4'>
              <Text>Select what you would like to get updates </Text>
            </div>
          </div>
          <div className={'flex w-full flex-wrap items-center justify-center gap-x-[8px] gap-y-[16px] mt-9'}>
            {
              mockData.map((item: any, index: number) => (
                <div
                  className='flex justify-center'
                  key={index}
                  onClick={() => onSelect(item)}
                >
                  <div
                    className={classNames('flex justify-center items-center rounded-xl p-4 border-solid border-2 border-[--neutral-6]', {
                      'bg-[--primary-2]': checkIsSelected(item)
                    })}
                  >
                    {
                      checkIsSelected(item) && <Image src='/static/icons/check_mark.svg' alt='' width='0' height='0' className={'w-[15px] h-[9px] rounded-full mr-[9px]'} />
                    }
                    <Text type='body-14-bold' color={checkIsSelected(item) ? 'cbwhite' : 'cbblack'}>{item.name}</Text>
                  </div>
                </div>
              ))
            }
          </div>

          <button type='submit' className='w-full text-white font-[700] text-[17px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] rounded-[10px] py-[14px] text-center !mt-10'>Continue</button>
        </div >
      </div >
    </>
  );
}

export default RegisterCompanyStep;
