import { useEffect, useState } from 'react';

import { formatMessagePost } from '@utils/common';

export const useFormatMessagePost = (message: string) => {
  const [messageFormat, setMessageFormat] = useState<string>('');

  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const newMessage = formatMessagePost(message);
    setMessageFormat(newMessage);
  }, []);

  return messageFormat;
};
