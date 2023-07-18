/* eslint-disable import/no-named-as-default */
import React from 'react';

import Mention from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import { PluginKey } from '@tiptap/pm/state';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import Upload from 'rc-upload';
import { RcFile } from 'rc-upload/lib/interface';
import { toast } from 'react-hot-toast';
import request from 'umi-request';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import Suggestion from '@components/Editor/Suggestion';
import { ISearch, TYPESEARCH } from '@components/Home/service';
import Loading from '@components/UI/Loading';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { postThemeAtom } from '@store/postTheme/theme';
import { isImage } from '@utils/common';
import { USERTYPE } from '@utils/constant';
import PopupComponent from '@utils/PopupComponent';

import styles from './index.module.scss';
import { requestAddPost } from './service';

const IconSend = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9.9047 16C9.61745 16 9.3523 15.8377 9.22277 15.5787L6.96137 11.0558C6.83718 10.8074 6.85851 10.5103 7.01623 10.2809L10.6666 5.33291L5.71791 8.98258C5.48857 9.14106 5.19141 9.16087 4.94303 9.03744L0.420987 6.77677C0.149741 6.64039 -0.0155976 6.35618 0.00116477 6.05293C0.0171653 5.74968 0.212981 5.48453 0.497941 5.38015L14.9746 0.046599C15.2527 -0.0547384 15.5658 0.0115499 15.7769 0.222606C15.9872 0.432138 16.0557 0.746056 15.9529 1.02492L10.6194 15.5017C10.5142 15.7867 10.2499 15.9825 9.9466 15.9985C9.93289 15.9992 9.91841 16 9.9047 16Z'
      fill='white'
    />
  </svg>
);
const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = isImage(file);
  // if (!isJpgOrPng) {
  //   console.log('Không phải ảnh');
  // }
  return isJpgOrPng;
};
interface IProps {
  hidePopup: () => void;
  refresh?: () => void;
}
interface IData {
  message: string | undefined;
  postThemeId?: string;
  category?: string;
  tagPeople: any;
  tagStocks: any;
  urlImages?: string[];
}
const Compose = (props: IProps) => {
  const { hidePopup, refresh } = props;
  const [isShowMore, setIsShowMore] = React.useState(false);
  const [activeTheme, setActiveTheme] = React.useState('default');
  const [image, setImage] = React.useState<string>('');
  const bgTheme = useAtomValue(postThemeAtom);
  const themeActive = bgTheme?.find((item) => item.code === activeTheme);
  const { statusUser } = useUserType();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Use % to mention a stock, # to hashtag an article, @ to mention someone else',
        emptyEditorClass: 'is-editor-empty',
      }),
      Mention.extend({
        name: 'userMention',
      }).configure({
        HTMLAttributes: {
          class: '!whitespace-nowrap userMention text-[14px] font-semibold leading-[18px]',
        },
        suggestion: {
          ...Suggestion,
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
          ...Suggestion,
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
        class: 'focus:outline-none h-full',
      },
    },
  });
  const showMore = () => {
    setIsShowMore(!isShowMore);
  };
  const onSelectTheme = (code: string) => {
    setActiveTheme(code);
  };
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
        if (url) {
          setImage(url);
        } else {
          toast(() => <Notification type='error' message={res?.files?.[0]?.message} />);
        }
      },
    },
  );
  const useAddPost = useRequest(
    (data: any) => {
      return requestAddPost(data);
    },
    {
      manual: true,
      onSuccess: () => {
        editor?.commands.clearContent();
        hidePopup && hidePopup();
        refresh && refresh();
        toast(() => <Notification type='success' message='Post is created successfully' />);
      },
      onError: (error: any) => {
        if (error?.error === 'VSD account is required') {
          toast(() => (
            <Notification
              type='error'
              message='Your account has been pending to close. You cannot perform this action'
            />
          ));
        } else {
          toast(() => <Notification type='error' message={error.error} />);
        }
      },
    },
  );
  const onStart = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);
    // const imgToBase64 = await toBase64(file);
    // const urlImage = await base64ToBlob(imgToBase64, file.type);
    // setImage(urlImage);
    // setFile(formData);
    useUploadImage.run(formData);
  };
  const addPost = async () => {
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
    const message = test?.flat()?.join('\n');
    const data: IData = {
      message,
      tagPeople: formatTagPeople,
      tagStocks: stock,
      postThemeId: themeActive?.id,
      // parentId: idReply === '' ? id : idReply,
      urlImages: [image],
    };
    if (activeTheme === 'default') {
      delete data?.postThemeId;
    }
    if (!image) {
      delete data?.urlImages;
    }
    if (message?.toLowerCase()?.includes('script')) {
      toast(() => (
        <Notification
          type='error'
          message='Your post should be reviewed due to violation to Pinetree Securities&#39;s policy'
        />
      ));
    } else if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
      toast(() => (
        <Notification
          type='error'
          message='Your account has been pending to close. You cannot perform this action'
        />
      ));
    } else if (statusUser === USERTYPE.VSD) {
      useAddPost.run(data);
    } else {
      hidePopup && hidePopup();
      PopupComponent.openEKYC();
    }
  };
  const onAddPeople = () => {
    const text = editor?.getText();
    editor?.commands?.focus('end');
    if (text) {
      editor?.commands?.insertContent(' @');
    } else {
      editor?.commands?.insertContent('@');
    }
  };
  const onAddStock = () => {
    editor?.commands?.focus('end');
    const text = editor?.getText();
    if (text) {
      editor?.commands?.insertContent(' %');
    } else {
      editor?.commands?.insertContent('%');
    }
  };

  return (
    <>
      <div className='relative h-[208px]'>
        <EditorContent
          editor={editor}
          className={classNames('relative z-10 h-full', {
            [`text-center text-[${themeActive?.color?.code}] pt-[20px] text-[${themeActive?.fontSize}] leading-[${themeActive?.lineHeight}] ${themeActive?.code}`]:
              themeActive && activeTheme !== 'default',
            'text-left': activeTheme === 'default',
          })}
        />
        {themeActive && (
          <img
            src={themeActive?.bgImage}
            alt=''
            className='pointer-events-none absolute left-0 top-0 z-[1] h-full w-full object-cover'
          />
        )}
      </div>
      {useUploadImage?.loading ? (
        <Loading />
      ) : (
        image && (
          <div className='flex items-center justify-between'>
            <img src={image} alt='' className='h-[90px] w-[58px]' />
            <img
              src='/static/icons/explore/iconClose.svg'
              alt=''
              className='h-[20px] w-[20px] cursor-pointer'
              onClick={() => setImage('')}
            />
          </div>
        )
      )}

      <div className='mt-[20px] flex gap-x-[10px] overflow-x-auto'>
        <div
          className='w-[38px] cursor-pointer rounded-[10px] bg-[#F7F6F8] p-[8px] [box-shadow:0px_2px_12px_0px_rgba(0,_0,_0,_0.07),_0px_0.5px_2px_0px_rgba(0,_0,_0,_0.12)]'
          onClick={showMore}
        >
          <img src='/static/icons/explore/iconCompose.svg' alt='' className='h-[22px] w-[22px]' />
        </div>
        <div
          className={classNames(
            'w-[calc(100%_-_50px)] overflow-auto whitespace-nowrap text-left',
            styles.listItem,
          )}
        >
          <div
            className={classNames(
              'mr-[10px] inline-block h-[38px] w-[38px] cursor-pointer rounded-[10px]  bg-[#EBEBEB] [box-shadow:0px_2px_12px_0px_rgba(0,_0,_0,_0.07),_0px_0.5px_2px_0px_rgba(0,_0,_0,_0.12)]',
              { 'border-[2px] border-solid border-[#FFF]': activeTheme === 'default' },
            )}
            onClick={() => onSelectTheme('default')}
          ></div>
          {bgTheme?.map((item: any, index: number) => {
            return (
              <div
                className={classNames(
                  'relative mr-[10px] inline-block h-[38px] w-[38px] cursor-pointer rounded-[10px] [box-shadow:0px_2px_12px_0px_rgba(0,_0,_0,_0.07),_0px_0.5px_2px_0px_rgba(0,_0,_0,_0.12)]',
                  { 'border-[2px] border-solid border-[#FFF]': item.code === activeTheme },
                )}
                key={index}
                onClick={() => onSelectTheme(item.code)}
              >
                <img
                  src={item.bgImage}
                  alt=''
                  className='absolute left-0 top-0 h-full w-full rounded-[10px]'
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className='my-[16px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      <div className='flex justify-between'>
        <div className='flex gap-x-[16px]'>
          {!themeActive && (
            <Upload
              accept='.png, .jpeg, .jpg'
              onStart={onStart}
              beforeUpload={beforeUpload}
              className=''
            >
              <div className='flex h-[38px] w-[38px] items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9]'>
                <img src='/static/icons/explore/iconImage.svg' alt='' className='w-[20px]' />
              </div>
            </Upload>
          )}
          <div
            className='flex h-[38px] w-[38px] items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9]'
            onClick={onAddPeople}
          >
            <img src='/static/icons/explore/iconTagPeople.svg' alt='' className='w-[20px]' />
          </div>

          <div
            className='flex h-[38px] w-[38px] items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9]'
            onClick={onAddStock}
          >
            <img src='/static/icons/explore/iconTagStock.svg' alt='' className='w-[20px]' />
          </div>

          {!themeActive && (
            <div className='flex h-[38px] w-[38px] items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9]'>
              <img src='/static/icons/explore/iconLink.svg' alt='' className='w-[20px]' />
            </div>
          )}
        </div>
        <div
          className='flex h-[38px] w-[93px] cursor-pointer items-center justify-center rounded-[1000px] bg-[linear-gradient(270deg,_#1D6CAB_0%,_#589DC0_100%)]'
          onClick={addPost}
        >
          {useAddPost?.loading ? <Loading /> : <IconSend />}
          <Text type='body-14-medium' color='cbwhite' className='ml-[10px]'>
            Post
          </Text>
        </div>
      </div>
    </>
  );
};
export default Compose;
