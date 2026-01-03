export const AUTH_CODES = {
  /* =====================================================
   * REGISTER
   * ===================================================== */

  AUTH_FIELDS_REQUIRED: {
    code: '00025',
    message: 'Vui lòng cung cấp tất cả các trường bắt buộc!',
    status: 400,
  },

  INVALID_EMAIL_FORMAT: {
    code: '00026',
    message: 'Vui lòng cung cấp một địa chỉ email hợp lệ!',
    status: 400,
  },

  INVALID_PASSWORD_LENGTH: {
    code: '00027',
    message: 'Vui lòng cung cấp mật khẩu dài hơn 6 ký tự và ngắn hơn 20 ký tự.',
    status: 400,
  },

  INVALID_NAME_LENGTH: {
    code: '00028',
    message: 'Vui lòng cung cấp một tên dài hơn 3 ký tự và ngắn hơn 30 ký tự.',
    status: 400,
  },

  INVALID_EMAIL_AGAIN: {
    code: '00029',
    message: 'Vui lòng cung cấp một địa chỉ email hợp lệ!',
    status: 400,
  },

  EMAIL_ALREADY_EXISTS: {
    code: '00032',
    message: 'Một tài khoản với địa chỉ email này đã tồn tại.',
    status: 409,
  },
  
  REGISTER_SUCCESS: {
    code: '00035',
    message: 'Bạn đã đăng ký thành công.',
    status: 201,
  },

  EMAIL_NOT_FOUND: {
    code: '00036',
    message: 'Không tìm thấy tài khoản với địa chỉ email này.',
    status: 404,
  },

  REGISTER_MISSING_FIELDS: {
    code: '00038',
    message: 'Vui lòng cung cấp tất cả các trường bắt buộc!',
    status: 400,
  },

  REGISTER_INVALID_EMAIL: {
    code: '00039',
    message: 'Vui lòng cung cấp một địa chỉ email hợp lệ!',
    status: 400,
  },

  REGISTER_INVALID_PASSWORD: {
    code: '00040',
    message: 'Vui lòng cung cấp mật khẩu dài hơn 6 ký tự và ngắn hơn 20 ký tự.',
    status: 400,
  },

  /* =====================================================
   * LOGIN
   * ===================================================== */

  LOGIN_EMAIL_NOT_FOUND: {
    code: '00042',
    message: 'Không tìm thấy tài khoản với địa chỉ email này.',
    status: 404,
  },

  EMAIL_NOT_ACTIVATED: {
    code: '00043',
    message: 'Email của bạn chưa được kích hoạt, vui lòng đăng ký trước.',
    status: 403,
  },

  EMAIL_NOT_VERIFIED: {
    code: '00044',
    message: 'Email của bạn chưa được xác minh, vui lòng xác minh email của bạn.',
    status: 403,
  },

  INVALID_LOGIN_CREDENTIALS: {
    code: '00045',
    message: 'Bạn đã nhập một email hoặc mật khẩu không hợp lệ.',
    status: 401,
  },

  LOGIN_SUCCESS: {
    code: '00047',
    message: 'Bạn đã đăng nhập thành công.',
    status: 200,
  },

  LOGOUT_SUCCESS: {
    code: '00050',
    message: 'Đăng xuất thành công.',
    status: 200,
  },

  /* =====================================================
   * EMAIL / OTP
   * ===================================================== */

  OTP_SENT_SUCCESS: {
    code: '00048',
    message: 'Mã đã được gửi đến email của bạn thành công.',
    status: 200,
  },

  USER_NOT_FOUND: {
    code: '00052',
    message: 'Không thể tìm thấy người dùng.',
    status: 404,
  },

  OTP_REQUIRED: {
    code: '00053',
    message: 'Vui lòng gửi một mã xác nhận.',
    status: 400,
  },

  OTP_NOT_MATCH: {
    code: '00054',
    message:
      'Mã bạn nhập không khớp với mã chúng tôi đã gửi đến email của bạn. Vui lòng kiểm tra lại.',
    status: 400,
  },

  EMAIL_VERIFIED_SUCCESS: {
    code: '00058',
    message: 'Địa chỉ email của bạn đã được xác minh thành công.',
    status: 200,
  },

  /* =====================================================
   * TOKEN / REFRESH
   * ===================================================== */

  INVALID_TOKEN: {
    code: '00055',
    message: 'Token không hợp lệ. Token có thể đã hết hạn.',
    status: 401,
  },

  REFRESH_TOKEN_REQUIRED: {
    code: '00059',
    message: 'Vui lòng cung cấp token làm mới.',
    status: 400,
  },

  TOKEN_USER_MISMATCH: {
    code: '00061',
    message:
      'Token được cung cấp không khớp với người dùng, vui lòng đăng nhập.',
    status: 401,
  },

  TOKEN_EXPIRED: {
    code: '00062',
    message: 'Token đã hết hạn, vui lòng đăng nhập.',
    status: 401,
  },

  TOKEN_VERIFY_FAILED: {
    code: '00063',
    message: 'Không thể xác minh token, vui lòng đăng nhập.',
    status: 401,
  },

  TOKEN_REFRESH_SUCCESS: {
    code: '00065',
    message: 'Token đã được làm mới thành công.',
    status: 200,
  },

} as const;
