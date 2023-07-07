import Form from 'rc-field-form';
import Slider from 'react-slick';

import ThemeExploreItem from '@components/Themes/ThemeExploreItem';
import { ExploreButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
import { IconSearchWhite } from '@layout/components/MainHeader';

import KeywordSearch from './KeywordSearch';

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
  return (
    <div className='w-full text-left'>
      <Text type='body-24-semibold' color='cbblack'>
        Discovery
      </Text>
      <div className='mr-[12px] mt-[16px] mobile-max:w-full'>
        <Form>
          <FormItem name='search'>
            <Input
              className='h-[40px] rounded-[8px] bg-[#EFF2F5] pl-[36px] pr-[12px] outline-none mobile-max:w-full'
              placeholder='Are you looking for something?'
              icon={<IconSearchWhite />}
            />
          </FormItem>
        </Form>
      </div>
      <Text type='body-20-medium' color='neutral-1' className='mb-[16px] mt-[36px]'>
        Themes
      </Text>
      <div className='mb-[16px] overflow-hidden'>
        <Slider {...settings} variableWidth>
          <ThemeExploreItem />
          <ThemeExploreItem />
          <ThemeExploreItem />
        </Slider>
      </div>
      <ExploreButton>
        <Text type='body-14-bold' color='primary-2'>
          Explore themes
        </Text>
      </ExploreButton>
      <div>
        <Text type='body-20-medium' color='neutral-1' className='mb-[16px] mt-[36px]'>
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
      </div>
    </div>
  );
};
export default Explore;
