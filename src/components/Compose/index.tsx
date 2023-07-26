/* eslint-disable unicorn/no-null */
/* eslint-disable react/prop-types */
/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable import/no-named-as-default */
import React, { useEffect, useMemo, useState } from 'react';

import Mention from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import { PluginKey } from '@tiptap/pm/state';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'next-i18next';
import Upload from 'rc-upload';
import { RcFile } from 'rc-upload/lib/interface';
import { toast } from 'react-hot-toast';
import request from 'umi-request';

import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity, requestPist } from '@api/request';
import Suggestion from '@components/Editor/Suggestion';
import { ISearch, TYPESEARCH } from '@components/Home/service';
import Fade from '@components/UI/Fade';
import { IconSend } from '@components/UI/Icon/IconSend';
import Loading from '@components/UI/Loading';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { postThemeAtom } from '@store/postTheme/theme';
import { formatMessage, isImage } from '@utils/common';
import { USERTYPE } from '@utils/constant';
import PopupComponent from '@utils/PopupComponent';

import styles from './index.module.scss';
import ModalLink from './ModalLink';
import { requestAddPost, requestUpdatePost } from './service';

interface IProps {
  hidePopup?: () => void;
  refresh?: () => void;
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

const ImageTheme = ({ url }: { url: string }) => {
  if (!url) {
    return <></>;
  }

  return (
    <img
      src={url}
      alt=''
      className='pointer-events-none absolute left-0 top-0 z-[1] h-full w-full object-cover'
    />
  );
};

const UploadImage = ({ themeActive, isUpdateActivities, onStart, beforeUpload }: any) => {
  if (themeActive || (!themeActive && isUpdateActivities)) {
    return <></>;
  }

  return (
    <>
      <Upload accept='.png, .jpeg, .jpg' onStart={onStart} beforeUpload={beforeUpload} className=''>
        <div className='flex h-[38px] w-[38px] items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9]'>
          <img src='/static/icons/explore/iconImage.svg' alt='' className='w-[20px]' />
        </div>
      </Upload>
    </>
  );
};

const ModalAddLink = ({ themeActive, isUpdateActivities, getDataOG }: any) => {
  if (themeActive || (!themeActive && isUpdateActivities)) {
    return <></>;
  }

  return (
    <ModalLink getDataOG={getDataOG}>
      <div className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9]'>
        <img src='/static/icons/explore/iconLink.svg' alt='' className='w-[20px]' />
      </div>
    </ModalLink>
  );
};

const ActivityTheme = ({ postDetail }: any) => {
  return (
    <div className='relative flex h-[205px] w-full rounded-lg'>
      <img
        src={postDetail?.post?.bgImage}
        alt=''
        className='absolute left-0 top-0 h-full w-full rounded-lg object-cover'
      />
      <div className='my-[18px] ml-[20px] flex w-[120px] flex-col items-center justify-around rounded-lg bg-[rgba(248,248,248,0.50)] px-2 backdrop-blur-[1px]'>
        <img
          src={
            postDetail?.post?.action === 'SUBSCRIBLE'
              ? '/static/icons/Lotus-gray.svg'
              : '/static/icons/Lotus-blue.svg'
          }
          alt=''
          className='mx-auto h-[22px] w-[22px] rounded-full bg-white'
        />
        <Text type='body-12-medium' className='mt'>
          {postDetail?.post?.action === 'UNSUBSCRIBE' ? 'Unsubscribe' : 'Subscribe'}
        </Text>
        <Text type='body-12-bold' className='text-center'>
          {postDetail?.post.themeName}
        </Text>
      </div>
    </div>
  );
};

const ListTheme = ({ showMore, isShowMore, bgTheme, activeTheme, onSelectTheme }: any) => {
  return (
    <div className='mt-[20px] flex h-[42px] gap-x-[10px] overflow-x-auto'>
      <div
        className='w-[38px] cursor-pointer rounded-[10px] bg-[#F7F6F8] p-[8px] [box-shadow:0px_2px_12px_0px_rgba(0,_0,_0,_0.07),_0px_0.5px_2px_0px_rgba(0,_0,_0,_0.12)]'
        onClick={showMore}
      >
        <img src='/static/icons/explore/iconCompose.svg' alt='' className='h-[22px] w-[22px]' />
      </div>
      {isShowMore && (
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
      )}
    </div>
  );
};

const Metatags = ({
  metaData,
  setMetaData,
}: {
  metaData?: TMeta;
  setMetaData: (v: any) => void;
}) => {
  const data = useMemo(() => {
    if (!metaData?.length) {
      return;
    }

    const url = metaData?.find((it) => it?.property === 'og:url')?.content;
    const imageUrl = metaData?.find((it) => it?.property === 'og:image')?.content;
    const title = metaData?.find((it) => it?.property === 'og:title')?.content;
    const description = metaData?.find((it) => it?.property === 'og:description')?.content;

    return {
      url,
      imageUrl,
      title,
      description,
    };
  }, [metaData]);

  if (!data) {
    return <></>;
  }

  const { url, imageUrl, title, description } = data;

  return (
    <>
      <div className='my-[12px] block h-[2px] w-full bg-[#EEF5F9]'></div>

      <div className='relative'>
        <div className='w-full overflow-hidden rounded-[9px] border-[1px] border-solid border-[#EBEBEB] bg-white'>
          {imageUrl && <img src={imageUrl} alt='' className='h-[200px] w-full object-cover' />}

          <div className='bg-[#EBEBEB] p-[10px]'>
            {url && (
              <Text type='body-14-regular' color='neutral-4' className='text-1-line text-left'>
                {url}
              </Text>
            )}

            {title && (
              <Text type='body-16-medium' color='cbblack' className='my-[8px] text-left'>
                {title}
              </Text>
            )}

            {description && (
              <Text type='body-14-regular' color='neutral-4' className='text-1-line text-left'>
                {description}
              </Text>
            )}
          </div>
        </div>

        <img
          src='/static/icons/explore/iconClose.svg'
          alt=''
          className='absolute right-[10px] top-[10px] z-[2] h-[20px] w-[20px] cursor-pointer'
          onClick={() => setMetaData(null)}
        />
      </div>
    </>
  );
};

const Compose = (props: IProps) => {
  const { t } = useTranslation(['common', 'home']);
  const { hidePopup, refresh, onGetData, postDetail, isUpdate = false } = props;

  const postThemeId = postDetail?.post?.postThemeId;
  const message =
    postDetail?.post?.message && formatMessage(postDetail?.post?.message, postDetail?.post);

  const postType = postDetail?.postType || '';

  const isUpdateActivities = isUpdate && postType === 'ActivityTheme';

  const [isShowMore, setIsShowMore] = useState(true);
  const [activeTheme, setActiveTheme] = useState('default');
  const [hideListTheme, setHideListTheme] = useState(false);
  const [image, setImage] = useState<string>('');
  const [metaData, setMetaData] = useState<TMeta | null>();
  const bgTheme = useAtomValue(postThemeAtom);
  const themeInit = bgTheme?.find((item) => item.id === postThemeId);
  const themeActive = bgTheme?.find((item) => item.code === activeTheme);
  const { statusUser } = useUserType();

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
      return isUpdate ? requestUpdatePost(postDetail?.id, data) : requestAddPost(data);
    },
    {
      manual: true,
      onSuccess: () => {
        editor?.commands.clearContent();
        hidePopup && hidePopup();
        refresh && refresh();
        setMetaData(null);
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
          renderHTML(props: any) {
            return [
              'a',
              {
                style: 'font-weight:600;',
                class: 'userName',
                userkey: props && props.node?.attrs.id,
                'data-username': props?.node.attrs.label,
                'data-linked-resource-type': 'userinfo',
                href: `/profile/${props?.node.attrs.id}`,
              },
              `@${props?.node.attrs.label}`,
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
          renderHTML(props: any) {
            return [
              'a',
              {
                style: 'font-weight:600;',
                class: 'stockMention',
                userkey: props && props.node?.attrs.id,
                'data-username': props?.node.attrs.label,
                'data-linked-resource-type': 'userinfo',
                href: `/stock/${props?.node.attrs.label}`,
              },
              `%${props?.node.attrs.label}`,
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
          setActiveTheme('default');
          setIsShowMore(false);
        }
        onGetData && onGetData(editor?.getText());
      },
    },
    [message],
  );

  useEffect(() => {
    if (postType && postType === 'ActivityTheme') {
      setHideListTheme(true);
    }
    return () => {
      editor?.commands?.clearContent();
    };
  }, []);

  useEffect(() => {
    if (themeInit) {
      setActiveTheme(themeInit.code);
    }
    if (postDetail?.post) {
      console.log(postDetail?.post);
    }
  }, [postThemeId]);

  const getDataOG = (value: any) => {
    setMetaData(value);
  };

  const showMore = () => {
    setIsShowMore(!isShowMore);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = isImage(file);
    if (!isJpgOrPng) {
      toast(() => <Notification type='error' message={t('not_image')} />);
    }
    return isJpgOrPng;
  };

  const onSelectTheme = (code: string) => {
    setActiveTheme(code);
  };

  const onStart = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);
    useUploadImage.run(formData);
  };

  const addPost = async () => {
    const users: any = [];
    const stock: any = [];
    const urlLink: any = [];
    const messageHtml = editor?.getHTML();

    const url = metaData?.find((it) => it?.property === 'og:url')?.content;

    const test = editor?.getJSON()?.content?.map((item: any) => {
      const abcd = item?.content?.map((text: any) => {
        let p = '';
        if (text.type === 'text') {
          const txt = text.text.split(' ');
          for (const item of txt) {
            if (item.includes('http')) {
              urlLink.push(item);
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
      message: messageHtml,
      tagPeople: formatTagPeople,
      tagStocks: stock,
      postThemeId: isUpdate && activeTheme === 'default' ? '' : themeActive?.id,
      // parentId: idReply === '' ? id : idReply,
      urlImages: [image],
      urlLinks: metaData && activeTheme === 'default' ? [...urlLink, url] : urlLink,
    };

    if (activeTheme === 'default' && !isUpdate) {
      delete data?.postThemeId;
    }

    if (!image) {
      delete data?.urlImages;
    }

    if (activeTheme !== 'default') {
      delete data?.urlImages;
    }

    if (!urlLink) {
      delete data?.urlLinks;
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
      if (editor?.getText()) {
        useAddPost.run(data);
      } else {
        toast(() => <Notification type='error' message={t('err_add_post')} />);
      }
    } else {
      hidePopup && hidePopup();
      PopupComponent.openEKYC();
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

  return (
    <div className='h-full mobile-max:flex mobile-max:flex-col mobile-max:justify-between'>
      <div className='relative h-[208px]'>
        <EditorContent
          editor={editor}
          className={classNames('relative z-10 h-full max-h-[220px] overflow-y-auto px-[5px]', {
            [`text-center text-[${themeActive?.color?.code}] pt-[20px] text-[${themeActive?.fontSize}] leading-[${themeActive?.lineHeight}] ${themeActive?.code}`]:
              themeActive && activeTheme !== 'default',
            'text-left': activeTheme === 'default',
          })}
        />

        <ImageTheme url={themeActive?.bgImage || ''} />
      </div>

      <div>
        <Fade visible={!!image && activeTheme === 'default'}>
          <div className='flex items-center justify-between'>
            <img src={image} alt='' className='h-[58px] w-[90px] rounded-[8px] object-contain' />
            <img
              src='/static/icons/explore/iconClose.svg'
              alt=''
              className='h-[20px] w-[20px] cursor-pointer'
              onClick={() => setImage('')}
            />
          </div>
        </Fade>

        <Fade visible={!!metaData?.length && activeTheme === 'default'}>
          <Metatags metaData={metaData as TMeta} setMetaData={setMetaData} />
        </Fade>

        <Fade visible={!hideListTheme}>
          <ListTheme
            showMore={showMore}
            isShowMore={isShowMore}
            bgTheme={bgTheme}
            activeTheme={activeTheme}
            onSelectTheme={onSelectTheme}
          />
        </Fade>

        <Fade visible={postType === 'ActivityTheme'}>
          <ActivityTheme postDetail={postDetail} />
        </Fade>

        <div className='my-[16px] block h-[2px] w-full bg-[#EEF5F9]'></div>

        <div className='flex justify-between'>
          <div className='flex gap-x-[16px]'>
            <UploadImage
              themeActive={themeActive}
              isUpdateActivities={isUpdateActivities}
              onStart={onStart}
              beforeUpload={beforeUpload}
            />

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

            <ModalAddLink
              themeActive={themeActive}
              isUpdateActivities={isUpdateActivities}
              getDataOG={getDataOG}
            />
          </div>
          <div
            className='flex h-[38px] w-[93px] cursor-pointer items-center justify-center rounded-[1000px] bg-[linear-gradient(270deg,_#1D6CAB_0%,_#589DC0_100%)]'
            onClick={addPost}
          >
            {useAddPost?.loading ? <Loading /> : <IconSend />}
            <Text type='body-14-medium' color='cbwhite' className='ml-[10px]'>
              {t('post_action')}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;
