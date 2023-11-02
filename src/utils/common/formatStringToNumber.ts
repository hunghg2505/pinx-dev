export const formatStringToNumber = (value: any, isComma = true, minimumFractionDigits = 0) => {
  if (!value) {
    return '';
  }
  if (Number.isNaN(value)) {
    return value;
  }
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
  });

  const numString = value.toString();

  const num = numString.includes('.') ? numString.slice(0, numString.indexOf('.') + 3) : numString;

  return formatter.format(+num).replaceAll(',', isComma ? ',' : '.');
};
