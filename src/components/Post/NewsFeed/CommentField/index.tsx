import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react';

import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Mention from '@tiptap/extension-mention';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import { PluginKey } from '@tiptap/pm/state';
import { EditorContent, useEditor } from '@tiptap/react';
import { useClickAway, useRequest, useSize } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
  requestCommunity,
  // requestUploadPhoto,
} from '@api/request';
import { ISearch, TYPESEARCH } from '@components/Home/service';
import { requestAddComment } from '@components/Post/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import CustomImage from '@components/UI/CustomImage';
import Loading from '@components/UI/Loading';
import Notification from '@components/UI/Notification';
import { userLoginInfoAtom } from '@hooks/useUserLoginInfo';
import { popupStatusAtom } from '@store/popup/popup';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { profileSettingAtom } from '@store/profileSetting/profileSetting';
import { USERTYPE } from 'src/constant';

import {
  ROUTE_PATH,
  compressImage,
  isImage,
  isUrlValid,
  validateHTML,
} from '../../../../utils/common';
import suggestion from '../../../Editor/Suggestion';
// import { toBase64 } from '@';

interface IProps {
  id: string;
  refresh: () => void;
  refreshTotal?: () => void;
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
  const router = useRouter();
  const [imageComment, setImageComment] = useState('');
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [userLoginInfo] = useAtom(userLoginInfoAtom);
  const [profileSetting] = useAtom(profileSettingAtom);
  const isCanCompose = profileSetting?.ignore_vsd_validator?.includes(userLoginInfo.cif);
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const [idReply, setIdReply] = React.useState<string>('');
  const messagesEndRef: any = React.useRef(null);
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  };
  // const { statusUser } = useUserType();
  // const { userLoginInfo } = useUserLoginInfo();
  const statusUser = userLoginInfo?.statusUser;
  const AppHardBreak = HardBreak.extend({
    addKeyboardShortcuts() {
      return {
        'Shift-Enter': () => {
          return this.editor.commands.setHardBreak();
        },
        // Enter: ({ editor }) => {
        //   onSend(editor, statusUser);
        //   return true;
        // },
      };
    },
  });
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      AppHardBreak,
      Placeholder.configure({
        placeholder: t('what_do_you_want_to_comment'),
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
      Mention.extend({
        name: 'hashTag',
        renderHTML(prop: any) {
          return [
            'a',
            {
              class: 'hashTag',
              userkey: prop && prop.node?.attrs.id,
              'data-username': prop?.node?.attrs?.label,
              href: 'javascript:void(0)',
            },
            `${prop?.node?.attrs?.label}`,
          ];
        },
      }).configure({
        HTMLAttributes: {
          class: 'hashTag text-[14px] font-semibold leading-[21px]',
        },

        suggestion: {
          ...suggestion,
          pluginKey: new PluginKey('hashTag'),
          char: '#',
          items: async ({ query }: { query: string }) => {
            const payload: any = {
              keyword: `#${query}`,
              page: 0,
              pageSize: 10,
            };
            const data = await privateRequest(
              requestCommunity.post,
              API_PATH.PRIVATE_HASHTAG_V2_COMMUNITY,
              {
                data: payload,
              },
            );
            return data?.data?.hashtags;
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

  const handleCompressSuccess = async (blob: Blob) => {
    setLoading(false);

    const blobToFile = new File([blob], '.' + blob.type.split('/')[1], {
      type: blob.type,
    });

    const formData = new FormData();
    formData.append('files', blobToFile);
    blob && useUploadImage.run(formData);
  };

  const onStart = async (file: File) => {
    try {
      setLoading(true);

      // compress
      const compressedImage = await compressImage({
        file,
        quality: 0.5,
        options: {
          fileType: 'image/jpeg',
        },
      });

      if (compressedImage) {
        await handleCompressSuccess(compressedImage);
      }
    } catch {
      setLoading(false);
      toast.error(t('error'));
    }
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
        `<span data-type="userMention" class="userMention text-[14px] font-semibold leading-[18px]" data-id="${customerId}" data-label="${value}" contenteditable="false">@${value}</span> `,
      );
    } else {
      editor?.commands.clearContent();
      editor?.commands.insertContent(
        `<span data-type="userMention" class="userMention text-[14px] font-semibold leading-[18px]" data-id="${customerId}" data-label="${value}" contenteditable="false">@${value}</span> `,
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
      onSuccess: (r: any) => {
        if (r) {
          refreshTotal && refreshTotal();
          refresh();
          editor?.commands.clearContent();
          setIdReply('');
          if (imageComment) {
            onCloseImage();
          }
          setPostDetailStatus({
            ...postDetailStatus,
            idPostAddComment: id,
          });
        } else {
          toast(() => <Notification type='error' message={t('policy_post')} />);
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

  // handle Click to expand comment
  const [isFocus, setIsFocus] = useState(false);
  const [isClickAway, setIsClickAway] = useState(false);
  const editorRef = useRef(null);
  useClickAway(() => {
    setIsClickAway(true);
  }, messagesEndRef);
  useEffect(() => {
    if (!textComment) {
      if (!editor?.isFocused && isClickAway) {
        setIsFocus(false);
      }
      if (editor?.isFocused && isClickAway) {
        editor.commands.blur();
        setIsFocus(false);
      }
      if (editor?.isFocused && !isClickAway) {
        setIsFocus(true);
        editor?.commands.focus();
      }
      if (useAddComment.loading) {
        setIsFocus(true);
      }
    }
  }, [editor?.isFocused, useAddComment.loading, isClickAway]);

  const size = useSize(editorRef);

  const onSend = async (editor: any, statusUser: any) => {
    const users: any = [];
    const stock: any = [];
    const hashtags: any = [];

    const test = editor?.getJSON()?.content?.map((item: any) => {
      const abcd = item?.content?.map((text: any) => {
        let p = '';
        if (text.type === 'text' && text?.text !== ' ') {
          const txt = text.text.split(' ');
          for (const item of txt) {
            if (item[0] === '#') {
              hashtags.push(item);
            }
          }
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
        if (text.type === 'hashTag') {
          const query = text.attrs.label;
          hashtags.push(query);
          p = text.attrs.label;
        }

        if (text.type === 'hardBreak') {
          p = '\n';
        }
        return p;
      });
      const dataReduce = abcd?.reduce((acc: any, cur: any, index: any) => {
        if (cur === '') {
          const prevIndex = index - 1;

          if (prevIndex >= 0) {
            const item = acc[prevIndex];
            if (item) {
              acc.splice(prevIndex, 1, `${item}`);
            }
          }
          return acc;
        }

        acc.push(cur);

        return acc;
      }, []);
      const dataJoin = dataReduce?.join(' ');
      return dataJoin;
      // return abcd?.join('');
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
    const message = test?.flat()?.join('\n').trim();
    const data = {
      message,
      tagPeople: formatTagPeople,
      tagStocks: stock,
      hashtags,
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
    } else if (message && validateHTML(message)) {
      toast(() => (
        <Notification
          type='error'
          message='Your post should be reviewed due to violation to Pinetree Securities&#39;s policy'
        />
      ));
    } else if (statusUser === USERTYPE.PENDING_TO_CLOSE && !isCanCompose) {
      toast(() => <Notification type='error' message={t('message_account_pending_to_close')} />);
    } else if (statusUser === USERTYPE.VSD || isCanCompose) {
      if (idReply === '') {
        useAddComment.run(data);
      }
    } else {
      setPopupStatus({ ...popupStatus, popupEkyc: true });
    }
  };

  return (
    <>
      <div className=' mb-[20px] mobile:block mobile:bg-white tablet:flex tablet:px-0 desktop:mt-[12px]'>
        {isUrlValid(userLoginInfo?.avatar) ? (
          <CustomImage
            src={userLoginInfo?.avatar || ''}
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='mr-[8px] h-[40px] w-[40px] cursor-pointer rounded-full border border-solid border-[#ebebeb] object-cover mobile:hidden tablet:block'
            onClick={() =>
              router.push(ROUTE_PATH.PROFILE_V2(userLoginInfo?.displayName, userLoginInfo?.id))
            }
          />
        ) : (
          <div
            className='mr-[8px] h-[40px] w-[40px] cursor-pointer rounded-full object-cover mobile:hidden tablet:block'
            onClick={() =>
              router.push(ROUTE_PATH.PROFILE_V2(userLoginInfo?.displayName, userLoginInfo?.id))
            }
          >
            <AvatarDefault name={userLoginInfo?.displayName} />
          </div>
        )}
        <div
          className={classNames(
            'bottom-0 left-0 flex  min-h-[40px] flex-1 items-center justify-between border-[1px] border-solid border-[#E6E6E6] bg-[#FFFFFF] px-[15px]  mobile:w-full mobile:rounded-[1000px] tablet:static ',
            {
              'tablet:rounded-full': !isFocus,
              'tablet:rounded-[12px]': isFocus,
              'tablet-max:rounded-[12px]': isFocus && size?.height && size?.height > 40,
            },
          )}
          ref={messagesEndRef}
        >
          <div
            className={classNames(
              'flex w-full  tablet:flex-col tablet:items-start tablet:pb-[10px] ',
              {
                'tablet:pt-[12px]': isFocus,
                'tablet:pt-[10px]': !isFocus,
              },
            )}
          >
            {/* mobile upload image button */}
            <div className='flex flex-row items-center'>
              <Upload
                // accept='.png, .jpeg, .jpg, .webp'
                accept='.png, .jpeg, .jpg'
                onStart={onStart}
                beforeUpload={beforeUpload}
                className='tablet:hidden'
              >
                <Image
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
            <div
              ref={editorRef}
              onClick={() => {
                editor?.commands.focus();
                setIsFocus(true);
                setIsClickAway(false);
              }}
              className='flex w-full cursor-text items-center justify-between galaxy-max:py-2'
            >
              <EditorContent
                editor={editor}
                className={classNames(
                  ' tablet-max:no-scrollbar my-[4px] max-h-[108px]  w-full flex-1 flex-col items-start justify-start overflow-y-auto break-words mobile:flex mobile:w-[calc(100%_-_50px)] mobile:px-[5px] tablet-max:max-h-[80px]  tablet:max-w-[500px]',
                  {
                    // 'tablet:mt-[3px]': isFocus,
                  },
                )}
              />
              <Upload
                className={classNames({ hidden: isFocus })}
                // accept='.png, .jpeg, .jpg, .webp'
                accept='.png, .jpeg, .jpg'
                onStart={onStart}
                beforeUpload={beforeUpload}
              >
                <img
                  src='/static/icons/iconCamera.svg'
                  alt=''
                  width='0'
                  height='0'
                  sizes='100vw'
                  className={classNames(
                    ' flex h-[21px] w-[24px] cursor-pointer items-center object-contain tablet-max:hidden',
                  )}
                />
              </Upload>
            </div>

            <div
              className={classNames(
                'w-full justify-between transition-all duration-300 mobile:hidden tablet:flex  ',
                {
                  'h-0 overflow-hidden tablet:opacity-0': !isFocus,
                  'tablet:opacity-1 h-auto ': isFocus,
                },
              )}
            >
              <Upload
                // accept='.png, .jpeg, .jpg, .webp'
                accept='.png, .jpeg, .jpg'
                onStart={onStart}
                beforeUpload={beforeUpload}
              >
                <img
                  src='/static/icons/iconCamera.svg'
                  alt=''
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='mr-[8px] mt-[12px] h-[21px] w-[24px] object-contain'
                />
              </Upload>
              {useAddComment?.loading ? (
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
                  onClick={() => onSend(editor, statusUser)}
                />
              )}
            </div>
            {useUploadImage?.loading || loading ? (
              <div className='mobile:hidden tablet:block'>
                <Loading />
              </div>
            ) : (
              imageComment && (
                <div className='relative'>
                  <Image
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

          {useAddComment?.loading ? (
            <div className='flex items-center tablet:hidden'>
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
              onClick={() => onSend(editor, statusUser)}
            />
          )}
        </div>
        {useUploadImage?.loading || loading ? (
          <div className='mobile:block tablet:hidden'>
            <Loading />
          </div>
        ) : (
          imageComment && (
            <div className='relative'>
              <Image
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
