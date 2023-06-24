import React, { forwardRef, useImperativeHandle } from 'react';

import Mention from '@tiptap/extension-mention';
import { PluginKey } from '@tiptap/pm/state';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRequest } from 'ahooks';
import Image from 'next/image';
import Form from 'rc-field-form';
import Upload from 'rc-upload';
import { RcFile } from 'rc-upload/lib/interface';

// import { requestAddComment } from '@components/Post/service';
// import FormItem from '@components/UI/FormItem';
// import Input from '@components/UI/Input';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { ISearch, TYPESEARCH } from '@components/Home/service';
import { requestAddComment, requestReplyCommnet } from '@components/Post/service';

import suggestion from './Suggestion';
import { isImage, toBase64 } from '../../utils/common';
// import { toBase64 } from '@';

interface IProps {
  id: string;
  refresh: () => void;
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = isImage(file);
  if (!isJpgOrPng) {
    console.log('Không phải ảnh');
  }
  return isJpgOrPng;
};

const Editor = (props: IProps, ref: any) => {
  const { id, refresh } = props;
  const [image, setImage] = React.useState<any>('');
  const [idReply, setIdReply] = React.useState<string>('');
  const [form] = Form.useForm();
  const messagesEndRef: any = React.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
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
      const html = editor.getHTML();
      console.log('🚀 ~ file: index.tsx:109 ~ onUpdate ~ html:', html);
      if (idReply && text === '') {
        setIdReply('0');
      }
      console.log('🚀 ~ file: index.tsx:107 ~ onUpdate ~ text:', text);
      // The content has changed.
    },
  });
  const onStart = async (file: File) => {
    const imgae = await toBase64(file);
    setImage(imgae);
    // const stringImage = await base64ToBlob(imgae, file.type);
  };
  useImperativeHandle(ref, () => {
    return {
      onComment: (value: any, customerId: number, id: string) => onComment(value, customerId, id),
      // onLike: () => onLike(),
    };
  });
  const onComment = (value: any, customerId: number, id: string) => {
    console.log('🚀 ~ file: index.tsx:124 ~ onComment ~ customerId:', customerId);
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
        refresh();
        editor?.commands.clearContent();
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
        refresh();
        editor?.commands.clearContent();
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
        p = `@[${item.attrs.label}](${item.attrs.label})`;
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
      parentId: id,
    };
    if (idReply === '') {
      useAddComment.run(data);
    } else {
      useReplyComment.run(data);
    }
  };

  return (
    <>
      <div>
        <div
          className='mb-[20px] flex min-h-[40px] justify-between rounded-[1000px] border-[1px] border-solid border-[#E6E6E6] bg-[#FFFFFF] px-[15px]'
          ref={messagesEndRef}
        >
          <Form className='w-full' form={form}>
            <div className='flex min-h-[40px] w-full items-center'>
              <Upload accept='png, jpeg, jpg' onStart={onStart} beforeUpload={beforeUpload}>
                <Image
                  src='/static/icons/iconCamnera.svg'
                  alt=''
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='mr-[8px] w-[19px]'
                />
              </Upload>
              <div className='mr-[8px] h-[24px] w-[1px] bg-[#E6E6E6]'></div>
              <EditorContent editor={editor} className='w-full' />
            </div>
          </Form>

          <Image
            src='/static/icons/iconSend.svg'
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='w-[19px] cursor-pointer'
            onClick={onSend}
          />
        </div>
        {image && (
          <Image
            src={image}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='h-[100px] w-[100px]'
          />
        )}
        {/* <div ref={messagesEndRef}></div> */}
      </div>
    </>
  );
};

export default forwardRef(Editor);
