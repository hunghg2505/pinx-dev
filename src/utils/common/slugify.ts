export const slugify = (value?: string) => {
  if (!value) {
    return '';
  }

  // Chuyển hết sang chữ thường
  let str = value.toLowerCase();

  // xóa dấu
  str = str.replaceAll(/([àáâãăạảấầẩẫậắằẳẵặ])/g, 'a');
  str = str.replaceAll(/([èéêẹẻẽếềểễệ])/g, 'e');
  str = str.replaceAll(/([ìíĩỉị])/g, 'i');
  str = str.replaceAll(/([òóôõơọỏốồổỗộớờởỡợ])/g, 'o');
  str = str.replaceAll(/([ùúũưụủứừửữự])/g, 'u');
  str = str.replaceAll(/([ýỳỵỷỹ])/g, 'y');
  str = str.replaceAll(/(đ)/g, 'd');

  // Xóa ký tự đặc biệt
  str = str.replaceAll(/([^\d\sa-z-])/g, '');

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replaceAll(/(\s+)/g, '-');

  // Xóa ký tự - liên tiếp
  str = str.replaceAll(/-+/g, '-');

  // xóa phần dự - ở đầu
  str = str.replaceAll(/^-+/g, '');

  // xóa phần dư - ở cuối
  str = str.replaceAll(/-+$/g, '');

  // return
  return str;
};
