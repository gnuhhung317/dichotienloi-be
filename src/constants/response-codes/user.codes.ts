export const USER_CODES = {
  /* =====================================================
   * PASSWORD
   * ===================================================== */

  INVALID_PASSWORD_LENGTH: {
    code: '00066',
    message: 'Vui lòng cung cấp một mật khẩu dài hơn 6 và ngắn hơn 20 ký tự.',
    status: 400,
  },

  PASSWORD_CREATED_SUCCESS: {
    code: '00068',
    message: 'Mật khẩu mới đã được tạo thành công.',
    status: 200,
  },

  PASSWORD_CHANGE_FIELDS_REQUIRED: {
    code: '00069',
    message:
      'Vui lòng cung cấp mật khẩu cũ và mới dài hơn 6 ký tự và ngắn hơn 20 ký tự.',
    status: 400,
  },

  OLD_PASSWORD_NOT_MATCH: {
    code: '00072',
    message:
      'Mật khẩu cũ của bạn không khớp với mật khẩu bạn nhập, vui lòng nhập mật khẩu đúng.',
    status: 400,
  },

  NEW_PASSWORD_SAME_AS_OLD: {
    code: '00073',
    message:
      'Mật khẩu mới của bạn không nên giống với mật khẩu cũ, vui lòng thử một mật khẩu khác.',
    status: 400,
  },

  PASSWORD_CHANGED_SUCCESS: {
    code: '00076',
    message: 'Mật khẩu của bạn đã được thay đổi thành công.',
    status: 200,
  },

  /* =====================================================
   * PROFILE VALIDATION
   * ===================================================== */

  INVALID_NAME_LENGTH: {
    code: '00077',
    message: 'Vui lòng cung cấp một tên dài hơn 3 ký tự và ngắn hơn 30 ký tự.',
    status: 400,
  },

  INVALID_GENDER: {
    code: '00078',
    message:
      'Các tùy chọn giới tính hợp lệ, female-male-other, vui lòng cung cấp một trong số chúng.',
    status: 400,
  },

  INVALID_LANGUAGE: {
    code: '00079',
    message:
      'Các tùy chọn ngôn ngữ hợp lệ, tr-en, vui lòng cung cấp một trong số chúng.',
    status: 400,
  },

  INVALID_BIRTHDAY: {
    code: '00080',
    message: 'Vui lòng cung cấp một ngày sinh hợp lệ.',
    status: 400,
  },

  INVALID_USERNAME_LENGTH: {
    code: '00081',
    message:
      'Vui lòng cung cấp một tên người dùng dài hơn 3 ký tự và ngắn hơn 15 ký tự.',
    status: 400,
  },

  USERNAME_ALREADY_EXISTS: {
    code: '00084',
    message:
      'Đã có một người dùng với tên người dùng này, vui lòng nhập tên khác.',
    status: 409,
  },

  /* =====================================================
   * PROFILE
   * ===================================================== */

  PROFILE_UPDATED_SUCCESS: {
    code: '00086',
    message: 'Thông tin hồ sơ của bạn đã được thay đổi thành công.',
    status: 200,
  },

  USER_INFO_FETCHED_SUCCESS: {
    code: '00089',
    message: 'Thông tin người dùng đã được lấy thành công.',
    status: 200,
  },

  USER_NOT_FOUND: {
    code: '00052',
    message: 'Không thể tìm thấy người dùng.',
    status: 404,
  },

  ACCOUNT_DELETED_SUCCESS: {
    code: '00092',
    message: 'Tài khoản của bạn đã bị xóa thành công.',
    status: 200,
  },
} as const;
