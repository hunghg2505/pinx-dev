declare global {
  interface Window {
    ENV: typeof process.env;
  }
}
export {};

declare module 'dayjs' {
  interface Dayjs {
    fromNow();
  }
}
