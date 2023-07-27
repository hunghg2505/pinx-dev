import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useRequest } from 'ahooks';
import { useTranslation } from 'next-i18next';

import { getTotalSharePost } from '@components/Post/service';
import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';
import { SHARE_THIS_PROPERTY_ID, ZALO_OAID } from 'src/constant';

const ZALO_SCRIPT_ID = 'zalo-share-script';
const SHARE_THIS_SCRIPT_ID = 'share-this-script';

interface IModalShareProps {
  urlPost: string;
  children?: React.ReactNode;
}

const ModalShare = ({ urlPost, children }: IModalShareProps) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);

  const urlFormat = useMemo(() => {
    if (!window) {
      return urlPost;
    }

    return window.location.origin + urlPost;
  }, [urlPost]);

  const requestGetTotalShare = useRequest(getTotalSharePost, {
    manual: true,
  });

  useEffect(() => {
    handleAppendShareThisScript();
    handleAppendZaloScript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleCopy = () => {
    if (isCopied) {
      return;
    }

    inputRef.current?.select();
    navigator.clipboard.writeText(urlFormat);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);

      // remove selection
      window.getSelection()?.removeAllRanges();
    }, 3000);
  };

  const handleAppendZaloScript = () => {
    if (!visible) {
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
    if (!visible) {
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

  const onOpen = () => {
    setVisible(true);
    requestGetTotalShare.run(urlFormat);
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal
        visible={visible}
        onClose={() => {
          setIsCopied(false);
          setVisible(false);
        }}
      >
        <div className='mt-[24px]'>
          <div>
            <Text type='body-20-bold' className='mb-[18px] text-center'>
              {t('share_to')}...
            </Text>
            <div className='mb-[12px] text-center'>
              <div
                className='zalo-share-button'
                data-href={urlFormat}
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
              <div className='sharethis-inline-share-buttons gap-4' data-url={urlFormat}></div>
            </div>

            <div className='field mt-[12px] flex h-[44px] items-center justify-between rounded-[8px]'>
              <input
                type='text'
                readOnly
                value={urlFormat}
                className='h-full w-full flex-1 rounded-bl-[8px] rounded-tl-[8px] border-b border-l border-t border-[var(--primary-2)] px-[8px] text-[15px] outline-none'
                ref={inputRef}
              />

              <button
                className='h-full min-w-[112px] cursor-pointer rounded-br-[8px] rounded-tr-[8px] bg-[var(--primary-2)] px-[18px] transition-all hover:opacity-80'
                onClick={handleCopy}
              >
                <Text type='body-14-medium' color='cbwhite'>
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
