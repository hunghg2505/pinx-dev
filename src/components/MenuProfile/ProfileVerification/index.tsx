/* eslint-disable import/named */
import React, { useState } from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';
// import Upload from 'rc-upload';
// import { RcFile } from 'rc-upload/lib/interface';
import { toast } from 'react-hot-toast';
import request from 'umi-request';

import ModalCropImage from '@components/ProfileEdit/FormDesktop/Header/ModalCropImage';
import AvatarDefault from '@components/UI/AvatarDefault';
import { ErrorMainButton } from '@components/UI/Button';
import CustomImage from '@components/UI/CustomImage';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Notification from '@components/UI/Notification';
import PopupDeactivateAccount from '@components/UI/Popup/PopupDeactivateAccount';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { popupStatusAtom } from '@store/popup/popup';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { ROUTE_PATH, calcUserStatusText, isUrlValid, compressImage } from '@utils/common';
import { USERTYPE, USER_STATUS_PENDING, USER_STATUS_VERIFIED } from '@utils/constant';
import { DownloadPineXApp } from '@utils/dataLayer';
import {
  APP_STORE_DOWNLOAD,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AVATAR_SIZE,
  GOOGLE_PLAY_DOWNLOAD,
  MAX_AVATAR_FILE_SIZE_KB,
} from 'src/constant';

import { useUpdateUserProfile } from './service';

const customInputClassName =
  'w-full py-2 border-solid border-b-[1px] border-[--neutral-7] text-[#999999] outline-none bg-white';
const hideBorder = '!border-none';

// const beforeUpload = (file: RcFile) => {
//   const isJpgOrPng = isImage(file);
//   return isJpgOrPng;
// };

const handleRedirect = (url: string) => {
  DownloadPineXApp('CTA in App', 'PopUpEkyc');
  window.open(url, '_blank');
};

const renderIdentifyCardNumber = (lastNumToShow: number, value?: string) => {
  if (value && value?.length > lastNumToShow) {
    const first = value?.slice(0, -lastNumToShow).replaceAll(/./g, '*');
    const last = value?.slice(-lastNumToShow) || '';
    return first + last;
  } else {
    return '';
  }
};

const ProfileVerification = () => {
  const { t } = useTranslation('setting');
  const router = useRouter();
  const [form] = Form.useForm();
  const { userLoginInfo } = useUserLoginInfo();
  const { run: requsetGetUserProfile } = useProfileInitial();
  const { isMobile } = useResponsive();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [openModalCropImg, setOpenModalCropImg] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [file, setFile] = useState<File>();

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

  const handleCompressSuccess = async (blob: Blob) => {
    const blobToFile = new File([blob], '.' + blob.type.split('/')[1], {
      type: blob.type,
    });

    const formData = new FormData();
    formData.append('files', blobToFile);
    blob && requestUploadImage.run(formData);
  };

  const handleCropImageSuccess = async (blob: any) => {
    setOpenModalCropImg(false);

    if (blob) {
      try {
        // compress image
        const compressedImage = await compressImage({
          file: blob,
          maxFileSizeKb: MAX_AVATAR_FILE_SIZE_KB,
          options: {
            fileType: 'image/jpeg',
          },
        });

        if (compressedImage) {
          await handleCompressSuccess(compressedImage);
        }
      } catch {
        toast.error(t('error'));
      }
    }
  };

  // const onChangeAvatar = async (file: File) => {
  //   if (file) {
  //     // setOpenModalCropImg(true);
  //     // setFile(file);

  //     handleCropImageSuccess(file);
  //   }
  // };

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
    <>
      <div className='box-shadow card-style relative w-full rounded-[8px] bg-white pt-4 text-left '>
        <img
          src='/static/icons/chevron-left.svg'
          className='ml-[12px] !w-[28px] laptop:hidden'
          alt=''
          onClick={router.back}
        />
        <PopupDeactivateAccount visible={popupStatus.popupDeactivateAccount} />
        <div className='relative laptop-max:hidden laptop:mt-0'>
          <img
            src='/static/icons/back_icon.svg'
            alt=''
            className='absolute left-[12px] top-[-2px] h-[28px] w-[28px] cursor-pointer'
            onClick={router.back}
          />
          <Text
            type='body-20-bold'
            className='mb-1 mt-6 laptop-max:ml-4 laptop:mt-0 laptop:text-center'
          >
            {t('securities_profile')}
          </Text>
        </div>
        <div className='ml-[-24px] mt-[20px] w-[calc(100%+48px)] border-b-[1px] border-solid border-[#EEF5F9] laptop-max:hidden' />

        <div className='mt-5 flex items-center border-b-[1px] border-solid border-white px-[14px] pb-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12)] laptop:shadow-none'>
          <div className='relative mr-3 flex-none'>
            {/* <Upload
              // accept='.png, .jpeg, .jpg, .webp'
              accept='.png, .jpeg, .jpg'
              onStart={onChangeAvatar}
              beforeUpload={beforeUpload}
            > */}
            {isUrlValid(userLoginInfo?.avatar) ? (
              <CustomImage
                src={userLoginInfo?.avatar || ''}
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='h-[52px] w-[52px] rounded-full border border-solid border-[#ebebeb] mobile:block object-cover'
              />
            ) : (
              <div className='h-[52px] w-[52px] rounded-full mobile:block object-cover'>
                <AvatarDefault name={userLoginInfo?.displayName} />
              </div>
            )}
            {/* <img
              src='/static/icons/icon_plus.svg'
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='absolute bottom-0 right-0 h-[16px] w-[16px]'
            /> */}
            {/* </Upload> */}
          </div>

          <div className='overflow-hidden'>
            <div className='mb-[2px] flex items-center galaxy-max:mb-2'>
              <Text type='body-20-semibold' className='truncate galaxy-max:text-[16px]'>
                {userLoginInfo?.displayName}
              </Text>

              {userLoginInfo?.isKol && (
                <img
                  src='/static/icons/iconTick.svg'
                  alt=''
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='ml-[8px] h-[18px] w-[18px] object-contain'
                />
              )}

              {userLoginInfo?.isFeatureProfile && (
                <img
                  src='/static/icons/iconKol.svg'
                  alt=''
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='ml-[2px] h-[24px] w-[24px] object-contain'
                />
              )}
            </div>
            <div className='flex items-center text-[#999999] galaxy-max:flex-col galaxy-max:items-start galaxy-max:gap-[2px]'>
              <div className='flex gap-1'>
                <img
                  src='/static/icons/icon_phone.svg'
                  alt=''
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='mr-[6px] h-[15px] w-[15px]'
                />
                <span>{userLoginInfo.phone}</span>
              </div>

              <span
                className={classNames('ml-2 text-[#EAA100] galaxy-max:ml-0', {
                  '!text-[#128F63]':
                    calcUserStatusText(userLoginInfo.acntStat || '') === USER_STATUS_VERIFIED,
                  '!text-[#F1BA09]':
                    calcUserStatusText(userLoginInfo.acntStat || '') === USER_STATUS_PENDING,
                })}
              >
                {t(`common:${calcUserStatusText(userLoginInfo.acntStat || '')}`)}
              </span>
            </div>
          </div>
        </div>

        <div className='flex mobile:mt-11 tablet:mt-[12px]'>
          <Form className='w-full space-y-7 px-4' form={form}>
            <div>
              <Text type='body-12-semibold' className='text-[#999999]'>
                {t('full_name')}
              </Text>
              <FormItem className='mt-4' name='fullName'>
                <Input disabled value={userLoginInfo?.name} className={customInputClassName} />
              </FormItem>
            </div>

            <div className='laptop:flex laptop:items-center laptop:justify-between'>
              <Text type='body-12-semibold' className='text-[#999999]'>
                {t('gender')}
              </Text>
              {isMobile ? (
                <FormItem className='mt-4' name='gender'>
                  <div className='flex w-full justify-between rounded-lg bg-[#F7F6F8]'>
                    <div
                      className={classNames(' m-1 w-1/2 py-2 text-center text-[#808A9D]', {
                        'bg-white font-[600] text-[#394251]': userLoginInfo?.gender === 'F',
                      })}
                    >
                      {t('female')}
                    </div>
                    <div
                      className={classNames(' m-1 w-1/2 py-2 text-center text-[#808A9D]', {
                        'bg-white font-[600] text-[#394251]': userLoginInfo?.gender === 'M',
                      })}
                    >
                      {t('male')}
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
                      {t('female')}
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
                      {t('male')}
                    </div>
                  </div>
                </FormItem>
              )}
            </div>

            <div>
              <Text type='body-12-semibold' className='text-[#999999]'>
                {t('date_of_birth')}
              </Text>
              <FormItem className='mt-4' name='fullName'>
                <Input
                  disabled
                  value={userLoginInfo?.dob && dayjs(userLoginInfo?.dob).format('DD-MM-YYYY')}
                  className={customInputClassName}
                />
              </FormItem>
            </div>

            <div>
              <Text type='body-12-semibold' className='text-[#999999]'>
                {t('identify_card')}
              </Text>
              <FormItem className='mt-4' name='fullName'>
                <Input
                  disabled
                  value={renderIdentifyCardNumber(3, userLoginInfo?.identityCardNo)}
                  className={classNames(customInputClassName, {
                    [hideBorder]: isMobile,
                  })}
                />
              </FormItem>
            </div>

            <div className='!mt-4 ml-[-14px] w-[calc(100%+28px)] border-b-[8px] border-solid border-[#F7F6F8] laptop:hidden' />

            <div>
              <Text type='body-12-semibold' className='text-[#999999]'>
                {t('address')}
              </Text>
              <FormItem className='mt-4' name='fullName'>
                <Input disabled value={userLoginInfo?.address} className={customInputClassName} />
              </FormItem>
            </div>

            <div>
              <Text type='body-12-semibold' className='text-[#999999]'>
                {t('email')}
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
              <Text type='body-14-medium'>{t('deactivate_account')}</Text>
            </ErrorMainButton>
          </Form>

          {userLoginInfo?.custStat === USERTYPE.NEW && (
            <div className='mb-[82px] mt-[-77px] flex w-full flex-col items-center justify-center rounded-lg bg-[#D8EBFC] laptop-max:hidden'>
              <Image
                src='/static/images/book_list.png'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='mr-[7px] h-[103px] w-[164px]'
              />
              <div className='my-[20px] text-center'>
                <Text type='body-16-semibold'>{t('ekyc_title')}</Text>
                <Text type='body-16-semibold'>App PineX</Text>
              </div>
              <div className='justify-center gap-x-[12px] mobile:hidden tablet:flex'>
                <Image
                  src='/static/images/googleplay.png'
                  alt='Download google play'
                  width={180}
                  height={52}
                  sizes='100vw'
                  className='h-[32px] w-[106.5px] cursor-pointer object-contain'
                  onClick={() => handleRedirect(GOOGLE_PLAY_DOWNLOAD)}
                />

                <Image
                  src='/static/images/appstore.png'
                  alt='Download app store'
                  width={180}
                  sizes='100vw'
                  height={52}
                  className='h-[32px] w-[106.5px] cursor-pointer object-contain'
                  onClick={() => handleRedirect(APP_STORE_DOWNLOAD)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ModalCropImage
        width={AVATAR_SIZE.width}
        height={AVATAR_SIZE.height}
        file={file}
        visible={openModalCropImg}
        onClose={() => setOpenModalCropImg(false)}
        cropperOptions={{
          aspectRatio: 1 / 1,
          autoCropArea: 1,
          zoomOnTouch: false,
          zoomOnWheel: false,
          cropBoxResizable: false,
          dragMode: 'move',
        }}
        onCropSuccess={handleCropImageSuccess}
        showZoomControl
      />
    </>
  );
};

export default ProfileVerification;
