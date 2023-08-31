export const removeSpecialCharacter = (value: string) => {
  const noSpecialChars = value.replaceAll(/[^\d A-Za-z]/g, '');

  return noSpecialChars;
};
