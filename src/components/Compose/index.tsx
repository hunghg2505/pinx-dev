/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo, useState } from 'react';

import Mention from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import { PluginKey } from '@tiptap/pm/state';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useAtom, useAtomValue } from 'jotai';
import { useTranslation } from 'next-i18next';
import { RcFile } from 'rc-upload/lib/interface';
import { toast } from 'react-hot-toast';
import request from 'umi-request';

import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity, requestPist } from '@api/request';
import { ActivityTheme } from '@components/Compose/ActivityTheme';
import { ImageTheme } from '@components/Compose/ImageTheme';
import { ListTheme } from '@components/Compose/ListTheme';
import { Metatags } from '@components/Compose/Metatags';
import { ModalAddLink } from '@components/Compose/ModalAddLink/ModalAddLink';
import { UploadImage } from '@components/Compose/UploadImage';
import Suggestion from '@components/Editor/Suggestion';
import { ISearch, TYPESEARCH } from '@components/Home/service';
import { IPost, getPostDetail } from '@components/Post/service';
import Fade from '@components/UI/Fade';
import IconHashTag from '@components/UI/Icon/IconHashTag';
import { IconSend } from '@components/UI/Icon/IconSend';
import Loading from '@components/UI/Loading';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { postThemeAtom } from '@store/postTheme/theme';
import { base64ToBlob, formatMessage, isImage, toBase64 } from '@utils/common';
import { USERTYPE } from '@utils/constant';

import { serviceAddPost, serviceUpdatePost } from './service';

interface IProps {
  hidePopup?: () => void;
  refresh?: (data: IPost) => void;
  onGetData?: (value: any) => void;
  postDetail?: any;
  isUpdate?: boolean;
}

interface IData {
  message: string | undefined;
  postThemeId?: string;
  category?: string;
  tagPeople: any;
  tagStocks: any;
  urlImages?: string[];
  urlLinks?: any;
}

type TMeta = Array<{
  property?: string;
  content?: string;
}>;

const Compose = (props: IProps) => {
  const { t } = useTranslation(['common', 'home']);
  const { hidePopup, refresh, onGetData, postDetail, isUpdate = false } = props;
  const bgTheme = useAtomValue(postThemeAtom);
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { statusUser } = useUserType();

  const urlLinkInitial = postDetail?.post?.urlLinks?.[0] || '';

  const message =
    postDetail?.post?.message && formatMessage(postDetail?.post?.message, postDetail?.post);

  const postType = postDetail?.postType || '';

  const isUpdateActivities = isUpdate && postType === 'ActivityTheme';

  const [metaData, setMetaData] = useState<TMeta | null>();

  const themeActive = bgTheme?.find((item) => item.code === 'default');

  const { themeIdDefault } = useMemo(() => {
    return {
      themeIdDefault: postDetail?.post?.postThemeId || 'default',
    };
  }, [postDetail?.post?.postThemeId]);

  const [themeActiveId, setActiveThemeId] = useState(themeIdDefault || 'default');
  const [hiddenThemeSelected, setHiddenThemeSelected] = useState(true);

  const [imageUploaded, setImageUploaded] = useState<{ file?: any; url?: string }>({
    file: '',
    url: postDetail?.post?.urlImages?.[0] || '',
  });

  const requestUploadFile = useRequest(
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
    },
  );

  const requestGetDetailPost = useRequest(
    () => {
      return getPostDetail(postDetail.id);
    },
    {
      manual: true,
      onSuccess: (r) => {
        if (r?.data?.id && refresh) {
          refresh(r?.data);
        }
      },
    },
  );

  const requestUpdatePost = useRequest(
    (data: any) => {
      return serviceUpdatePost(postDetail?.id, data);
    },
    {
      manual: true,
      onSuccess: async () => {
        await requestGetDetailPost.runAsync();

        hidePopup && hidePopup();
        setMetaData(null);

        toast(() => <Notification type='success' message={t('post_update_success_msg')} />);
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

  const requestAddPost = useRequest(
    (data: any) => {
      return serviceAddPost(data);
    },
    {
      manual: true,
      onSuccess: (r: any) => {
        editor?.commands.clearContent();
        hidePopup && hidePopup();
        setMetaData(null);

        // Refresh when add new post
        if (refresh && r?.data?.id) {
          refresh(r?.data);
        }

        toast(() => <Notification type='success' message={t('post_create_success_msg')} />);
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

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: t('home:create_post_placeholder'),
          emptyEditorClass: 'is-editor-empty',
        }),
        Mention.extend({
          name: 'userMention',
          renderHTML(prop: any) {
            return [
              'a',
              {
                style: 'font-weight:600;',
                class: 'userName',
                userkey: prop && prop.node?.attrs?.id,
                'data-username': prop?.node.attrs?.label,
                'data-linked-resource-type': 'userinfo',
                href: `/profile/${prop?.node.attrs?.id}`,
              },
              `@${prop?.node?.attrs?.label}`,
            ];
          },
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
          renderHTML(prop: any) {
            return [
              'a',
              {
                style: 'font-weight:600;',
                class: 'stockMention',
                userkey: prop && prop.node?.attrs.id,
                'data-username': prop?.node?.attrs?.label,
                'data-linked-resource-type': 'userinfo',
                href: `/stock/${prop?.node?.attrs?.label}`,
              },
              `%${prop?.node?.attrs?.label}`,
            ];
          },
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
        Mention.extend({
          name: 'hashTag',
        }).configure({
          HTMLAttributes: {
            class: 'hashTag text-[14px] font-semibold leading-[18px]',
          },
          renderLabel({ options, node }) {
            return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`;
          },
          suggestion: {
            ...Suggestion,
            pluginKey: new PluginKey('hashTag'),
            char: '#',
            items: async ({ query }: { query: string }) => {
              const data = await privateRequest(
                requestCommunity.post,
                API_PATH.PRIVATE_HASHTAG_SUGGEST,
                {
                  data: {
                    keyword: query,
                  },
                },
              );

              return data?.data?.list;
            },
          },
        }),
      ],
      editorProps: {
        attributes: {
          class: 'focus:outline-none h-full',
        },
      },
      content: `${message || ''}`,
      onUpdate({ editor }) {
        const textCompose = editor?.getText();
        const length = textCompose?.length;
        if (length > 254) {
          setHiddenThemeSelected(false);
        } else {
          setHiddenThemeSelected(true);
        }
        onGetData && onGetData(editor?.getText());
      },
    },
    [message],
  );

  const themeSelected: any = useMemo(() => {
    if (themeActiveId === 'default') {
      return '';
    }
    return bgTheme?.find((it) => it?.id === themeActiveId);
  }, [themeActiveId]);

  const getDataOG = (value: any) => {
    setMetaData(value);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = isImage(file);
    if (!isJpgOrPng) {
      toast(() => <Notification type='error' message={t('not_image')} />);
    }
    return isJpgOrPng;
  };

  const onSelectThemeId = (id: string) => () => {
    setActiveThemeId(id);
  };

  const onStart = async (file: File) => {
    const base64 = await toBase64(file);

    const url = base64ToBlob(base64, file.type);

    setImageUploaded({
      file,
      url,
    });
  };

  const onAddPost = async () => {
    try {
      if (statusUser === USERTYPE.NEW) {
        hidePopup && hidePopup();
        setPopupStatus({
          ...popupStatus,
          popupEkyc: true,
        });
        return;
      }

      const users: any = [];
      const stock: any = [];

      const messageHtml = editor?.getHTML();

      let imageUploadedUrl = imageUploaded?.url ?? '';
      if (imageUploaded?.file && themeActiveId === 'default') {
        const formData = new FormData();
        formData.append('files', imageUploaded?.file);

        const resUploadImg = await requestUploadFile.runAsync(formData);

        imageUploadedUrl = resUploadImg?.files?.[0]?.url;
      }

      const url = metaData?.find((it) => it?.property === 'og:url')?.content;

      const urlLinks = [];
      if (urlLinkInitial) {
        urlLinks.push(urlLinkInitial);
      }
      if (url) {
        urlLinks.push(url);
      }

      const test = editor?.getJSON()?.content?.map((item: any) => {
        const abcd = item?.content?.map((text: any) => {
          let p = '';

          if (text.type === 'text') {
            const txt = text.text.split(' ');
            for (const item of txt) {
              if (item.includes('http') && urlLinks.length < 2) {
                urlLinks.push(item);
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

          if (text.type === 'hardBreak') {
            p = '\n';
          }

          return p;
        });
        return abcd?.join('');
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
        message: messageHtml,
        tagPeople: formatTagPeople,
        tagStocks: stock,
        postThemeId: isUpdate && themeActiveId === 'default' ? '' : themeActiveId,
        // parentId: idReply === '' ? id : idReply,
        urlImages: [imageUploadedUrl],
        urlLinks,
      };
      console.log('data', data);
      if (themeActiveId === 'default' && !isUpdate) {
        delete data?.postThemeId;
      }

      if (!imageUploadedUrl) {
        delete data?.urlImages;
      }

      if (themeActiveId !== 'default') {
        delete data?.urlImages;
        delete data?.urlLinks;
      }

      // hide when > 240 characters
      if (!hiddenThemeSelected) {
        data.postThemeId = 'default';
      }

      if (message?.toLowerCase()?.includes('script')) {
        return toast(() => (
          <Notification
            type='error'
            message='Your post should be reviewed due to violation to Pinetree Securities&#39;s policy'
          />
        ));
      }

      if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
        return toast(() => (
          <Notification
            type='error'
            message='Your account has been pending to close. You cannot perform this action'
          />
        ));
      }

      if (statusUser === USERTYPE.VSD) {
        if (!editor?.getText()) {
          return toast(() => <Notification type='error' message={t('err_add_post')} />);
        }

        if (isUpdate) {
          return requestUpdatePost.run(data);
        }

        requestAddPost.run(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAddPeople = async () => {
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

  const onAddHashTag = () => {
    editor?.commands?.focus('end');
    const text = editor?.getText();
    if (text) {
      editor?.commands?.insertContent(' #');
    } else {
      editor?.commands?.insertContent('#');
    }
  };

  const getStyles = () => {
    if (!hiddenThemeSelected && themeSelected?.textAlign) {
      return {
        textAlign: 'left',
      };
    }

    return {
      color: hiddenThemeSelected && themeSelected?.color?.code,
      fontSize: hiddenThemeSelected && (themeSelected?.fontSize || 16),
      lineHeight: hiddenThemeSelected && themeSelected?.lineHeight,
      fontWeight: hiddenThemeSelected && themeSelected?.fontWeight,
      textAlign: hiddenThemeSelected && (themeSelected?.textAlign || 'left'),
      verticalAlign: hiddenThemeSelected && (themeSelected?.verticalAlign || 'top'),
    };
  };

  const UploadAndAddLink = useCallback(() => {
    if (!hiddenThemeSelected && themeSelected?.id) {
      return (
        <>
          <div>
            <UploadImage
              themeActive={themeActive}
              isUpdateActivities={isUpdateActivities}
              onStart={onStart}
              beforeUpload={beforeUpload}
            />
          </div>

          <div>
            <ModalAddLink isUpdateActivities={isUpdateActivities} getDataOG={getDataOG} />
          </div>
        </>
      );
    }

    return (
      <>
        <Fade visible={!themeSelected?.id}>
          <UploadImage
            themeActive={themeActive}
            isUpdateActivities={isUpdateActivities}
            onStart={onStart}
            beforeUpload={beforeUpload}
          />
        </Fade>

        <Fade visible={!themeSelected?.id}>
          <ModalAddLink
            isUpdateActivities={isUpdateActivities}
            getDataOG={getDataOG}
            urlLinkInitial={urlLinkInitial}
          />
        </Fade>
      </>
    );
  }, [themeSelected?.id, hiddenThemeSelected]);

  const ShowImageUploaded = useCallback(() => {
    if (!hiddenThemeSelected && themeSelected) {
      return (
        <>
          <div className='relative flex items-center justify-between overflow-hidden rounded-[9px] border-[1px] border-solid border-[#EBEBEB]'>
            <img
              src={imageUploaded?.url}
              alt=''
              className='max-h-[280px] w-full rounded-[8px] object-contain'
            />
            <img
              src='/static/icons/explore/iconClose.svg'
              alt=''
              className='absolute right-[10px] top-[10px] z-[2] h-[20px] w-[20px] cursor-pointer'
              onClick={() => setImageUploaded({ file: '', url: '' })}
            />
          </div>
        </>
      );
    }

    return (
      <Fade visible={!!imageUploaded?.url && themeActiveId === 'default'}>
        <div className='relative flex items-center justify-between overflow-hidden rounded-[9px] border-[1px] border-solid border-[#EBEBEB]'>
          <img
            src={imageUploaded?.url}
            alt=''
            className='max-h-[280px] w-full rounded-[8px] object-contain'
          />
          <img
            src='/static/icons/explore/iconClose.svg'
            alt=''
            className='absolute right-[10px] top-[10px] z-[2] h-[20px] w-[20px] cursor-pointer'
            onClick={() => setImageUploaded({ file: '', url: '' })}
          />
        </div>
      </Fade>
    );
  }, [hiddenThemeSelected, themeSelected, imageUploaded?.url, themeActiveId]);

  const ShowMetaTagsUpload = useCallback(() => {
    if (!hiddenThemeSelected && themeSelected) {
      return (
        <>
          <Metatags metaData={metaData as TMeta} setMetaData={setMetaData} />
        </>
      );
    }

    return (
      <Fade visible={!!metaData?.length && themeActiveId === 'default'}>
        <Metatags metaData={metaData as TMeta} setMetaData={setMetaData} />
      </Fade>
    );
  }, [hiddenThemeSelected, themeSelected, metaData, themeActiveId]);

  return (
    <>
      <div className='relative'>
        <EditorContent
          editor={editor}
          className={classNames(
            'relative z-10 min-h-[250px] overflow-y-auto p-4 px-[5px] desktop:min-h-[360px]',
          )}
          style={getStyles() as any}
        />

        <Fade visible={hiddenThemeSelected}>
          <ImageTheme themeActiveId={themeActiveId} />
        </Fade>
      </div>

      <ShowImageUploaded />

      <ShowMetaTagsUpload />

      <Fade visible={hiddenThemeSelected}>
        <ListTheme themeActiveId={themeActiveId} onSelectThemeId={onSelectThemeId} />
      </Fade>

      <Fade visible={postType === 'ActivityTheme'}>
        <ActivityTheme postDetail={postDetail} />
      </Fade>

      <div className='my-[16px] block h-[2px] w-full bg-[#EEF5F9]'></div>

      <div className='flex justify-between'>
        <div className='flex gap-x-[6px] desktop:gap-x-[16px]'>
          <div
            className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9]'
            onClick={onAddPeople}
          >
            <img src='/static/icons/explore/iconTagPeople.svg' alt='' className='w-[20px]' />
          </div>

          <div
            className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9]'
            onClick={onAddStock}
          >
            <img src='/static/icons/explore/iconTagStock.svg' alt='' className='w-[20px]' />
          </div>

          <div
            className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9]'
            onClick={onAddHashTag}
          >
            <IconHashTag />
          </div>

          <UploadAndAddLink />
        </div>

        <div
          className={classNames(
            'flex h-[38px] w-[93px] cursor-pointer items-center justify-center rounded-[1000px] bg-[linear-gradient(270deg,_#1D6CAB_0%,_#589DC0_100%)]',
            {
              'pointer-events-none':
                requestAddPost?.loading ||
                requestUploadFile.loading ||
                requestUpdatePost.loading ||
                requestGetDetailPost.loading,
            },
          )}
          onClick={onAddPost}
        >
          {requestAddPost?.loading ||
          requestUploadFile.loading ||
          requestUpdatePost.loading ||
          requestGetDetailPost.loading ? (
            <Loading />
          ) : (
            <IconSend />
          )}
          <Text type='body-14-medium' color='cbwhite' className='ml-[10px]'>
            {t('post_action')}
          </Text>
        </div>
      </div>
    </>
  );
};

export default Compose;
