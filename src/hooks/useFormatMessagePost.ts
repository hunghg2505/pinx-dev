import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import { formatMessage } from '@utils/common';

import { userLoginInfoAtom } from './useUserLoginInfo';

export const useFormatMessagePost = (message: string, data: any) => {
  const [messageFormat, setMessageFormat] = useState<string>('');
  const [userLoginInfo] = useAtom(userLoginInfoAtom);
  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const newMessage = formatMessage(message, data, userLoginInfo?.id);
    setMessageFormat(newMessage);
  }, [message]);

  return messageFormat;
};
