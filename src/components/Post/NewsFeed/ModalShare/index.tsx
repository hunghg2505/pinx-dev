import React, { useEffect, useRef, useState } from 'react';

import { useRequest } from 'ahooks';
import { useTranslation } from 'next-i18next';

import { getTotalSharePost } from '@components/Post/service';
import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';
import { SHARE_THIS_PROPERTY_ID, ZALO_OAID } from 'src/constant';

import styles from './index.module.scss';

const ZALO_SCRIPT_ID = 'zalo-share-script';
const SHARE_THIS_SCRIPT_ID = 'share-this-script';

interface IModalShareProps {
  urlPost: string;
  modalShareVisible: boolean;
  setModalShareVisible: (value: boolean) => void;
  postDetail: any;
}

const ModalShare = ({
  urlPost,
  modalShareVisible,
  setModalShareVisible,
  postDetail,
}: IModalShareProps) => {
  const { t } = useTranslation();
  const postType = postDetail?.post.postType;
  const postTypeGroup = postDetail?.post.postTypeGroup;
  const calcShareUrl = () => {
    if (postType === 'Post' || postType === 'ActivityTheme') {
      return urlPost + '?utm_campaign=organic_share&utm_medium=direct_link&utm_source=others&utm_content=personal_post';
    }
    if (postType === 'ActivityWatchlist' || postType === 'ActivityWatchlist') {
      return urlPost + '?utm_campaign=organic_share&utm_medium=others&utm_source=&utm_content=investment_post';
    }
    if (postTypeGroup === 'News') {
      return urlPost + '?utm_campaign=organic_share&utm_medium=others&utm_source=&utm_content=news_post';
    }
  };
  const [shareUrl, setShareUrl] = useState('');
  const [defaultShareUrl] = useState(calcShareUrl());
  const [isCopied, setIsCopied] = useState(false);
  const buttonTelegram = document.querySelector('div[data-network=\'telegram\']');
  const buttonFacebook = document.querySelector('div[data-network=\'facebook\']');
  const buttonMail = document.querySelector('div[data-network=\'email\']');
  const buttonMessenger = document.querySelector('div[data-network=\'messenger\']');
  const buttonSkype = document.querySelector('div[data-network=\'skype\']');
  const inputRef = useRef<HTMLInputElement>(null);

  const requestGetTotalShare = useRequest(getTotalSharePost, {
    manual: true,
  });

  useEffect(() => {
    handleAppendShareThisScript();
    handleAppendZaloScript();
    requestGetTotalShare.run(urlPost);
  }, [modalShareVisible]);

  const initShareThisButton = () => {
    if (postType === 'Post' || postType === 'ActivityTheme') {
      buttonTelegram?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=chat&utm_source=telegram&utm_content=personal_post`);
      });
      buttonFacebook?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=social_media&utm_source=facebook&utm_content=personal_post`);
      });
      buttonMail?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=email&utm_source=email&utm_content=personal_post`);
      });
      buttonMessenger?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=chat&utm_source=messenger&utm_content=personal_post`);
      });
      buttonSkype?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=chat&utm_source=skype&utm_content=personal_post`);
      });
    }
    else if (postType === 'ActivityWatchlist' || postType === 'ActivityWatchlist') {
      buttonFacebook?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=social_media&utm_source=facebook&utm_content=investment_post`);
      });
      buttonMessenger?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=chat&utm_source=messenger&utm_content=investment_post`);
      });
      buttonSkype?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=chat&utm_source=skype&utm_content=investment_post`);
      });
      buttonTelegram?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=chat&utm_source=telegram&utm_content=investment_post`);
      });
      buttonMail?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=email&utm_source=email&utm_content=investment_post`);
      });
    }
    else if (postTypeGroup === 'News') {
      buttonFacebook?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=social_media&utm_source=facebook&utm_content=news_post`);
      });
      buttonMessenger?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=chat&utm_source=messenger&utm_content=news_post`);
      });
      buttonSkype?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=chat&utm_source=skype&utm_content=news_post`);
      });
      buttonTelegram?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=chat&utm_source=telegram&utm_content=news_post`);
      });
      buttonMail?.addEventListener('mouseover', () => {
        setShareUrl(`${urlPost}?utm_campaign=organic_share&utm_medium=email&utm_source=email&utm_content=news_post`);
      });
    }
  };

  // set link share with tracking
  useEffect(() => {
    initShareThisButton();
  });

  const handleCopy = () => {
    if (isCopied) {
      return;
    }

    inputRef.current?.select();
    navigator.clipboard.writeText(defaultShareUrl || '');
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);

      // remove selection
      window.getSelection()?.removeAllRanges();
    }, 3000);
  };

  const handleAppendZaloScript = () => {
    if (!modalShareVisible) {
      return;
    }

    const ZALO_SCRIPT_SRC = 'https://sp.zalo.me/plugins/sdk.js';
    const zaloScriptElm = document.querySelector(`#${ZALO_SCRIPT_ID}`);

    if (zaloScriptElm) {
      zaloScriptElm.remove();
    }

    const script = document.createElement('script');
    script.src = ZALO_SCRIPT_SRC;
    script.id = ZALO_SCRIPT_ID;
    script.async = true;

    document.body.append(script);
  };

  const handleAppendShareThisScript = () => {
    if (!modalShareVisible) {
      return;
    }

    const SHARE_THIS_SCRIPT_SRC = `https://platform-api.sharethis.com/js/sharethis.js#property=${SHARE_THIS_PROPERTY_ID}&product=inline-share-buttons&source=platform`;
    const shareThisScriptElm = document.querySelector(`#${SHARE_THIS_SCRIPT_ID}`);
    if (shareThisScriptElm) {
      shareThisScriptElm.remove();
    }

    const shareThisBtnScriptElm = document.querySelector(
      `script[src='https://buttons-config.sharethis.com/js/${SHARE_THIS_PROPERTY_ID}.js']`,
    );
    if (shareThisBtnScriptElm) {
      shareThisScriptElm?.remove();
    }

    const script = document.createElement('script');
    script.src = SHARE_THIS_SCRIPT_SRC;
    script.id = SHARE_THIS_SCRIPT_ID;
    script.async = true;

    const shareThisBtnScript = document.createElement('script');
    shareThisBtnScript.src = `https://buttons-config.sharethis.com/js/${SHARE_THIS_PROPERTY_ID}.js`;

    document.head.append(shareThisBtnScript);
    document.head.append(script);
  };

  const calcZaloShareUrl = () => {
    if (postType === 'Post' || postType === 'ActivityTheme') {
      return urlPost + '?utm_campaign=organic_share&utm_medium=social_media&utm_source=zalo&utm_content=personal_post';
    }
    if (postType === 'ActivityWatchlist' || postType === 'ActivityWatchlist') {
      return urlPost + '?utm_campaign=organic_share&utm_medium=social_media&utm_source=zalo&utm_content=investment_post';
    }
    if (postTypeGroup === 'News') {
      return urlPost + '?utm_campaign=organic_share&utm_medium=social_media&utm_source=zalo&utm_content=news_post';
    }
  };

  return (
    <>
      <Modal
        visible={modalShareVisible}
        onClose={() => {
          setIsCopied(false);
          setModalShareVisible(false);
        }}
        className={styles.modalShare}
      >
        <div className='mt-[24px]'>
          <div>
            <Text type='body-20-bold' className='mb-[18px] text-center'>
              {t('share_to')}...
            </Text>
            <div className='mb-[12px] text-center'>
              <div
                className='zalo-share-button'
                data-href={calcZaloShareUrl()}
                data-oaid={ZALO_OAID}
                data-layout='4'
                data-color='blue'
                data-customize='false'
              ></div>
            </div>

            <div className='border-b border-solid border-[var(--neutral-7)] pb-[12px]'>
              <Text type='body-14-medium' color='neutral-4' className='mb-[12px]'>
                {t('or_share_to')}:
              </Text>
              <div className='sharethis-inline-share-buttons gap-4' data-url={shareUrl}></div>
            </div>

            <div className='field mt-[12px] flex h-[44px] items-center justify-between rounded-[8px]'>
              <input
                type='text'
                readOnly
                value={defaultShareUrl}
                className='h-full w-full flex-1 rounded-bl-[8px] rounded-tl-[8px] border-b border-l border-t border-[var(--primary-2)] px-[8px] text-[15px] outline-none'
                ref={inputRef}
              />

              <button
                className='h-full min-w-[112px] cursor-pointer rounded-br-[8px] rounded-tr-[8px] bg-[var(--primary-2)] px-[18px] transition-all hover:opacity-80 galaxy-max:px-[14px]'
                onClick={handleCopy}
              >
                <Text type='body-14-medium' className='galaxy-max:text-[12px]' color='cbwhite'>
                  {isCopied ? t('copied') : t('copy_link')}
                </Text>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalShare;
