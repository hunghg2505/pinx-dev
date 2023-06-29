export const ROUTE_PATH = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/sign-up',
  FORGOT_PASSWORD: '/auth/forgot-password',
  REGISTER_OTP_VERIFICATION: '/auth/register-verification',
  REGISTER_USER_NAME: '/auth/register-user-name',
  LOGIN_OTP_VERIFICATION: '/auth/login-verification',
  TERMS_OF_SERVICE: '/auth/terms-of-service',
  REGISTER_COMPANY: '/auth/register-company',
  REGISTER_THEME: '/auth/register-theme',
  REGISTER_TOPIC: '/auth/register-topic',
  UPDATE_USSR_PROFILE: '/auth/update-user-profile',
  REDIRECT: '/redirecting',
  REGISTER_INSTRUCTIONS: '/auth/register-instruction',
  POST_DETAIL: (id: string) => `/post/${id}`,
};

export const formatMessage = (message: string, data: any) => {
  const str = message.split(' ');
  const tagPeople = data?.tagPeople?.map((item: any) => {
    return `@[${item?.displayName}](${item?.customerId})`;
  });
  const listStock = data?.tagStocks?.map((item: string) => {
    return `%[${item}](${item})`;
  });
  if (tagPeople) {
    for (const item of tagPeople) {
      const start = item.indexOf('[') + 1;
      const end = item.indexOf(']');
      const name = item.slice(start, end);
      const startId = item.indexOf('(') + 1;
      const endId = item.indexOf(')');
      const ID = item.slice(startId, endId);
      if (message && message.includes(item)) {
        message = message.replace(
          item,
          `
          <a href="/profile/${ID}" className="tagStock">${name}</a>
          `,
        );
      }
    }
  }
  if (listStock) {
    for (const item of listStock) {
      const start = item.indexOf('[') + 1;
      const end = item.indexOf(']');
      const name = item.slice(start, end);
      const startId = item.indexOf('(') + 1;
      const endId = item.indexOf(')');
      const ID = item.slice(startId, endId);
      if (message && message.includes(item)) {
        message = message.replace(
          item,
          `
          <a href="/stock/${ID}" className="tagStock">${name}</a>
          `,
        );
      }
    }
  }
  // eslint-disable-next-line array-callback-return
  str?.map((item) => {
    if (item.includes('#')) {
      message = message.replace(
        item,
        `
        <a href="/#" class="hashtag">${item}</a>
        `,
      );
    }
    if (item.includes('http') && !item.includes('\n')) {
      message = message.replace(
        item,
        `
        <a href="${item}" class="link">${item}</a>
        `,
      );
    }
    if (item.includes('http') && item.includes('\n')) {
      const newItem = item?.split('\n');
      for (const item of newItem) {
        if (item.includes('http')) {
          message = message.replace(
            item,
            `
            <a href="${item}" class="link">${item}</a>
            `,
          );
        }
      }
    }
  });
  return message;
};
export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => resolve(reader.result));
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    reader.onerror = reject;
  });
export const base64ToBlob = (base64: any, type: any) => {
  const base64Slice = base64.split(',')[1];
  const binStr = window.atob(base64Slice.replaceAll(/\s/g, ''));
  const len = binStr.length;
  const buffer = new ArrayBuffer(len);
  const arr = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    // eslint-disable-next-line unicorn/prefer-code-point
    arr[i] = binStr.charCodeAt(i);
  }
  const blob = new Blob([arr], { type });
  return URL.createObjectURL(blob);
};
export const EXT_IMAGE = ['jpg', 'jpeg', 'png', 'gif', 'heic', 'webp'];
export const isImage = (file: any) => {
  if (!file) {
    return false;
  }

  const name = file?.name?.split('.');

  return file.type?.includes('image') && EXT_IMAGE.includes(name[name?.length - 1]?.toLowerCase());
};
