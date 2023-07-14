import React from 'react';

import PreViewStory from './PreviewStory';
import Story from './Story';

const MyStory = () => {
  return (
    <div className='px-[16px] pb-[100px]'>
      <PreViewStory content='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit culpa magnam possimus dicta distinctio eaque rem enim quisquam a cumque sint quo harum, tenetur, dolor provident mollitia. Odio, libero amet!' />
      <Story
        content='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit culpa magnam possimus dicta distinctio eaque rem enim quisquam a cumque sint quo harum, tenetur, dolor provident mollitia. Odio, libero amet!'
        pic='/static/images/theme1.png'
        star
      />
    </div>
  );
};
export default MyStory;
