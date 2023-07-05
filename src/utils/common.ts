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
  POST_DETAIL_PATH: '/post',
  POST_DETAIL: (id: string) => `${ROUTE_PATH.POST_DETAIL_PATH}/${id}`,
  PAGE_NOT_FOUND:'/page-not-found'
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
      // const startId = item.indexOf('(') + 1;
      // const endId = item.indexOf(')');
      // const ID = item.slice(startId, endId);
      if (message && message.includes(item)) {
        message = message.replace(
          item,
          `
          <a href="javascript:void(0)" className="tagStock">${name}</a>
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
      // const startId = item.indexOf('(') + 1;
      // const endId = item.indexOf(')');
      // const ID = item.slice(startId, endId);
      if (message && message.includes(item)) {
        message = message.replace(
          item,
          `
          <a href="javascript:void(0)" className="tagStock">${name}</a>
          `,
        );
      }
    }
  }
  // eslint-disable-next-line array-callback-return
  str?.map((item) => {
    // console.log('🚀 ~ file: common.ts:68 ~ str?.map ~ item:', item);
    if (item.includes('#')) {
      message = message.replace(
        item,
        `
        <a href="javascript:void(0)" class="hashtag">${item}</a>
        `,
      );
    }
    if (item.includes('http') && !item.includes('\n')) {
      message = message.replace(
        item,
        `
        <a href="javascript:void(0)" class="link">${item}</a>
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
            <a href="javascript:void(0)" class="link">${item}</a>
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
export function toNonAccentVietnamese(str: any) {
  str = str.replaceAll(/[AÀÁÂÃĂẠẤẦẪẬẮẰẴẶ]/g, 'A');
  str = str.replaceAll(/[àáâãăạảấầẩẫậắằẳẵặ]/g, 'a');
  str = str.replace(/[EÈÉÊẸẼẾỀỄỆ]/, 'E');
  str = str.replaceAll(/[èéêẹẻẽếềểễệ]/g, 'e');
  str = str.replaceAll(/[IÌÍĨỊ]/g, 'I');
  str = str.replaceAll(/[ìíĩỉị]/g, 'i');
  str = str.replaceAll(/[OÒÓÔÕƠỌỐỒỖỘỚỜỠỢ]/g, 'O');
  str = str.replaceAll(/[òóôõơọỏốồổỗộớờởỡợ]/g, 'o');
  str = str.replaceAll(/[UÙÚŨƯỤỨỪỮỰ]/g, 'U');
  str = str.replaceAll(/[ùúũưụủứừửữự]/g, 'u');
  str = str.replaceAll(/[YÝỲỴỸ]/g, 'Y');
  str = str.replaceAll(/[ýỳỵỷỹ]/g, 'y');
  str = str.replaceAll('Đ', 'D');
  str = str.replaceAll('đ', 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replaceAll(/[\u0300\u0301\u0303\u0309\u0323]/g, ''); // Huyền sắc hỏi ngã nặng
  // eslint-disable-next-line no-misleading-character-class
  str = str.replaceAll(/[\u02C6\u0306\u031B]/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}
