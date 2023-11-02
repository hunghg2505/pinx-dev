// check url valid
export const isUrlValid = (url?: string) => {
  let isValid = false;
  if (url && url.includes('http')) {
    isValid = true;
  }

  return isValid;
};
