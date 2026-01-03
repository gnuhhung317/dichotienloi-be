export const GROUP_CODES = {
  /* =====================================================
   * CREATE GROUP
   * ===================================================== */

  ALREADY_IN_GROUP: {
    code: '00093',
    message: 'Không thể tạo nhóm, bạn đã thuộc về một nhóm rồi',
    status: 409,
  },

  CREATE_GROUP_SUCCESS: {
    code: '00095',
    message: 'Tạo nhóm thành công',
    status: 201,
  },

  /* =====================================================
   * GROUP STATUS
   * ===================================================== */

  USER_NOT_IN_ANY_GROUP: {
    code: '00096',
    message: 'Bạn không thuộc về nhóm nào',
    status: 404,
  },

  SUCCESS: {
    code: '00098',
    message: 'Thành công',
    status: 200,
  },

  /* =====================================================
   * ADD MEMBER
   * ===================================================== */

  TARGET_ALREADY_IN_GROUP: {
    code: '00099',
    message: 'Người này đã thuộc về một nhóm',
    status: 409,
  },

  TARGET_USER_NOT_FOUND: {
    code: '00099',
    message: 'Không tồn tại user này',
    status: 404,
  },

  MISSING_USERNAME: {
    code: '00100',
    message: 'Thiếu username',
    status: 400,
  },

  ADD_MEMBER_SUCCESS: {
    code: '00102',
    message: 'Người dùng thêm vào nhóm thành công',
    status: 200,
  },

  TARGET_NOT_IN_GROUP: {
    code: '00103',
    message: 'Người này chưa vào nhóm nào',
    status: 404,
  },

  /* =====================================================
   * REMOVE MEMBER
   * ===================================================== */

  NOT_GROUP_ADMIN: {
    code: '00104',
    message: 'Bạn không phải admin, không thể xóa',
    status: 403,
  },

  REMOVE_MEMBER_SUCCESS: {
    code: '00106',
    message: 'Xóa thành công',
    status: 200,
  },

  MISSING_USERNAME_REMOVE: {
    code: '00107',
    message: 'Thiếu username',
    status: 400,
  },

  /* =====================================================
   * LOG
   * ===================================================== */

  GET_SYSTEM_LOG_SUCCESS: {
    code: '00109',
    message: 'Lấy log hệ thống thành công',
    status: 200,
  },
} as const;
