import { useTranslation } from 'next-i18next';
import Slider from 'react-slick';

import Text from '@components/UI/Text';
import { APP_STORE_DOWNLOAD, GOOGLE_PLAY_DOWNLOAD } from 'src/constant';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  // slidesToScroll: 1,
  // swipeToSlide: true,
  // autoplay: true,
  // autoplaySpeed: 1000,
};
const handleRedirect = (url: string) => {
  window.open(url, '_blank');
};
const GiftCash = () => {
  const { t } = useTranslation('giftCash');
  return (
    <div className='overflow-x-hidden rounded-[8px] bg-[#FFF] px-[24px] py-[20px] laptop-max:px-[10px]'>
      <div className='relative'>
        <Text type='body-28-bold' color='neutral-1' className='hidden desktop:block'>
          {t('giftcash.title')}
        </Text>
      </div>
      <div className='my-[20px] hidden h-[2px] w-full bg-[#EEF5F9] desktop:block'></div>
      <div className=' flex flex-col items-center rounded-[24px] bg-[#D8EBFC] px-[58px] py-[32px] mobile-max:px-[16px]'>
        <img src='/static/icons/giftcash/gift.svg' alt='' className=' h-[130px] w-[130px]' />
        <Text
          type='body-22-bold'
          color='cbblack'
          className='w-[448px] text-center mobile-max:w-full'
        >
          {t('giftcash.desc')}
        </Text>
        <div className='mt-[24px] flex w-full items-center justify-between mobile-max:flex-col'>
          <div className='list w-[324px] mobile-max:w-full'>
            <div className='item mb-[24px] flex'>
              <img
                src='/static/icons/giftcash/iconGift.svg'
                alt=''
                className='mr-[2px] h-[30px] w-[30px]'
              />
              <Text type='body-14-regular' color='cbblack' className='mt-[3px]'>
                {t('giftcash.text.welcome')}
              </Text>
            </div>
            <div className='item mb-[24px] flex'>
              <img
                src='/static/icons/giftcash/iconGift.svg'
                alt=''
                className='mr-[2px] h-[30px] w-[30px]'
              />
              <Text type='body-14-regular' color='cbblack' className='mt-[3px]'>
                {t('giftcash.text.refer.friend')}
              </Text>
            </div>
            <div className='item flex'>
              <img
                src='/static/icons/giftcash/iconGift.svg'
                alt=''
                className='mr-[2px] h-[30px] w-[30px]'
              />
              <Text type='body-14-regular' color='cbblack' className='mt-[3px]'>
                {t('giftcash.text.only.complete')}
              </Text>
            </div>
          </div>
          <div className='flex w-[158px] flex-col justify-center  gap-y-[24px] mobile-max:hidden'>
            <img
              src='/static/images/googleplay.png'
              alt='Download google play'
              width={180}
              height={52}
              className='h-[52px] w-[180px] cursor-pointer object-contain'
              onClick={() => handleRedirect(GOOGLE_PLAY_DOWNLOAD)}
            />

            <img
              src='/static/images/appstore.png'
              alt='Download app store'
              width={180}
              height={52}
              className='h-[52px] w-[180px] cursor-pointer object-contain'
              onClick={() => handleRedirect(APP_STORE_DOWNLOAD)}
            />
          </div>
          <div className='mt-[40px] hidden w-[158px] mobile-max:block'>
            <div className='mt-[16px] flex h-[45px] w-[158px] items-center justify-center rounded-[22px] bg-[linear-gradient(238deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)]'>
              <a href='https://onelink.to/cgarrk' target='_blank' rel='noreferrer'>
                <Text type='body-14-bold' color='cbwhite'>
                  {t('giftcash.text.download')}
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
          <img
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
        </div>
        <div className='w-2/4 px-[24px] text-center'>
          <Text type='body-22-bold' color='neutral-black' className=''>
            {t('giftcash.text.not.cash')}
          </Text>
          <img
            src='/static/icons/giftcash/img2.png'
            alt=''
            className='mx-auto mt-[24px] w-[100px]'
          />
          <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
            {t('giftcash.text.giftcash.pinetree')}
          </Text>
        </div>
        <div className='w-2/4 px-[24px] text-center'>
          <Text type='body-22-bold' color='neutral-black'>
            {t('giftcash.text.balance')}
          </Text>
          <img
            src='/static/icons/giftcash/img3.png'
            alt=''
            className='mx-auto mt-[24px] w-[100px]'
          />
          <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
            {t('giftcash.text.once.fulfill')}
          </Text>
        </div>

        <div className='w-2/4 px-[24px] text-center'>
          <Text type='body-22-bold' color='neutral-black'>
            {t('giftcash.text.invest')}
          </Text>
          <img
            src='/static/icons/giftcash/img4.png'
            alt=''
            className='mx-auto mt-[24px] w-[100px]'
          />
          <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
            {t('giftcash.text.list.eligible')}
          </Text>
        </div>
      </div>
      <div className='mt-[20px] hidden max-w-[700px] rounded-[12px] bg-[#F7F6F8] px-[25px] py-[32px]  mobile-max:block '>
        <Slider {...settings}>
          <div className='text-center'>
            <Text type='body-20-bold' color='neutral-black'>
              {t('giftcash.text.only.vsd')}
            </Text>
            <img
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
          </div>
          <div className='text-center'>
            <Text type='body-20-bold' color='neutral-black' className=''>
              {t('giftcash.text.not.cash')}
            </Text>
            <img
              src='/static/icons/giftcash/img2.png'
              alt=''
              className='mx-auto mt-[24px] w-[100px]'
            />
            <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
              {t('giftcash.text.giftcash.pinetree')}
            </Text>
          </div>
          <div className='text-center'>
            <Text type='body-20-bold' color='neutral-black'>
              {t('giftcash.text.balance')}
            </Text>
            <img
              src='/static/icons/giftcash/img3.png'
              alt=''
              className='mx-auto mt-[24px] w-[100px]'
            />
            <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
              {t('giftcash.text.once.fulfill')}
            </Text>
          </div>
          <div className='text-center'>
            <Text type='body-20-bold' color='neutral-black'>
              {t('giftcash.text.invest')}
            </Text>
            <img
              src='/static/icons/giftcash/img4.png'
              alt=''
              className='mx-auto mt-[24px] w-[100px]'
            />
            <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
              {t('giftcash.text.list.eligible')}
            </Text>
          </div>
        </Slider>
        <div className='mx-auto mt-[36px] w-[158px]'>
          <div className='mt-[16px] flex h-[45px] w-[158px] items-center justify-center rounded-[22px] bg-[linear-gradient(238deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)]'>
            <a href='https://onelink.to/cgarrk' target='_blank' rel='noreferrer'>
              <Text type='body-14-bold' color='cbwhite'>
                {t('giftcash.text.download')}
              </Text>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCash;
