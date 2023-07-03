import React, { forwardRef, useImperativeHandle } from 'react';

import Mention from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import { PluginKey } from '@tiptap/pm/state';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRequest } from 'ahooks';
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
import { USERTYPE, useUserType } from '@hooks/useUserType';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import PopupComponent from '@utils/PopupComponent';

import suggestion from './Suggestion';
import { isImage } from '../../utils/common';
// import { toBase64 } from '@';

interface IProps {
  id: string;
  refresh: () => void;
  refreshTotal: () => void;
  imageComment: string;
  onCommentImage: (v: string) => void;
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = isImage(file);
  if (!isJpgOrPng) {
    console.log('Không phải ảnh');
  }
  return isJpgOrPng;
};

const Editor = (props: IProps, ref?: any) => {
  const { id, refresh, refreshTotal, imageComment, onCommentImage } = props;
  const [idReply, setIdReply] = React.useState<string>('');
  const messagesEndRef: any = React.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  };
  const { statusUser } = useUserType();
  const { requestGetProfile } = useProfileInitial();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'What do you want to comment?',
      }),
      Mention.extend({
        name: 'userMention',
      }).configure({
        HTMLAttributes: {
          class: 'userMention text-[14px] font-semibold leading-[18px]',
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
    onUpdate({ editor }) {
      const text = editor.getText();
      if (idReply && text === '') {
        setIdReply('');
      }
    },
  });
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
        onCommentImage(url);
      },
      onError: (err: any) => {
        console.log('err', err);
      },
    },
  );
  const onStart = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);
    useUploadImage.run(formData);
  };

  useImperativeHandle(ref, () => {
    return {
      onComment: (value: any, customerId: number, id: string) => onComment(value, customerId, id),
      onReply: () => {
        editor?.commands.focus();
      },
    };
  });
  const onComment = (value: any, customerId: number, id: string) => {
    setIdReply(id);
    scrollToBottom();
    editor?.commands.clearContent();
    editor?.commands.insertContent(
      `<span data-type="userMention" class="userMention text-[14px] font-semibold leading-[18px]" data-id="${customerId}" data-label="${value}" contenteditable="false">@${value}</span>`,
    );
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
        if (imageComment) {
          onCommentImage('');
        }
      },
      onError: (error: any) => {
        if (error.error) {
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
        editor?.commands.clearContent();

        if (imageComment) {
          onCommentImage('');
        }
      },
    },
  );
  const onSend = async () => {
    const users: any = [];
    const stock: any = [];
    const text = editor?.getJSON()?.content?.[0]?.content?.map((item: any) => {
      let p = '';
      if (item.type === 'text') {
        p = item.text;
      }
      if (item.type === 'userMention') {
        const query = item.attrs.label;
        users.push(query);
        p = `@[${item.attrs.label}](${item.attrs.id})`;
      }
      if (item.type === 'stockMention') {
        const query = item.attrs.label;
        stock.push(query);
        p = `%[${item.attrs.label}](${item.attrs.label})`;
      }
      return p;
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
    const message = text?.join('');
    const data = {
      message,
      tagPeople: formatTagPeople,
      tagStocks: stock,
      parentId: idReply === '' ? id : idReply,
      urlImages: [imageComment],
    };
    if (statusUser === USERTYPE.VSD) {
      if (idReply === '') {
        useAddComment.run(data);
      } else {
        useReplyComment.run(data);
      }
    } else {
      PopupComponent.openEKYC();
    }
  };

  return (
    <>
      <div className='mb-[20px] mobile:block mobile:bg-white tablet:flex tablet:px-[16px]  desktop:mt-[12px] desktop:px-0'>
        <img
          src={requestGetProfile?.avatar}
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='mr-[8px] h-[40px] w-[40px] rounded-full object-contain mobile:hidden tablet:block'
        />
        <div
          className='bottom-0 left-0 flex min-h-[40px] justify-between border-[1px] border-solid border-[#E6E6E6] bg-[#FFFFFF] px-[15px] mobile:w-full mobile:rounded-[1000px] tablet:static tablet:rounded-[20px] '
          ref={messagesEndRef}
        >
          <div className='flex min-h-[40px] w-full mobile:items-center tablet:flex-col tablet:items-start tablet:pb-[10px] tablet:pt-[12px]'>
            <Upload
              accept='png, jpeg, jpg'
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
            <EditorContent
              editor={editor}
              className='w-full mobile:max-w-[305px] mobile:px-[5px] desktop:max-w-[500px]'
            />
            <div className='w-full justify-between mobile:hidden tablet:flex'>
              <Upload accept='png, jpeg, jpg' onStart={onStart} beforeUpload={beforeUpload}>
                <img
                  src='/static/icons/iconImage.svg'
                  alt=''
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='mr-[8px] w-[28px]'
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
                  className='w-[19px] cursor-pointer'
                  onClick={onSend}
                />
              )}
            </div>
            {imageComment && (
              <div className='relative'>
                <img
                  src={imageComment}
                  alt=''
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='h-[100px] w-[100px] object-cover mobile:hidden tablet:block'
                />
                <img
                  src='/static/icons/iconCloseWhite.svg'
                  alt=''
                  width={0}
                  height={0}
                  className='absolute -right-[12px] -top-[12px] w-[24px] cursor-pointer'
                  onClick={() => onCommentImage('')}
                />
              </div>
            )}
          </div>

          {useAddComment?.loading || useReplyComment?.loading ? (
            <div className='flex items-center mobile:block tablet:hidden'>
              <Loading />
            </div>
          ) : (
            <img
              src='/static/icons/iconSend.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='w-[19px] cursor-pointer mobile:block tablet:hidden'
              onClick={onSend}
            />
          )}
        </div>
        {imageComment && (
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
              onClick={() => onCommentImage('')}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default forwardRef(Editor);
