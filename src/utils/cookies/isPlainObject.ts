export function isPlainObject(obj: any) {
  obj = JSON.stringify(obj);
  if (typeof obj !== 'string') {
    return false;
  }

  if (!/^{[\S\s]*}$/.test(obj)) {
    return false;
  }

  return true;
}
