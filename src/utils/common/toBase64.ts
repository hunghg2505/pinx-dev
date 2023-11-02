/* eslint-disable unicorn/prefer-add-event-listener */
export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => resolve(reader.result));
    reader.onerror = (error) => reject(error);
  });
