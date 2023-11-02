export const isValidURL = (urlString: any) => {
  const res = `${urlString}`
    .trim()
    .match(/(http(s)?:\/\/.)?(www\.)?[\w#%+.:=@~-]{2,256}\.[a-z]{2,6}\b([\w#%&+./:=?@~-]*)/g);
  return res !== null;
};
