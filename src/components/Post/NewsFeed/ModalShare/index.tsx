import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Dialog from 'rc-dialog';

import Text from '@components/UI/Text';
import { SHARE_THIS_PROPERTY_ID, ZALO_OAID } from 'src/constant';

const ZALO_SCRIPT_ID = 'zalo-share-script';
const SHARE_THIS_SCRIPT_ID = 'share-this-script';

interface IModalShareProps {
  url: string;
  visible: boolean;
  handleClose: () => void;
}

const ModalShare = ({ url, visible, handleClose }: IModalShareProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    navigator.clipboard.writeText(url);
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

  return (
    <Dialog
      visible={visible}
      onClose={() => {
        handleClose();
        setIsCopied(false);
      }}
      wrapClassName='px-[16px]'
      closeIcon={
        <Image
          src='/static/icons/iconClose.svg'
          alt='Icon close'
          width={21}
          height={21}
          className='h-[21px] w-[21px] object-contain'
        />
      }
    >
      <div className='mt-[24px]'>
        <div>
          <Text type='body-20-bold' className='mb-[18px] text-center'>
            Share to...
          </Text>
          <div className='mb-[12px] text-center'>
            <div
              className='zalo-share-button'
              data-href={url}
              data-oaid={ZALO_OAID}
              data-layout='4'
              data-color='blue'
              data-customize='false'
            ></div>
          </div>

          <div className='border-b border-solid border-[var(--neutral-7)] pb-[12px]'>
            <Text type='body-14-medium' color='neutral-4' className='mb-[12px]'>
              Or share to:
            </Text>
            <div className='sharethis-inline-share-buttons gap-4' data-url={url}></div>
          </div>

          <div className='field mt-[12px] flex h-[44px] items-center justify-between rounded-[8px]'>
            <input
              type='text'
              readOnly
              value={url}
              className='h-full w-full rounded-bl-[8px] rounded-tl-[8px] border-b border-l border-t border-[var(--primary-2)] px-[8px] text-[15px] outline-none'
              ref={inputRef}
            />

            <button
              className='h-full min-w-[112px] cursor-pointer rounded-br-[8px] rounded-tr-[8px] bg-[var(--primary-2)] px-[18px] transition-all hover:opacity-80'
              onClick={handleCopy}
            >
              <Text type='body-14-medium' color='cbwhite'>
                {isCopied ? 'Copied' : 'Copy link'}
              </Text>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalShare;
