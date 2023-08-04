declare const window: any;

export const Logout = (time: Date) => {
  console.log('🚀 ~ file: dataLayer.ts:4 ~ Logout ~ time:', time);
  try {
    console.log('window.dataLayer.push');
    window.dataLayer.push({
      event: 'Logout',
      'Login Status': 'Not Login',
      'Last Seen Time': time,
      'Last Seen App': 'PineX Website',
    });
  } catch {
    console.log('window.dataLayer.push-err');
  }
};

export const NavigateSection = (navigate: string) => {
  try {
    window.dataLayer.push({
      event: 'Navigate Section',
      'Navigate To': navigate,
    });
  } catch {}
};
