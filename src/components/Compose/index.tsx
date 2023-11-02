import React, { useCallback, useMemo, useState } from 'react';

import Document from '@tiptap/extension-document';
import Mention from '@tiptap/extension-mention';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import { PluginKey } from '@tiptap/pm/state';
import { useEditor } from '@tiptap/react';
import { useDeepCompareEffect, useRequest } from 'ahooks';
import classNames from 'classnames';
import { useAtom, useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { RcFile } from 'rc-upload/lib/interface';
import { toast } from 'react-hot-toast';
import request from 'umi-request';

import { PRIVATE_SEARCH, PRIVATE_HASHTAG_V2_COMMUNITY } from '@api/constant';
import { privateRequest, requestCommunity, requestPist } from '@api/request';
import { ActivityTheme } from '@components/Compose/ActivityTheme';
import { ImageTheme } from '@components/Compose/ImageTheme';
import { ListTheme } from '@components/Compose/ListTheme';
import { Metatags } from '@components/Compose/Metatags';
import { ModalAddLink } from '@components/Compose/ModalAddLink/ModalAddLink';
import { UploadImage } from '@components/Compose/UploadImage';
import { ISearch, TYPESEARCH } from '@components/Home/service';
import { IPost, TYPEPOST, getPostDetail } from '@components/Post/service';
import Fade from '@components/UI/Fade';
import IconHashTag from '@components/UI/Icon/IconHashTag';
import { IconSend } from '@components/UI/Icon/IconSend';
import Loading from '@components/UI/Loading';
import Notification from '@components/UI/Notification';
import TextComponent from '@components/UI/Text';
import { userLoginInfoAtom } from '@hooks/useUserLoginInfo';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { postThemeAtom } from '@store/postTheme/theme';
import { profileSettingAtom } from '@store/profileSetting/profileSetting';
import {
  getSeoDataFromLink,
  base64ToBlob,
  compressImage,
  converStringMessageToObject,
  formatMessage,
  isImage,
  toBase64,
  validateHTML,
} from '@utils/common';
import { USERTYPE } from 'src/constant';

import { ActivityWatchlist } from './ActivityWatchlist';
import { serviceAddPost, serviceUpdatePost } from './service';
import Suggestion from './Suggestion';

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
  metadata?: string[];
  hashtags?: any;
}

type TMeta = Array<{
  property?: string;
  content?: string;
}>;

const EditorContainer = dynamic(() => import('@components/Compose/EditorContainer'));

const Compose = (props: IProps) => {
  const { t } = useTranslation(['common', 'home']);

  const { hidePopup, refresh, onGetData, postDetail, isUpdate = false } = props;
  const bgTheme = useAtomValue(postThemeAtom);
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const { statusUser } = useUserType();
  const [profileSetting] = useAtom(profileSettingAtom);
  const [userLoginInfo] = useAtom(userLoginInfoAtom);
  const isCanCompose = profileSetting?.ignore_vsd_validator?.includes(userLoginInfo.cif);
  const objectMessage = converStringMessageToObject(postDetail?.post?.message);
  const message = postDetail?.post?.message && formatMessage(postDetail?.post?.message);

  const postType = postDetail?.postType || '';
  const isShowImageActivities = [
    TYPEPOST.ActivityTheme,
    TYPEPOST.ActivityMatchOrder,
    TYPEPOST.ActivityWatchlist,
  ].includes(postType);
  const isUpdateActivities = isUpdate && isShowImageActivities;

  // @ts-ignore
  const [metaData, setMetaData] = useState<TMeta | null>(() => {
    // Link đầu tiên trong editor
    if (postDetail?.post?.metadata?.length) {
      return JSON.parse(postDetail?.post?.metadata?.[0]);
    }

    // Link khi gắn link
    return undefined;
  });

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

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
        if (refresh) {
          await requestGetDetailPost.runAsync();
        }

        hidePopup && hidePopup();
        setMetaData(null);
        setPostDetailStatus({
          ...postDetailStatus,
          idPostLike: postDetail?.id,
        });
        toast(() => <Notification type='success' message={t('post_update_success_msg')} />);
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

  const requestAddPost = useRequest(
    (data: any) => {
      return serviceAddPost(data);
    },
    {
      manual: true,
      onSuccess: (r: any) => {
        if (r) {
          editor?.commands.clearContent();
          hidePopup && hidePopup();
          setMetaData(null);

          // Refresh when add new post
          if (refresh && r?.data?.id) {
            refresh(r?.data);
          }

          toast(() => <Notification type='success' message={t('post_create_success_msg')} />);
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

  const editor = useEditor(
    {
      extensions: [
        Document,
        Paragraph,
        Text,
        Placeholder.configure({
          placeholder: t('common:create_post_placeholder'),
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
                href: 'javascript:void(0)',
              },
              `@${prop?.node?.attrs?.label}`,
            ];
          },
        }).configure({
          HTMLAttributes: {
            class: '!whitespace-nowrap userMention text-[14px] font-semibold leading-[21px]',
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
              const data = await privateRequest(requestPist.post, PRIVATE_SEARCH, {
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
                href: 'javascript:void(0)',
              },
              `%${prop?.node?.attrs?.label}`,
            ];
          },
        }).configure({
          HTMLAttributes: {
            class: 'stockMention text-[14px] font-semibold leading-[21px]',
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
              const data = await privateRequest(requestPist.post, PRIVATE_SEARCH, {
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
                'data-hashTag': prop?.node?.attrs?.label,
                href: 'javascript:void(0)',
              },
              `${prop?.node?.attrs?.label}`,
            ];
          },
        }).configure({
          HTMLAttributes: {
            // class: 'hashTag text-[14px] font-semibold leading-[21px]',
          },

          suggestion: {
            ...Suggestion,
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
                PRIVATE_HASHTAG_V2_COMMUNITY,
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
          class: 'focus:outline-none h-full composePost',
        },
      },
      // content: `${message || ''}`,
      onUpdate({ editor }) {
        // console.log('🚀 ~ file: index.tsx:346 ~ onUpdate ~ editor:', editor);
        // console.log(editor?.);
        // const typeEditor = editor?.getJSON()?.content?.[0]?.content?.[0]?.type;
        const textCompose = editor?.getText();
        // const numberEditor = editor?.getJSON()?.content?.[0]?.content?.[0]?.attrs?.label?.length;
        // // const textEditor =
        // if (typeEditor === 'hashTagPost' && textCompose?.at(numberEditor + 1) !== ' ') {
        //   editor?.commands?.insertContent(' ');
        // }
        // editor?.commands?.
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

  useDeepCompareEffect(() => {
    editor?.commands?.focus();
  }, [editor]);

  React.useEffect(() => {
    if (isUpdate) {
      editor?.commands?.insertContent(objectMessage);
    }
  }, [editor]);

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
      if (statusUser === USERTYPE.NEW && !isCanCompose) {
        hidePopup && hidePopup();
        setPopupStatus({
          ...popupStatus,
          popupEkyc: true,
        });
        return;
      }

      const users: any = [];
      const stock: any = [];
      const hashtags: any = [];
      const idUser: any = [];

      let imageUploadedUrl = imageUploaded?.url ?? '';

      const handleCompressSuccess = async (file: Blob) => {
        setLoading(false);

        const blobToFile = new File([file], '.' + file.type.split('/')[1], {
          type: file.type,
        });

        const formData = new FormData();
        formData.append('files', blobToFile);

        const resUploadImg = await requestUploadFile.runAsync(formData);

        imageUploadedUrl = resUploadImg?.files?.[0]?.url;
      };

      if (imageUploaded?.file && themeActiveId === 'default') {
        try {
          setLoading(true);

          // compress
          const compressedImage = await compressImage({
            file: imageUploaded?.file,
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
      }

      const url = metaData?.find((it) => it?.property === 'og:url')?.content;

      const urlLinks = [];

      if (url) {
        urlLinks.push(url);
      }
      const test = editor?.getJSON()?.content?.map((item: any) => {
        const abcd = item?.content?.map((text: any) => {
          let p = '';

          if (text.type === 'text' && text?.text !== ' ') {
            const txt = text.text.split(' ');
            for (const item of txt) {
              if (item.includes('http') && urlLinks.length < 2) {
                const index = item.indexOf('http');
                const newUrl = item.slice(index);
                urlLinks.push(newUrl);
              }
              if (item[0] === '#' && !item.includes('http')) {
                hashtags.push(item);
              }
            }

            p = text.text;
          }

          if (text.type === 'userMention') {
            const query = text.attrs.label;
            users.push(query);
            idUser.push(text.attrs.id);
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

          // if (text.type === 'hardBreak') {
          //   p = '\n';
          // }

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
      });

      const message = test?.flat().join('\n').trim();
      const tagPeople = await Promise.all(
        users?.map(async (item: string) => {
          const payload: ISearch = {
            keyword: item,
            searchType: TYPESEARCH.FRIEND,
          };
          const data = await privateRequest(requestPist.post, PRIVATE_SEARCH, {
            data: payload,
          });

          return data?.data?.users;
        }),
      );

      const formatTagPeople = tagPeople
        .flat()
        ?.filter((item) => idUser.includes(item?.id))
        ?.map((item: any) => {
          return {
            avatar: item?.avatar,
            customerId: item?.id,
            id: item?.id,
            displayName: item?.displayName,
            isFeatureProfile: item?.isFeatureProfile,
            isKol: item?.isKol,
            name: item?.name,
            username: item?.username,
            numberFollowers: item?.numberFollowers,
          };
        });

      // const message = test?.flat()?.join('\n');

      const data: IData = {
        message,
        tagPeople: isUpdate
          ? [...postDetail?.post?.tagPeople, ...formatTagPeople]
          : formatTagPeople,
        tagStocks: stock,
        hashtags,
        postThemeId: isUpdate && themeActiveId === 'default' ? '' : themeActiveId,
        // parentId: idReply === '' ? id : idReply,
        urlImages: [imageUploadedUrl],
        urlLinks,
      };
      if (urlLinks?.length && !metaData?.length) {
        const dataSeo = await getSeoDataFromLink(urlLinks[0]);

        if (dataSeo?.length) {
          data.metadata = [JSON.stringify(dataSeo)];
        }
      }

      if (metaData?.length) {
        data.metadata = [JSON.stringify(metaData)];
      }

      if (!urlLinks?.length && !metaData?.length) {
        data.metadata = [];
      }

      if (themeActiveId === 'default' && !isUpdate) {
        data.postThemeId = '';
      }

      if (!imageUploadedUrl) {
        data.urlImages = [];
      }

      if (themeActiveId !== 'default') {
        data.urlImages = [];
        data.urlLinks = [];
      }

      // hide when > 240 characters
      if (!hiddenThemeSelected) {
        data.postThemeId = '';
      }
      if (message?.toLowerCase()?.includes('script')) {
        return toast(() => <Notification type='error' message={t('your_post_should_be_review')} />);
      }
      if (message && validateHTML(message)) {
        return toast(() => <Notification type='error' message={t('your_post_should_be_review')} />);
      }
      if (statusUser === USERTYPE.PENDING_TO_CLOSE && !isCanCompose) {
        return toast(() => (
          <Notification type='error' message={t('message_account_pending_to_close')} />
        ));
      }
      if (statusUser === USERTYPE.VSD || isCanCompose) {
        if (!editor?.getText()) {
          return toast(() => <Notification type='error' message={t('err_add_post')} />);
        }

        if (isUpdate) {
          return requestUpdatePost.run(data);
        }
        return requestAddPost.run(data);
      }
    } catch (error) {
      console.error(error);
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
    if (!hiddenThemeSelected) {
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
    const url = postDetail?.post?.metadataList?.[0]?.url;
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
            <ModalAddLink
              urlLinkInitial={url}
              isUpdateActivities={isUpdateActivities}
              getDataOG={getDataOG}
            />
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
            urlLinkInitial={url}
            isUpdateActivities={isUpdateActivities}
            getDataOG={getDataOG}
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
            <Image
              src={imageUploaded?.url || ''}
              alt=''
              width='0'
              height='0'
              sizes='100vw'
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
          <Image
            src={imageUploaded?.url || ''}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
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
  // const onHandleOnKeyup = (e: any) => {
  //   // console.log('e', e);
  //   // console.log('e', e.keyCode);
  //   if (e.keyCode === 13) {
  //     console.log('123');
  //     editor?.chain()?.setHardBreak();
  //     // editor?.commands().enter();
  //     const lastCharacter = e?.key;
  //     // console.log('🚀 ~ file: index.tsx:346 ~ onUpdate ~ editor:', editor);
  //     // console.log(editor?.);
  //     // const typeEditor = editor?.getJSON()?.content?.[0]?.content?.[0]?.type;
  //     // const textCompose = editor?.getText();
  //     // const numberEditor = editor?.getJSON()?.content?.[0]?.content?.[0]?.attrs?.label?.length;
  //     // // const textEditor =
  //     // if (typeEditor === 'hashTagPost' && textCompose?.at(numberEditor + 1) !== ' ') {
  //     //   editor?.commands?.insertContent(' ');
  //     // }
  //     // const content = editor?.getJSON()?.content;
  //     editor?.getJSON()?.content?.map((item: any) => {
  //       item?.content?.map((text: any, index: number) => {
  //         if (text.type === 'hashTagPost' && index === 0) {
  //           const txt = text.attrs.label;
  //           const lastText = txt.at(-1);
  //           if (lastCharacter === lastText) {
  //             // editor?.commands?.insertContent(' ');
  //             editor?.chain().insertContent(' ').enter();
  //           }
  //           // if (txt?.at(lengthText + 1) !== ' ') {
  //           //   console.log('123', txt);
  //           // }
  //         }
  //         return true;
  //       });
  //       return true;
  //     });
  //   }
  // };
  return (
    <>
      <div className='relative'>
        <EditorContainer
          editor={editor}
          className={classNames(
            'relative z-10 min-h-[250px] overflow-y-auto p-4 px-[5px] galaxy-max:p-2 desktop:min-h-[360px]',
            {
              'desktop:!min-h-[200px]': isShowImageActivities,
            },
          )}
          // onKeyUp={(e) => onHandleOnKeyup(e)}
          style={getStyles() as any}
        />

        <Fade visible={hiddenThemeSelected}>
          <ImageTheme themeActiveId={themeActiveId} />
        </Fade>
      </div>
      {!isShowImageActivities && (
        <>
          <ShowImageUploaded />

          <ShowMetaTagsUpload />
        </>
      )}

      <Fade visible={hiddenThemeSelected && !isShowImageActivities}>
        <ListTheme themeActiveId={themeActiveId} onSelectThemeId={onSelectThemeId} />
      </Fade>

      <Fade visible={isShowImageActivities}>
        {postType === TYPEPOST.ActivityTheme && <ActivityTheme postDetail={postDetail} />}
        {postType === TYPEPOST.ActivityWatchlist && <ActivityWatchlist postDetail={postDetail} />}
      </Fade>

      <div className='my-[16px] block h-[2px] w-full bg-[#EEF5F9]'></div>

      <div className='flex justify-between'>
        <div className='flex gap-x-[6px] galaxy-max:gap-[4px] desktop:gap-x-[16px]'>
          <div
            className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9] galaxy-max:h-[32px] galaxy-max:w-[32px]'
            onClick={onAddPeople}
          >
            <img
              loading='lazy'
              src='/static/icons/explore/iconTagPeople.svg'
              alt=''
              className='w-[20px]'
            />
          </div>

          <div
            className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9] galaxy-max:h-[32px] galaxy-max:w-[32px]'
            onClick={onAddStock}
          >
            <img
              loading='lazy'
              src='/static/icons/explore/iconTagStock.svg'
              alt=''
              className='w-[20px]'
            />
          </div>

          <div
            className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9] galaxy-max:h-[32px] galaxy-max:w-[32px]'
            onClick={onAddHashTag}
          >
            <IconHashTag />
          </div>
          {!isShowImageActivities && <UploadAndAddLink />}
        </div>

        <div
          className={classNames(
            'flex h-[38px] w-[93px] cursor-pointer items-center justify-center rounded-[1000px] bg-[linear-gradient(270deg,_#1D6CAB_0%,_#589DC0_100%)] galaxy-max:h-[32px] galaxy-max:w-[32px]',
            {
              'pointer-events-none':
                requestAddPost?.loading ||
                requestUploadFile.loading ||
                requestUpdatePost.loading ||
                requestGetDetailPost.loading ||
                !editor?.getText() ||
                loading,
              'opacity-60': !editor?.getText(),
            },
          )}
          onClick={onAddPost}
        >
          {requestAddPost?.loading ||
          requestUploadFile.loading ||
          requestUpdatePost.loading ||
          requestGetDetailPost.loading ||
          loading ? (
            <Loading className='!bg-white' />
          ) : (
            <IconSend />
          )}
          <TextComponent
            type='body-14-medium'
            color='cbwhite'
            className='ml-[10px] galaxy-max:hidden'
          >
            {t('post_action')}
          </TextComponent>
        </div>
      </div>
    </>
  );
};

export default Compose;
