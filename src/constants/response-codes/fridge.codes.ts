export const FRIDGE_CODES = {
  /* =====================================================
   * CREATE FRIDGE ITEM
   * ===================================================== */

  FRIDGE_ITEM_ALREADY_EXISTS: {
    code: '00199',
    message: 'Mục trong tủ lạnh cho thực phẩm đã tồn tại.',
    status: 409,
  },

  FRIDGE_ITEM_CREATED_SUCCESS: {
    code: '00202',
    message: 'Mục trong tủ lạnh được tạo thành công.',
    status: 201,
  },

  FRIDGE_FIELDS_REQUIRED: {
    code: '00203',
    message: 'Vui cung cấp tất cả các trường cần thiết',
    status: 400,
  },

  /* =====================================================
   * UPDATE FRIDGE ITEM
   * ===================================================== */

  FRIDGE_ITEM_ID_REQUIRED: {
    code: '00204',
    message: 'Vui lòng cung cấp id của item tủ lạnh',
    status: 400,
  },

  FRIDGE_UPDATE_FIELDS_REQUIRED: {
    code: '00204',
    message:
      'Vui lòng cung cấp ít nhất một trong các trường sau, newQuantity, newNote, newUseWithin',
    status: 400,
  },

  INVALID_USE_WITHIN: {
    code: '00205',
    message: "Vui lòng cung cấp một giá trị 'sử dụng trong' hợp lệ!",
    status: 400,
  },

  INVALID_QUANTITY: {
    code: '00206',
    message: 'Vui lòng cung cấp một lượng hợp lệ!',
    status: 400,
  },

  INVALID_NEW_NOTE: {
    code: '00207',
    message: 'Định dạng ghi chú mới không hợp lệ!',
    status: 400,
  },

  INVALID_NEW_FOOD_NAME: {
    code: '00207',
    message: 'Định dạng tên thức ăn mới không hợp lệ!',
    status: 400,
  },

  FOOD_NOT_FOUND: {
    code: '00208',
    message: 'Thực phẩm không tồn tại.',
    status: 404,
  },

  USER_NOT_IN_ANY_GROUP: {
    code: '00210',
    message: 'Người dùng không thuộc bất kỳ nhóm nào',
    status: 403,
  },

  FRIDGE_NOT_GROUP_ADMIN: {
    code: '00212',
    message: 'Tủ lạnh không thuộc quản trị viên nhóm.',
    status: 403,
  },

  FRIDGE_ITEM_NOT_FOUND: {
    code: '00213',
    message: 'Mục tủ lạnh không tồn tại.',
    status: 404,
  },

  NEW_FOOD_NOT_FOUND: {
    code: '00214',
    message: 'Tên thực phẩm mới không tồn tại',
    status: 404,
  },

  FRIDGE_ITEM_UPDATED_SUCCESS: {
    code: '00216',
    message: 'Cập nhật mục tủ lạnh thành công.',
    status: 200,
  },

  /* =====================================================
   * DELETE FRIDGE ITEM
   * ===================================================== */

  FOOD_NAME_REQUIRED: {
    code: '00217',
    message: 'Vui lòng cung cấp tên thực phẩm',
    status: 400,
  },

  FOOD_NAME_NOT_FOUND: {
    code: '00218',
    message: 'Không tìm thấy thực phẩm với tên đã cung cấp',
    status: 404,
  },

  NO_PERMISSION: {
    code: '00219',
    message: 'Bạn không có quyền',
    status: 403,
  },

  FRIDGE_ITEM_NOT_CREATED: {
    code: '00221',
    message:
      'Mục trong tủ lạnh liên kết với thực phẩm này chưa được tạo',
    status: 404,
  },

  FRIDGE_ITEM_DELETED_SUCCESS: {
    code: '00224',
    message: 'Xóa mục trong tủ lạnh thành công',
    status: 200,
  },

  /* =====================================================
   * GET FRIDGE ITEMS
   * ===================================================== */

  USER_NOT_IN_GROUP: {
    code: '00225',
    message: 'Bạn chưa vào nhóm nào',
    status: 403,
  },

  FRIDGE_LIST_SUCCESS: {
    code: '00228',
    message: 'Lấy danh sách đồ tủ lạnh thành công',
    status: 200,
  },

  FOOD_NAME_QUERY_REQUIRED: {
    code: '00229',
    message: 'Vui lòng cung cấp tên thực phẩm',
    status: 400,
  },

  FOOD_QUERY_NOT_FOUND: {
    code: '00230',
    message: 'Không tìm thấy thực phẩm với tên đã cung cấp',
    status: 404,
  },

  NO_PERMISSION_TO_VIEW: {
    code: '00232',
    message: 'Bạn không có quyền',
    status: 403,
  },

  FRIDGE_ITEM_FOR_FOOD_NOT_FOUND: {
    code: '00234',
    message:
      'Mục trong tủ lạnh liên kết với thực phẩm này chưa được tạo',
    status: 404,
  },

  FRIDGE_ITEM_DETAIL_SUCCESS: {
    code: '00237',
    message: 'Lấy item cụ thể thành công',
    status: 200,
  },
} as const;
