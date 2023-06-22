import Dialog from 'rc-dialog';
import React, { useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';
import classNames from 'classnames/bind';
import Text from '@components/UI/Text';
import Image from 'next/image';
import { InlineShareButtons, InlineShareButtonsConfig } from 'sharethis-reactjs';
import { ZALO_OAID } from 'src/constant';

const cx = classNames.bind(styles);

interface IModalShareProps {
  url: string;
  visible: boolean;
  handleClose: () => void;
}

const ModalShare = ({ url, visible, handleClose }: IModalShareProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleAppendZaloScript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleCopy = () => {
    if (isCopied) return;

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
    if (!visible) return;

    const ZALO_SCRIPT_SRC = 'https://sp.zalo.me/plugins/sdk.js';
    const ZALO_SCRIPT_ID = 'zalo-share-script';
    const zaloScriptElm = document.getElementById(ZALO_SCRIPT_ID);

    if (zaloScriptElm) zaloScriptElm.remove();

    const script = document.createElement('script');
    script.src = ZALO_SCRIPT_SRC;
    script.id = ZALO_SCRIPT_ID;
    script.async = true;

    document.body.appendChild(script);
  };

  const INLINE_SHARE_BTN_CONFIG: InlineShareButtonsConfig = {
    alignment: 'center',
    color: 'social',
    enabled: true,
    font_size: 16,
    labels: 'cta',
    language: 'en',
    networks: ['facebook', 'messenger', 'linkedin', 'twitter', 'whatsapp'],
    padding: 12,
    radius: 4,
    show_total: true,
    size: 40,
    url,
  };

  return (
    <Dialog
      visible={visible}
      onClose={() => {
        handleClose();
        setIsCopied(false);
      }}
      wrapClassName='px-[16px]'
    >
      <div className='mt-[24px]'>
        <div>
          <Text type='body-16-regular'>Share this link via</Text>
          <div className='mt-[16px] flex flex-wrap items-center justify-center'>
            <InlineShareButtons config={INLINE_SHARE_BTN_CONFIG} />
            <div
              className='zalo-share-button mb-[8px] ml-[8px]'
              data-href={url}
              data-oaid={ZALO_OAID}
              data-layout='4'
              data-color='blue'
              data-customize='false'
            ></div>
          </div>

          <Text type='body-16-regular' className='mt-[16px]'>
            Or copy link
          </Text>

          <div
            className={`mt-[8px] flex h-[45px] items-center justify-between rounded-[4px] border border-solid border-[#757171] px-[5px] ${cx(
              'field',
              {
                active: isCopied,
              },
            )}`}
          >
            <Image
              src='/static/icons/iconLink-02.svg'
              alt='Icon link'
              width={4}
              height={4}
              className='filter-[invert(0.5)] ml-[8px] w-[20px]'
            />

            <input
              type='text'
              readOnly
              value={url}
              className='w-full border-none px-[8px] text-[15px] outline-none'
              ref={inputRef}
            />

            <button
              className='cursor-pointer rounded-[4px] bg-[var(--primary-2)] px-[18px] py-[5px] transition-all hover:opacity-80'
              onClick={handleCopy}
            >
              <Text type='body-14-medium' color='cbwhite'>
                {!isCopied ? 'Copy' : 'Copied'}
              </Text>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalShare;
