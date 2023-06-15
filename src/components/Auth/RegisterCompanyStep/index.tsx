// import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import classNames from 'classnames';
import Image from 'next/image'

import Text from '@components/UI/Text';

import styles from './index.module.scss';

const mockData = [
  {
    name: 'test1',
    img: '',
    id: 1
  },
  {
    name: 'test2',
    img: '',
    id: 2
  },
  {
    name: 'test3',
    img: '',
    id: 3
  },
  {
    name: 'test4',
    img: '',
    id: 4
  },
  {
    name: 'test5',
    img: '',
    id: 5
  },
  {
    name: 'test6',
    img: '',
    id: 6
  },
  {
    name: 'test7',
    img: '',
    id: 7
  },
  {
    name: 'test8',
    img: '',
    id: 8
  },
  {
    name: 'test9',
    img: '',
    id: 9
  },
  {
    name: 'test10',
    img: '',
    id: 10
  },
  {
    name: 'test11',
    img: '',
    id: 11

  },
  {
    name: 'test12',
    img: '',
    id: 12
  }
]

interface ICompanyCard {
  name: string;
  img: string;
  id: number;
}

const RegisterCompanyStep = () => {
  // const { t } = useTranslation('common');
  // const [form] = Form.useForm();
  const [selected, setSelected] = useState<ICompanyCard[]>([]);

  const checkIsSelected = (value: ICompanyCard) => {
    const findItem = selected.find(item => item.id === value.id);
    if (findItem) {
      return true;
    }
    return false;
  }

  const onSelect = (value: ICompanyCard) => {
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
        <div className='w-full bg-white rounded-lg companyCardmd:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='w-full flex'>
            <Image src='/static/icons/back_icon.svg' alt='' width='0' height='0' className={'w-[20px] h-[20px]'} />
          </div>
          <div className='flex flex-col items-center max-sm:mt-6'>
            <Text type='body-24-bold' className='mt-6'>What are you up to?</Text>
            <div className='flex flex-col items-center mt-6 text-[body-14-medium] neutral-4'>
              <Text>Choose companies you would like to get </Text>
              <Text>updates from</Text>
            </div>
          </div>
          <div className={'flex w-full flex-wrap items-center justify-center gap-y-[16px] mt-9'}>
            {
              mockData.map((item: any, index: number) => (
                <div
                  className={classNames('flex justify-center', styles.companyCard)}
                  key={index}
                  onClick={() => onSelect(item)}
                >
                  <div
                    className={classNames('flex justify-center items-center rounded-full px-2 py-[6px] bg-[--neutral-8]', {
                      [styles.selected]: checkIsSelected(item)
                    })}
                  >
                    <Image src='/static/icons/pinex_logo.svg' alt='' width='0' height='0' className={'w-[36px] h-[36px] rounded-full mr-[6px]'} />
                    <Text>{item.name}</Text>
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
