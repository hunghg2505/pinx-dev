import { useEffect, useState } from 'react';

import { formatMessage } from '@utils/common';

export const useFormatMessagePost = (message: string) => {
  const [messageFormat, setMessageFormat] = useState<string>('');
  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const newMessage = formatMessage(message);
    setMessageFormat(newMessage);
  }, [message]);

  return messageFormat;
};
