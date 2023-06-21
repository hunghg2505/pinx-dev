export const ROUTE_PATH = {
  Home: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  REGISTER_OTP_VERIFICATION: '/auth/register-verification',
  LOGIN_OTP_VERIFICATION: '/auth/login-verification',
};

export const formatMessage = (message: string, data: any) => {
  const tagPeople = data?.tagPeople?.map((item: any) => {
    return `@[${item.displayName}](${item.customerId})`;
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
          <a href="/profile/${ID}" className="tagStock">@${name}</a> 
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
          <a href="/stock/${ID}" className="tagStock">%${name}</a> 
          `,
        );
      }
    }
  }
  return message;
};
