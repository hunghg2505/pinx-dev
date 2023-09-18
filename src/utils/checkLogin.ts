export const checkLogin = (req: any) => {
  const cookies = req?.headers?.cookie;

  if (!cookies) {
    return false;
  }

  const cookieArray = cookies.split('; ');
  const cookieObject = {} as any;

  for (const cookie of cookieArray) {
    const [key, value] = cookie.split('=');
    cookieObject[key] = value;
  }

  return !!cookieObject.accessToken;
};
