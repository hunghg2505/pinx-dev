import Form from 'rc-field-form';

import ThemeExploreItem from '@components/Themes/ThemeExploreItem';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
import { IconSearchWhite } from '@layout/components/MainHeader';

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
      <div className='flex'>
        <ThemeExploreItem />
      </div>
    </div>
  );
};
export default Explore;
