/* eslint-disable import/named */
import React from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import Form from 'rc-field-form';
import Upload from 'rc-upload';
import { RcFile } from 'rc-upload/lib/interface';
import { toast } from 'react-hot-toast';
import request from 'umi-request';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { isUserVerified, isImage } from '@utils/common';

import { useUpdateUserProfile } from './service';

const customInputClassName =
  'w-full py-2 border-solid border-b-[1px] border-[--neutral-7] outline-none bg-white';
const disabledInputClassname = 'text-[--neutral-5]';
const hideBorder = '!border-none';

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = isImage(file);
  return isJpgOrPng;
};

const ProfileVerification = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { userLoginInfo } = useUserLoginInfo();
  const { run: requsetGetUserProfile } = useProfileInitial();
  const requestUpdateUserProfile = useUpdateUserProfile({
    onSuccess: () => {
      requsetGetUserProfile();
    },
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const requestUploadImage = useRequest(
    (formData: any) => {
      return request.post(
        'https://static.pinetree.com.vn/cloud/internal/public/images/upload/pist?type=PIST_COMMUNITY',
        {
          data: formData,
        },
      );
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        const url = res?.files?.[0]?.url as string;
        const payload = {
          avatar: url
        };
        requestUpdateUserProfile.run(payload);
        if (!url) {
          toast(() => <Notification type='error' message={res?.files?.[0]?.message} />);
        }
      },
    },
  );

  const onChangeAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);
    requestUploadImage.run(formData);
  };

  if (!userLoginInfo.id) {
    return <></>;
  }
  return (
    <>
      <div className='relative'>
        <img
          src='/static/icons/arrow-left.svg'
          alt=''
          width='0'
          height='0'
          sizes='100vw'
          className='absolute left-[10px] top-[-4px] h-[32px] w-[32px] cursor-pointer laptop-max:hidden'
          onClick={() => router.back()}
        />
      </div>

      <div className='flex items-center px-4 pb-4 border-solid border-b-[1px] border-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12)]'>
        <div className='relative mr-3'>
          <Upload
            accept='.png, .jpeg, .jpg'
            onStart={onChangeAvatar}
            beforeUpload={beforeUpload}
          >
            <img
              src={userLoginInfo?.avatar}
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='h-[52px] w-[52px] rounded-full mobile:block'
            />
            <img
              src='/static/icons/icon_plus.svg'
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='h-[16px] w-[16px] absolute bottom-0 right-0'
            />
          </Upload>
        </div>


        <div className='flex flex-col'>
          <Text type='body-20-semibold' className='mb-[2px]'>{userLoginInfo?.displayName}</Text>
          <div className='flex items-center text-[#999999]'>
            <img
              src='/static/icons/icon_phone.svg'
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='h-[15px] w-[15px] mr-[6px]'
            />
            {userLoginInfo.phone}
            <span className='text-[#EAA100] ml-2'>
              {isUserVerified(userLoginInfo.acntStat) ? 'Verified' : 'Unverified'}
            </span>
          </div>
        </div>
      </div>

      <Form className='mt-11 space-y-7 px-4 laptop:mb-24' form={form}>
        <div>
          <Text type='body-12-semibold' className='text-[#999999]'>
            Full name
          </Text>
          <FormItem className='mt-4' name='fullName'>
            <Input
              disabled
              value={userLoginInfo?.name}
              className={classNames(customInputClassName, disabledInputClassname)}
            />
          </FormItem>
        </div>

        <div>
          <Text type='body-12-semibold' className='text-[#999999]'>
            Gender
          </Text>
          <FormItem className='mt-4' name='gender'>
            <div className='flex bg-[#F7F6F8] w-full rounded-lg justify-between'>
              <div
                className={classNames(' py-2 text-center m-1 w-1/2 text-[#808A9D]', {
                  'bg-white text-[#394251] font-[600]': userLoginInfo?.gender === 'F'
                })}
              >
                Female
              </div>
              <div
                className={classNames(' py-2 text-center m-1 w-1/2 text-[#808A9D]', {
                  'bg-white text-[#394251] font-[600]': userLoginInfo?.gender === 'M'
                })}
              >
                Male
              </div>
            </div>
          </FormItem>
        </div>

        <div>
          <Text type='body-12-semibold' className='text-[#999999]'>
            Date of birth
          </Text>
          <FormItem className='mt-4' name='fullName'>
            <Input
              disabled
              value={dayjs(userLoginInfo?.dob).format('DD-MM-YYYY')}
              className={classNames(customInputClassName, disabledInputClassname)}
            />
          </FormItem>
        </div>

        <div>
          <Text type='body-12-semibold' className='text-[#999999]'>
            Identify card
          </Text>
          <FormItem className='mt-4' name='fullName'>
            <Input
              disabled
              value={userLoginInfo?.identityCardNo}
              className={classNames(customInputClassName, disabledInputClassname, hideBorder)}
            />
          </FormItem>
        </div>

        <div className='!mt-4 border-solid border-b-[8px] border-[#F7F6F8] w-[calc(100%+28px)] ml-[-14px]' />

        <div>
          <Text type='body-12-semibold' className='text-[#999999]'>
            Adress
          </Text>
          <FormItem className='mt-4' name='fullName'>
            <Input
              disabled
              value={userLoginInfo?.address}
              className={classNames(customInputClassName, disabledInputClassname)}
            />
          </FormItem>
        </div>

        <div>
          <Text type='body-12-semibold' className='text-[#999999]'>
            Email
          </Text>
          <FormItem className='mt-4' name='fullName'>
            <Input
              disabled
              value={userLoginInfo?.email}
              className={classNames(customInputClassName, disabledInputClassname)}
            />
          </FormItem>
        </div>

        <MainButton
          type='submit'
          className='fixed bottom-9 w-[calc(100%-32px)] laptop:absolute laptop:bottom-[-56px] laptop:m-auto laptop:w-1/2 laptop:translate-x-1/2'
        >
          Next
        </MainButton>
      </Form>
    </>
  );
};

export default ProfileVerification;
