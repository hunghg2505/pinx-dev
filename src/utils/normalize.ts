export const normalizeNumber = (
  value = '',
  prevValue = '',
  max?: any,
  maxLength?: number,
): string => {
  try {
    if (!value.trim()) {
      return '';
    }

    const matchedString = value.match(/^(\d*)([,.]\d{0,100})?$/g);
    if (matchedString) {
      const newValue =
        matchedString[0].replace(',', '.') +
        (matchedString[1] ? matchedString[1].replace(',', '.') : '');
      if (max && +newValue >= max) {
        return max;
      }

      if (newValue.charAt(0) === '.') {
        return `0${newValue}`;
      }
      if (maxLength && newValue.length >= maxLength) {
        return prevValue;
      }
      return newValue;
    } else {
      if (max && +prevValue >= max) {
        return max;
      }
      return prevValue;
    }
  } catch {
    return value;
  }
};

export const normalizeLowercase = (value = '') => {
  return value?.toLowerCase();
};
