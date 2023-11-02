export const setCurClickedHomePostId = (postId: string) => {
  globalThis?.sessionStorage.setItem('curClickedHomePostId', String(postId));
};

export const removeCurClickedHomePostId = () => {
  globalThis?.sessionStorage.removeItem('curClickedHomePostId');
};
