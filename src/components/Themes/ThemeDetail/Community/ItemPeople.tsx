import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { IUserTheme } from '@components/Themes/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import CustomImage from '@components/UI/CustomImage';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { isUrlValid } from '@utils/common';
import { PROFILE_V2 } from 'src/constant/route';

const IconArrow = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none'>
    <path
      d='M9.5 18L15.5 12L9.5 6'
      stroke='#394251'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ItemPeople = ({ data, isModal }: { data: IUserTheme; isModal?: boolean }) => {
  const { t } = useTranslation('common');
  const urlProfile = PROFILE_V2(data?.displayName, data?.customerId);
  return (
    <CustomLink href={urlProfile}>
      <div className='flex flex-row items-center justify-between rounded-[16px] border-[1px] border-solid border-[#E6E6E6] px-[12px] py-[16px]'>
        <div className='flex items-center'>
          {isUrlValid(data?.avatar) ? (
            <CustomImage
              width='0'
              height='0'
              sizes='100vw'
              loading='lazy'
              src={data?.avatar}
              alt=''
              className='mr-[8px] h-[36px] w-[36px] rounded-full border border-solid border-[#ebebeb] object-cover'
            />
          ) : (
            <div className='mr-[8px] h-[36px] w-[36px] rounded-full object-cover'>
              <AvatarDefault nameClassName='text-[16px]' name={data?.displayName} />
            </div>
          )}
          <div>
            <Text
              type='body-14-semibold'
              className={classNames(
                'max-w-[100px] truncate galaxy-max:max-w-[140px] laptop:max-w-[180px]',
                {
                  'max-w-[200px] galaxy-max:!max-w-[120px]': isModal,
                },
              )}
              color='neutral-darkgray'
            >
              {data?.displayName}
            </Text>
            <Text type='body-12-regular' color='neutral-5'>
              {t('follower')}
            </Text>
          </div>
        </div>
        <IconArrow />
      </div>
    </CustomLink>
  );
};
export default ItemPeople;
