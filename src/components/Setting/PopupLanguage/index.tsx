import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';
import { getLocaleCookie, setLocaleCookie } from '@store/locale';

interface IProps {
  visible: boolean;
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
  const { t } = useTranslation('setting');
  const currentLang = getLocaleCookie() || 'en';
  const router = useRouter();
  const { visible, onToggle } = props;

  const onChangeLang = (lang: string) => {
    setLocaleCookie(lang);
    onToggle();
    router.push(router.asPath, router.asPath, { locale: lang });
  };

  const handleClose = () => {
    onToggle();
  };

  return (
    <>
      <Modal visible={visible} onClose={handleClose}>
        <div className='border-b-[1px] border-solid border-[--neutral-8] pb-4'>
          <Text type='body-24-bold'>{t('language')}</Text>
          <Text type='body-14-regular' color='primary-5'>
            {t('select_language')}
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
      </Modal>
    </>
  );
};
export default PopupLanguage;
