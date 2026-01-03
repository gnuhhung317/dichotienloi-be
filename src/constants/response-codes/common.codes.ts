export const COMMON_CODES = {
  /* =====================================================
   * REQUEST / VALIDATION
   * ===================================================== */

  SEND_CODE_MISSING_FIELDS: {
    code: '00005',
    message: 'Vui lòng cung cấp đầy đủ thông tin để gửi mã.',
    status: 400,
  },

  USER_ID_INVALID: {
    code: '00007',
    message: 'ID người dùng không hợp lệ.',
    status: 400,
  },

  PARAM_ID_MISSING: {
    code: '00022',
    message: 'Không có ID được cung cấp trong tham số. Vui lòng nhập một ID.',
    status: 400,
  },

  PARAM_ID_INVALID: {
    code: '00023',
    message: 'ID được cung cấp không phải là một đối tượng ID hợp lệ.',
    status: 400,
  },

  TOO_MANY_REQUESTS: {
    code: '00024',
    message: 'Quá nhiều yêu cầu.',
    status: 429,
  },

  /* =====================================================
   * AUTH / TOKEN
   * ===================================================== */

  NO_TOKEN_PROVIDED: {
    code: '00006',
    message: 'Truy cập bị từ chối. Không có token được cung cấp.',
    status: 401,
  },

  SESSION_EXPIRED: {
    code: '00011',
    message: 'Phiên của bạn đã hết hạn, vui lòng đăng nhập lại.',
    status: 401,
  },

  INVALID_TOKEN: {
    code: '00012',
    message: 'Token không hợp lệ. Token có thể đã hết hạn.',
    status: 401,
  },

  /* =====================================================
   * PERMISSION
   * ===================================================== */

  ACCESS_DENIED_17: {
    code: '00017',
    message: 'Truy cập bị từ chối. Bạn không có quyền truy cập.',
    status: 403,
  },

  ACCESS_DENIED_19: {
    code: '00019',
    message: 'Truy cập bị từ chối. Bạn không có quyền truy cập.',
    status: 403,
  },

  ACCESS_DENIED_21: {
    code: '00021',
    message: 'Truy cập bị từ chối. Bạn không có quyền truy cập.',
    status: 403,
  },

  /* =====================================================
   * NOT FOUND / SYSTEM
   * ===================================================== */

  VERIFIED_USER_NOT_FOUND: {
    code: '00009',
    message:
      'Không thể tìm thấy người dùng đã xác minh với mã và ID được cung cấp. Hãy đảm bảo rằng tài khoảnđã được xác minh và kích hoạt.',
    status: 404,
  },

  INTERNAL_SERVER_ERROR: {
    code: '00008',
    message: 'Đã xảy ra lỗi máy chủ nội bộ, vui lòng thử lại.',
    status: 500,
  },
} as const;
