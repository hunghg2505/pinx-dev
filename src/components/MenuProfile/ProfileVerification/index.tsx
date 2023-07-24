/* eslint-disable import/named */
import React from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import Form from 'rc-field-form';
import Upload from 'rc-upload';
import { RcFile } from 'rc-upload/lib/interface';
import { toast } from 'react-hot-toast';
import request from 'umi-request';

import { ErrorMainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Notification from '@components/UI/Notification';
import PopupDeactivateAccount from '@components/UI/Popup/PopupDeactivateAccount';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { popupStatusAtom } from '@store/popup/popup';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { isUserVerified, isImage, ROUTE_PATH } from '@utils/common';
import { APP_STORE_DOWNLOAD, GOOGLE_PLAY_DOWNLOAD } from 'src/constant';

import { useUpdateUserProfile } from './service';

const customInputClassName =
  'w-full py-2 border-solid border-b-[1px] border-[--neutral-7] text-[#999999] outline-none bg-white';
const hideBorder = '!border-none';

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = isImage(file);
  return isJpgOrPng;
};

const handleRedirect = (url: string) => {
  window.open(url, '_blank');
};

const ProfileVerification = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { userLoginInfo } = useUserLoginInfo();
  const { run: requsetGetUserProfile } = useProfileInitial();
  const { isMobile } = useResponsive();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);

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
          avatar: url,
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

  const deactiveAccount = () => {
    if (isMobile) {
      router.push(ROUTE_PATH.DEACTIVATE_ACCOUNT);
    } else {
      setPopupStatus({ ...popupStatus, popupDeactivateAccount: true });
    }
  };

  if (!userLoginInfo.id) {
    return <></>;
  }
  return (
    <div className='pt-5'>
      <img
        src='/static/icons/chevron-left.svg'
        className='!w-[28px]'
        alt=''
        onClick={router.back}
      />
      <PopupDeactivateAccount visible={popupStatus.popupDeactivateAccount} />
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

      <div className='mx-[-16px] flex items-center bg-[#FFF] p-[16px] [box-shadow:0px_1px_2px_0px_rgba(0,_0,_0,_0.12)] laptop:hidden'>
        <div className='relative mr-3'>
          <Upload accept='.png, .jpeg, .jpg' onStart={onChangeAvatar} beforeUpload={beforeUpload}>
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
              className='absolute bottom-0 right-0 h-[16px] w-[16px]'
            />
          </Upload>
        </div>

        <div className='flex flex-col'>
          <Text type='body-20-semibold' className='mb-[2px]'>
            {userLoginInfo?.displayName}
          </Text>
          <div className='flex items-center text-[#999999]'>
            <img
              src='/static/icons/icon_phone.svg'
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='mr-[6px] h-[15px] w-[15px]'
            />
            {userLoginInfo.phone}
            <span
              className={classNames('ml-2', {
                'text-[#EAA100]': !isUserVerified(userLoginInfo.acntStat),
                'text-green': isUserVerified(userLoginInfo.acntStat),
              })}
            >
              {isUserVerified(userLoginInfo.acntStat) ? 'Verified' : 'Unverified'}
            </span>
          </div>
        </div>
      </div>

      <Text type='body-20-bold' className='text-center laptop-max:hidden'>
        Securities profile
      </Text>
      <div className='mt-11 flex'>
        <Form className='w-full space-y-7' form={form}>
          <div>
            <Text type='body-12-semibold' className='text-[#999999]'>
              Full name
            </Text>
            <FormItem className='mt-4' name='fullName'>
              <Input disabled value={userLoginInfo?.name} className={customInputClassName} />
            </FormItem>
          </div>

          <div className='laptop:flex laptop:items-center laptop:justify-between'>
            <Text type='body-12-semibold' className='text-[#999999]'>
              Gender
            </Text>
            {isMobile ? (
              <FormItem className='mt-4' name='gender'>
                <div className='flex w-full justify-between rounded-lg bg-[#F7F6F8]'>
                  <div
                    className={classNames(' m-1 w-1/2 py-2 text-center text-[#808A9D]', {
                      'bg-white font-[600] text-[#394251]': userLoginInfo?.gender === 'F',
                    })}
                  >
                    Female
                  </div>
                  <div
                    className={classNames(' m-1 w-1/2 py-2 text-center text-[#808A9D]', {
                      'bg-white font-[600] text-[#394251]': userLoginInfo?.gender === 'M',
                    })}
                  >
                    Male
                  </div>
                </div>
              </FormItem>
            ) : (
              <FormItem className='' name='gender'>
                <div className='flex'>
                  <div
                    className={classNames('mr-8 flex text-neutral_black opacity-60', {
                      '!opacity-100': userLoginInfo?.gender === 'F',
                    })}
                  >
                    <div
                      className={classNames(
                        'relative mr-3 h-5 w-5 rounded-full border-[1px] border-solid border-[#EBEBEB] bg-white',
                        {
                          '!bg-[var(--primary-2)]': userLoginInfo?.gender === 'F',
                        },
                      )}
                    >
                      {userLoginInfo?.gender === 'F' && (
                        <div className='absolute right-[2.5px] top-[2.5px] h-3 w-3 rounded-full bg-[#1F6EAC]' />
                      )}
                    </div>
                    Female
                  </div>
                  <div
                    className={classNames('mr-16 flex text-neutral_black opacity-60', {
                      '!opacity-100': userLoginInfo?.gender === 'M',
                    })}
                  >
                    <div
                      className={classNames(
                        'relative mr-3 h-5 w-5 rounded-full border-[1px] border-solid border-[#EBEBEB] bg-white',
                        {
                          '!bg-[var(--primary-2)]': userLoginInfo?.gender === 'M',
                        },
                      )}
                    >
                      {userLoginInfo?.gender === 'M' && (
                        <div className='absolute right-[2.5px] top-[2.5px] h-3 w-3 rounded-full bg-[#1F6EAC]' />
                      )}
                    </div>
                    Male
                  </div>
                </div>
              </FormItem>
            )}
          </div>

          <div>
            <Text type='body-12-semibold' className='text-[#999999]'>
              Date of birth
            </Text>
            <FormItem className='mt-4' name='fullName'>
              <Input
                disabled
                value={dayjs(userLoginInfo?.dob).format('DD-MM-YYYY')}
                className={customInputClassName}
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
                className={classNames(customInputClassName, {
                  [hideBorder]: isMobile,
                })}
              />
            </FormItem>
          </div>

          <div className='!mt-4 ml-[-14px] w-[calc(100%+28px)] border-b-[8px] border-solid border-[#F7F6F8] laptop:hidden' />

          <div>
            <Text type='body-12-semibold' className='text-[#999999]'>
              Adress
            </Text>
            <FormItem className='mt-4' name='fullName'>
              <Input disabled value={userLoginInfo?.address} className={customInputClassName} />
            </FormItem>
          </div>

          <div>
            <Text type='body-12-semibold' className='text-[#999999]'>
              Email
            </Text>
            <FormItem className='mt-4' name='fullName'>
              <Input disabled value={userLoginInfo?.email} className={customInputClassName} />
            </FormItem>
          </div>

          <ErrorMainButton
            className='mb-[20px] flex h-[40px] w-full items-center justify-center'
            onClick={deactiveAccount}
          >
            <img
              src='/static/icons/icon_lock.svg'
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='mr-[7px] h-[20px] w-[18px]'
            />
            <Text type='body-14-medium'>Deactivate account</Text>
          </ErrorMainButton>
        </Form>

        <div className='mb-[72.5px] flex w-full flex-col items-center justify-center rounded-lg bg-[#D8EBFC] laptop-max:hidden'>
          <img
            src='/static/images/book_list.png'
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='mr-[7px] h-[103px] w-[164px]'
          />
          <Text type='body-16-semibold'>eKYC chỉ 2 phút trên</Text>
          <Text type='body-16-semibold' className='mb-4'>
            app PineX
          </Text>
          <div className='justify-center gap-x-[23px] mobile:hidden tablet:flex'>
            <img
              src='/static/images/googleplay.png'
              alt='Download google play'
              width={180}
              height={52}
              className='h-[30px] w-[106.5px] cursor-pointer object-contain'
              onClick={() => handleRedirect(GOOGLE_PLAY_DOWNLOAD)}
            />

            <img
              src='/static/images/appstore.png'
              alt='Download app store'
              width={180}
              height={52}
              className='h-[30px] w-[106.5px] cursor-pointer object-contain'
              onClick={() => handleRedirect(APP_STORE_DOWNLOAD)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileVerification;
