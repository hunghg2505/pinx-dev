export const removeSpecialCharacter = (value: string) => {
  // const noSpecialChars = value.replaceAll(/[^\d A-Za-z]/g, '');
  const noSpecialChars = value.normalize('NFC').replaceAll(/[!"#$%&'()*+,./:<>?@\\^{}~-]/g, '');
  return noSpecialChars;
};
