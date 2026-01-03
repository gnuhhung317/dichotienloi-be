export const FOOD_CODES = {
  /* =====================================================
   * UNIT
   * ===================================================== */

  GET_UNITS_SUCCESS: {
    code: '00110',
    message: 'Lấy các unit thành công',
    status: 200,
  },

  UNIT_NAME_REQUIRED: {
    code: '00112',
    message: 'Thiếu thông tin tên của đơn vị',
    status: 400,
  },

  UNIT_ALREADY_EXISTS: {
    code: '00113',
    message: 'Đã tồn tại đơn vị có tên này',
    status: 409,
  },

  UNIT_CREATE_SERVER_ERROR: {
    code: '00114',
    message: 'server error',
    status: 500,
  },

  UNIT_GET_SERVER_ERROR: {
    code: '00115',
    message: 'server error',
    status: 500,
  },

  UNIT_CREATED_SUCCESS: {
    code: '00116',
    message: 'Tạo đơn vị thành công',
    status: 201,
  },

  UNIT_UPDATE_FIELDS_REQUIRED: {
    code: '00117',
    message: 'Thiếu thông tin name cũ, name mới',
    status: 400,
  },

  UNIT_OLD_NAME_EQUALS_NEW: {
    code: '00118',
    message: 'Tên cũ trùng với tên mới',
    status: 400,
  },

  UNIT_NOT_FOUND: {
    code: '00119',
    message: 'Không tìm thấy đơn vị với tên cung cấp',
    status: 404,
  },

  UNIT_UPDATE_SERVER_ERROR: {
    code: '00120',
    message: 'server error',
    status: 500,
  },

  UNIT_DELETE_SERVER_ERROR: {
    code: '00121',
    message: 'server error',
    status: 500,
  },

  UNIT_UPDATED_SUCCESS: {
    code: '00122',
    message: 'Sửa đổi đơn vị thành công',
    status: 200,
  },

  UNIT_DELETE_NAME_REQUIRED: {
    code: '00123',
    message: 'Thiếu thông tin tên của đơn vị',
    status: 400,
  },

  UNIT_DELETE_NOT_FOUND: {
    code: '00125',
    message: 'Không tìm thấy đơn vị với tên cung cấp',
    status: 404,
  },

  UNIT_DELETE_SUCCESS: {
    code: '00128',
    message: 'Xóa đơn vị thành công',
    status: 200,
  },

  /* =====================================================
   * CATEGORY
   * ===================================================== */

  GET_CATEGORIES_SUCCESS: {
    code: '00129',
    message: 'Lấy các category thành công',
    status: 200,
  },

  CATEGORY_NAME_REQUIRED: {
    code: '00131',
    message: 'Thiếu thông tin tên của category',
    status: 400,
  },

  CATEGORY_ALREADY_EXISTS: {
    code: '00132',
    message: 'Đã tồn tại category có tên này',
    status: 409,
  },

  CATEGORY_CREATE_SERVER_ERROR: {
    code: '00133',
    message: 'server error',
    status: 500,
  },

  CATEGORY_GET_SERVER_ERROR: {
    code: '00134',
    message: 'server error',
    status: 500,
  },

  CATEGORY_CREATED_SUCCESS: {
    code: '00135',
    message: 'Tạo category thành công',
    status: 201,
  },

  CATEGORY_UPDATE_FIELDS_REQUIRED: {
    code: '00136',
    message: 'Thiếu thông tin name cũ, name mới',
    status: 400,
  },

  CATEGORY_OLD_NAME_EQUALS_NEW: {
    code: '00137',
    message: 'Tên cũ trùng với tên mới',
    status: 400,
  },

  CATEGORY_NOT_FOUND: {
    code: '00138',
    message: 'Không tìm thấy category với tên cung cấp',
    status: 404,
  },

  CATEGORY_NEW_NAME_EXISTS: {
    code: '00138',
    message: 'Tên mới đã tồn tại',
    status: 409,
  },

  CATEGORY_UPDATE_SERVER_ERROR: {
    code: '00139',
    message: 'server error',
    status: 500,
  },

  CATEGORY_DELETE_SERVER_ERROR: {
    code: '00140',
    message: 'server error',
    status: 500,
  },

  CATEGORY_UPDATED_SUCCESS: {
    code: '00141',
    message: 'Sửa đổi category thành công',
    status: 200,
  },

  CATEGORY_DELETE_NAME_REQUIRED: {
    code: '00142',
    message: 'Thiếu thông tin tên của category',
    status: 400,
  },

  CATEGORY_DELETE_NOT_FOUND: {
    code: '00143',
    message: 'Không tìm thấy category với tên cung cấp',
    status: 404,
  },

  CATEGORY_DELETE_SUCCESS: {
    code: '00146',
    message: 'Xóa category thành công',
    status: 200,
  },

  /* =====================================================
   * FOOD
   * ===================================================== */

  FOOD_FIELDS_REQUIRED: {
    code: '00147',
    message: 'Vui lòng cung cấp tất cả các trường bắt buộc!',
    status: 400,
  },

  INVALID_FOOD_NAME: {
    code: '00148',
    message: 'Vui lòng cung cấp tên của thực phẩm hợp lệ!',
    status: 400,
  },

  FOOD_CATEGORY_REQUIRED: {
    code: '00149',
    message: 'Vui lòng cung cấp tên của category của thực phẩm',
    status: 400,
  },

  FOOD_UNIT_REQUIRED: {
    code: '00150',
    message: 'Vui lòng cung cấp tên đơn vị đo của thực phẩm',
    status: 400,
  },

  FOOD_ALREADY_EXISTS: {
    code: '00151',
    message: 'Đã tồn tại thức ăn với tên này',
    status: 409,
  },

  FOOD_UNIT_NOT_FOUND: {
    code: '00153',
    message: 'Không tìm thấy đơn vị với tên cung cấp',
    status: 404,
  },

  FOOD_CATEGORY_NOT_FOUND: {
    code: '00155',
    message: 'Không tìm thấy category với tên cung cấp',
    status: 404,
  },

  FOOD_GROUP_REQUIRED: {
    code: '00157',
    message: 'Hãy vào nhóm trước để tạo thực phẩm',
    status: 403,
  },

  FOOD_IMAGE_UPLOAD_FAILED: {
    code: '00159',
    message: 'đăng tải ảnh thất bại',
    status: 500,
  },

  FOOD_CREATE_SERVER_ERROR: {
    code: '00160',
    message: 'server error',
    status: 500,
  },

  FOOD_CREATED_SUCCESS: {
    code: '00163',
    message: 'Tạo thực phẩm thành công',
    status: 201,
  },

  FOOD_UPDATE_FIELDS_REQUIRED: {
    code: '00162',
    message:
      'Vui lòng cung cấp ít nhất một trong các trường sau, newName, newCategory, newUnit',
    status: 400,
  },

  INVALID_NEW_CATEGORY: {
    code: '00164',
    message: 'Vui lòng cung cấp một danh mục mới hợp lệ cho thực phẩm',
    status: 400,
  },

  INVALID_NEW_UNIT: {
    code: '00165',
    message: 'Vui lòng cung cấp một đơn vị mới hợp lệ cho thực phẩm',
    status: 400,
  },

  INVALID_NEW_FOOD_NAME: {
    code: '00166',
    message: 'Vui lòng cung cấp một tên mới hợp lệ cho thực phẩm',
    status: 400,
  },

  FOOD_NOT_FOUND: {
    code: '00167',
    message: 'Thực phẩm với tên đã cung cấp không tồn tại',
    status: 404,
  },

  FOOD_NO_PERMISSION: {
    code: '00167',
    message: 'Bạn không có quyền chỉnh sửa',
    status: 403,
  },

  FOOD_UPDATE_SERVER_ERROR: {
    code: '00168',
    message: 'server error',
    status: 500,
  },

  FOOD_NEW_UNIT_NOT_FOUND: {
    code: '00169',
    message: 'Không tìm thấy đơn vị với tên đã cung cấp',
    status: 404,
  },

  FOOD_NEW_CATEGORY_NOT_FOUND: {
    code: '00171',
    message: 'Không tìm thấy danh mục với tên đã cung cấp',
    status: 404,
  },

  FOOD_NEW_NAME_EXISTS: {
    code: '00173',
    message: 'Một thực phẩm với tên này đã tồn tại',
    status: 409,
  },

  FOOD_DELETE_SUCCESS: {
    code: '00184',
    message: 'Xóa thực phẩm thành công',
    status: 200,
  },

  FOOD_NOT_IN_GROUP: {
    code: '00185',
    message: 'Bạn chưa vào nhómv nào',
    status: 403,
  },

  FOOD_LIST_SUCCESS: {
    code: '00188',
    message: 'Lấy danh sách thực phẩm thành công',
    status: 200,
  },

  FOOD_INVALID_USE_WITHIN: {
    code: '00191',
    message: "Vui lòng cung cấp một giá trị 'sử dụng trong khoảng' hợp lệ!",
    status: 400,
  },

  FOOD_INVALID_QUANTITY: {
    code: '00192',
    message: 'Vui lòng cung cấp một số lượng hợp lệ!',
    status: 400,
  },

  FOOD_INVALID_NOTE: {
    code: '00193',
    message: 'Định dạng ghi chú không hợp lệ!',
    status: 400,
  },

  FOOD_NOT_EXIST: {
    code: '00194',
    message: 'Thực phẩm không tồn tại.',
    status: 404,
  },

  FOOD_USER_NOT_IN_GROUP: {
    code: '00196',
    message: 'Người dùng không có quyền do không thuộc nhóm.',
    status: 403,
  },

  FOOD_NOT_GROUP_ADMIN: {
    code: '00198',
    message: 'Thực phẩm không thuộc quyền quản trị của nhóm.',
    status: 403,
  },
} as const;
