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
  return (
    <div className='overflow-x-hidden rounded-[8px] bg-[#FFF] px-[24px] py-[20px] tablet-max:px-[0]'>
      <div className='relative'>
        <Text type='body-28-bold' color='neutral-1' className='hidden desktop:block'>
          GiftCash
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
          Giftcash, a motivation kick-starter for your investment
        </Text>
        <div className='mt-[24px] flex w-full items-center justify-between mobile-max:flex-col'>
          <div className='list w-[324px] mobile-max:w-full'>
            <div className='item mb-[24px] flex'>
              <img
                src='/static/icons/giftcash/iconGift.svg'
                alt=''
                className='mr-[2px] h-[30px] w-[30px]'
              />
              <Text type='body-14-regular' color='cbblack'>
                Welcome Gift for new customer only. Refer friend gift is for everyone
              </Text>
            </div>
            <div className='item mb-[24px] flex'>
              <img
                src='/static/icons/giftcash/iconGift.svg'
                alt=''
                className='mr-[2px] h-[30px] w-[30px]'
              />
              <Text type='body-14-regular' color='cbblack'>
                Refer friend and when they completed VSD account registration both will get reward
              </Text>
            </div>
            <div className='item flex'>
              <img
                src='/static/icons/giftcash/iconGift.svg'
                alt=''
                className='mr-[2px] h-[30px] w-[30px]'
              />
              <Text type='body-14-regular' color='cbblack'>
                Only completed VSD count to be rewarded
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
              <a href='https://onelink.to/cgarrk' target="_blank" rel="noreferrer">
                <Text type='body-14-bold' color='cbwhite'>
                  Download PineX
                </Text>
              </a>

            </div>
          </div>
        </div>
      </div>
      <div className='mt-[20px] flex flex-wrap gap-y-[73px] mobile-max:hidden'>
        <div className='w-2/4 px-[24px] text-center'>
          <Text type='body-22-bold' color='neutral-black'>
            Only VSD account count
          </Text>
          <img
            src='/static/icons/giftcash/img1.png'
            alt=''
            className='mx-auto mt-[24px] w-[100px]'
          />
          <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
            To get a GiftCash, you need to upgrade to VSD account (verified by Stock Exchange) level
            first
          </Text>
          <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
            *Welcome gift only for new customers who haven’t had trading account at Pinetree
          </Text>
        </div>
        <div className='w-2/4 px-[24px] text-center'>
          <Text type='body-22-bold' color='neutral-black' className=''>
            GiftCash is not for cash
          </Text>
          <img
            src='/static/icons/giftcash/img2.png'
            alt=''
            className='mx-auto mt-[24px] w-[100px]'
          />
          <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
            Giftcash is Pinetree’s motivation gift for you to invest to stock only. Let’s make some
            order and enjoy
          </Text>
        </div>
        <div className='w-2/4 px-[24px] text-center'>
          <Text type='body-22-bold' color='neutral-black'>
            GiftCash balance arrive after 1 business day
          </Text>
          <img
            src='/static/icons/giftcash/img3.png'
            alt=''
            className='mx-auto mt-[24px] w-[100px]'
          />
          <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
            Once you fulfill all condition, your reward will arrive your balance the next buniness
            day. Stay tune and you can earn more by inviting friends
          </Text>
        </div>

        <div className='w-2/4 px-[24px] text-center'>
          <Text type='body-22-bold' color='neutral-black'>
            Invest with GiftCash is special experience
          </Text>
          <img
            src='/static/icons/giftcash/img4.png'
            alt=''
            className='mx-auto mt-[24px] w-[100px]'
          />
          <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
            There are a list a eligible stock codes for you to invest. They are hand-picked,
            limited. GiftCash allows you to buy stock in ATO, MP, ATC order types only to ensure the
            liquidity
          </Text>
        </div>
      </div>
      <div className='mt-[20px] hidden rounded-[12px] bg-[#F7F6F8] px-[25px] py-[32px] mobile-max:block'>
        <Slider {...settings}>
          <div className='text-center'>
            <Text type='body-20-bold' color='neutral-black'>
              Only VSD account count
            </Text>
            <img
              src='/static/icons/giftcash/img1.png'
              alt=''
              className='mx-auto mt-[24px] w-[100px]'
            />
            <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
              To get a GiftCash, you need to upgrade to VSD account (verified by Stock Exchange)
              level first
            </Text>
            <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
              *Welcome gift only for new customers who haven’t had trading account at Pinetree
            </Text>
          </div>
          <div className='text-center'>
            <Text type='body-20-bold' color='neutral-black' className=''>
              GiftCash is not for cash
            </Text>
            <img
              src='/static/icons/giftcash/img2.png'
              alt=''
              className='mx-auto mt-[24px] w-[100px]'
            />
            <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
              Giftcash is Pinetree’s motivation gift for you to invest to stock only. Let’s make
              some order and enjoy
            </Text>
          </div>
          <div className='text-center'>
            <Text type='body-20-bold' color='neutral-black'>
              GiftCash balance arrive after 1 business day
            </Text>
            <img
              src='/static/icons/giftcash/img3.png'
              alt=''
              className='mx-auto mt-[24px] w-[100px]'
            />
            <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
              Once you fulfill all condition, your reward will arrive your balance the next buniness
              day. Stay tune and you can earn more by inviting friends
            </Text>
          </div>
          <div className='text-center'>
            <Text type='body-20-bold' color='neutral-black'>
              Invest with GiftCash is special experience
            </Text>
            <img
              src='/static/icons/giftcash/img4.png'
              alt=''
              className='mx-auto mt-[24px] w-[100px]'
            />
            <Text type='body-14-regular' color='neutral-darkgray' className='mt-[24px]'>
              There are a list a eligible stock codes for you to invest. They are hand-picked,
              limited. GiftCash allows you to buy stock in ATO, MP, ATC order types only to ensure
              the liquidity
            </Text>
          </div>
        </Slider>
        <div className='mx-auto mt-[36px] w-[158px]'>
          <div className='mt-[16px] flex h-[45px] w-[158px] items-center justify-center rounded-[22px] bg-[linear-gradient(238deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)]'>
            <Text type='body-14-bold' color='cbwhite'>
              Download PineX
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCash;
