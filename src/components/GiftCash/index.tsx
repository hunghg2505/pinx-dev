import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { DEEP_LINK } from 'src/constant';
import { downloadPineXAppTracking } from 'src/mixpanel/mixpanel';

import styles from './index.module.scss';

// const settings = {
//   dots: true,
//   infinite: false,
//   speed: 500,
//   slidesToShow: 1,
//   // slidesToScroll: 1,
//   // swipeToSlide: true,
//   // autoplay: true,
//   // autoplaySpeed: 1000,
// };
const handleRedirect = (url: string) => {
  downloadPineXAppTracking('CTA in App', 'GiftCash');
  window.open(url, '_blank');
};
const GiftCash = () => {
  const { t } = useTranslation('giftCash');
  return (
    <div className='desktop:px-[0] desktop:py-[0]'>
      <div className='box-shadow card-style'>
        <div className='relative'>
          <Text
            type='body-24-semibold'
            color='neutral-1'
            className='mb-[24px] tablet:mb-0 tablet:!text-[28px] tablet:!font-bold'
          >
            {t('giftcash.title')}
          </Text>
        </div>
        <div className='flex flex-col items-center rounded-[12px] bg-[#D8EBFC] px-[58px] py-[32px] mobile-max:px-[16px] tablet:mt-[20px] tablet:rounded-[24px]'>
          <img
            loading='lazy'
            src='/static/icons/giftcash/gift.svg'
            alt=''
            className=' h-[130px] w-[130px]'
          />
          <Text
            type='body-22-bold'
            color='cbblack'
            className='text-center galaxy-max:text-[20px] mobile-max:w-full'
          >
            {t('giftcash.desc')}
          </Text>
          <div className='mt-[24px] flex w-full items-center justify-between mobile-max:flex-col'>
            <div className='list w-[324px] mobile-max:w-full'>
              <div className='item mb-[24px] flex items-center'>
                <img
                  src='/static/icons/giftcash/iconGift.svg'
                  alt=''
                  className='mr-[2px] h-[30px] w-[30px]'
                />
                <Text type='body-14-regular' color='cbblack'>
                  {t('giftcash.text.welcome')}
                </Text>
              </div>
              <div className='item mb-[24px] flex items-center'>
                <img
                  src='/static/icons/giftcash/iconGift.svg'
                  alt=''
                  className='mr-[2px] h-[30px] w-[30px]'
                />
                <Text type='body-14-regular' color='cbblack'>
                  {t('giftcash.text.refer.friend')}
                </Text>
              </div>
              <div className='item flex items-center'>
                <img
                  src='/static/icons/giftcash/iconGift.svg'
                  alt=''
                  className='mr-[2px] h-[30px] w-[30px]'
                />
                <Text type='body-14-regular' color='cbblack'>
                  {t('giftcash.text.only.complete')}
                </Text>
              </div>
            </div>
            <div className='flex w-[158px] flex-col justify-center  gap-y-[24px] mobile-max:hidden'>
              <Image
                src='/static/images/google-play.png'
                alt='Download google play'
                width={180}
                height={52}
                sizes='100vw'
                className='h-[52px] w-[180px] cursor-pointer object-contain'
                onClick={() => handleRedirect(DEEP_LINK.GIFT_CASH)}
              />

              <Image
                sizes='100vw'
                src='/static/images/app-store.png'
                alt='Download app store'
                width={180}
                height={52}
                className='h-[52px] w-[180px] cursor-pointer object-contain'
                onClick={() => handleRedirect(DEEP_LINK.GIFT_CASH)}
              />
            </div>
            <div className='mt-[40px] hidden w-[158px] mobile-max:block'>
              <div className='mt-[16px] flex h-[45px] w-[158px] items-center justify-center rounded-[22px] bg-[linear-gradient(238deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)]'>
                <a
                  href={DEEP_LINK.GIFT_CASH}
                  target='_blank'
                  rel='noreferrer'
                  onClick={() => downloadPineXAppTracking('CTA in App', 'GiftCash')}
                >
                  <Text type='body-14-bold' color='cbwhite'>
                    {t('open_app')}
                  </Text>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[20px] flex flex-wrap gap-y-[73px] mobile-max:hidden'>
          <div className='w-2/4 px-[24px] text-center'>
            <Text type='body-22-bold' color='neutral-black'>
              {t('giftcash.text.only.vsd')}
            </Text>
            <Image
              width='0'
              height='0'
              sizes='100vw'
              src='/static/icons/giftcash/img1.png'
              alt=''
              className='mx-auto mt-[24px] h-[120px] w-[144px] object-contain'
            />
            <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
              {t('giftcash.text.to.get.giftcash')}
            </Text>
            <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
              {t('giftcash.text.welcome.gift')}
            </Text>
          </div>
          <div className='w-2/4 px-[24px] text-center'>
            <Text type='body-22-bold' color='neutral-black' className=''>
              {t('giftcash.text.not.cash')}
            </Text>
            <Image
              width='0'
              height='0'
              sizes='100vw'
              src='/static/icons/giftcash/img2.png'
              alt=''
              className='mx-auto mt-[24px] h-[120px] w-[144px] object-contain'
            />
            <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
              {t('giftcash.text.giftcash.pinetree')}
            </Text>
          </div>
          <div className='w-2/4 px-[24px] text-center'>
            <Text type='body-22-bold' color='neutral-black'>
              {t('giftcash.text.balance')}
            </Text>
            <Image
              width='0'
              height='0'
              sizes='100vw'
              src='/static/icons/giftcash/img3.png'
              alt=''
              className='mx-auto mt-[24px] h-[120px] w-[144px] object-contain'
            />
            <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
              {t('giftcash.text.once.fulfill')}
            </Text>
          </div>

          <div className='w-2/4 px-[24px] text-center'>
            <Text type='body-22-bold' color='neutral-black'>
              {t('giftcash.text.invest')}
            </Text>
            <Image
              width='0'
              height='0'
              sizes='100vw'
              src='/static/icons/giftcash/img4.png'
              alt=''
              className='mx-auto mt-[24px] h-[120px] w-[144px] object-contain'
            />
            <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
              {t('giftcash.text.list.eligible')}
            </Text>
          </div>
        </div>
        <div className='mt-[20px] hidden max-w-[700px] rounded-[12px] bg-[#F7F6F8] px-[25px] py-[32px]  mobile-max:block '>
          <Splide
            options={{
              perPage: 1,
              pagination: true,
              arrows: false,
              gap: 10,
            }}
            className={styles.slider}
          >
            <SplideSlide className='text-center'>
              <Text type='body-20-bold' color='neutral-black'>
                {t('giftcash.text.only.vsd')}
              </Text>
              <Image
                width='0'
                height='0'
                sizes='100vw'
                src='/static/icons/giftcash/img1.png'
                alt=''
                className='mx-auto mt-[24px] w-[100px]'
              />
              <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
                {t('giftcash.text.to.get.giftcash')}
              </Text>
              <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
                {t('giftcash.text.welcome.gift')}
              </Text>
            </SplideSlide>
            <SplideSlide className='text-center'>
              <Text type='body-20-bold' color='neutral-black' className=''>
                {t('giftcash.text.not.cash')}
              </Text>
              <Image
                width='0'
                height='0'
                sizes='100vw'
                src='/static/icons/giftcash/img2.png'
                alt=''
                className='mx-auto mt-[24px] w-[100px]'
              />
              <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
                {t('giftcash.text.giftcash.pinetree')}
              </Text>
            </SplideSlide>
            <SplideSlide className='text-center'>
              <Text type='body-20-bold' color='neutral-black'>
                {t('giftcash.text.balance')}
              </Text>
              <Image
                width='0'
                height='0'
                sizes='100vw'
                src='/static/icons/giftcash/img3.png'
                alt=''
                className='mx-auto mt-[24px] w-[100px]'
              />
              <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
                {t('giftcash.text.once.fulfill')}
              </Text>
            </SplideSlide>
            <SplideSlide className='text-center'>
              <Text type='body-20-bold' color='neutral-black'>
                {t('giftcash.text.invest')}
              </Text>
              <Image
                width='0'
                height='0'
                sizes='100vw'
                src='/static/icons/giftcash/img4.png'
                alt=''
                className='mx-auto mt-[24px] w-[100px]'
              />
              <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
                {t('giftcash.text.list.eligible')}
              </Text>
            </SplideSlide>
          </Splide>
          <div className='mx-auto mt-[36px] w-[158px]'>
            <div className='mt-[16px] flex h-[45px] w-[158px] items-center justify-center rounded-[22px] bg-[linear-gradient(238deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)]'>
              <a
                href={DEEP_LINK.GIFT_CASH}
                target='_blank'
                rel='noreferrer'
                onClick={() => downloadPineXAppTracking('CTA in App', 'GiftCash')}
              >
                <Text type='body-14-bold' color='cbwhite'>
                  {t('open_app')}
                </Text>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCash;
