export function toNonAccentVietnamese(str: any) {
  str = str.replaceAll(/[AÀÁÂÃĂẠẤẦẪẬẮẰẴẶ]/g, 'A');
  str = str.replaceAll(/[àáâãăạảấầẩẫậắằẳẵặ]/g, 'a');
  str = str.replace(/[EÈÉÊẸẼẾỀỄỆ]/, 'E');
  str = str.replaceAll(/[èéêẹẻẽếềểễệ]/g, 'e');
  str = str.replaceAll(/[IÌÍĨỊ]/g, 'I');
  str = str.replaceAll(/[ìíĩỉị]/g, 'i');
  str = str.replaceAll(/[OÒÓÔÕƠỌỐỒỖỘỚỜỠỢ]/g, 'O');
  str = str.replaceAll(/[òóôõơọỏốồổỗộớờởỡợ]/g, 'o');
  str = str.replaceAll(/[UÙÚŨƯỤỨỪỮỰ]/g, 'U');
  str = str.replaceAll(/[ùúũưụủứừửữự]/g, 'u');
  str = str.replaceAll(/[YÝỲỴỸ]/g, 'Y');
  str = str.replaceAll(/[ýỳỵỷỹ]/g, 'y');
  str = str.replaceAll('Đ', 'D');
  str = str.replaceAll('đ', 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replaceAll(/[\u0300\u0301\u0303\u0309\u0323]/g, ''); // Huyền sắc hỏi ngã nặng
  // eslint-disable-next-line no-misleading-character-class
  str = str.replaceAll(/[\u02C6\u0306\u031B]/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}
