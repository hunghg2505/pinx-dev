declare const window: any;

export const Logout = (time: Date) => {
  try {
    window.dataLayer.push({
      event: 'Logout',
      'Login Status': 'Not Login',
      'Last Seen Time': time,
      'Last Seen App': 'PineX Website',
    });
  } catch {}
};

export const NavigateSection = (navigate: string) => {
  try {
    window.dataLayer.push({
      event: 'Navigate Section',
      'Navigate To': navigate,
    });
  } catch {}
};
