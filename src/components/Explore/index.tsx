import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';
import Form from 'rc-field-form';
import Slider from 'react-slick';

import Influencer from '@components/Home/People/Influencer';
import PeopleList from '@components/Home/People/PeopleList';
import { useSuggestPeople } from '@components/Home/service';
import { optionTab } from '@components/PinexTop20';
import ThemeExploreItem from '@components/Themes/ThemeExploreItem';
import { ExploreButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
import { IconSearchWhite } from '@layout/components/MainHeader';
import { getAccessToken } from '@store/auth';
import { ROUTE_PATH } from '@utils/common';

import IPO from './IPO';
import KeywordSearch from './KeywordSearch';
import PinexTop from './PinexTop';
import WatchingStock from './WatchingStock';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  // slidesToScroll: 1,
  swipeToSlide: true,

  // autoplay: true,
  // autoplaySpeed: 1000,
};
const Explore = () => {
  const [form] = Form.useForm();
  const [showPopup, setShowPopup] = React.useState(false);
  const { suggestionPeople, getSuggestFriend, refreshList } = useSuggestPeople();
  const isLogin = !!getAccessToken();
  const router = useRouter();
  React.useEffect(() => {
    if (isLogin) {
      getSuggestFriend();
    }
  }, []);
  const onChange = () => {
    const value = form.getFieldValue('search');
    if (value === '') {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
    console.log('🚀 ~ file: index.tsx:44 ~ onChange ~ value:', value);
  };
  return (
    <div className='w-full text-left'>
      <Text type='body-24-semibold' color='cbblack'>
        Discovery
      </Text>
      <div
        className={classNames('mr-[12px] mt-[16px] mobile-max:w-full', {
          '[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]':
            showPopup,
        })}
      >
        <Form form={form} onValuesChange={onChange}>
          <FormItem name='search'>
            <Input
              className='h-[40px] rounded-[8px] bg-[#EFF2F5] pl-[36px] pr-[12px] outline-none mobile-max:w-full'
              placeholder='Are you looking for something?'
              icon={<IconSearchWhite />}
            />
          </FormItem>
        </Form>
      </div>
      <div
        className={classNames(
          'pointer-events-none fixed bottom-0  left-0 z-10 h-[65vh] w-full -translate-y-full transform bg-[#ffffff] px-[16px] opacity-0 [transition:0.5s]',
          { 'pointer-events-auto bottom-0 top-auto translate-y-[0] opacity-100': showPopup },
        )}
      >
        <div className='mt-[24px]'>
          <Text type='body-20-semibold' color='neutral-1'>
            Company
          </Text>
          <Text type='body-14-regular' color='neutral-4' className='mt-[16px]'>
            No company result found for szxc
          </Text>
        </div>
        <div className='mt-[32px]'>
          <Text type='body-20-semibold' color='neutral-1'>
            People
          </Text>
          <Text type='body-14-regular' color='neutral-4' className='mt-[16px]'>
            No people result found for szxc
          </Text>
        </div>
        <div className='mt-[32px]'>
          <Text type='body-20-semibold' color='neutral-1'>
            Posts
          </Text>
          <Text type='body-14-regular' color='neutral-4' className='mt-[16px]'>
            No post result found for szxc
          </Text>
        </div>
        <div className='mt-[32px]'>
          <Text type='body-20-semibold' color='neutral-1'>
            News
          </Text>
          <Text type='body-14-regular' color='neutral-4' className='mt-[16px]'>
            No news result found for szxc
          </Text>
        </div>
      </div>
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px] mt-[36px]'>
        Themes
      </Text>
      <div className='mb-[16px] overflow-hidden'>
        <Slider {...settings} variableWidth>
          <div>
            <div className='mr-[16px] mobile-max:!w-[149px]'>
              <ThemeExploreItem />
            </div>
          </div>
          <div>
            <div className='mr-[16px] mobile-max:!w-[149px]'>
              <ThemeExploreItem />
            </div>
          </div>
          <div>
            <div className='mr-[16px] mobile-max:!w-[149px]'>
              <ThemeExploreItem />
            </div>
          </div>
          <div>
            <div className='mr-[16px] mobile-max:!w-[149px]'>
              <ThemeExploreItem />
            </div>
          </div>
        </Slider>
      </div>
      <ExploreButton onClick={() => router.push(ROUTE_PATH.THEME)}>
        <Text type='body-14-bold' color='primary-2'>
          Explore themes
        </Text>
      </ExploreButton>
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px] mt-[36px]'>
        Top keyword search
      </Text>
      <div className='mb-[16px] flex flex-col gap-y-[12px]'>
        <KeywordSearch percen={80} />
        <KeywordSearch percen={100} />
      </div>
      <ExploreButton>
        <Text type='body-14-bold' color='primary-2'>
          Explore top search
        </Text>
      </ExploreButton>
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px] mt-[36px]'>
        Top watching stock
      </Text>
      <div className='mb-[16px] flex flex-col gap-y-[12px]'>
        <WatchingStock percen={80} />
        <WatchingStock percen={100} />
      </div>
      <ExploreButton>
        <Text type='body-14-bold' color='primary-2'>
          Explore top watching stock
        </Text>
      </ExploreButton>

      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px] mt-[36px]'>
        People in spotlight
      </Text>
      <div className='mb-[16px]'>
        <Influencer />
      </div>
      <ExploreButton onClick={() => router.push(ROUTE_PATH.PEOPLEINSPOTLIGHT)}>
        <Text type='body-14-bold' color='primary-2'>
          Explore influencer
        </Text>
      </ExploreButton>
      {suggestionPeople && (
        <div className='mr-[16px] mt-[53px] flex-row items-center mobile:flex desktop:hidden'>
          <img
            src='/static/icons/iconPeople.svg'
            alt=''
            width={20}
            height={20}
            className='mr-[8px] h-[20px] w-[20px] object-contain'
          />
          <Text type='body-16-bold' color='neutral-2'>
            People you may know
          </Text>
        </div>
      )}
      {suggestionPeople && (
        <div className='mobile:block desktop:hidden'>
          <div className='mb-[16px] bg-[#ffffff] pt-[15px]'>
            <PeopleList data={suggestionPeople} refresh={refreshList} />
          </div>
          <ExploreButton>
            <Text type='body-14-bold' color='primary-2'>
              Explore people
            </Text>
          </ExploreButton>
        </div>
      )}
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px] mt-[36px]'>
        PineX top 20
      </Text>
      <div className='mb-[16px] overflow-hidden'>
        <Slider {...settings} variableWidth>
          {optionTab?.map((item: any, index: number) => (
            <PinexTop label={item.label} value={item.value} key={index} />
          ))}
        </Slider>
      </div>
      <ExploreButton onClick={() => router.push(ROUTE_PATH.PINEX_TOP_20)}>
        <Text type='body-14-bold' color='primary-2'>
          Explore more
        </Text>
      </ExploreButton>
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px] mt-[36px]'>
        New IPO
      </Text>
      <div>
        <div className='mb-[16px] flex flex-col gap-y-[12px]'>
          <IPO />
          <IPO />
        </div>
        <ExploreButton>
          <Text type='body-14-bold' color='primary-2'>
            Explore newly listed
          </Text>
        </ExploreButton>
      </div>
      {/* <div className='rounded-[12px] border-[1px] border-dashed border-[#CCC] px-[20px] py-[28px] text-center'>
        <Text type='body-20-semibold' color='neutral-1'>
          New IPO stocks
        </Text>
        <Text type='body-14-regular' color='neutral-4'>
          There is no new IPO stocks
        </Text>
      </div> */}
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px] mt-[36px]'>
        Trending on PineX
      </Text>
      <div className='mb-[16px] flex flex-col gap-y-[16px]'>
        {/* <TrendingOnnPinex /> */}
        {/* <TrendingOnnPinex /> */}
      </div>
      <ExploreButton>
        <Text type='body-14-bold' color='primary-2'>
          Explore hot topics
        </Text>
      </ExploreButton>
    </div>
  );
};
export default Explore;
