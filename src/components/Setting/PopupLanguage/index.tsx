import React from 'react';

import classNames from 'classnames';
import { i18n } from 'next-i18next';
import Dialog from 'rc-dialog';

import 'rc-dialog/assets/index.css';
import Text from '@components/UI/Text';
import { getLocaleCookie, setLocaleCookie } from '@store/locale/locale';

interface IProps {
  visible: boolean;
  closeIcon?: React.ReactNode;
  onToggle: () => void;
}

const LANGUAGES = [
  {
    title: 'Tiếng Việt',
    value: 'vi',
  },
  {
    title: 'English',
    value: 'en',
  },
];

const PopupLanguage = (props: IProps) => {
  const currentLang = getLocaleCookie() || 'en';

  const { visible, onToggle } = props;

  const onChangeLang = (lang: string) => {
    if (lang !== currentLang) {
      lang && setLocaleCookie(lang);
      i18n?.changeLanguage(lang);
      onToggle();
    }
  };

  const renderCloseIcon = (): React.ReactNode => {
    return (
      <img
        src='/static/icons/iconClose.svg'
        alt=''
        width='0'
        height='0'
        sizes='100vw'
        className='h-[21px] w-[21px]'
      />
    );
  };

  const handleClose = () => {
    onToggle();
  };

  return (
    <>
      <Dialog visible={visible} onClose={handleClose} closeIcon={renderCloseIcon()}>
        <div className='border-b-[1px] border-solid border-[--neutral-8] pb-4'>
          <Text type='body-24-bold'>Language</Text>
          <Text type='body-14-regular' color='primary-5'>
            Select languague
          </Text>
        </div>

        <div className='list mt-4'>
          {LANGUAGES.map((item: any, index: number) => {
            const isChecked: boolean = item.value === currentLang;
            return (
              <div
                className={classNames(
                  'mb-[12px] flex cursor-pointer items-center justify-between rounded-[8px] bg-[#F3F2F6] px-[16px] py-[12px]',
                  { '!bg-[#589DC0]': isChecked },
                )}
                key={index}
                onClick={() => onChangeLang(item.value)}
              >
                <div>
                  <Text
                    type='body-14-semibold'
                    color='neutral-1'
                    className={classNames('normal-case', {
                      '!text-[#ffffff]': isChecked,
                    })}
                  >
                    {item.title}
                  </Text>
                </div>
                {isChecked && (
                  <img
                    src='/static/icons/iconCheckedFilter.svg'
                    alt=''
                    width='0'
                    height='0'
                    className='w-[21px]'
                  />
                )}
              </div>
            );
          })}
        </div>
      </Dialog>
    </>
  );
};
export default PopupLanguage;
