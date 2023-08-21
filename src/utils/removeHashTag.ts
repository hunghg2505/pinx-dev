export const removeHashTag = (str: string) => {
  const regexp = /#(\S)/g;
  return str.replaceAll(regexp, '$1');
};
