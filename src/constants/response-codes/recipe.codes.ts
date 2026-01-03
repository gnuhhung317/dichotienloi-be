export const RECIPE_CODES = {
  /* =====================================================
   * CREATE RECIPE
   * ===================================================== */

  FIELDS_REQUIRED: {
    code: '00349',
    message: 'Vui lòng cung cấp tất cả các trường bắt buộc',
    status: 400,
  },

  INVALID_FOOD_NAME: {
    code: '00350',
    message: 'Vui lòng cung cấp một tên thực phẩm hợp lệ',
    status: 400,
  },

  INVALID_RECIPE_NAME: {
    code: '00351',
    message: 'Vui lòng cung cấp một tên công thức hợp lệ',
    status: 400,
  },

  INVALID_DESCRIPTION: {
    code: '00352',
    message: 'Vui lòng cung cấp một mô tả công thức hợp lệ',
    status: 400,
  },

  INVALID_HTML_CONTENT: {
    code: '00353',
    message: 'Vui lòng cung cấp nội dung HTML công thức hợp lệ',
    status: 400,
  },

  FOOD_NOT_FOUND: {
    code: '00354',
    message: 'Không tìm thấy thực phẩm với tên đã cung cấp',
    status: 404,
  },

  RECIPE_CREATED_SUCCESS: {
    code: '00357',
    message: 'Thêm công thức nấu ăn thành công',
    status: 201,
  },

  /* =====================================================
   * UPDATE RECIPE
   * ===================================================== */

  UPDATE_FIELDS_REQUIRED: {
    code: '00358',
    message: 'Vui lòng cung cấp tất cả các trường bắt buộc',
    status: 400,
  },

  RECIPE_ID_REQUIRED: {
    code: '00359',
    message: 'Vui lòng cung cấp một ID công thức!',
    status: 400,
  },

  UPDATE_FIELDS_EMPTY: {
    code: '00360',
    message:
      'Vui lòng cung cấp ít nhất một trong các trường sau, newFoodName, newDescription, newHtmlContent,newName',
    status: 400,
  },

  INVALID_NEW_FOOD_NAME: {
    code: '00361',
    message: 'Vui lòng cung cấp một tên thực phẩm mới hợp lệ!',
    status: 400,
  },

  INVALID_NEW_DESCRIPTION: {
    code: '00362',
    message: 'Vui lòng cung cấp một mô tả mới hợp lệ!',
    status: 400,
  },

  INVALID_NEW_HTML_CONTENT: {
    code: '00363',
    message: 'Vui lòng cung cấp nội dung HTML mới hợp lệ!',
    status: 400,
  },

  INVALID_NEW_RECIPE_NAME: {
    code: '00364',
    message: 'Vui lòng cung cấp một tên công thức mới hợp lệ!',
    status: 400,
  },

  RECIPE_NOT_FOUND: {
    code: '00365',
    message: 'Không tìm thấy công thức với ID đã cung cấp',
    status: 404,
  },

  NEW_FOOD_NOT_FOUND: {
    code: '00367',
    message: 'Tên thực phẩm mới không tồn tại',
    status: 404,
  },

  RECIPE_UPDATED_SUCCESS: {
    code: '00370',
    message: 'Cập nhật công thức nấu ăn thành công',
    status: 200,
  },

  /* =====================================================
   * DELETE RECIPE
   * ===================================================== */

  DELETE_FIELDS_REQUIRED: {
    code: '00371',
    message: 'Vui lòng cung cấp tất cả các trường bắt buộc',
    status: 400,
  },

  INVALID_RECIPE_ID: {
    code: '00372',
    message: 'Vui lòng cung cấp một ID công thức hợp lệ',
    status: 400,
  },

  DELETE_RECIPE_NOT_FOUND: {
    code: '00373',
    message: 'Không tìm thấy công thức với ID đã cung cấp',
    status: 404,
  },

  RECIPE_DELETED_SUCCESS: {
    code: '00376',
    message: 'Công thức của bạn đã được xóa thành công',
    status: 200,
  },

  /* =====================================================
   * GET RECIPE LIST
   * ===================================================== */

  GET_RECIPES_SUCCESS: {
    code: '00378',
    message: 'Lấy các công thức thành công',
    status: 200,
  },
} as const;
