export const getMonthName = (monthNumber: number, localeParam = 'en-US') => {
  const locale = localeParam === 'vi' ? 'vi-VN' : localeParam;
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString(locale, { month: 'long' });
};
