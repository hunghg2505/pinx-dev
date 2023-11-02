export const getHostName = (headers: any) => {
  if (!headers['x-forwarded-proto']) {
    return '';
  }

  let protocol: string = headers['x-forwarded-proto'];
  const protocolToArr = protocol?.split(',');
  const findProtocol = protocolToArr.find((item) => item === 'https');

  protocol = findProtocol || protocolToArr[0];

  const host = protocol + '://' + headers.host;

  return host;
};
