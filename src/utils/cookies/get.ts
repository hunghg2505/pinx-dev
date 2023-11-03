/* eslint-disable eqeqeq */
/* eslint-disable unicorn/prefer-string-slice */
export function get(name: string) {
  try {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    let c: any;

    for (const element of ca) {
      c = element;
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) == 0) {
        return decodeURI(c.substring(nameEQ.length, c.length));
      }
    }
    return false;
  } catch {
    return false;
  }
}
