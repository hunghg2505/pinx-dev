export const enableScroll = () => {
  document.body.style.cssText = 'overflow-y:overlay !important';
};

export const disableScroll = () => {
  document.body.style.cssText = 'overflow-y:hidden !important';
};
