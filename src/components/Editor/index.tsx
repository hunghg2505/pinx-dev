import React, { forwardRef, useImperativeHandle, useState } from 'react';

import Mention from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import { PluginKey } from '@tiptap/pm/state';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import Upload from 'rc-upload';
import { RcFile } from 'rc-upload/lib/interface';
import { toast } from 'react-hot-toast';
import request from 'umi-request';

import { API_PATH } from '@api/constant';
import {
  // PREFIX_API_UPLOADPHOTO,
  privateRequest,
  requestPist,
  // requestUploadPhoto,
} from '@api/request';
import { ISearch, TYPESEARCH } from '@components/Home/service';
import { requestAddComment, requestReplyCommnet } from '@components/Post/service';
import Loading from '@components/UI/Loading';
import Notification from '@components/UI/Notification';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { USERTYPE } from '@utils/constant';

import suggestion from './Suggestion';
import { isImage } from '../../utils/common';
// import { toBase64 } from '@';

interface IProps {
  id: string;
  refresh: () => void;
  refreshTotal: () => void;
  setImageCommentMobile: (v: boolean) => void;
  width?: number;
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = isImage(file);
  // if (!isJpgOrPng) {
  //   console.log('Không phải ảnh');
  // }
  return isJpgOrPng;
};

const Editor = (props: IProps, ref?: any) => {
  const { t } = useTranslation();
  const { id, refresh, refreshTotal, setImageCommentMobile, width } = props;
  const [imageComment, setImageComment] = useState('');
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [idReply, setIdReply] = React.useState<string>('');
  const messagesEndRef: any = React.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  };
  const { statusUser } = useUserType();
  const { userLoginInfo } = useUserLoginInfo();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: t('what_do_you_want_to_comment'),
      }),
      Mention.extend({
        name: 'userMention',
      }).configure({
        HTMLAttributes: {
          class: '!whitespace-nowrap userMention text-[14px] font-semibold leading-[18px]',
        },
        suggestion: {
          ...suggestion,
          char: '@',
          pluginKey: new PluginKey('userMention'),
          items: async ({ query }: { query: string }) => {
            const payload: ISearch = {
              keyword: query,
              searchType: TYPESEARCH.FRIEND,
            };
            const data = await privateRequest(requestPist.post, API_PATH.PRIVATE_SEARCH, {
              data: payload,
            });
            return data?.data?.users;
          },
        },
      }),
      Mention.extend({
        name: 'stockMention',
      }).configure({
        HTMLAttributes: {
          class: 'stockMention text-[14px] font-semibold leading-[18px]',
        },
        suggestion: {
          ...suggestion,
          pluginKey: new PluginKey('stockMention'),
          char: '%',
          items: async ({ query }: { query: string }) => {
            const payload: ISearch = {
              keyword: query,
              searchType: TYPESEARCH.STOCK,
            };
            const data = await privateRequest(requestPist.post, API_PATH.PRIVATE_SEARCH, {
              data: payload,
            });

            return data?.data?.companies;
          },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: ' focus:outline-none abcd',
      },
    },
    // onUpdate({ editor }) {
    //   const text = editor.getText();
    //   if (idReply && text === '' && width && width < 738) {
    //     console.log('123');
    //     setIdReply('');
    //   }
    // },
  });
  const textComment = editor?.getText();

  const useUploadImage = useRequest(
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
        const url = res?.files?.[0]?.url;

        if (!url) {
          toast(() => <Notification type='error' message={res?.files?.[0]?.message} />);
        }
        setImageCommentMobile(true);
        setImageComment(url);
      },
    },
  );
  const onStart = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);
    useUploadImage.run(formData);
  };
  const onCloseImage = () => {
    setImageComment('');
    setImageCommentMobile(false);
  };
  useImperativeHandle(ref, () => {
    return {
      onComment: (value: any, customerId: number, id: string) => {
        return onComment(value, customerId, id);
      },
      onReply: () => {
        editor?.commands?.focus(true, { scrollIntoView: false });
      },
      clearData: () => editor?.commands.clearContent(),
    };
  });
  const onComment = (value: any, customerId: number, id: string) => {
    setIdReply(id);
    if (width && width >= 738) {
      scrollToBottom();
      editor?.commands?.focus(true, { scrollIntoView: false });
      editor?.commands.clearContent();
      editor?.commands.insertContent(
        `<span data-type="userMention" class="userMention text-[14px] font-semibold leading-[18px]" data-id="${customerId}" data-label="${value}" contenteditable="false">@${value}</span>`,
      );
    } else {
      editor?.commands.clearContent();
      editor?.commands.insertContent(
        `<span data-type="userMention" class="userMention text-[14px] font-semibold leading-[18px]" data-id="${customerId}" data-label="${value}" contenteditable="false">@${value}</span>`,
      );
    }
  };
  // const onLike = () => {};
  const useAddComment = useRequest(
    (data: any) => {
      return requestAddComment(data);
    },
    {
      manual: true,
      onSuccess: () => {
        refreshTotal();
        refresh();
        editor?.commands.clearContent();
        setIdReply('');
        if (imageComment) {
          onCloseImage();
        }
      },
      onError: (error: any) => {
        if (error?.error === 'VSD account is required') {
          toast(() => (
            <Notification type='error' message={t('message_account_pending_to_close')} />
          ));
        } else {
          toast(() => <Notification type='error' message={error.error} />);
        }
      },
    },
  );
  const useReplyComment = useRequest(
    (data: any) => {
      return requestReplyCommnet(idReply, data);
    },
    {
      manual: true,
      onSuccess: () => {
        refreshTotal();
        refresh();
        setIdReply('');
        editor?.commands.clearContent();
        if (imageComment) {
          onCloseImage();
        }
      },
      onError: (error: any) => {
        if (error?.error === 'VSD account is required') {
          toast(() => (
            <Notification type='error' message={t('message_account_pending_to_close')} />
          ));
        } else {
          toast(() => <Notification type='error' message={error.error} />);
        }
      },
    },
  );

  const onSend = async () => {
    const users: any = [];
    const stock: any = [];
    const test = editor?.getJSON()?.content?.map((item: any) => {
      const abcd = item?.content?.map((text: any) => {
        let p = '';
        if (text.type === 'text') {
          p = text.text;
        }
        if (text.type === 'userMention') {
          const query = text.attrs.label;
          users.push(query);
          p = `@[${text.attrs.label}](${text.attrs.id})`;
        }
        if (text.type === 'stockMention') {
          const query = text.attrs.label;
          stock.push(query);
          p = `%[${text.attrs.label}](${text.attrs.label})`;
        }
        if (text.type === 'hardBreak') {
          p = '\n';
        }
        return p;
      });
      return abcd?.join('');
      // console.log('abcd', abcd);
    });
    const tagPeople = await Promise.all(
      users?.map(async (item: string) => {
        const payload: ISearch = {
          keyword: item,
          searchType: TYPESEARCH.FRIEND,
        };
        const data = await privateRequest(requestPist.post, API_PATH.PRIVATE_SEARCH, {
          data: payload,
        });
        return data?.data?.users;
      }),
    );
    const formatTagPeople = tagPeople.flat()?.map((item: any) => {
      return {
        avatar: item?.avatar,
        customerId: item?.id,
        id: item?.id,
        displayName: item?.displayName,
        isFeatureProfile: item?.isFeatureProfile,
        isKol: item?.isKol,
        name: item?.name,
        numberFollowers: item?.numberFollowers,
      };
    });
    const message = test?.flat()?.join(' \n ');
    const data = {
      message,
      tagPeople: formatTagPeople,
      tagStocks: stock,
      parentId: idReply === '' ? id : idReply,
      urlImages: [imageComment],
    };
    if (message?.toLowerCase()?.includes('script')) {
      toast(() => (
        <Notification
          type='error'
          message='Your post should be reviewed due to violation to Pinetree Securities&#39;s policy'
        />
      ));
    } else if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
      toast(() => <Notification type='error' message={t('message_account_pending_to_close')} />);
    } else if (statusUser === USERTYPE.VSD) {
      if (idReply === '') {
        useAddComment.run(data);
      } else {
        useReplyComment.run(data);
      }
    } else {
      setPopupStatus({ ...popupStatus, popupEkyc: true });
    }
  };

  return (
    <>
      <div className='mb-[20px] mobile:block mobile:bg-white mobile:px-[16px] tablet:flex tablet:px-0 desktop:mt-[12px]'>
        <img
          src={userLoginInfo?.avatar}
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='mr-[8px] h-[40px] w-[40px] rounded-full object-cover mobile:hidden tablet:block'
        />
        <div
          className='bottom-0 left-0 flex min-h-[40px] flex-1 items-center justify-between border-[1px] border-solid border-[#E6E6E6] bg-[#FFFFFF] px-[15px] mobile:w-full mobile:rounded-[1000px] tablet:static tablet:rounded-[12px]'
          ref={messagesEndRef}
        >
          <div className='flex w-full tablet:flex-col tablet:items-start tablet:pb-[10px] tablet:pt-[12px]'>
            <div className='flex flex-row items-center'>
              <Upload
                accept='.png, .jpeg, .jpg'
                onStart={onStart}
                beforeUpload={beforeUpload}
                className='tablet:hidden'
              >
                <img
                  src='/static/icons/iconCamnera.svg'
                  alt=''
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='mr-[8px] w-[19px]'
                />
              </Upload>
              <div className='mr-[8px] h-[24px] w-[1px] bg-[#E6E6E6] tablet:hidden'></div>
            </div>

            <EditorContent
              editor={editor}
              className='mt-[3px] max-h-[108px] w-full flex-col items-start justify-start overflow-y-auto break-words mobile:flex mobile:w-[calc(100%_-_50px)] mobile:px-[5px] tablet:max-w-[500px]'
            />
            <div className='w-full justify-between mobile:hidden tablet:flex'>
              <Upload accept='.png, .jpeg, .jpg' onStart={onStart} beforeUpload={beforeUpload}>
                <img
                  src='/static/icons/iconCamera.svg'
                  alt=''
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='mr-[8px] mt-[12px] h-[21px] w-[24px] object-contain'
                />
              </Upload>
              {useAddComment?.loading || useReplyComment?.loading ? (
                <div>
                  <Loading />
                </div>
              ) : (
                <img
                  src='/static/icons/iconSend.svg'
                  alt=''
                  width='0'
                  height='0'
                  sizes='100vw'
                  className={classNames('w-[19px] cursor-pointer', {
                    'pointer-events-none opacity-40': !textComment,
                    'pointer-events-auto opacity-100': textComment,
                  })}
                  onClick={onSend}
                />
              )}
            </div>
            {useUploadImage?.loading ? (
              <div className='mobile:hidden tablet:block'>
                <Loading />
              </div>
            ) : (
              imageComment && (
                <div className='relative'>
                  <img
                    src={imageComment}
                    alt=''
                    width='0'
                    height='0'
                    sizes='100vw'
                    className='mt-[8px] h-[100px] w-[100px] object-cover mobile:hidden tablet:block'
                  />
                  <img
                    src='/static/icons/iconCloseWhite.svg'
                    alt=''
                    width={0}
                    height={0}
                    className='absolute -right-[12px] -top-[6px] w-[24px] cursor-pointer'
                    onClick={onCloseImage}
                  />
                </div>
              )
            )}
          </div>

          {useAddComment?.loading || useReplyComment?.loading ? (
            <div className='flex items-center  tablet:hidden'>
              <Loading />
            </div>
          ) : (
            <img
              src='/static/icons/iconSend.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className={classNames('w-[19px] cursor-pointer mobile:block tablet:hidden', {
                'pointer-events-none opacity-40': !textComment,
                'pointer-events-auto opacity-100': textComment,
              })}
              onClick={onSend}
            />
          )}
        </div>
        {useUploadImage?.loading ? (
          <div className='mobile:block tablet:hidden'>
            <Loading />
          </div>
        ) : (
          imageComment && (
            <div className='relative'>
              <img
                src={imageComment}
                alt=''
                width='0'
                height='0'
                sizes='100vw'
                className='mt-[16px] h-[100px] w-[100px] object-cover mobile:block tablet:hidden'
              />
              <img
                src='/static/icons/iconCloseWhite.svg'
                alt=''
                width={0}
                height={0}
                className='absolute -top-[12px] left-[calc(100px-10px)] w-[24px] cursor-pointer'
                onClick={onCloseImage}
              />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default forwardRef(Editor);
